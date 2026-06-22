export interface Product {
  slug: string
  label: string        // multiline label for orbit node (use \n)
  shortLabel: string   // pill label in breadcrumb
  color: string        // unique accent color
  angle: number        // degrees on orbit (0 = right, -90 = top, clockwise)
  icon: string
  description: string  // tooltip on orbit
}

// 9 products, each with a clearly distinct color.
// Arranged clockwise from top, grouped by function:
//   Top / top-right: ticketing-facing products
//   Right / bottom-right: physical venue products
//   Bottom / bottom-left / left: ops, data, intelligence
//   Top-left: core infrastructure
export const PRODUCTS: Product[] = [
  {
    slug: 'ticketing',
    label: 'Ticketing\nWebsites',
    shortLabel: 'Ticketing',
    color: '#F59E0B',   // amber
    angle: -90,
    icon: '🎟️',
    description: '9 brands · 7 markets',
  },
  {
    slug: 'ticketing-apps',
    label: 'Ticketing\nApps',
    shortLabel: 'Ticket Apps',
    color: '#EF4444',   // red
    angle: -50,
    icon: '📱',
    description: 'Mobile purchase & mgmt',
  },
  {
    slug: 'scanning-apps',
    label: 'Scanning\nApps',
    shortLabel: 'Scanning',
    color: '#22D3EE',   // cyan
    angle: -10,
    icon: '🔎',
    description: 'On-site entry control',
  },
  {
    slug: 'cashless',
    label: 'Cashless',
    shortLabel: 'Cashless',
    color: '#EA580C',   // deep orange
    angle: 30,
    icon: '💳',
    description: 'Festivals & arenas',
  },
  {
    slug: 'kiosks',
    label: 'Kiosks',
    shortLabel: 'Kiosks',
    color: '#2563EB',   // royal blue
    angle: 70,
    icon: '🖥',
    description: 'Self-service terminals',
  },
  {
    slug: 'ai-assistant',
    label: 'AI Assistant\nfor Promoters',
    shortLabel: 'AI Assistant',
    color: '#BE185D',   // rose/crimson
    angle: 110,
    icon: '✨',
    description: 'Smart promoter tools',
  },
  {
    slug: 'crm',
    label: 'CRM',
    shortLabel: 'CRM',
    color: '#0D9488',   // dark teal
    angle: 150,
    icon: '📊',
    description: 'B2B partner hub',
  },
  {
    slug: 'venue-apps',
    label: 'Venue\nOwner Apps',
    shortLabel: 'Venue Apps',
    color: '#7C3AED',   // deep purple
    angle: 190,
    icon: '🏟',
    description: 'Clubs, arenas & festivals',
  },
  {
    slug: 'sso',
    label: 'SSO',
    shortLabel: 'SSO',
    color: '#06D373',   // PLG green
    angle: -130,
    icon: '🔑',
    description: 'Unified identity layer',
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}
