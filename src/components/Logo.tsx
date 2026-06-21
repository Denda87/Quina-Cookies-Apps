export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5 L90 25 L90 55 Q90 80 50 95 Q10 80 10 55 L10 25 Z" fill="#8B0000" stroke="#D4AF37" strokeWidth="3"/>
      <text x="50" y="58" textAnchor="middle" fill="#D4AF37" fontSize="28" fontFamily="serif" fontWeight="bold">K</text>
    </svg>
  );
}
