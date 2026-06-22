'use client'

import { useRef } from 'react'

export default function ClearDataButton({ action }: { action: () => Promise<void> }) {
  const formRef = useRef<HTMLFormElement>(null)

  function handleClick() {
    const confirmed = window.confirm(
      'Are you sure you want to clear all analytics data? This cannot be undone.'
    )
    if (confirmed) formRef.current?.requestSubmit()
  }

  return (
    <form ref={formRef} action={action}>
      <button
        type="button"
        onClick={handleClick}
        className="px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer"
        style={{
          background: 'rgba(246,64,196,0.12)',
          border: '1px solid rgba(246,64,196,0.3)',
          color: '#F640C4',
        }}
      >
        Clear all data
      </button>
    </form>
  )
}
