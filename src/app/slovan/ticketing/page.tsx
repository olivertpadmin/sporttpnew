'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, animate, useInView } from 'framer-motion'
import SectionNav from '@/components/SectionNav'
// ArenaMapKometa nahrazena lokálními obrázky

const ACCENT = '#F59E0B'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

function CountUp({ to, suffix = '', duration = 2.2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const mv = useMotionValue(0)
  useEffect(() => {
    const unsub = mv.on('change', (v) => { if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}` })
    return unsub
  }, [mv, suffix])
  useEffect(() => {
    if (!isInView) return
    const ctrl = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => ctrl.stop()
  }, [isInView, mv, to, duration])
  return <span ref={ref}>0{suffix}</span>
}

// ─────────────────────────────────────────────────────────
// Ticketing Visual: event card → ticket tears off → confetti
// ─────────────────────────────────────────────────────────
const CONFETTI_COLORS = ['#F59E0B', '#EF4444', '#22D3EE', '#06D373', '#A855F7', '#EC4899']

// Fixní konfety – žádné Math.random() v JSX (hydration error fix)
const CONFETTI = [
  { dx:  80, dy: -60, w: 8,  h: 8,  r: '50%', rot: 45,  delay: 2.2 },
  { dx: -70, dy: -40, w: 10, h: 6,  r: 2,     rot: 120, delay: 2.3 },
  { dx:  60, dy:  70, w: 7,  h: 7,  r: '50%', rot: 200, delay: 2.25 },
  { dx: -90, dy:  50, w: 9,  h: 5,  r: 2,     rot: 310, delay: 2.4 },
  { dx:  40, dy: -80, w: 6,  h: 9,  r: '50%', rot: 80,  delay: 2.35 },
  { dx: -50, dy: -70, w: 11, h: 6,  r: 2,     rot: 160, delay: 2.2 },
  { dx:  90, dy:  30, w: 7,  h: 7,  r: '50%', rot: 240, delay: 2.45 },
  { dx: -60, dy:  80, w: 8,  h: 8,  r: 2,     rot: 30,  delay: 2.3 },
  { dx:  20, dy:  90, w: 9,  h: 6,  r: '50%', rot: 270, delay: 2.4 },
  { dx: -30, dy: -90, w: 6,  h: 10, r: 2,     rot: 190, delay: 2.25 },
  { dx:  70, dy: -20, w: 8,  h: 8,  r: '50%', rot: 340, delay: 2.35 },
  { dx: -80, dy: -10, w: 10, h: 7,  r: 2,     rot: 100, delay: 2.2 },
  { dx:  50, dy:  60, w: 7,  h: 7,  r: '50%', rot: 220, delay: 2.45 },
  { dx: -40, dy:  40, w: 9,  h: 9,  r: 2,     rot: 55,  delay: 2.3 },
]

function TicketingVisual() {
  return (
    <div className="relative select-none" style={{ width: 300, height: 240 }}>
      {CONFETTI.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 150, y: 100, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: 150 + c.dx,
            y: 100 + c.dy,
            scale: [0, 1, 0.5],
            rotate: c.rot,
          }}
          transition={{ duration: 1.2, delay: c.delay, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: c.w,
            height: c.h,
            borderRadius: c.r,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          position: 'absolute', left: 24, top: 40,
          width: 180, height: 120,
          borderRadius: 14,
          background: 'linear-gradient(135deg, #1a0f00 0%, #2d1a00 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 48px rgba(0,0,0,0.6)',
          padding: '14px 16px',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}30 0%, transparent 70%)` }} />
        <div style={{ fontSize: 8, color: ACCENT, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 4 }}>LIVE EVENT</div>
        <div style={{ fontSize: 14, fontWeight: 900, color: 'white', fontFamily: "'Panel Sans', sans-serif", marginBottom: 4, lineHeight: 1.2 }}>Oktagon MMA 58</div>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>Eden Arena · Prague</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>From</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: ACCENT, fontFamily: "'Panel Sans', sans-serif" }}>990 Kč</div>
          </div>
          <div style={{ fontSize: 7, fontWeight: 700, color: '#001a0a', background: ACCENT, borderRadius: 4, padding: '2px 6px' }}>Buy →</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
        animate={{ opacity: [0, 1, 1], x: 90, y: -15, rotate: 14 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', left: 110, top: 100,
          width: 110, height: 60,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #fff8e1 0%, #fffde7 100%)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
          padding: '8px 10px',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, backgroundImage: 'radial-gradient(circle, transparent 4px, #fffde7 4px)', backgroundSize: '8px 8px' }} />
        <div style={{ marginLeft: 10 }}>
          <div style={{ fontSize: 6, fontWeight: 700, color: '#5a3e00', marginBottom: 3 }}>TICKET</div>
          <div style={{ display: 'flex', gap: 1.5, marginBottom: 4 }}>
            {[2,4,2,3,2,4,3,2,4,2,3].map((w, i) => (
              <div key={i} style={{ width: w, height: 16, background: '#2a1a00', borderRadius: 0.5 }} />
            ))}
          </div>
          <div style={{ fontSize: 5, color: '#8a6a20', letterSpacing: '0.15em' }}>PLG-2024-MMA58</div>
        </div>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Přepínač hokejového / fotbalového plánku arény
// ─────────────────────────────────────────────────────────
// Loga platebních metod
const PAYMENT_METHODS = [
  { label: 'Visa',          bg: '#1A1F71', color: '#fff'     },
  { label: 'Mastercard',    bg: '#EB001B', color: '#fff'     },
  { label: 'Apple Pay',     bg: '#000',    color: '#fff'     },
  { label: 'Google Pay',    bg: '#fff',    color: '#3c4043', border: true },
  { label: 'Převod',        bg: '#E8F5E9', color: '#2E7D32'  },
  { label: 'Faktura',       bg: '#E3F2FD', color: '#1565C0'  },
  { label: 'Edenred',       bg: '#E30613', color: '#fff'     },
  { label: 'Pluxee',        bg: '#6B3FA0', color: '#fff'     },
  { label: 'Up',            bg: '#FF6B35', color: '#fff'     },
  { label: 'Twisto',        bg: '#00C896', color: '#fff'     },
]

// ─────────────────────────────────────────────────────────
// Přepínatelná dlaždice obrázků – velká verze
function ImageStack({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState(0)
  return (
    <div className="mt-5">
      {/* Přepínač */}
      <div className="flex gap-2 mb-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActive(i)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
            style={{
              background: active === i ? '#6366F1' : 'rgba(99,102,241,0.08)',
              color: active === i ? '#fff' : '#6366F1',
              border: `1px solid ${active === i ? '#6366F1' : 'rgba(99,102,241,0.3)'}`,
            }}
          >
            {img.alt}
          </button>
        ))}
      </div>
      {/* Aktivní obrázek – velký */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[active].src}
        alt={images[active].alt}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          objectPosition: 'center',
          borderRadius: 16,
          display: 'block',
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────
function PaymentLogos() {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {PAYMENT_METHODS.map((m) => (
        <div
          key={m.label}
          className="px-3 py-1.5 rounded-lg text-xs font-bold"
          style={{
            background: m.bg,
            color: m.color,
            border: m.border ? '1px solid #dadce0' : undefined,
            minWidth: 64,
            textAlign: 'center',
          }}
        >
          {m.label}
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
function ArenaToggle() {
  const [mode, setMode] = useState<'hokej' | 'fotbal'>('hokej')
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const dragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const MIN_SCALE = 1
  const MAX_SCALE = 4

  // Reset při změně módu
  const switchMode = (m: 'hokej' | 'fotbal') => {
    setMode(m)
    setScale(1)
    setPos({ x: 0, y: 0 })
  }

  // Zoom kolečkem
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    setScale(s => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s - e.deltaY * 0.001)))
  }

  // Drag myší
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    lastPos.current = { x: e.clientX, y: e.clientY }
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y
    lastPos.current = { x: e.clientX, y: e.clientY }
    setPos(p => ({ x: p.x + dx, y: p.y + dy }))
  }
  const onMouseUp = () => { dragging.current = false }

  // Touch pinch + pan
  const lastTouch = useRef<{ x: number; y: number; dist: number } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, dist: 0 }
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastTouch.current = { x: 0, y: 0, dist: Math.hypot(dx, dy) }
    }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (!lastTouch.current) return
    if (e.touches.length === 1) {
      const dx = e.touches[0].clientX - lastTouch.current.x
      const dy = e.touches[0].clientY - lastTouch.current.y
      lastTouch.current = { ...lastTouch.current, x: e.touches[0].clientX, y: e.touches[0].clientY }
      setPos(p => ({ x: p.x + dx, y: p.y + dy }))
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const delta = dist - lastTouch.current.dist
      lastTouch.current = { ...lastTouch.current, dist }
      setScale(s => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta * 0.005)))
    }
  }

  return (
    <div className="mt-5">
      {/* Přepínač + zoom controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-2">
          {(['hokej', 'fotbal'] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
              style={{
                background: mode === m ? '#6366F1' : 'rgba(99,102,241,0.08)',
                color: mode === m ? '#fff' : '#6366F1',
                border: `1px solid ${mode === m ? '#6366F1' : 'rgba(99,102,241,0.3)'}`,
              }}
            >
              {m === 'hokej' ? '🏒 Hokej' : '⚽ Fotbal'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(s => Math.min(MAX_SCALE, s + 0.3))}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-all"
            style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1', border: '1px solid rgba(99,102,241,0.3)' }}
          >+</button>
          <span className="text-xs text-[#3A3342]/50 w-10 text-center">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale(s => Math.max(MIN_SCALE, s - 0.3))}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-all"
            style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1', border: '1px solid rgba(99,102,241,0.3)' }}
          >−</button>
          <button
            onClick={() => { setScale(1); setPos({ x: 0, y: 0 }) }}
            className="px-3 h-8 rounded-full text-xs font-semibold cursor-pointer transition-all"
            style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1', border: '1px solid rgba(99,102,241,0.3)' }}
          >Reset</button>
        </div>
      </div>

      {/* Kontejner s overflow hidden */}
      <div
        ref={containerRef}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => { lastTouch.current = null }}
        className="rounded-xl overflow-hidden relative select-none"
        style={{
          background: '#f8f9ff',
          border: '1px solid rgba(99,102,241,0.15)',
          height: 480,
          cursor: scale > 1 ? 'grab' : 'default',
        }}
      >
        {/* Hint */}
        {scale === 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="text-[10px] text-[#3A3342]/40 bg-white/80 px-3 py-1 rounded-full">
              🖱 Kolečko myši nebo tlačítka pro zoom · Táhni pro posun
            </span>
          </div>
        )}
        {/* SVG obrázek */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/features/arena-${mode}.svg`}
          alt={`Plánek arény – ${mode}`}
          draggable={false}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${scale})`,
            transformOrigin: 'center center',
            transition: dragging.current ? 'none' : 'transform 0.1s ease',
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain',
            userSelect: 'none',
          }}
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
const CLUBS = [
  { name: 'SK Slavia Praha',         logo: '/clubs/logo_slavia.png',    competition: 'Chance Liga' },
  { name: 'HC Sparta Praha',         logo: '/clubs/logo_sparta.png',    competition: 'Tipsport Extraliga' },
  { name: 'HC Bílí Tygři Liberec',   logo: '/clubs/logo_liberec.png',   competition: 'Tipsport Extraliga' },
  { name: 'HC Energie Karlovy Vary', logo: '/clubs/logo_kv.png',        competition: 'Tipsport Extraliga' },
  { name: 'HC Vítkovice Ridera',     logo: '/clubs/logo_vitkovice.png', competition: 'Tipsport Extraliga' },
  { name: 'Bohemians Praha',         logo: '/clubs/logo_bohemians.png', competition: 'Chance Liga' },
  { name: 'ŠK Slovan Bratislava',    logo: '/clubs/logo_slovan_ba.png', competition: 'Niké Liga' },
  { name: 'HC Slovan Bratislava',    logo: '/clubs/logo_slovan_hc.png', competition: 'Tipos Liga' },
  { name: 'HC VERVA Litvínov',       logo: '/clubs/logo_verva.png',    competition: 'Tipsport Extraliga' },
  { name: '1.FC Slovácko',           logo: '/clubs/logo_slovacko.png', competition: 'Chance Liga' },
  { name: 'MFK Karviná',             logo: '/clubs/logo_karvina.png',  competition: 'Chance Liga' },
  { name: 'MotoGP Brno 2026',        logo: '/clubs/logo_motogp.png',      competition: 'MotoGP' },
  { name: 'Český volejbalový svaz',  logo: '/clubs/logo_cvs.png',         competition: 'Volejbal' },
  { name: 'CZ Basketball',           logo: '/clubs/logo_basketball.png',  competition: 'Basketball' },
]

