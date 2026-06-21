export default function Logo({ size = 40 }: { size?: number }) {
  const h = Math.round(size * 1.18);
  return (
    <svg width={size} height={h} viewBox="0 0 400 472" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gOuter" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#f8e980"/>
          <stop offset="25%" stopColor="#D4AF37"/>
          <stop offset="55%" stopColor="#f0d060"/>
          <stop offset="85%" stopColor="#B8960C"/>
          <stop offset="100%" stopColor="#8a6500"/>
        </linearGradient>
        <linearGradient id="gLeft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4a4a4a"/>
          <stop offset="100%" stopColor="#606060"/>
        </linearGradient>
        <linearGradient id="gRight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#282828"/>
        </linearGradient>
        <clipPath id="cLeft"><rect x="0" y="0" width="200" height="472"/></clipPath>
        <clipPath id="cRight"><rect x="200" y="0" width="200" height="472"/></clipPath>
      </defs>

      {/* ---- LEFT WING (white/gray feathers) ---- */}
      <g fill="none">
        {/* main feather top-left */}
        <path d="M108 160 Q60 120 30 80 Q55 100 62 88 Q38 68 45 44 Q62 70 66 58 Q48 36 58 18 Q74 50 70 70 Q84 52 90 60 Q78 86 76 108 Q90 112 84 132 Z" fill="#ccc"/>
        <path d="M108 160 Q60 120 30 80 Q55 100 62 88 Q38 68 45 44 Q62 70 66 58 Q48 36 58 18 Q74 50 70 70 Q84 52 90 60 Q78 86 76 108 Q90 112 84 132 Z" fill="none" stroke="#999" strokeWidth="0.5"/>
        {/* lower feather */}
        <path d="M112 190 Q58 158 26 118 Q52 136 58 122 Q34 104 40 78 Q58 102 62 88 Q46 68 54 50 Q72 76 68 96 Q82 78 88 86 Q76 112 74 136 Q88 142 82 162 Z" fill="#bbb"/>
        <path d="M114 215 Q60 188 28 148 Q54 164 58 150 Q36 132 42 106 Q60 130 64 116 Q48 96 56 78 Q74 104 70 124 Q84 106 90 114 Q78 140 76 164 Q90 172 84 192 Z" fill="#aaa"/>
        {/* scroll/curl at bottom of wings */}
        <path d="M100 240 Q60 230 40 210 Q55 218 62 208 Q44 196 50 174 Q65 192 68 180 Q55 164 62 146 Q76 166 74 184 Q86 168 92 176 Q82 202 80 220 Z" fill="#999"/>
        <path d="M95 260 Q58 255 42 240 Q54 244 60 236 Q46 226 50 208 Q63 222 66 212 Z" fill="#888"/>
      </g>

      {/* ---- RIGHT WING ---- */}
      <g fill="none">
        <path d="M292 160 Q340 120 370 80 Q345 100 338 88 Q362 68 355 44 Q338 70 334 58 Q352 36 342 18 Q326 50 330 70 Q316 52 310 60 Q322 86 324 108 Q310 112 316 132 Z" fill="#ddd"/>
        <path d="M292 160 Q340 120 370 80 Q345 100 338 88 Q362 68 355 44 Q338 70 334 58 Q352 36 342 18 Q326 50 330 70 Q316 52 310 60 Q322 86 324 108 Q310 112 316 132 Z" fill="none" stroke="#aaa" strokeWidth="0.5"/>
        <path d="M288 190 Q342 158 374 118 Q348 136 342 122 Q366 104 360 78 Q342 102 338 88 Q354 68 346 50 Q328 76 332 96 Q318 78 312 86 Q324 112 326 136 Q312 142 318 162 Z" fill="#ccc"/>
        <path d="M286 215 Q340 188 372 148 Q346 164 342 150 Q364 132 358 106 Q340 130 336 116 Q352 96 344 78 Q326 104 330 124 Q316 106 310 114 Q322 140 324 164 Q310 172 316 192 Z" fill="#bbb"/>
        <path d="M300 240 Q340 230 360 210 Q345 218 338 208 Q356 196 350 174 Q335 192 332 180 Q345 164 338 146 Q324 166 326 184 Q314 168 308 176 Q318 202 320 220 Z" fill="#aaa"/>
        <path d="M305 260 Q342 255 358 240 Q346 244 340 236 Q354 226 350 208 Q337 222 334 212 Z" fill="#999"/>
      </g>

      {/* ---- OUTER SHIELD gold stroke ---- */}
      <path d="M200 14 L372 72 L372 215 Q372 352 200 430 Q28 352 28 215 L28 72 Z" fill="url(#gLeft)" clipPath="url(#cLeft)"/>
      <path d="M200 14 L372 72 L372 215 Q372 352 200 430 Q28 352 28 215 L28 72 Z" fill="url(#gRight)" clipPath="url(#cRight)"/>
      <path d="M200 14 L372 72 L372 215 Q372 352 200 430 Q28 352 28 215 L28 72 Z" fill="none" stroke="url(#gOuter)" strokeWidth="14"/>
      {/* center gold line */}
      <line x1="200" y1="14" x2="200" y2="430" stroke="#D4AF37" strokeWidth="2.5" opacity="0.6"/>

      {/* ---- INNER WHITE SHIELD ---- */}
      <path d="M200 85 L298 118 L298 205 Q298 278 200 318 Q102 278 102 205 L102 118 Z" fill="#f0f0f0" stroke="#bbb" strokeWidth="3"/>
      {/* inner shield detail border */}
      <path d="M200 95 L290 126 L290 205 Q290 270 200 308 Q110 270 110 205 L110 126 Z" fill="none" stroke="#ccc" strokeWidth="1.5"/>

      {/* ---- CROWN ---- */}
      <g transform="translate(200, 96)">
        <path d="M-35 14 L-22 -10 L-10 8 L0 -18 L10 8 L22 -10 L35 14 L28 24 L-28 24 Z" fill="#D4AF37"/>
        <rect x="-30" y="22" width="60" height="10" rx="3" fill="#D4AF37"/>
        <circle cx="-22" cy="-4" r="4" fill="#cc2200"/>
        <circle cx="0" cy="-12" r="4" fill="#cc2200"/>
        <circle cx="22" cy="-4" r="4" fill="#cc2200"/>
        <circle cx="-22" cy="-4" r="2" fill="#ff4444"/>
        <circle cx="0" cy="-12" r="2" fill="#ff6644"/>
        <circle cx="22" cy="-4" r="2" fill="#ff4444"/>
      </g>

      {/* ---- RED KUK EMBLEM (stylized cross/letter design) ---- */}
      {/* Vertical bar */}
      <rect x="192" y="148" width="16" height="80" rx="4" fill="#cc0000"/>
      {/* Horizontal bar */}
      <rect x="158" y="172" width="84" height="16" rx="4" fill="#cc0000"/>
      {/* K left top */}
      <path d="M158 150 L175 150 L200 172 L175 194 L158 194 L182 172 Z" fill="#cc0000"/>
      {/* K right top */}
      <path d="M242 150 L225 150 L200 172 L225 194 L242 194 L218 172 Z" fill="#cc0000"/>
      {/* U bottom arc */}
      <path d="M165 185 Q165 230 200 235 Q235 230 235 185" fill="none" stroke="#cc0000" strokeWidth="13" strokeLinecap="round"/>
      {/* Highlight */}
      <path d="M192 148 L196 148 L196 228 L192 228 Z" fill="#ff4444" opacity="0.4"/>

      {/* ---- SCROLL BANNER ---- */}
      {/* Left scroll curl */}
      <path d="M80 336 Q72 344 80 352 Q68 348 65 336 Q68 324 80 320 Z" fill="#D4AF37"/>
      {/* Right scroll curl */}
      <path d="M320 336 Q328 344 320 352 Q332 348 335 336 Q332 324 320 320 Z" fill="#D4AF37"/>
      {/* Main banner */}
      <path d="M80 320 Q200 342 320 320 L320 356 Q200 378 80 356 Z" fill="#D4AF37"/>
      <path d="M78 336 Q200 360 322 336" fill="none" stroke="#B8960C" strokeWidth="1"/>
      <text x="200" y="346" textAnchor="middle" fill="#1a1000" fontSize="16" fontFamily="serif" fontWeight="bold" letterSpacing="2.5">KUYKUY GROUP</text>
    </svg>
  );
}
