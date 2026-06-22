'use client'

import Image from 'next/image'

export default function MobileGate({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Mobile overlay — visible only below md (768px) */}
      <div
        className="md:hidden fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 px-8 text-center"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, #1a0040 0%, #11002B 60%)' }}
      >
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #06D373 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <Image src="/plglogo.svg" alt="PLG" width={48} height={16} priority />

          {/* Monitor icon */}
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.9 }}
          >
            <rect x="4" y="8" width="48" height="30" rx="3" stroke="#06D373" strokeWidth="2.5" fill="none" />
            <line x1="20" y1="38" x2="18" y2="48" stroke="#06D373" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="36" y1="38" x2="38" y2="48" stroke="#06D373" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="15" y1="48" x2="41" y2="48" stroke="#06D373" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          <div className="flex flex-col gap-2">
            <h1
              className="text-2xl text-white leading-tight"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}
            >
              Best viewed on desktop
            </h1>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Mulish', sans-serif" }}
            >
              This presentation is designed for desktop screens. Please open it on a laptop or monitor for the full experience.
            </p>
          </div>

          <p
            className="text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ color: '#F640C4' }}
          >
            PLG Product Ecosystem
          </p>
        </div>
      </div>

      {/* Desktop content */}
      <div className="hidden md:block h-full">{children}</div>
    </>
  )
}
