'use client'

import { useState } from 'react'

export function CopyButton({ text, tone = 'dark' }: { text: string; tone?: 'dark' | 'light' }) {
  const [state, setState] = useState<'idle' | 'copied' | 'blocked'>('idle')
  const look =
    tone === 'dark'
      ? 'border-white/15 bg-white/5 text-[#ece8de] hover:bg-white/10'
      : 'border-hairline bg-surface text-ink-2 hover:text-ink'
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setState('copied')
        } catch {
          setState('blocked')
        }
        window.setTimeout(() => setState('idle'), 1600)
      }}
      className={`h-7 rounded-full border px-3 font-mono text-[12px] ${look}`}
    >
      <span aria-live="polite">
        {state === 'copied' ? 'Copied' : state === 'blocked' ? 'Select to copy' : 'Copy'}
      </span>
    </button>
  )
}
