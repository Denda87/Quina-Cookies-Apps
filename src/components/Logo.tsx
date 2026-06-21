export default function Logo({ size = 40 }: { size?: number }) {
  const h = Math.round(size * 1.18);
  return (
    <svg width={size} height={h} viewBox="0 0 400 472" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gOuter" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8e980"/>
          <stop offset="20%" stopColor="#D4AF37"/>
          <stop offset="50%" stopColor="#f5e070"/>
          <stop offset="80%" stopColor="#B8960C"/>
          <stop offset="100%" stopColor="#6a4800"/>
        </linearGradient>
        <linearGradient id="gLeft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5a5a5a"/>
          <stop offset="100%" stopColor="#4a4a4a"/>
        </linearGradient>
        <linearGradient id="gRight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#0d0d0d"/>
        </linearGradient>
        <clipPath id="cLeft"><rect x="0" y="0" width="200" height="472"/></clipPath>
        <clipPath id="cRight"><rect x="200" y="0" width="200" height="472"/></clipPath>
      </defs>

      {/* LEFT WING */}
      <g opacity="0.85">
        <path d="M130 200 Q95 170 65 130 Q50 108 40 85 Q52 95 58 82 Q42 65 48 44 Q64 62 68 50 Q50 30 60 12 Q78 38 74 58 Q88 40 94 50 Q82 80 80 105 Q96 95 100 115 Q86 138 88 162 Q104 155 108 178 Q96 198 100 218 Z" fill="#d0d0d0"/>
        <path d="M128 210 Q92 185 62 148 Q48 126 38 102 Q50 110 56 98 Q40 82 46 60 Q62 76 66 64 Q48 44 56 26 Q76 48 72 68 Q86 50 92 60 Q80 90 78 116 Q94 108 98 128 Q84 152 86 176 Q102 170 106 192 Z" fill="#b8b8b8"/>
        <path d="M122 230 Q88 218 60 195 Q46 180 40 162 Q52 168 56 158 Q42 144 48 126 Q62 140 66 130 Q52 114 58 98 Q74 114 72 132 Q84 118 90 126 Q80 152 80 172 Q94 168 96 188 Q86 210 90 228 Z" fill="#a0a0a0"/>
        <path d="M115 248 Q84 244 62 228 Q50 218 48 206 Q58 212 62 204 Q52 194 56 180 Q68 190 70 182 Q60 170 64 158 Q76 170 74 184 Q84 172 90 180 Q82 202 84 218 Q94 216 96 232 Z" fill="#909090"/>
      </g>

      {/* RIGHT WING */}
      <g opacity="0.85">
        <path d="M270 200 Q305 170 335 130 Q350 108 360 85 Q348 95 342 82 Q358 65 352 44 Q336 62 332 50 Q350 30 340 12 Q322 38 326 58 Q312 40 306 50 Q318 80 320 105 Q304 95 300 115 Q314 138 312 162 Q296 155 292 178 Q304 198 300 218 Z" fill="#d8d8d8"/>
        <path d="M272 210 Q308 185 338 148 Q352 126 362 102 Q350 110 344 98 Q360 82 354 60 Q338 76 334 64 Q352 44 344 26 Q324 48 328 68 Q314 50 308 60 Q320 90 322 116 Q306 108 302 128 Q316 152 314 176 Q298 170 294 192 Z" fill="#c0c0c0"/>
        <path d="M278 230 Q312 218 340 195 Q354 180 360 162 Q348 168 344 158 Q358 144 352 126 Q338 140 334 130 Q348 114 342 98 Q326 114 328 132 Q316 118 310 126 Q320 152 320 172 Q306 168 304 188 Q314 210 310 228 Z" fill="#a8a8a8"/>
        <path d="M285 248 Q316 244 338 228 Q350 218 352 206 Q342 212 338 204 Q348 194 344 180 Q332 190 330 182 Q340 170 336 158 Q324 170 326 184 Q316 172 310 180 Q318 202 316 218 Q306 216 304 232 Z" fill="#989898"/>
      </g>

      {/* OUTER SHIELD */}
      <path d="M200 18 L358 70 L358 248 Q358 380 200 448 Q42 380 42 248 L42 70 Z" fill="url(#gLeft)" clipPath="url(#cLeft)"/>
      <path d="M200 18 L358 70 L358 248 Q358 380 200 448 Q42 380 42 248 L42 70 Z" fill="url(#gRight)" clipPath="url(#cRight)"/>
      <path d="M200 18 L358 70 L358 248 Q358 380 200 448 Q42 380 42 248 L42 70 Z" fill="none" stroke="url(#gOuter)" strokeWidth="16"/>
      <line x1="200" y1="20" x2="200" y2="446" stroke="#D4AF37" strokeWidth="2" opacity="0.5"/>

      {/* INNER WHITE SHIELD */}
      <path d="M200 90 L295 122 L295 215 Q295 288 200 328 Q105 288 105 215 L105 122 Z" fill="#f2f2f2" stroke="#c8c8c8" strokeWidth="3"/>
      <path d="M200 100 L285 130 L285 214 Q285 278 200 316 Q115 278 115 214 L115 130 Z" fill="none" stroke="#ddd" strokeWidth="1.5"/>

      {/* CROWN */}
      <g transform="translate(200,100)">
        <rect x="-34" y="16" width="68" height="12" rx="3" fill="#D4AF37"/>
        <path d="M-34 16 L-34 -4 L-20 6 L-8 -14 L0 -20 L8 -14 L20 6 L34 -4 L34 16 Z" fill="#D4AF37"/>
        <ellipse cx="-22" cy="0" rx="4.5" ry="4.5" fill="#cc1100"/>
        <ellipse cx="0" cy="-8" rx="4.5" ry="4.5" fill="#cc1100"/>
        <ellipse cx="22" cy="0" rx="4.5" ry="4.5" fill="#cc1100"/>
        <ellipse cx="-22" cy="0" rx="2" ry="2" fill="#ff3322"/>
        <ellipse cx="0" cy="-8" rx="2" ry="2" fill="#ff3322"/>
        <ellipse cx="22" cy="0" rx="2" ry="2" fill="#ff3322"/>
      </g>

      {/* RED KUK EMBLEM */}
      <rect x="193" y="148" width="14" height="86" rx="3" fill="#cc0000"/>
      <rect x="155" y="170" width="90" height="14" rx="3" fill="#cc0000"/>
      <path d="M155 148 L174 148 L200 170 L174 192 L155 192 L178 170 Z" fill="#cc0000"/>
      <path d="M245 148 L226 148 L200 170 L226 192 L245 192 L222 170 Z" fill="#cc0000"/>
      <path d="M162 188 Q162 240 200 244 Q238 240 238 188" fill="none" stroke="#cc0000" strokeWidth="14" strokeLinecap="round"/>
      <rect x="193" y="148" width="5" height="86" rx="2" fill="#ff4444" opacity="0.3"/>

      {/* SCROLL BANNER */}
      <path d="M82 340 Q72 348 80 358 Q65 352 62 340 Q65 328 80 324 Z" fill="#e8e8e8"/>
      <path d="M318 340 Q328 348 320 358 Q335 352 338 340 Q335 328 320 324 Z" fill="#e8e8e8"/>
      <path d="M82 324 Q200 342 318 324 L318 360 Q200 378 82 360 Z" fill="#e8e8e8"/>
      <path d="M82 360 Q200 378 318 360 L318 368 Q200 384 82 368 Z" fill="#c8c8c8"/>
      <text x="200" y="348" textAnchor="middle" fill="#1a1000" fontSize="15" fontFamily="serif" fontWeight="bold" letterSpacing="2">KUYKUY GROUP</text>
    </svg>
  );
}
