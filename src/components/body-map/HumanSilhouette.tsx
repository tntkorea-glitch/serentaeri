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
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdecd8" />
          <stop offset="100%" stopColor="#f6d9b8" />
        </linearGradient>
        <radialGradient id="skinShade" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#fef2e0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#e8c398" stopOpacity="0.5" />
        </radialGradient>
      </defs>

      {/* ============ BODY OUTLINE (해부학적 실루엣) ============ */}
      <g fill="url(#skinGrad)" stroke="#b8845e" strokeWidth="0.35" strokeLinejoin="round">
        {/* Head */}
        <path d="M 50,3
                 C 42,3 36.5,7 36.5,14
                 C 36.5,18 37.5,21 39.5,23.5
                 L 40.5,26
                 Q 40.5,27 41.5,27.5
                 L 41.5,29
                 L 58.5,29
                 L 58.5,27.5
                 Q 59.5,27 59.5,26
                 L 60.5,23.5
                 C 62.5,21 63.5,18 63.5,14
                 C 63.5,7 58,3 50,3 Z" />

        {/* Neck */}
        <path d="M 41.5,28 L 58.5,28 L 59,33 Q 59,34 58,34.5 L 42,34.5 Q 41,34 41,33 Z" />

        {/* Torso (shoulders + chest + waist) */}
        <path d="M 41,34
                 Q 32,35 28,40
                 Q 24,44 23,50
                 L 24,58
                 L 27,60
                 Q 29,58 30,54
                 L 31,50
                 L 32,70
                 Q 33,80 35,88
                 Q 36,93 38,95
                 L 62,95
                 Q 64,93 65,88
                 Q 67,80 68,70
                 L 69,50
                 L 70,54
                 Q 71,58 73,60
                 L 76,58
                 L 77,50
                 Q 76,44 72,40
                 Q 68,35 59,34 Z" />

        {/* Left arm */}
        <path d="M 24,42
                 Q 22,45 21,50
                 L 19,62
                 Q 18,70 18,78
                 L 17,88
                 Q 17,92 19,92
                 L 22,92
                 L 23,86
                 Q 24,78 25,70
                 L 26,60
                 L 27,52
                 Q 26,48 25,44 Z" />

        {/* Right arm */}
        <path d="M 76,42
                 Q 78,45 79,50
                 L 81,62
                 Q 82,70 82,78
                 L 83,88
                 Q 83,92 81,92
                 L 78,92
                 L 77,86
                 Q 76,78 75,70
                 L 74,60
                 L 73,52
                 Q 74,48 75,44 Z" />

        {/* Hands */}
        <ellipse cx="20.5" cy="94.5" rx="2.6" ry="3.2" />
        <ellipse cx="79.5" cy="94.5" rx="2.6" ry="3.2" />

        {/* Hips / pelvis */}
        <path d="M 36,94
                 Q 34,96 33.5,100
                 L 33,108
                 L 50,110
                 L 67,108
                 L 66.5,100
                 Q 66,96 64,94 Z" />

        {/* Left leg */}
        <path d="M 36,108
                 Q 35,120 35.5,132
                 L 36,148
                 Q 36,158 37,166
                 L 38,172
                 L 44,172
                 L 45,164
                 Q 46,152 46.5,140
                 L 47,120
                 L 47,110 Z" />

        {/* Right leg */}
        <path d="M 64,108
                 Q 65,120 64.5,132
                 L 64,148
                 Q 64,158 63,166
                 L 62,172
                 L 56,172
                 L 55,164
                 Q 54,152 53.5,140
                 L 53,120
                 L 53,110 Z" />

        {/* Feet */}
        <ellipse cx="41" cy="175" rx="4" ry="2.4" />
        <ellipse cx="59" cy="175" rx="4" ry="2.4" />
      </g>

      {/* ============ FACE FEATURES ============ */}
      <g stroke="#8d5f3d" strokeWidth="0.35" fill="none" strokeLinecap="round">
        {/* Eyes */}
        <ellipse cx="45" cy="15" rx="1.5" ry="0.7" fill="#fff" stroke="#8d5f3d" strokeWidth="0.25" />
        <ellipse cx="55" cy="15" rx="1.5" ry="0.7" fill="#fff" stroke="#8d5f3d" strokeWidth="0.25" />
        <circle cx="45" cy="15" r="0.4" fill="#3c2a18" stroke="none" />
        <circle cx="55" cy="15" r="0.4" fill="#3c2a18" stroke="none" />
        {/* Brows */}
        <path d="M 43,12.7 L 47,12.4" />
        <path d="M 53,12.4 L 57,12.7" />
        {/* Nose */}
        <path d="M 50,16 L 49.3,19.5 L 50.7,19.7" />
        {/* Mouth */}
        <path d="M 47.5,22.5 Q 50,23.3 52.5,22.5" />
      </g>

      {/* ============ INTERNAL ORGANS (반투명 해부학 레이어) ============ */}
      <g>
        {/* Lungs (좌우) */}
        <g opacity="0.65">
          <path d="M 41,40
                   Q 36,41 34,46
                   Q 33,52 34,58
                   Q 36,62 41,60
                   L 43,52
                   L 44,44 Z"
                fill="#e89a9a" stroke="#b05050" strokeWidth="0.25" />
          <path d="M 59,40
                   Q 64,41 66,46
                   Q 67,52 66,58
                   Q 64,62 59,60
                   L 57,52
                   L 56,44 Z"
                fill="#e89a9a" stroke="#b05050" strokeWidth="0.25" />
        </g>

        {/* Heart (좌측 심장 — 화면상 왼쪽 치우침) */}
        <g opacity="0.8">
          <path d="M 46,49
                   C 44,47 41,48 41,51
                   C 41,54 43,56 46,58
                   C 49,56 51,54 51,51
                   C 51,48 48,47 46,49 Z"
                fill="#d33939" stroke="#8a1f1f" strokeWidth="0.3" />
        </g>

        {/* Liver (우측 상복부 — 화면상 오른쪽 치우침) */}
        <g opacity="0.7">
          <path d="M 50,64
                   Q 58,63 63,66
                   L 64,72
                   Q 58,74 50,72
                   Z"
                fill="#7d3232" stroke="#4a1616" strokeWidth="0.3" />
        </g>

        {/* Stomach (좌측 상복부) */}
        <g opacity="0.7">
          <path d="M 44,66
                   Q 40,66 39,70
                   Q 39,74 43,75
                   Q 48,74 48,70
                   Q 48,66 44,66 Z"
                fill="#c48a5f" stroke="#7a4a26" strokeWidth="0.3" />
        </g>

        {/* Intestines (복부) */}
        <g opacity="0.7">
          <path d="M 37,78
                   Q 34,82 36,86
                   Q 33,88 36,91
                   Q 40,92 44,90
                   Q 50,93 56,90
                   Q 60,92 64,91
                   Q 67,88 64,86
                   Q 66,82 63,78
                   Q 58,76 50,77
                   Q 42,76 37,78 Z"
                fill="#b07340" stroke="#6a3f1a" strokeWidth="0.25" />
          {/* 장 주름 표현 */}
          <path d="M 40,82 Q 44,84 48,82 Q 52,84 56,82 Q 60,84 63,82"
                fill="none" stroke="#6a3f1a" strokeWidth="0.2" opacity="0.6" />
          <path d="M 40,86 Q 44,88 48,86 Q 52,88 56,86 Q 60,88 63,86"
                fill="none" stroke="#6a3f1a" strokeWidth="0.2" opacity="0.6" />
        </g>

        {/* Brain hint (머리 내부) */}
        <g opacity="0.35">
          <path d="M 42,8
                   Q 40,11 42,15
                   Q 44,16 46,14
                   Q 48,16 50,14
                   Q 52,16 54,14
                   Q 56,16 58,15
                   Q 60,11 58,8
                   Q 54,6 50,7
                   Q 46,6 42,8 Z"
                fill="#e09bbd" stroke="#a0597a" strokeWidth="0.2" />
        </g>
      </g>

      {/* ============ MUSCLE/SKIN DEFINITION 라인 ============ */}
      <g stroke="#d4a47a" strokeWidth="0.3" fill="none" opacity="0.6" strokeLinecap="round">
        {/* 가슴 중앙선 */}
        <path d="M 50,36 L 50,48" />
        {/* 배꼽 */}
        <circle cx="50" cy="82" r="0.7" fill="#b78557" stroke="none" />
        {/* 쇄골 */}
        <path d="M 42,36 Q 46,37 50,37 Q 54,37 58,36" />
        {/* 복근 중앙 */}
        <path d="M 50,70 L 50,94" opacity="0.3" />
        {/* 무릎 라인 */}
        <path d="M 37,148 Q 41,149 45,148" />
        <path d="M 55,148 Q 59,149 63,148" />
      </g>
    </svg>
  );
}
