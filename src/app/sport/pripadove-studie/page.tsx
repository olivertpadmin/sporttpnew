'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

interface Result {
  n: string
  l: string
}

interface CaseStudy {
  club: string
  color: string
  title: string
  challenge: string
  solution: string
  results: Result[]
  tag?: string
}

const CASES: CaseStudy[] = [
  {
    club: 'SK Slavia Praha',
    color: '#C8102E',
    title: 'Permanentky, docházka a příjmy',
    challenge: 'Fanoušci potřebovali kontrolu nad svým místem, aby se zvýšila návštěvnost a klub mohl zpět získat příjmy z prázdných sedadel.',
    solution: 'Digitální permanentka v aplikaci se sledováním docházky, uvolňováním míst zpět do prodeje a jedním kliknutím darování vstupenky.',
    results: [
      { n: '12 000', l: 'držitelů permanentek' },
      { n: '900',    l: 'darovaných míst průměrně / zápas' },
      { n: '1 200',  l: 'míst uvolněno zpět do prodeje' },
      { n: '+120 %', l: 'příjmy z uvolněných míst' },
    ],
  },
  {
    club: 'HC Slovan Bratislava',
    color: '#003087',
    title: 'Věrnostní program: Slovanista',
    challenge: 'Potřeba prohloubení fanouškovského engagementu nad rámec zápasového dne a vybudování přímého vztahu s fanoušky.',
    solution: 'In-app věrnostní program se 6 úrovněmi (Belasý → Hrdý → Verný → Zlatý → Elitný → Legenda klubu), body za nákupy a návštěvnost, odměny dle úrovně a partnerské benefity.',
    results: [
      { n: 'Tisíce',    l: 'fanoušků se zapojilo do programu' },
      { n: '6 úrovní', l: 'Belasý → Hrdý → Verný → Zlatý → Elitný → Legenda' },
      { n: 'Týdně',    l: 'aktivní fanoušci se vracejí vícekrát' },
      { n: '100 %',    l: 'fanouškovská data o engagementu' },
    ],
  },
  {
    club: 'HC Sparta Praha',
    color: '#E87722',
    title: 'Chytré cílení: vyprodaný spodní kotel',
    challenge: 'Naplnit spodní kotel O2 Areny (6 000 míst) domácími fanoušky na prestižní zápasy (Kometa, Pardubice, Třinec).',
    solution: 'Exkluzivní přístup v aplikaci, odemčený pouze pro ověřené fanoušky, kteří si v předchozí sezóně koupili 3+ vstupenek Sparty. Bez manuálních kódů, bez zákaznické podpory.',
    results: [
      { n: 'Vyprodáno', l: 'v minutách pro každý prioritní zápas' },
      { n: '6 000',     l: 'míst zaplněno ověřenými domácími fanoušky' },
      { n: '0',         l: 'bez manuální práce, plně automatizováno' },
      { n: '100 %',     l: 'pouze ověření fanoušci, žádní náhodní kupující' },
    ],
  },
  {
    club: 'PSG Berani Zlín',
    color: '#F5C400',
    tag: 'Věrnostní program',
    title: 'Věrnostní program: Berani Zlín',
    challenge: 'Klub hledal způsob jak prohloubit vztah s fanoušky mimo zápasový den, motivovat je k opakované návštěvnosti a získat přímá data o jejich chování a engagementu.',
    solution: 'In-app věrnostní program s 5 úrovněmi (Fanoušek → Žlutomodrý Beran → Bronzový Beran → Stříbrný Beran → Zlatý Beran), sbírání bodů za nákup vstupenek i návštěvnost, odměny a partnerské benefity dle dosažené úrovně.',
    results: [
      { n: '1 147',    l: 'fanoušků zapojených do programu' },
      { n: '1 137',    l: 'aktivních účastníků' },
      { n: '633 510',  l: 'celkový počet nasbíraných bodů' },
      { n: '5 úrovní', l: 'Fanoušek → Žlutomodrý → Bronzový → Stříbrný → Zlatý Beran' },
    ],
  },
  {
    club: 'SK Slavia Praha',
    color: '#C8102E',
    tag: 'Liga Mistrů',
    title: 'Late delivery QR kódů – Liga Mistrů',
    challenge: 'Omezit černý trh a kšeftování se vstupenkami na atraktivní utkání Ligy Mistrů.',
    solution: 'Zaslání platných vstupenek a zobrazení QR kódů v aplikaci až 24 hodin před začátkem utkání – tím bylo výrazně omezeno časové okno pro případné přeprodávání vstupenek.',
    results: [
      { n: '4',        l: 'utkání Ligy Mistrů' },
      { n: '70 000+',  l: 'odeslaných vstupenek celkem' },
      { n: '–80 %',    l: 'falšovaných vstupenek' },
      { n: '3 hodiny', l: 'kompletní rozeslání vstupenek na 1 utkání' },
    ],
  },
]

