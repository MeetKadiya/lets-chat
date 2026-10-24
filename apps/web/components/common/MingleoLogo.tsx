'use client';

import React from 'react';
import Link from 'next/link';

interface MingleoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  showTagline?: boolean;
}

export function MingleoLogo({ size = 'md', href = '/', showTagline = false }: MingleoLogoProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const content = (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      {/* Pixel Chat Bubble Mascot */}
      <div
        className={`relative rounded-xl bg-[#65A843] border-2 border-[#252820] shadow-[0_3px_0_#252820] flex items-center justify-center transition-transform group-hover:scale-105 ${
          isSm ? 'w-8 h-8 text-base' : isLg ? 'w-12 h-12 text-2xl' : 'w-10 h-10 text-xl'
        }`}
      >
        {/* Pixel Smile Face in SVG */}
        <svg
          viewBox="0 0 24 24"
          className="w-3/5 h-3/5 fill-[#252820]"
          shapeRendering="crispEdges"
        >
          {/* Left Eye */}
          <rect x="5" y="7" width="3" height="3" />
          {/* Right Eye */}
          <rect x="16" y="7" width="3" height="3" />
          {/* Mouth */}
          <rect x="7" y="14" width="10" height="2" />
          <rect x="5" y="12" width="2" height="2" />
          <rect x="17" y="12" width="2" height="2" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight text-[#252820] lowercase transition-colors group-hover:text-[#316B25] ${
            isSm ? 'text-lg' : isLg ? 'text-3xl' : 'text-2xl'
          }`}
          style={{ fontFamily: 'var(--font-heading, inherit)' }}
        >
          mingleo
        </span>
        {showTagline && (
          <span className="text-[10px] font-bold text-[#65A843] -mt-1 tracking-wider uppercase">
            Meet strangers. Make connections.
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
