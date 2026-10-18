// Clue: a ladybug detective with a magnifying glass. She bobs, blinks, and sweeps her glass
// across the page. All motion stops for people who prefer reduced motion.

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#141412" />
      <circle cx="14" cy="15" r="7" fill="none" stroke="#f5f2ea" strokeWidth="2.4" />
      <path d="m19 20 6 6" stroke="#f5f2ea" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 9.5a5.5 5.5 0 0 1 0 11z" fill="#e11d48" />
      <path d="M14 9.5a5.5 5.5 0 0 0 0 11z" fill="#8b5cf6" />
      <circle cx="12" cy="13" r="1" fill="#141412" />
      <circle cx="16.2" cy="16.4" r="1" fill="#141412" />
    </svg>
  )
}

export function Clue({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      role="img"
      aria-label="Clue, a ladybug detective, holding a magnifying glass"
      className={className}
    >
      <ellipse cx="118" cy="214" rx="70" ry="9" fill="#141412" opacity="0.08" />
      <g className="idle-bob">
        {/* Legs. */}
        <path
          d="M74 170l-16 20M96 182l-8 24M140 182l8 24M162 170l16 20"
          stroke="#141412"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Shell: two red wings with spots, split down the middle. */}
        <path d="M118 74c-50 0-70 40-70 70s30 46 70 46z" fill="#e11d48" />
        <path d="M118 74c50 0 70 40 70 70s-30 46-70 46z" fill="#f43f5e" />
        <path d="M118 76v112" stroke="#141412" strokeWidth="5" />
        <circle cx="84" cy="126" r="10" fill="#141412" />
        <circle cx="96" cy="164" r="8" fill="#141412" />
        <circle cx="150" cy="122" r="9" fill="#141412" />
        <circle cx="146" cy="162" r="10" fill="#141412" />
        {/* Head, with a detective cap. */}
        <circle cx="118" cy="70" r="30" fill="#141412" />
        <path d="M86 58c4-22 60-26 66-2z" fill="#8b5cf6" />
        <path d="M80 60h76" stroke="#6d28d9" strokeWidth="6" strokeLinecap="round" />
        <circle cx="118" cy="38" r="5" fill="#6d28d9" />
        {/* Eyes and a small smile. */}
        <g className="blink">
          <circle cx="106" cy="72" r="7" fill="#ffffff" />
          <circle cx="130" cy="72" r="7" fill="#ffffff" />
          <circle cx="108" cy="73" r="3.2" fill="#141412" />
          <circle cx="132" cy="73" r="3.2" fill="#141412" />
        </g>
        <path
          d="M110 86q8 6 16 0"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="98" cy="84" r="4" fill="#fb7185" opacity="0.7" />
        <circle cx="138" cy="84" r="4" fill="#fb7185" opacity="0.7" />
        {/* The magnifying glass, sweeping now and then. */}
        <g className="sweep">
          <path d="M168 132l28 30" stroke="#6b4f2a" strokeWidth="10" strokeLinecap="round" />
          <circle
            cx="160"
            cy="118"
            r="24"
            fill="#ddd6fe"
            fillOpacity="0.55"
            stroke="#141412"
            strokeWidth="6"
          />
          <path
            d="M148 108a14 14 0 0 1 12-6"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  )
}