export default function SportPripadoveStudiePage() {
  const router = useRouter()

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(150deg, #0a0018 0%, #1a0840 45%, #0f0530 100%)' }}
    >
      {/* Dot grid texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Topbar */}
      <motion.nav
        className="sticky top-0 w-full z-50 flex items-center gap-3 px-6 py-3"
        style={{
          background: 'rgba(10,0,28,0.92)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => router.push('/sport')}
          className="shrink-0 hover:opacity-70 transition-opacity cursor-pointer text-white/50 text-sm font-semibold flex items-center gap-2"
        >
          ← Digitální ekosystém
        </button>
        <span className="text-white/20 font-light shrink-0">/</span>
        <span className="text-sm font-semibold" style={{ color: '#9333EA' }}>Případové studie</span>
      </motion.nav>

      {/* Page header */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ color: '#9333EA' }}
          >
            Případové studie
          </span>
          <h1
            className="text-5xl md:text-7xl mt-4 mb-4 leading-none text-white"
            style={{ fontFamily: "'Panel Sans', sans-serif" }}
          >
            Skutečné výsledky<br />skutečných klubů
          </h1>
          <p className="text-lg text-white/40 max-w-xl leading-relaxed">
            Kluby, které aplikaci využily k řešení konkrétní výzvy s měřitelnými výsledky.
          </p>
        </motion.div>
      </div>

      {/* Case studies */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 pb-24 flex flex-col gap-6">
        {CASES.map((c, i) => (
          <motion.div
            key={`${c.club}-${i}`}
            {...iv(0.05 * i)}
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: `0 0 80px ${c.color}12`,
            }}
          >
            {/* Club colour top bar */}
            <div style={{ height: 4, background: `linear-gradient(90deg, ${c.color} 0%, ${c.color}50 60%, transparent 100%)` }} />

            <div className="p-8 md:p-10">
              {/* Club name + optional tag */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {c.club}
                </span>
                {c.tag && (
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${c.color}20`,
                      color: c.color,
                      border: `1px solid ${c.color}40`,
                    }}
                  >
                    {c.tag}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-8 leading-tight"
                style={{ fontFamily: "'Panel Sans', sans-serif" }}
              >
                {c.title}
              </h2>

              {/* Challenge / Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    Výzva
                  </p>
                  <p className="text-sm text-white/55 leading-relaxed">{c.challenge}</p>
                </div>
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: `${c.color}08`,
                    border: `1px solid ${c.color}20`,
                  }}
                >
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3"
                    style={{ color: `${c.color}90` }}
                  >
                    Řešení
                  </p>
                  <p className="text-sm text-white/55 leading-relaxed">{c.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {c.results.map((r) => (
                  <div
                    key={r.l}
                    className="rounded-2xl p-5"
                    style={{
                      background: `${c.color}10`,
                      border: `1px solid ${c.color}25`,
                    }}
                  >
                    <div
                      className="font-black leading-none mb-2"
                      style={{
                        fontFamily: "'Panel Sans', sans-serif",
                        color: c.color,
                        fontSize: r.n.length > 8 ? '1rem' : r.n.length > 5 ? '1.2rem' : '1.5rem',
                      }}
                    >
                      {r.n}
                    </div>
                    <div className="text-[11px] text-white/40 leading-snug">{r.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