const PILLARS = [
  { title: 'B2C tržiště', desc: 'Oslovte fanoušky tam, kde nakupují. Pomáháme jim objevovat akce, nakupovat vstupenky a spravovat zážitky napříč žánry.' },
  { title: 'Nástroje pro organizátory (ADMIN)', desc: 'Kompletní kontrola nad vašimi akcemi – od jejich vytvoření přes cenotvorbu až po reporting a správu publika.' },
  { title: 'Interní nástroje a operace', desc: 'Efektivní řízení partnerů, zákaznické podpory i provozu platformy díky robustním interním nástrojům.' },
  { title: 'Zážitek přímo na místě', desc: 'Plynulý vstup do areálu, kontrola vstupenek a bezhotovostní platby – vše propojené pro maximální komfort fanoušků.' },
]

type Feature = {
  icon: string
  title: string
  desc: string
  images?: { src: string; alt: string }[]
  span?: 'wide' | 'full'
  arenaMap?: boolean
  imageStack?: boolean
  paymentLogos?: boolean
}

const FEATURES: Feature[] = [
  {
    icon: '🎟',
    title: 'Přeprodej vstupenek',
    desc: 'Umožněte svým návštěvníkům bezpečně přeprodávat vstupenky za vašich podmínek a pod vaší kontrolou. Žádný černý trh, plná kontrola.',
  },
  {
    icon: '📈',
    title: 'Dynamické ceny',
    desc: 'Nastavte ceny, které v průběhu času odrážejí rychlost prodeje a další kritéria, a maximalizujte příjmy z každé akce.',
  },
  {
    icon: '✅',
    title: 'Akreditační systém',
    desc: 'Potřebujete vlastní akreditační systém? Není problém! Náš akreditační systém poskytuje kompletní řešení od nastavení vizuálů akreditací přes nastavení příslušných zón až po samotnou autorizaci na místě.',
  },
  {
    icon: '📊',
    title: 'Detailní data',
    desc: 'Vaše akce, vaše data. Využijte poznatky o publiku pro cílené marketingové kampaně a komunikaci před akcí.',
  },
  {
    icon: '🔗',
    title: 'Integrace s ekosystémem',
    desc: 'Ticketing je úzce propojen s každým dalším řešením v ekosystému PLG: jedna platforma, žádné izolované systémy.',
  },
  {
    icon: '🛒',
    title: 'Prodejní scénáře',
    desc: 'Prodávejte ve vlnách, umožněte prioritní nákup pro vybrané skupiny, předprodejní okna a mnohem více.',
  },
  {
    icon: '💳',
    title: 'Platební metody',
    desc: 'Nabízíme širokou škálu platebních metod – nejen standardní způsoby jako platba převodem, faktura, Apple Pay či Google Pay, ale i benefitní způsoby platby jako Edenred, Pluxee, Up, Twisto a další.',
    paymentLogos: true,
  },
  {
    icon: '🌐',
    title: 'Subdoména',
    desc: 'Vlastní subdoména vytvořená na míru pro nákup vstupenek – v barvách, designu a dle specifikace klienta. Zákazník zůstává v prostředí klubového webu.',
    images: [
      { src: '/features/subdomain-motogp.png', alt: 'MotoGP subdoména' },
      { src: '/features/subdomain-slavia.png', alt: 'Slavia subdoména' },
    ],
    imageStack: true,
    span: 'wide',
  },
  {
    icon: '🎫',
    title: 'Typy vstupenek',
    desc: 'Využíváme nejmodernější elektronické nosiče vstupenek – E-ticket, Mobilní vstupenka, Vstupenka v aplikaci s možností Late Delivery QR kódu.',
    images: [
      { src: '/media/vstupenka_IIHF.png',   alt: 'IIHF vstupenka' },
      { src: '/media/vstupenka_Slavia.png',  alt: 'Slavia vstupenka' },
      { src: '/media/vstupenka_MotoGP.png',  alt: 'MotoGP vstupenka' },
    ],
    span: 'full',
  },
  {
    icon: '⭐',
    title: 'Permanentní vstupenky & výhodné balíčky',
    desc: 'Pokročilé ticketingové řešení podporující stabilní a předvídatelné příjmy i dlouhodobé vztahy se zákazníky. Samozřejmostí je možnost darovat nebo uvolňovat místo z permanentky, případně celé permanentky převádět mezi zákaznickými účty.',
  },
  {
    icon: '🛡️',
    title: 'Robustní a bezpečný systém',
    desc: 'Využíváme pokročilou technologii ochrany proti DDoS útokům a super rychlou SGL databázi. Díky tomu jsme schopni ustát i největší nápor při prodeji těch nejatraktivnějších utkání.',
  },
  {
    icon: '🎧',
    title: 'Zákaznická & technická podpora',
    desc: 'Od školení personálu a dedikovaného account manažera až po technickou hotline dostupnou o víkendech a svátcích – jsme tu pro vás na každém kroku. V den akce zajišťujeme supervizi, reklamační pokladnu i prodej vstupenek na místě. Zákaznický chatbot s telefonním kontaktem je k dispozici 24/7.',
  },
  {
    icon: '🏟',
    title: 'Interaktivní SVG hlediště',
    desc: 'Moderní zobrazení hlediště ve formátu SVG umožňuje plynulé zoomování celého prostoru a výrazně zvyšuje komfort při výběru míst. Zákazníci si mohou detailně prohlédnout jednotlivé sektory i konkrétní sedadla a snadno si vybrat to nejvhodnější.',
    span: 'full',
    arenaMap: true,
  },
]

