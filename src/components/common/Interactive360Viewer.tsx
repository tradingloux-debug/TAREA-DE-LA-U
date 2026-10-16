import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  Compass,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Move,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface Hotspot360 {
  id: string;
  lat: number; // degrees -85 to 85
  lon: number; // degrees 0 to 360
  label: string;
  description?: string;
}

export interface Interactive360ViewerProps {
  imageSrc: string;
  title: string;
  locationName?: string;
  hotspots?: Hotspot360[];
  className?: string;
  initialFov?: number;
  autoRotateSpeed?: number; // 0 to disable by default
  onExpand?: () => void;
  isExpanded?: boolean;
}

const EMPTY_HOTSPOTS: Hotspot360[] = [];

export const Interactive360Viewer: React.FC<Interactive360ViewerProps> = ({
  imageSrc,
  title,
  locationName,
  hotspots,
  className = 'h-[400px] w-full',
  initialFov = 75,
  autoRotateSpeed = 0.35,
  onExpand,
  isExpanded = false,
}) => {
  const { language } = useLanguage();
  const viewerHotspots = hotspots ?? EMPTY_HOTSPOTS;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [heading, setHeading] = useState(0); // 0-360 degrees for compass
  const [fov, setFov] = useState(initialFov);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot360 | null>(null);

  // Drag state
  const isDraggingRef = useRef(false);
  const previousPointerRef = useRef({ x: 0, y: 0 });
  const lonRef = useRef(0);
  const latRef = useRef(0);
  const targetLonRef = useRef(0);
  const targetLatRef = useRef(0);
  const fovRef = useRef(initialFov);
  const autoRotateRef = useRef(isAutoRotating);

  // Sync ref
  useEffect(() => {
    autoRotateRef.current = isAutoRotating;
  }, [isAutoRotating]);

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Hotspots projected screen positions
  const [projectedHotspots, setProjectedHotspots] = useState<
    { hotspot: Hotspot360; x: number; y: number; visible: boolean }[]
  >([]);

  const setupThree = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean any existing renderer
    if (rendererRef.current && rendererRef.current.domElement) {
      if (container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current.dispose();
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(fovRef.current, width / height, 1, 1100);
    cameraRef.current = camera;

    // Inverted Sphere for 360 panorama
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert so inside of sphere faces camera

    // Texture loader
    setIsLoading(true);
    setLoadError(false);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageSrc,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        meshRef.current = mesh;
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error('Error loading 360 texture:', err);
        setLoadError(true);
        setIsLoading(false);
      }
    );

    // WebGL Renderer
    try {
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.domElement.className = 'w-full h-full block cursor-grab active:cursor-grabbing select-none';
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (e) {
      console.warn('WebGL init failed, using fallback:', e);
      setLoadError(true);
      setIsLoading(false);
      return;
    }

    // Animation render loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Auto rotation if enabled and not actively dragging
      if (autoRotateRef.current && !isDraggingRef.current) {
        targetLonRef.current += autoRotateSpeed * 25 * delta;
      }

      // Smooth damping interpolation
      lonRef.current += (targetLonRef.current - lonRef.current) * 0.12;
      latRef.current += (targetLatRef.current - latRef.current) * 0.12;

      // Clamp lat
      latRef.current = Math.max(-85, Math.min(85, latRef.current));
      targetLatRef.current = Math.max(-85, Math.min(85, targetLatRef.current));

      // Calculate camera orientation from spherical coordinates
      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current);

      const x = 500 * Math.sin(phi) * Math.cos(theta);
      const y = 500 * Math.cos(phi);
      const z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(x, y, z);

      // Heading normalized to 0-360 for compass
      const normalizedLon = ((-lonRef.current % 360) + 360) % 360;
      setHeading(Math.round(normalizedLon));

      // Render
      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
      }

      // Calculate Hotspots 2D screen projections
      if (viewerHotspots.length > 0 && containerRef.current) {
        const cWidth = containerRef.current.clientWidth;
        const cHeight = containerRef.current.clientHeight;

        const projected = viewerHotspots.map((hs) => {
          const hPhi = THREE.MathUtils.degToRad(90 - hs.lat);
          const hTheta = THREE.MathUtils.degToRad(hs.lon);
          const pos = new THREE.Vector3(
            -500 * Math.sin(hPhi) * Math.cos(hTheta),
            500 * Math.cos(hPhi),
            500 * Math.sin(hPhi) * Math.sin(hTheta)
          );

          // Project to normalized device coordinates
          pos.project(camera);

          const isVisible = pos.z < 1; // In front of camera
          const screenX = (pos.x * 0.5 + 0.5) * cWidth;
          const screenY = (-pos.y * 0.5 + 0.5) * cHeight;

          return {
            hotspot: hs,
            x: screenX,
            y: screenY,
            visible: isVisible,
          };
        });
        setProjectedHotspots(projected);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(animate);
  }, [imageSrc, initialFov, autoRotateSpeed, viewerHotspots]);

  useEffect(() => {
    setupThree();

    // Resize handler
    const handleResize = () => {
      const container = containerRef.current;
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        if (Array.isArray(meshRef.current.material)) {
          meshRef.current.material.forEach((m) => m.dispose());
        } else {
          meshRef.current.material.dispose();
        }
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        if (containerRef.current?.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
    };
  }, [setupThree]);

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousPointerRef.current = { x: e.clientX, y: e.clientY };
    setUserInteracted(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousPointerRef.current.x;
    const deltaY = e.clientY - previousPointerRef.current.y;
    previousPointerRef.current = { x: e.clientX, y: e.clientY };

    // Move in 360 space
    const factor = fovRef.current / 450;
    targetLonRef.current -= deltaX * factor;
    targetLatRef.current += deltaY * factor;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setUserInteracted(true);
    const newFov = Math.max(35, Math.min(95, fovRef.current + e.deltaY * 0.05));
    fovRef.current = newFov;
    setFov(Math.round(newFov));
    if (cameraRef.current) {
      cameraRef.current.fov = newFov;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const handleZoomIn = () => {
    setUserInteracted(true);
    const newFov = Math.max(35, fovRef.current - 12);
    fovRef.current = newFov;
    setFov(Math.round(newFov));
    if (cameraRef.current) {
      cameraRef.current.fov = newFov;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const handleZoomOut = () => {
    setUserInteracted(true);
    const newFov = Math.min(95, fovRef.current + 12);
    fovRef.current = newFov;
    setFov(Math.round(newFov));
    if (cameraRef.current) {
      cameraRef.current.fov = newFov;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const handleResetOrientation = () => {
    targetLonRef.current = 0;
    targetLatRef.current = 0;
    fovRef.current = initialFov;
    setFov(initialFov);
    if (cameraRef.current) {
      cameraRef.current.fov = initialFov;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  // Cardinal directions for compass
  const getCardinal = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl select-none group/viewer ${className}`}
      onWheel={handleWheel}
    >
      {/* 360 WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-full relative"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />

      {/* Fallback 2D Panoramic Pan if WebGL or texture fail */}
      {loadError && (
        <div
          className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center bg-slate-900"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <img
            src={imageSrc}
            alt={title}
            className="w-[200%] h-full object-cover transition-transform"
            style={{
              transform: `translate(${-((targetLonRef.current * 2) % 100)}px, ${targetLatRef.current * 1.5}px)`,
            }}
            draggable={false}
          />
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-amber-300 border border-amber-500/30">
            {language === 'es' ? 'Vista panorámica interactiva 2D' : 'Interactive 2D panoramic view'}
          </div>
        </div>
      )}

      {/* Hotspots overlay */}
      {projectedHotspots.map(({ hotspot, x, y, visible }) => {
        if (!visible) return null;
        return (
          <div
            key={hotspot.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
            style={{ left: `${x}px`, top: `${y}px` }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(activeHotspot?.id === hotspot.id ? null : hotspot);
            }}
          >
            <div className="relative group/hotspot">
              <span className="w-8 h-8 rounded-full bg-teal-400/40 animate-ping absolute -top-1 -left-1" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-teal-600 to-teal-400 text-white flex items-center justify-center border-2 border-white shadow-xl hover:scale-125 transition-transform">
                <Sparkles className="w-3 h-3" />
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-slate-900/95 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl border border-white/20 shadow-2xl opacity-90 group-hover/hotspot:opacity-100 transition-opacity">
                <div className="font-bold text-teal-300">{hotspot.label}</div>
                {hotspot.description && (
                  <div className="text-[11px] text-slate-300 mt-0.5">{hotspot.description}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3 text-white">
          <div className="w-10 h-10 rounded-full border-3 border-teal-500/30 border-t-teal-400 animate-spin" />
          <span className="text-xs font-mono font-semibold tracking-wider text-teal-300 uppercase">
            Cargando esfera 360° interactiva...
          </span>
        </div>
      )}

      {/* Top Overlay Badge & Title */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-start justify-between pointer-events-none">
        <div className="space-y-1 pointer-events-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 backdrop-blur-md text-teal-300 text-[11px] font-mono font-bold border border-teal-400/40 shadow-xs">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{language === 'es' ? 'FOTOGRAFÍA 360° INTERACTIVA' : 'INTERACTIVE 360° PHOTO'}</span>
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-white drop-shadow-md leading-snug">
            {title}
          </h3>
          {locationName && (
            <p className="text-xs text-slate-300 drop-shadow-xs font-medium">{locationName}</p>
          )}
        </div>

        {/* Compass & Heading Widget */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-md text-xs font-mono"
            title="Orientación actual de la cámara 360°"
          >
            <div
              className="w-4 h-4 rounded-full border border-teal-400 flex items-center justify-center transition-transform"
              style={{ transform: `rotate(${-heading}deg)` }}
            >
              <div className="w-0.5 h-2 bg-rose-500 rounded-full -translate-y-0.5" />
            </div>
            <span className="font-bold text-teal-400">{getCardinal(heading)}</span>
            <span className="text-slate-400 text-[10px]">{heading}°</span>
          </div>

          {onExpand && (
            <button
              type="button"
              onClick={onExpand}
              className="p-2 rounded-xl bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 transition-all cursor-pointer shadow-md hover:scale-105"
              title={isExpanded ? (language === 'es' ? 'Minimizar' : 'Minimize') : (language === 'es' ? 'Pantalla completa 360°' : 'Full-screen 360°')}
              aria-label="Expandir visor 360"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Floating Center Hint (Fades out once user interacts) */}
      {!userInteracted && !isLoading && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="bg-slate-900/85 backdrop-blur-md text-white text-xs font-medium px-4 py-2.5 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-2.5 animate-bounce">
            <Move className="w-4 h-4 text-teal-400" />
            <span>{language === 'es' ? 'Haz clic y arrastra en cualquier dirección para mover la imagen 360°' : 'Click and drag in any direction to move the 360° image'}</span>
          </div>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/15 shadow-xl text-white pointer-events-auto">
        {/* Auto Rotate Toggle */}
        <button
          type="button"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            isAutoRotating
              ? 'bg-teal-500 text-white shadow-xs'
              : 'bg-white/10 text-slate-300 hover:bg-white/20'
          }`}
          title={isAutoRotating ? (language === 'es' ? 'Pausar giro automático' : 'Pause automatic rotation') : (language === 'es' ? 'Activar giro panorámico continuo' : 'Start continuous panoramic rotation')}
        >
          {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isAutoRotating ? (language === 'es' ? 'Pausar' : 'Pause') : (language === 'es' ? 'Girar' : 'Rotate')}</span>
        </button>

        <div className="w-px h-4 bg-white/20" />

        {/* Zoom In */}
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          title={language === 'es' ? 'Acercar' : 'Zoom in'}
          aria-label={language === 'es' ? 'Acercar vista 360' : 'Zoom in on 360° view'}
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        {/* Zoom Out */}
        <button
          type="button"
          onClick={handleZoomOut}
          className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          title={language === 'es' ? 'Alejar' : 'Zoom out'}
          aria-label={language === 'es' ? 'Alejar vista 360' : 'Zoom out of 360° view'}
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        {/* Center / Reset */}
        <button
          type="button"
          onClick={handleResetOrientation}
          className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
          title="Restablecer vista centrada"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{language === 'es' ? 'Centrar' : 'Center'}</span>
        </button>

        <div className="w-px h-4 bg-white/20" />

        <div className="text-[11px] font-mono text-slate-400 px-1 hidden md:block">
          {language === 'es' ? 'Arrastra para explorar' : 'Drag to explore'}
        </div>
      </div>
    </div>
  );
};
