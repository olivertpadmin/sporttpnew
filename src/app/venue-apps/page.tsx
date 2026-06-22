'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, animate, useInView } from 'framer-motion'
import ProductBreadcrumb from '@/components/ProductBreadcrumb'
import SectionNav from '@/components/SectionNav'

const ACCENT = '#7C3AED'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

// SectionNav anchor ids - order matches SECTIONS groups
const VENUE_APPS_NAV_GROUP_IDS = [
  'onboarding',
  'tickets-attendance',
  'content',
  'live-stats',
  'marketing',
] as const

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

// ─────────────────────────────────────────────────────────
// Animated number counter (matches cashless page)
// ─────────────────────────────────────────────────────────
function CountUp({ to, prefix = '', suffix = '', duration = 2.4 }: {
  to: number; prefix?: string; suffix?: string; duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const mv = useMotionValue(0)

  useEffect(() => {
    const unsub = mv.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`
    })
    return unsub
  }, [mv, prefix, suffix])

  useEffect(() => {
    if (!isInView) return
    const ctrl = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => ctrl.stop()
  }, [isInView, mv, to, duration])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

// ─────────────────────────────────────────────────────────
// Hero visual (score flip animation - keep)
// ─────────────────────────────────────────────────────────
const HERO_BARS = [
  { label: 'Possession', home: 58, away: 42 },
  { label: 'Shots',      home: 7,  away: 4  },
  { label: 'Corners',    home: 5,  away: 3  },
]
function VenueVisual() {
  return (
    <div className="relative select-none" style={{ width: 300, height: 260 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'absolute', left: 75, top: 10, width: 150, height: 240,
          borderRadius: 28,
          background: 'linear-gradient(160deg, #0f0820 0%, #07041a 100%)',
          border: '1.5px solid rgba(255,255,255,0.12)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 48, height: 10, background: '#07041a', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, zIndex: 10 }} />
        <div style={{ padding: '18px 12px 12px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 6 }}>LIVE · 67&apos;</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)', fontWeight: 700, flex: 1, textAlign: 'right' }}>Sparta</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden', fontSize: 16, fontWeight: 900, color: 'white', fontFamily: "'Panel Sans', sans-serif" }}>
                  <motion.span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -10 }} transition={{ delay: 1.5, duration: 0.25 }}>0</motion.span>
                  <motion.span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.25 }}>1</motion.span>
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>:</span>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: 'white' }}>0</div>
              </div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)', fontWeight: 700, flex: 1 }}>Slavia</div>
            </div>
            <motion.div initial={{ opacity: 0, y: 5, scale: 0.9 }} animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, -5], scale: [0.9, 1, 1, 0.95] }} transition={{ delay: 1.8, duration: 2, times: [0, 0.1, 0.8, 1] }} style={{ marginTop: 5, background: `${ACCENT}30`, border: `1px solid ${ACCENT}60`, borderRadius: 6, padding: '3px 8px', display: 'inline-block' }}>
              <span style={{ fontSize: 6.5, color: ACCENT, fontWeight: 700 }}>⚽ GOAL! Sparta Praha</span>
            </motion.div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {HERO_BARS.map((s, i) => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{s.home}%</span>
                  <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.3)' }}>{s.label}</span>
                  <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{s.away}%</span>
                </div>
                <div style={{ display: 'flex', height: 4, borderRadius: 2, overflow: 'hidden', gap: 1 }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.home}%` }} transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }} style={{ background: ACCENT, borderRadius: '2px 0 0 2px' }} />
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.away}%` }} transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '0 2px 2px 0' }} />
                </div>
              </div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} style={{ marginTop: 10 }}>
            <motion.div
              animate={{ boxShadow: [`0 0 0 0 ${ACCENT}70`, `0 0 0 8px ${ACCENT}00`] }}
              transition={{ duration: 1.6, delay: 2.5, repeat: Infinity }}
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #9333ea 100%)`,
                borderRadius: 12,
                padding: '8px 10px',
                textAlign: 'center',
                border: `1px solid rgba(255,255,255,0.15)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}>
              <span style={{ fontSize: 8, fontWeight: 800, color: 'white', letterSpacing: '0.01em' }}>Buy Next Match Ticket</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)' }}>→</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Section data
// ─────────────────────────────────────────────────────────
interface SubSection {
  title: string
  desc: string
  bullets: string[]
  image: string
  images?: string[]   // optional multi-phone layout
  wide?: boolean      // wider image container (e.g. composed 3-phone images)
  small?: boolean     // 20% smaller image
  large?: boolean     // 30% larger image
}

const SECTIONS: { label: string; heading: string; subs: SubSection[] }[] = [
  {
    label: 'Onboarding',
    heading: 'You only make a first impression once',
    subs: [
      {
        title: 'You\'re in control of the onboarding',
        desc: 'The onboarding flow is fully configurable: introductory animation, app tour, notification permission, location services, and a call to log in or register. Each screen can be customised to match your club brand.',
        bullets: [
          'Introductory animation or video: set the mood from the first second',
          'Show fans what they\'ll find in the app',
          'Enabling notifications: the key moment that drives engagement later',
          'Call for login: connect or create a fan profile immediately',
        ],
        image: '/venue-apps/Images.png',
        images: [
          '/venue-apps/onboarding-1.png',
          '/venue-apps/onboarding-2.png',
          '/venue-apps/onboarding-3.png',
        ],
      },
    ],
  },
  {
    label: 'Tickets & Attendance',
    heading: 'The complete ticketing experience, native in your app',
    subs: [
      {
        title: 'Native ticketing directly in the app',
        desc: 'The best ticketing on the market, fully native in your app. The entire purchase process takes place directly in the app, including a native seat map customised for phone shopping. Fans receive a digital ticket in the app and a copy by email.',
        bullets: [
          'Entire purchase process takes place directly in the app',
          'Native seat map customised for phone shopping',
          'Digital version in the app and a copy by email',
        ],
        image: '/venue-apps/tickets-qr.png',
      },
      {
        title: 'All the sales scenarios you\'re used to',
        desc: 'Support every sales phase your club needs, from partner reservations to standard public sale. Each phase has its own timing, pricing and access rules.',
        bullets: [
          'Reservations for partners',
          'Priority purchase for selected group',
          'Presale for the selected group',
          'Standard public sale',
        ],
        image: '/venue-apps/tickets-presale.png',
      },
      {
        title: 'Useful features that boost sales',
        desc: 'Features designed to increase ticket revenue and make fans happier.',
        bullets: [
          'Exclusive in-app sales: sell selected matches exclusively on the app to drive usage',
          'Sale of packages: combine matches into one package, limit quantity to fight the black market',
          'Different prices for each sales phase: reward early buyers',
          'Additional services: add refreshments or parking directly to the ticket',
        ],
        image: '/venue-apps/tickets-cart.png',
      },
      {
        title: 'Donate and transfer tickets through the app',
        desc: 'A real game changer in the fight against dealers. Each ticket can be donated to someone else with a few clicks. The donated ticket changes the QR code during transfer, keeping everything secure.',
        bullets: [
          'QR code changes on transfer for full security and traceability',
          'Case 1 (Open): PDF ticket + app ticket generated simultaneously',
          'Case 2 (Closed): ticket generated only for the app, donations only to active accounts',
          'Late delivery QR: fan buys the ticket, QR displayed before the event',
        ],
        image: '/venue-apps/tickets-donate.png',
      },
      {
        title: 'Digital season ticket with complete attendance',
        desc: 'A full-featured digital season ticket with smart features that increase attendance and generate extra revenue. Income from released tickets increased by 120+ %.',
        bullets: [
          'Release seats back for sale: you set the deadline (e.g. 24 hours before the event)',
          'Donate a seat to another fan: you control the latest donation time',
          'Complete attendance tracking in a few clicks to penalise or reward fans',
          'Season ticket transfer, custom look, waiting list, and more',
        ],
        image: '/venue-apps/tickets-season.png',
      },
    ],
  },
  {
    label: 'Content',
    heading: 'Everything fans want to know, right in the app',
    subs: [
      {
        title: 'Matches with tables',
        desc: 'A complete overview of your matches including the current league table. API connection to the web, ready for all websites from eSports s.r.o. Custom websites connect easily with standardised API at minimal cost.',
        bullets: [
          'Calendar of scheduled matches',
          'List of results of played matches',
          'League tables',
        ],
        image: '/venue-apps/content-matches.png',
        large: true,
      },
      {
        title: 'We all have our favourite',
        desc: 'Current rosters of all important members for each team. The story of the player, basic data, current season stats: fans can find all this in a few clicks.',
        bullets: [
          'Listing of club and executive teams: you choose which teams to show',
          'Detail of each player including stats',
          'Player comparison, side by side, including radar chart',
        ],
        image: '/venue-apps/content-player.png',
        large: true,
      },
    ],
  },
  {
    label: 'Live Statistics',
    heading: 'Own live match centre directly in the app',
    subs: [
      {
        title: 'Live match centre',
        desc: 'Online match reports with real-time data, all directly in the app. API connection with an external partner ensures accurate, live stats.',
        bullets: [
          'Online match reports',
          'Summary of important events',
          'Statistics: possession, shots, expected goals',
          'Line-ups home vs away',
          'Photo gallery from the match',
          'Related articles',
        ],
        image: '/venue-apps/live-match.png',
        wide: true,
      },
      {
        title: 'Sports betting directly in the match centre',
        desc: 'Connect your affiliate betting site directly into the match centre. A possible funding model through a commission from your fans\' bets.',
        bullets: [
          'Connection to your affiliate betting site with online odds',
          'Possible funding model through commission',
          'Account linking so fans don\'t re-register with the bookmaker',
        ],
        image: '/venue-apps/live-betting.png',
        wide: true,
      },
      {
        title: 'Maximum fan engagement',
        desc: 'Polls to engage fans before and during the game. Voting for the player of the match, predicting results or scorers.',
        bullets: [
          'Polls to engage fans before and during the game',
          'Voting for the player of the match, predicting the result or specific scorers',
          'Each engagement element can be attached to your partner for extra promotional value',
        ],
        image: '/venue-apps/live-vote.png',
        wide: true,
      },
    ],
  },
  {
    label: 'Marketing Functions',
    heading: 'Reach your fans where they actually are',
    subs: [
      {
        title: 'In-app advertising space',
        desc: 'Use banner areas in visible locations across the app to increase your return on investment. If no banner is needed, the space auto-fills with your content.',
        bullets: [
          'Banner areas in visible locations across the app',
          'Comfortably set the conditions for displaying surfaces',
          'Auto-fill with content when no banner is active',
        ],
        image: '/venue-apps/marketing-2.png',
        small: true,
      },
      {
        title: 'Personalised offers for fans',
        desc: 'Discounts, benefits, advantages. Reach your fans with targeted offers from you or your partners.',
        bullets: [
          'Offers targeted to all fans, a specific segment, or specific users',
          'Format: standard discount code, QR code, or barcode',
          'Partner info and redemption instructions for each offer',
        ],
        image: '/venue-apps/marketing-3.png',
        small: true,
      },
      {
        title: 'Honest feedback from fans',
        desc: 'Ask the fans anything. We attach all relevant information about the fan to each question, so you can make the feedback even easier to work with.',
        bullets: [
          'Ask fans anything: open-ended or categorised',
          'Categories: App, Refreshments, Stadium, Tickets, Other',
          'Relevant fan info automatically attached to each response',
        ],
        image: '/venue-apps/marketing-1.png',
        small: true,
      },
      {
        title: 'Targeted push notifications',
        desc: 'News that fans actually read. Send push notifications with deliverability up to 70 %. Take your fans to the right place, whether inside or outside the app.',
        bullets: [
          'Manual and automated notifications',
          'Target notifications to specific fan segments',
          'Schedule delivery for the right time',
          'Test sending before going live',
          'Deep-link to any location: sale, article, match detail, fan shop',
        ],
        image: '/venue-apps/marketing-4.png',
        small: true,
      },
    ],
  },
]

const CASES = [
  {
    club: 'SK Slavia Praha', color: '#C8102E',
    title: 'Season ticket, attendance & revenue',
    challenge: 'Needed fans to control their seat to increase attendance and recover revenue from no-shows.',
    solution: 'Digital season ticket in-app with attendance tracking, seat release back to sale, and one-click gifting.',
    results: [
      { n: '12 000', l: 'season ticket holders' },
      { n: '900',    l: 'gifted seats avg / match' },
      { n: '1 200',  l: 'seats released back to sale' },
      { n: '+120 %', l: 'revenue from released seats' },
    ],
  },
  {
    club: 'HC Slovan Bratislava', color: '#003087',
    title: 'Loyalty program: Slovanista',
    challenge: 'Needed to deepen fan engagement beyond matchday and build a direct relationship with supporters.',
    solution: 'In-app loyalty program with 6 tiers (Belasý → Hrdý → Verný → Zlatý → Elitný → Legenda klubu), points for purchases and attendance, tier-specific rewards and partner benefits.',
    results: [
      { n: 'Thousands', l: 'of fans joined the program' },
      { n: '6 tiers',   l: 'Belasý → Hrdý → Verný → Zlatý → Elitný → Legenda' },
      { n: 'Weekly',    l: 'active fans return multiple times' },
      { n: '100 %',     l: 'fan engagement data per user' },
    ],
  },
  {
    club: 'HC Sparta Praha', color: '#E87722',
    title: 'Smart targeting: lower bowl sold out',
    challenge: 'Fill the lower bowl of O2 Arena (6 000 seats) with home fans for marquee games (Kometa, Pardubice, Třinec).',
    solution: 'App-exclusive early access offer, unlocked only for verified fans who bought 3+ Sparta tickets last season. No manual codes, no customer support needed.',
    results: [
      { n: 'Sold out', l: 'in minutes for every priority game' },
      { n: '6 000',   l: 'seats filled with verified home fans' },
      { n: '0',       l: 'no manual effort, fully automated' },
      { n: '100 %',   l: 'verified fans only, no random buyers' },
    ],
  },
]

const TIERS = [
  {
    name: 'Premium', tag: 'Custom',
    desc: 'Fully tailored for clubs that want to own the fan experience end-to-end.',
    features: ['Custom branding: colors, logo, fonts per club', 'Complete feature set, no limitations', 'Customer-owned in-app store', 'CRM & loyalty program included', 'Deeper integrations & custom modules'],
  },
  {
    name: 'Standard', tag: 'SaaS',
    desc: 'Fast to launch, proven core product for clubs starting their mobile journey.',
    features: ['White-label with limited branding options', 'Core features: tickets, scores, news, push', 'PLG-operated stores', 'Shared infrastructure, lower cost', 'Upgrade path to Premium anytime'],
  },
]

const MUTATIONS = [
  { icon: '⚽', name: 'Sports',    desc: 'Clubs & leagues. Live match centre, fan profiles, season tickets, in-app ticketing.' },
  { icon: '🏟', name: 'Arenas',   desc: 'Multi-event venues. Program browsing, event discovery, cashless & seat management.' },
  { icon: '🎪', name: 'Festivals', desc: 'Time-limited events. Lineup, schedule, artist content, access control via QR.' },
  { icon: '🎤', name: 'Artists',   desc: 'Touring & fan community. Merchandise store, tour dates, exclusive content drops.' },
]

const COMING_SOON = [
  { icon: '🛍', title: 'Native Fanshop', desc: 'Fans buy merch or kit directly in the app. One payment, one account, one checkout, with no redirect to an external store.' },
  { icon: '🎮', title: 'Gamification & AI', desc: 'Badges, challenges, personalised recommendations and smart assistants. The app learns what each fan loves.' },
  { icon: '⭐', title: 'Premium Content', desc: 'Exclusive videos, articles, behind-the-scenes and backstage access for members, subscribers and VIPs only.' },
]

const CLUB_EXAMPLES = [
  {
    country: 'Czechia',
    clubs: [
      { name: 'SK Slavia Praha', color: '#C8102E' },
      { name: 'HC Sparta Praha', color: '#E87722' },
      { name: 'HC Liberec',      color: '#5BA3D9' },
      { name: 'HC Vítkovice',    color: '#004B9E' },
      { name: 'O2 Arena',        color: '#00A0DF' },
    ],
  },
  {
    country: 'Slovakia',
    clubs: [
      { name: 'ŠK Slovan Bratislava', color: '#0057A8' },
      { name: 'HC Slovan Bratislava', color: '#1A4B9D' },
      { name: 'HC Žilina',            color: '#C8102E' },
    ],
  },
]

// ─────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────
export default function VenueAppsPage() {
  return (
    <div className="min-h-screen bg-white" style={{ '--product-color': ACCENT } as React.CSSProperties}>
      <ProductBreadcrumb activeSlug="venue-apps" />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 45%, #0f071c 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 100%, black 0%, transparent 80%)',
        }} />
        <div className="absolute" style={{ right: '10%', bottom: '5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}18 0%, transparent 70%)`, filter: 'blur(40px)' }} />
        <div className="absolute" style={{ left: '-5%', top: '10%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0" style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="flex-1 md:pr-12">
            <motion.span {...fade(0.1)} className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Product 06</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl mt-5 mb-6 leading-none text-white" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
              Venue<br />Owner Apps
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/55 max-w-md leading-relaxed">
              Fan in your pocket.{' '}
              <span className="text-white/85 font-medium">One login, one profile, one ecosystem</span>
              {', '}with tickets, live scores, news and loyalty, all under your brand.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="flex-shrink-0">
            <VenueVisual />
          </motion.div>
        </div>

        {/* Stats strip - cashless-style CountUp */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              <div className="py-10 md:pr-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="whitespace-nowrap text-5xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <CountUp to={350} /><span className="text-3xl md:text-4xl" style={{ color: ACCENT }}>K</span>
                  <span className="text-xl md:text-2xl font-bold ml-1" style={{ color: ACCENT }}>+</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Tickets sold via apps</p>
              </div>
              <div className="py-10 md:px-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="whitespace-nowrap text-5xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <CountUp to={250} /><span className="text-3xl md:text-4xl ml-1" style={{ color: ACCENT }}>M</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">App revenue generated</p>
              </div>
              <div className="py-10 md:px-10" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-5xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <span style={{ color: ACCENT }}>+</span><CountUp to={40} />
                  <span className="text-3xl md:text-4xl font-bold" style={{ color: ACCENT }}>%</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Average attendance increase</p>
              </div>
              <div className="py-10 md:pl-10">
                <div className="text-5xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                  <CountUp to={90} />
                  <span className="text-3xl md:text-4xl font-bold" style={{ color: ACCENT }}>%</span>
                </div>
                <p className="text-sm font-semibold text-white/50 mt-3">Push notification visibility</p>
                <p className="text-xs text-white/25 mt-1">vs 15–25 % email open rate</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURE SECTIONS
      ══════════════════════════════════════════════════ */}
      {SECTIONS.map((group, gi) => {
        const groupBg = gi % 2 === 0 ? '#ffffff' : '#faf8ff'
        return (
          <div key={group.label} style={{ background: groupBg }}>
            {/* Group heading */}
            <section id={VENUE_APPS_NAV_GROUP_IDS[gi]} className="pt-20 pb-4">
              <div className="max-w-5xl mx-auto px-8">
                <motion.div {...iv(0.1)}>
                  <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{group.label}</span>
                  <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-0 leading-none"
                    style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                    {group.heading}
                  </h2>
                </motion.div>
              </div>
            </section>

            {/* Sub-sections */}
            {group.subs.map((sub, si) => {
              const reversed = si % 2 !== 0

              return (
                <section key={sub.title} className="py-16">
                  <div className="max-w-5xl mx-auto px-8">
                    <motion.div {...iv(0.1)}
                      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-16`}>
                      {/* Text side */}
                      <div className="flex-1 min-w-0">
                        <div style={{ width: 32, height: 3, background: ACCENT, borderRadius: 2, marginBottom: 18 }} />
                        <h3 className="text-2xl md:text-3xl font-bold text-[#11002B] mb-3 leading-tight"
                          style={{ fontFamily: "'Panel Sans', sans-serif" }}>
                          {sub.title}
                        </h3>
                        <p className="text-base text-[#3A3342]/55 mb-7 leading-relaxed max-w-lg">{sub.desc}</p>
                        <ul className="space-y-3">
                          {sub.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-3 text-sm text-[#3A3342]/75 leading-relaxed">
                              <span style={{ color: ACCENT, marginTop: 1, flexShrink: 0, fontWeight: 700 }}>✓</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Image side */}
                      <div className={`flex-shrink-0 flex justify-center ${sub.wide ? 'md:w-[60%]' : 'md:w-[45%]'}`}>
                        {sub.images && sub.images.length > 1 ? (
                          /* Multi-phone staggered fan */
                          <div className="relative flex items-end justify-center" style={{ height: 480, width: 340 }}>
                            {sub.images.map((src, pi) => {
                              const offsets = [
                                { x: -105, y: 24, rotate: -8, z: 0, scale: 0.88 },
                                { x: 0,    y: 0,  rotate:  0, z: 2, scale: 1    },
                                { x: 105,  y: 24, rotate:  8, z: 0, scale: 0.88 },
                              ]
                              const o = offsets[pi] ?? offsets[1]
                              return (
                                <motion.div
                                  key={src}
                                  {...iv(0.1 + pi * 0.1)}
                                  style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '50%',
                                    translateX: '-50%',
                                    x: o.x,
                                    y: o.y,
                                    rotate: o.rotate,
                                    scale: o.scale,
                                    zIndex: o.z,
                                    filter: pi !== 1 ? 'brightness(0.75)' : 'none',
                                  }}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={src}
                                    alt={`${sub.title} screen ${pi + 1}`}
                                    style={{ height: 420, width: 'auto', maxWidth: 195, mixBlendMode: 'multiply' }}
                                    loading="lazy"
                                  />
                                </motion.div>
                              )
                            })}
                          </div>
                        ) : (
                          /* Single phone */
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={sub.image}
                            alt={sub.title}
                            className="h-auto"
                            style={{ maxHeight: sub.wide ? 840 : sub.small ? 448 : sub.large ? 728 : 560, maxWidth: sub.wide ? 560 : sub.small ? 240 : sub.large ? 390 : 300, width: 'auto', mixBlendMode: 'multiply' }}
                            loading="lazy"
                          />
                        )}
                      </div>
                    </motion.div>
                  </div>
                </section>
              )
            })}
          </div>
        )
      })}

      {/* ══════════════════════════════════════════════════
          CASE STUDIES
      ══════════════════════════════════════════════════ */}
      <section
        id="case-studies"
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #07000f 0%, #130820 50%, #0f071c 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }} />
        <div className="relative z-10 max-w-5xl mx-auto px-8 py-20">
          <motion.div {...iv(0.1)}>
            <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Case Studies</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-2 leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Real results from real clubs</h2>
            <p className="text-lg text-white/40 mb-12 max-w-xl">Three clubs that used the app to solve a specific challenge, with measurable outcomes.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASES.map((c, i) => (
              <motion.div key={c.club} {...iv(0.1 + i * 0.12)}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: `0 0 48px ${c.color}18`,
                }}>
                {/* Club-coloured top accent */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${c.color} 0%, ${c.color}60 100%)` }} />
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-[10px] font-semibold text-white/45 uppercase tracking-[0.18em]">{c.club}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-5 leading-snug">{c.title}</h3>
                  <div className="space-y-3 mb-6 flex-1">
                    <div>
                      <p className="text-[9px] font-semibold text-white/25 uppercase tracking-widest mb-1">Challenge</p>
                      <p className="text-xs text-white/50 leading-relaxed">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-white/25 uppercase tracking-widest mb-1">Solution</p>
                      <p className="text-xs text-white/50 leading-relaxed">{c.solution}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {c.results.map((r) => (
                      <div key={r.l} style={{
                        background: `${c.color}12`,
                        border: `1px solid ${c.color}28`,
                        borderRadius: 10,
                        padding: '10px 12px',
                      }}>
                        <div className="font-black leading-none mb-1" style={{
                          fontFamily: "'Panel Sans', sans-serif",
                          color: c.color,
                          fontSize: r.n.length > 7 ? '0.8rem' : r.n.length > 5 ? '0.95rem' : '1.15rem',
                        }}>{r.n}</div>
                        <div className="text-[9px] text-white/40 leading-snug">{r.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TIERS + MUTATIONS + COMING SOON + CLIENTS
      ══════════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-8 pb-24">

        {/* Tiers */}
        <motion.section id="pricing" {...iv(0.1)} className="pt-20 mb-20">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Pricing</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-2 leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Two tiers, one platform</h2>
          <p className="text-lg text-[#3A3342]/55 mb-10 max-w-xl">Both tiers share the same infrastructure. Pick what fits today and upgrade anytime.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TIERS.map((tier) => (
              <div key={tier.name} className="rounded-2xl p-7"
                style={{ background: tier.name === 'Premium' ? `linear-gradient(135deg, ${ACCENT}12 0%, ${ACCENT}06 100%)` : 'rgba(17,0,43,0.03)', border: `1.5px solid ${tier.name === 'Premium' ? `${ACCENT}30` : 'rgba(17,0,43,0.08)'}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl font-black text-[#11002B]" style={{ fontFamily: "'Panel Sans', sans-serif" }}>{tier.name}</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: tier.name === 'Premium' ? `${ACCENT}18` : 'rgba(17,0,43,0.06)', color: tier.name === 'Premium' ? ACCENT : '#3A3342' }}>{tier.tag}</span>
                </div>
                <p className="text-sm text-[#3A3342]/60 mb-5 leading-relaxed">{tier.desc}</p>
                <ul className="space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#11002B]/80">
                      <span style={{ color: tier.name === 'Premium' ? ACCENT : '#3A3342', marginTop: 1, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Mutations */}
        <motion.section id="verticals" {...iv(0.1)} className="mb-20">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Verticals</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-2 leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Available for every vertical</h2>
          <p className="text-lg text-[#3A3342]/55 mb-10 max-w-xl">Both Premium and Standard come in four flavours, each tuned to the specific needs of that venue type.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MUTATIONS.map((m) => (
              <div key={m.name} className="p-5 rounded-2xl border border-[#11002B]/8 hover:border-[#7C3AED]/30 transition-colors">
                <span className="text-3xl mb-3 block">{m.icon}</span>
                <h3 className="font-bold text-[#11002B] text-base mb-1.5">{m.name}</h3>
                <p className="text-xs text-[#3A3342]/55 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Coming soon */}
        <motion.section id="roadmap" {...iv(0.1)} className="mb-20">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Roadmap</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-2 leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>What&apos;s coming</h2>
          <p className="text-lg text-[#3A3342]/55 mb-10 max-w-xl">New features. Bigger experience. Stronger fan relationships.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMING_SOON.map((c) => (
              <div key={c.title} className="p-6 rounded-2xl"
                style={{ background: `${ACCENT}07`, border: `1.5px dashed ${ACCENT}25` }}>
                <span className="text-3xl mb-3 block">{c.icon}</span>
                <h3 className="font-bold text-[#11002B] text-base mb-2">{c.title}</h3>
                <p className="text-sm text-[#3A3342]/55 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Clients */}
        <motion.section id="clients" {...iv(0.1)}>
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Clients</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#11002B] mt-4 mb-8 leading-none" style={{ fontFamily: "'Panel Sans', sans-serif" }}>Example Clients</h2>
          <div className="space-y-6">
            {CLUB_EXAMPLES.map((group) => (
              <div key={group.country}>
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#3A3342]/35 mb-3">{group.country}</p>
                <div className="flex flex-wrap gap-2.5">
                  {group.clubs.map((e) => (
                    <div key={e.name} className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-colors"
                      style={{ borderColor: `${e.color}40`, background: `${e.color}08` }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: e.color }} />
                      <span className="text-sm font-medium text-[#11002B]">{e.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Branded app showcase */}
          <motion.div
            {...iv(0.15)}
            className="mt-14 rounded-3xl border border-[#11002B]/6 bg-[#F8F6FC] px-4 py-8 md:px-8 md:py-10 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
              <div>
                <h3
                  className="text-xl md:text-2xl font-bold text-[#11002B] mb-1"
                  style={{ fontFamily: "'Panel Sans', sans-serif" }}
                >
                  How it looks in the wild
                </h3>
                <p className="text-sm text-[#3A3342]/60 max-w-xl">
                  Six real apps built on the same platform, each branded to feel completely native to its club or venue.
                </p>
              </div>
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#3A3342]/45">
                Production screenshots
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {[
                { src: '/venue-apps/client-slavia.png', label: 'SK Slavia Praha', tilt: '-4deg' },
                { src: '/venue-apps/client-o2.png', label: 'O2 Arena', tilt: '3deg' },
                { src: '/venue-apps/client-tygri.png', label: 'Bílí Tygři Liberec', tilt: '-6deg' },
                { src: '/venue-apps/client-sparta.png', label: 'HC Sparta Praha', tilt: '4deg' },
                { src: '/venue-apps/client-b4l.png', label: 'Beats for Love', tilt: '-3deg' },
                { src: '/venue-apps/client-slovan.png', label: 'ŠK Slovan Bratislava', tilt: '5deg' },
              ].map((app, index) => (
                <motion.div
                  key={app.src}
                  {...iv(0.18 + index * 0.04)}
                  className="relative mx-auto"
                  style={{ maxWidth: 260 }}
                >
                  {/* Phone frame */}
                  <div
                    className="relative rounded-[2.6rem] border border-black/70 bg-black overflow-hidden shadow-[0_18px_45px_rgba(15,7,28,0.55)]"
                    style={{
                      transform: `rotate(${app.tilt})`,
                      padding: 6,
                    }}
                  >
                    <div className="relative overflow-hidden rounded-[2rem] bg-black">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={app.src}
                        alt={app.label}
                        loading="lazy"
                        className="block w-full h-auto object-cover"
                        style={{ mixBlendMode: 'normal' }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero',               label: 'Hero' },
          { id: 'onboarding',         label: 'Onboarding' },
          { id: 'tickets-attendance', label: 'Tickets & Attendance' },
          { id: 'content',            label: 'Content' },
          { id: 'live-stats',         label: 'Live Statistics' },
          { id: 'marketing',          label: 'Marketing' },
          { id: 'case-studies',       label: 'Case Studies' },
          { id: 'pricing',            label: 'Pricing' },
          { id: 'verticals',          label: 'Verticals' },
          { id: 'roadmap',            label: 'Roadmap' },
          { id: 'clients',            label: 'Clients' },
        ]}
      />
    </div>
  )
}