// ─────────────────────────────────────────────────────────
export default function SlovanTicketingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>

      {/* Breadcrumb back to /slovan */}
      <motion.nav
        data-product-nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 px-6 py-3"
        style={{ background: 'rgba(17,0,43,0.9)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => router.push('/slovan')}
          className="shrink-0 hover:opacity-70 transition-opacity cursor-pointer text-white/50 text-sm font-semibold flex items-center gap-2"
        >
          ← Digitální ekosystém
        </button>
        <span className="text-white/20 font-light shrink-0">/</span>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${ACCENT}20`, color: ACCENT }}>
          Ticketing
        </span>
      </motion.nav>

      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #1c1200 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 100%, black 0%, transparent 80%)',
        }} />
        <div className="absolute" style={{ right: '10%', bottom: '5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}20 0%, transparent 70%)`, filter: 'blur(40px)' }} />
        <div className="absolute" style={{ left: '-5%', top: '10%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0" style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="flex-1 md:pr-12">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>
              Produkt 01
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white"
              style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Ticketing
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/55 max-w-md leading-relaxed">
              Propojujeme pořadatele s fanoušky napříč Evropou.{' '}
              <span className="text-white/85 font-medium">7 trhů, 9 silných značek a jedna platforma, která zajišťuje maximální dosah i výkon.</span>
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center justify-center">
            <TicketingVisual />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="py-10 md:pr-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-6xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}><CountUp to={9} /></div>
                <p className="text-sm font-semibold text-white/50 mt-3">Značky</p>
                <p className="text-xs text-white/25 mt-1">Silné lokální ticketingové značky</p>
              </div>
              <div className="py-10 md:px-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-6xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}><CountUp to={7} /></div>
                <p className="text-sm font-semibold text-white/50 mt-3">Trhy</p>
                <p className="text-xs text-white/25 mt-1">Napříč střední a východní Evropou</p>
              </div>
              <div className="py-10 md:pl-10">
                <div className="text-5xl md:text-6xl font-black leading-none" style={{ fontFamily: "'Panel Sans', sans-serif", color: ACCENT }}>B2B + B2C</div>
                <p className="text-sm font-semibold text-white/50 mt-3">Dvoustranná platforma</p>
                <p className="text-xs text-white/25 mt-1">Organizátoři i kupující na jednom místě</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-8 pb-24">

        <motion.section id="markets" {...fade(0.3)} className="mb-16 pt-16">
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">Sportovní PLG rodina</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CLUBS.map((c) => (
              <div key={c.name} className="flex items-center gap-4 p-5 rounded-2xl border border-[#11002B]/8 hover:border-[#E8A838]/40 transition-colors">
                <div style={{
                  width: 56, height: 56, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.logo} alt={c.name} style={{ width: 44, height: 44, objectFit: 'contain' }} />
                </div>
                <div>
                  <div className="font-semibold text-[#11002B]">{c.name}</div>
                  <div className="mt-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: `${ACCENT}18`, color: ACCENT }}>
                      {c.competition}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="offer" {...fade(0.4)} className="mb-20">
          <h2 className="text-2xl font-bold text-[#11002B] mb-6">Co nabízíme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="p-6 rounded-2xl bg-[#F8F6FC]">
                <div className="w-8 h-1 rounded-full mb-4" style={{ background: ACCENT }} />
                <h3 className="font-bold text-[#11002B] mb-2">{p.title}</h3>
                <p className="text-sm text-[#3A3342]/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="platform"
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #07000f 0%, #1c1200 100%)', padding: '56px 48px' }}
        >
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Platforma</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-5 leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
            Ticketing<br />nové generace
          </h2>
          <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
            Ticketportal staví na <span className="text-white/80 font-medium">20+ letech zkušeností na trhu</span>. Ať už potřebujete ticketing pro koncert, divadlo, show, festival nebo sport, poskytujeme kompletní řešení od nastavení strategie až po akreditaci na místě, včetně hardware i software.{' '}
            Staňte se součástí rodiny Ticketportal a získejte silného partnera pro vaši akci nebo klub.
          </p>
        </motion.section>

        <motion.section
          id="features"
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className={[
                  'p-6 rounded-2xl border border-[#11002B]/8 hover:border-[#F59E0B]/30 transition-colors',
                  f.span === 'full' ? 'md:col-span-2 lg:col-span-3' : f.span === 'wide' ? 'md:col-span-2' : '',
                ].join(' ')}
                style={{ background: '#faf8ff' }}
              >
                <span className="text-2xl mb-4 block">{f.icon}</span>
                <h3 className="font-bold text-[#11002B] mb-2 text-base">{f.title}</h3>
                <p className="text-sm text-[#3A3342]/60 leading-relaxed">{f.desc}</p>
                {f.paymentLogos && <PaymentLogos />}
                {f.arenaMap && (
                  <ArenaToggle />
                )}
                {f.images && f.imageStack && (
                  <ImageStack images={f.images} />
                )}
                {f.images && !f.imageStack && (
                  <div className={`mt-4 ${f.images.length > 1 ? 'flex gap-2 items-end' : ''}`}>
                    {f.images.map((img) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={img.src}
                        src={img.src}
                        alt={img.alt}
                        style={{
                          flex: f.images!.length > 1 ? '1 1 0%' : undefined,
                          width: f.images!.length === 1 ? '100%' : undefined,
                          minWidth: 0,
                          height: 340,
                          objectFit: 'contain',
                          objectPosition: 'bottom',
                          display: 'block',
                          borderRadius: 12,
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',     label: 'Úvod' },
          { id: 'markets',  label: 'PLG rodina' },
          { id: 'offer',    label: 'Co nabízíme' },
          { id: 'platform', label: 'Platforma' },
          { id: 'features', label: 'Funkce' },
        ]}
      />
    </div>
  )
}
