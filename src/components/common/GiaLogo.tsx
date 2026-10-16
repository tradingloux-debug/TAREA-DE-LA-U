import React from 'react';

export interface GiaLogoProps {
  className?: string;
  variant?: 'default' | 'monochrome-white' | 'white' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'navbar';
  alt?: string;
}

/**
 * Official GIA Experiences Logo Component.
 * Uses the exact official image asset uploaded to the project:
 * Real path: /public/assets/gia_logo.png (served as /assets/gia_logo.png)
 *
 * Requirements:
 * - object-fit: contain (never cover)
 * - width: auto (preserves original natural aspect ratio)
 * - No background added
 * - No cropped letters
 * - Desktop height: 48–55px
 * - Mobile height: 38–42px
 * - Highly legible "EXPERIENCES"
 */
export const GiaLogo: React.FC<GiaLogoProps> = ({
  className = '',
  size = 'navbar',
  alt = 'GIA Experiences — El Salvador diseñado para ti',
}) => {
  // Size classes adhering strictly to 48-55px desktop, 38-42px mobile
  const sizeClasses = {
    navbar: 'h-[38px] sm:h-[48px] md:h-[52px] lg:h-[55px] w-auto max-w-full',
    sm: 'h-[32px] sm:h-[38px] w-auto max-w-full',
    md: 'h-[38px] sm:h-[48px] w-auto max-w-full',
    lg: 'h-[48px] sm:h-[55px] w-auto max-w-full',
    xl: 'h-[55px] sm:h-[65px] w-auto max-w-full',
    full: 'h-[38px] sm:h-[48px] md:h-[52px] lg:h-[55px] w-auto max-w-full',
  }[size] || 'h-[38px] sm:h-[48px] md:h-[52px] lg:h-[55px] w-auto max-w-full';

  return (
    <img
      src="/assets/gia_logo.png"
      alt={alt}
      loading="eager"
      className={`inline-block object-contain select-none shrink-0 ${sizeClasses} ${className}`}
    />
  );
};
