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
      <title id="bears-title">Two minimalist teddy bears facing each other</title>

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

      <g className="bear-breathe">
        <g transform="translate(53 55) rotate(-6 92 105)">
          <path
            d="M102 151C126.853 151 147 171.147 147 196V222H37V196C37 171.147 57.147 151 82 151H102Z"
            fill="#EADCC8"
            stroke="#8A6A4F"
            strokeWidth="3"
          />
          <path
            d="M55.5 177.5C43.35 180.937 35 192.034 35 204.66V222H69V190.5"
            fill="#EADCC8"
            stroke="#8A6A4F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M128.5 177.5C140.65 180.937 149 192.034 149 204.66V222H115V190.5"
            fill="#EADCC8"
            stroke="#8A6A4F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="51"
            cy="68"
            r="21"
            fill="#EADCC8"
            stroke="#8A6A4F"
            strokeWidth="3"
          />
          <circle
            cx="133"
            cy="68"
            r="21"
            fill="#EADCC8"
            stroke="#8A6A4F"
            strokeWidth="3"
          />
          <circle
            cx="92"
            cy="93"
            r="55"
            fill="#EADCC8"
            stroke="#8A6A4F"
            strokeWidth="3"
          />
          <ellipse cx="92" cy="112" rx="23" ry="17" fill="#F7EFE4" />
          <circle cx="74" cy="90" r="3.6" fill="#171717" />
          <circle cx="111" cy="90" r="3.6" fill="#171717" />
          <path
            d="M92 102.5C96.142 102.5 99.5 104.739 99.5 107.5C99.5 110.261 96.142 112.5 92 112.5C87.858 112.5 84.5 110.261 84.5 107.5C84.5 104.739 87.858 102.5 92 102.5Z"
            fill="#171717"
          />
          <path
            d="M92 113V119"
            stroke="#8A6A4F"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M82 122C86 126 98 126 102 122"
            stroke="#8A6A4F"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
      </g>

      <g className="bear-breathe">
        <g transform="translate(160 55) rotate(6 92 105)">
          <path
            d="M102 151C126.853 151 147 171.147 147 196V222H37V196C37 171.147 57.147 151 82 151H102Z"
            fill="#EFE3D2"
            stroke="#8A6A4F"
            strokeWidth="3"
          />
          <path
            d="M55.5 177.5C43.35 180.937 35 192.034 35 204.66V222H69V190.5"
            fill="#EFE3D2"
            stroke="#8A6A4F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M128.5 177.5C140.65 180.937 149 192.034 149 204.66V222H115V190.5"
            fill="#EFE3D2"
            stroke="#8A6A4F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="51"
            cy="68"
            r="21"
            fill="#EFE3D2"
            stroke="#8A6A4F"
            strokeWidth="3"
          />
          <circle
            cx="133"
            cy="68"
            r="21"
            fill="#EFE3D2"
            stroke="#8A6A4F"
            strokeWidth="3"
          />
          <circle
            cx="92"
            cy="93"
            r="55"
            fill="#EFE3D2"
            stroke="#8A6A4F"
            strokeWidth="3"
          />
          <ellipse cx="92" cy="112" rx="23" ry="17" fill="#FAF3EA" />
          <circle cx="73" cy="90" r="3.6" fill="#171717" />
          <circle cx="110" cy="90" r="3.6" fill="#171717" />
          <path
            d="M92 102.5C96.142 102.5 99.5 104.739 99.5 107.5C99.5 110.261 96.142 112.5 92 112.5C87.858 112.5 84.5 110.261 84.5 107.5C84.5 104.739 87.858 102.5 92 102.5Z"
            fill="#171717"
          />
          <path
            d="M92 113V119"
            stroke="#8A6A4F"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M82 122C86 126 98 126 102 122"
            stroke="#8A6A4F"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
      </g>

      <path
        d="M172.83 116.39C176.04 111.43 183.81 113.78 183.81 119.68C183.81 113.78 191.58 111.43 194.79 116.39C197.1 119.97 196.05 124.77 192.43 127.02L183.81 132.37L175.19 127.02C171.57 124.77 170.52 119.97 172.83 116.39Z"
        fill="#B9975B"
      />
    </svg>
  );
}
