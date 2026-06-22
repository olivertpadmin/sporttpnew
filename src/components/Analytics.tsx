'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { track } from '@/lib/track'

export default function Analytics() {
  const pathname = usePathname()
  useEffect(() => {
    track({
      type: 'page_view',
      page: pathname,
      ts: Date.now(),
      referrer: document.referrer || '',
      ua: navigator.userAgent,
    })
  }, [pathname])
  return null
}
