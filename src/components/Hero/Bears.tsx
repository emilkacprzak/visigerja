export default function Bears() {
  return (
    <svg
      className="h-auto w-[145%] max-w-[570px] drop-shadow-sm"
      viewBox="0 0 360 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="bears-title"
    >
      <title id="bears-title">Two teddy bears standing in elegant suits</title>

      <style>
        {`
          .bear-breathe {
            animation: bear-breathe 4s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: center bottom;
          }

          @keyframes bear-breathe {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.015);
            }
          }
        `}
      </style>

      <g
        className="bear-breathe"
        stroke="#7A5A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M165.25 31.47C169.56 24.84 179.86 27.97 179.86 35.84C179.86 27.97 190.16 24.84 194.47 31.47C197.58 36.25 196.17 42.7 191.35 45.69L179.86 52.82L168.37 45.69C163.55 42.7 162.14 36.25 165.25 31.47Z"
          fill="#DA9100"
        />

        <g transform="translate(43 46) rotate(-4 99 105)">
          <circle cx="50" cy="50" r="23" fill="#EBD8BE" strokeWidth="3" />
          <circle cx="134" cy="50" r="23" fill="#EBD8BE" strokeWidth="3" />
          <circle cx="50" cy="50" r="11" fill="#F6E8D5" />
          <circle cx="134" cy="50" r="11" fill="#F6E8D5" />

          <path
            d="M92 23C125.689 23 153 49.192 153 81.5C153 113.808 125.689 140 92 140C58.311 140 31 113.808 31 81.5C31 49.192 58.311 23 92 23Z"
            fill="#EBD8BE"
            strokeWidth="3"
          />
          <ellipse cx="92" cy="102" rx="27" ry="19" fill="#F8EADB" />
          <circle cx="72" cy="80" r="4" fill="#1F1A16" />
          <circle cx="112" cy="80" r="4" fill="#1F1A16" />
          <ellipse cx="65" cy="99" rx="8" ry="5" fill="#E8A39A" opacity="0.48" />
          <ellipse cx="119" cy="99" rx="8" ry="5" fill="#E8A39A" opacity="0.48" />
          <path
            d="M92 92C96.418 92 100 94.239 100 97C100 99.761 96.418 102 92 102C87.582 102 84 99.761 84 97C84 94.239 87.582 92 92 92Z"
            fill="#1F1A16"
          />
          <path d="M92 103V110" strokeWidth="2.2" />
          <path d="M82 113C86.5 118 97.5 118 102 113" strokeWidth="2.2" />

          <path
            d="M44 182C44 145.55 65.49 122 92 122C118.51 122 140 145.55 140 182C140 220.06 118.51 238 92 238C65.49 238 44 220.06 44 182Z"
            fill="#EBD8BE"
            strokeWidth="3"
          />
          <path
            d="M50 162C55 139 70 124 92 124C114 124 129 139 134 162V232C123.5 237 109.5 239 92 239C74.5 239 60.5 237 50 232V162Z"
            fill="#1F3148"
            strokeWidth="3"
          />
          <path
            d="M77 126L92 179L107 126C102.5 124.5 97.5 124 92 124C86.5 124 81.5 124.5 77 126Z"
            fill="#FFFFFF"
            strokeWidth="2.5"
          />
          <path d="M77 127L60 162L82 157" strokeWidth="2.5" />
          <path d="M107 127L124 162L102 157" strokeWidth="2.5" />
          <path d="M92 151V226" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.45" />

          <path
            d="M49 164C33 173 26 190 31 204C36.2 218.56 51.5 219 61 207"
            fill="#EBD8BE"
            strokeWidth="3"
          />
          <path
            d="M135 164C151 173 158 190 153 204C147.8 218.56 132.5 219 123 207"
            fill="#EBD8BE"
            strokeWidth="3"
          />
          <ellipse cx="55" cy="209" rx="11" ry="13" fill="#F6E8D5" />
          <ellipse cx="129" cy="209" rx="11" ry="13" fill="#F6E8D5" />

          <path
            d="M72 231C72 219.402 80.059 210 90 210H94C103.941 210 112 219.402 112 231V239H72V231Z"
            fill="#1F3148"
            strokeWidth="3"
          />
          <ellipse cx="82" cy="239" rx="16" ry="10" fill="#EBD8BE" strokeWidth="3" />
          <ellipse cx="102" cy="239" rx="16" ry="10" fill="#EBD8BE" strokeWidth="3" />

          <path
            d="M92 137L62 122V152L92 137Z"
            fill="#B8862E"
            strokeWidth="2.6"
          />
          <path
            d="M92 137L122 122V152L92 137Z"
            fill="#7A4E2D"
            strokeWidth="2.6"
          />
          <circle cx="92" cy="137" r="7.5" fill="#9A682B" strokeWidth="2.6" />
        </g>

        <g transform="translate(167 46) rotate(4 99 105)">
          <circle cx="50" cy="50" r="23" fill="#D7BFA3" strokeWidth="3" />
          <circle cx="134" cy="50" r="23" fill="#D7BFA3" strokeWidth="3" />
          <circle cx="50" cy="50" r="11" fill="#EBD9C4" />
          <circle cx="134" cy="50" r="11" fill="#EBD9C4" />

          <path
            d="M92 23C125.689 23 153 49.192 153 81.5C153 113.808 125.689 140 92 140C58.311 140 31 113.808 31 81.5C31 49.192 58.311 23 92 23Z"
            fill="#D7BFA3"
            strokeWidth="3"
          />
          <ellipse cx="92" cy="102" rx="27" ry="19" fill="#EAD7BF" />
          <circle cx="72" cy="80" r="4" fill="#1F1A16" />
          <circle cx="112" cy="80" r="4" fill="#1F1A16" />
          <ellipse cx="65" cy="99" rx="8" ry="5" fill="#D99289" opacity="0.45" />
          <ellipse cx="119" cy="99" rx="8" ry="5" fill="#D99289" opacity="0.45" />
          <path
            d="M92 92C96.418 92 100 94.239 100 97C100 99.761 96.418 102 92 102C87.582 102 84 99.761 84 97C84 94.239 87.582 92 92 92Z"
            fill="#1F1A16"
          />
          <path d="M92 103V110" strokeWidth="2.2" />
          <path d="M82 113C86.5 118 97.5 118 102 113" strokeWidth="2.2" />

          <path
            d="M44 182C44 145.55 65.49 122 92 122C118.51 122 140 145.55 140 182C140 220.06 118.51 238 92 238C65.49 238 44 220.06 44 182Z"
            fill="#D7BFA3"
            strokeWidth="3"
          />
          <path
            d="M50 162C55 139 70 124 92 124C114 124 129 139 134 162V232C123.5 237 109.5 239 92 239C74.5 239 60.5 237 50 232V162Z"
            fill="#6B1F2D"
            strokeWidth="3"
          />
          <path
            d="M77 126L92 179L107 126C102.5 124.5 97.5 124 92 124C86.5 124 81.5 124.5 77 126Z"
            fill="#FFFFFF"
            strokeWidth="2.5"
          />
          <path d="M77 127L60 162L82 157" strokeWidth="2.5" />
          <path d="M107 127L124 162L102 157" strokeWidth="2.5" />
          <path d="M92 151V226" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.45" />

          <path
            d="M49 164C33 173 26 190 31 204C36.2 218.56 51.5 219 61 207"
            fill="#D7BFA3"
            strokeWidth="3"
          />
          <path
            d="M135 164C151 173 158 190 153 204C147.8 218.56 132.5 219 123 207"
            fill="#D7BFA3"
            strokeWidth="3"
          />
          <ellipse cx="55" cy="209" rx="11" ry="13" fill="#EBD9C4" />
          <ellipse cx="129" cy="209" rx="11" ry="13" fill="#EBD9C4" />

          <path
            d="M72 231C72 219.402 80.059 210 90 210H94C103.941 210 112 219.402 112 231V239H72V231Z"
            fill="#6B1F2D"
            strokeWidth="3"
          />
          <ellipse cx="82" cy="239" rx="16" ry="10" fill="#D7BFA3" strokeWidth="3" />
          <ellipse cx="102" cy="239" rx="16" ry="10" fill="#D7BFA3" strokeWidth="3" />

          <path
            d="M92 137L62 122V152L92 137Z"
            fill="#2B211B"
            strokeWidth="2.6"
          />
          <path
            d="M92 137L122 122V152L92 137Z"
            fill="#2B211B"
            strokeWidth="2.6"
          />
          <circle cx="92" cy="137" r="7.5" fill="#2B211B" strokeWidth="2.6" />
        </g>
      </g>
    </svg>
  );
}
