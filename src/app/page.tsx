'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import OrbitDiagram from '@/components/OrbitDiagram'
import ExternalDataCloud from '@/components/ExternalDataCloud'
import { track } from '@/lib/track'

export default function Home() {
  const router = useRouter()

  const handleProductClick = (slug: string) => {
    track({ type: 'orbit_click', product: slug, ts: Date.now() })
    router.push(`/${slug}`)
  }

  return (
    <main
      className="relative w-full h-screen overflow-hidden flex flex-col items-center pt-6 pb-4"
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

      {/* Header - in flex flow so orbit respects the space below it */}
      <motion.div
        className="relative flex flex-col items-center gap-2 z-10 shrink-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Image
          src="/plglogo.svg"
          alt="PLG"
          width={48}
          height={16}
          priority
        />
        <h1
          className="text-3xl md:text-4xl text-white text-center leading-tight"
          style={{ fontFamily: "'Panel Sans', sans-serif" }}
        >
          Product Ecosystem
        </h1>
        <p
          className="text-xs font-semibold tracking-[0.22em] uppercase text-center"
          style={{ color: '#F640C4' }}
        >
          Our products don&apos;t just talk to each other,<br />they&apos;re connected to your whole world
        </p>
      </motion.div>

      {/* Gap between headline and orbit */}
      <div className="shrink-0" style={{ height: 'clamp(10px, 1.5vh, 22px)' }} />

      {/* External data source labels + particle streams */}
      <ExternalDataCloud />

      {/* Orbit diagram - fills remaining space, centered */}
      <motion.div
        className="relative z-10 flex-1 flex items-center justify-center w-full min-h-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
      >
        <OrbitDiagram onProductClick={handleProductClick} />
      </motion.div>

    </main>
  )
}
