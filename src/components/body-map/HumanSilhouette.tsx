export default function HumanSilhouette({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 180"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="100%" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>
      <g fill="url(#bodyGrad)" stroke="#cbd5e1" strokeWidth="0.3">
        {/* Head */}
        <circle cx="50" cy="13" r="8" />
        {/* Neck */}
        <rect x="46" y="20" width="8" height="6" rx="1.5" />
        {/* Shoulders & torso */}
        <path d="M 26,32 Q 26,26 34,26 L 66,26 Q 74,26 74,32 L 72,70 Q 71,74 66,74 L 34,74 Q 29,74 28,70 Z" />
        {/* Abdomen / pelvis */}
        <path d="M 30,72 L 70,72 L 68,92 Q 68,94 66,94 L 34,94 Q 32,94 32,92 Z" />
        {/* Left arm */}
        <path d="M 26,30 Q 22,30 21,34 L 18,76 Q 18,80 22,80 L 28,80 Q 30,80 30,76 L 32,40 Q 32,32 28,30 Z" />
        {/* Right arm */}
        <path d="M 74,30 Q 78,30 79,34 L 82,76 Q 82,80 78,80 L 72,80 Q 70,80 70,76 L 68,40 Q 68,32 72,30 Z" />
        {/* Left leg */}
        <path d="M 34,94 L 48,94 L 47,172 Q 47,174 45,174 L 36,174 Q 34,174 34,172 Z" />
        {/* Right leg */}
        <path d="M 52,94 L 66,94 L 64,172 Q 64,174 62,174 L 53,174 Q 51,174 51,172 Z" />
      </g>
    </svg>
  );
}
