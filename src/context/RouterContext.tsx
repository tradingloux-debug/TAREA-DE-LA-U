import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  goBack: (fallbackPath?: string) => void;
  query: Record<string, string>;
  slug?: string;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function parsePath(fullPath: string): { path: string; query: Record<string, string>; slug?: string } {
  // Support both hash-based #/path or direct /path
  let normalized = fullPath;
  if (normalized.startsWith('#')) {
    normalized = normalized.slice(1);
  }
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }

  const [pathname, searchStr] = normalized.split('?');
  const query: Record<string, string> = {};

  if (searchStr) {
    const searchParams = new URLSearchParams(searchStr);
    searchParams.forEach((val, key) => {
      query[key] = val;
    });
  }

  let slug: string | undefined;
  if (pathname.startsWith('/experiencias/')) {
    slug = pathname.replace('/experiencias/', '');
  } else if (pathname.startsWith('/rutas/')) {
    slug = pathname.replace('/rutas/', '');
  }

  return { path: pathname, query, slug };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        return window.location.hash.slice(1);
      }
      return window.location.pathname + window.location.search;
    }
    return '/';
  });

  const navigate = useCallback((to: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '#' + to);
      setCurrentLocation(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const goBack = useCallback((fallbackPath: string = '/') => {
    if (typeof window !== 'undefined') {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigate(fallbackPath);
      }
    }
  }, [navigate]);

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash) {
        setCurrentLocation(window.location.hash.slice(1));
      } else {
        setCurrentLocation(window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const parsed = parsePath(currentLocation);

  return (
    <RouterContext.Provider
      value={{
        path: parsed.path,
        query: parsed.query,
        slug: parsed.slug,
        navigate,
        goBack,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
