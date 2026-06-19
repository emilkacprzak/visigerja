import { wedding } from "../../data/wedding";

export default function Footer() {
  const coupleNames = `${wedding.couple.partner1} & ${wedding.couple.partner2}`;

  return (
    <footer className="px-6 py-20 text-center text-stone-500">
      <style>
        {`
          @keyframes pride-heart {
            0% {
              fill: #D4AF37;
            }
            4.545% {
              fill: #E40303;
            }
            9.091% {
              fill: #D4AF37;
            }
            13.636% {
              fill: #FF8C00;
            }
            18.182% {
              fill: #D4AF37;
            }
            22.727% {
              fill: #FFED00;
            }
            27.273% {
              fill: #D4AF37;
            }
            31.818% {
              fill: #008026;
            }
            36.364% {
              fill: #D4AF37;
            }
            40.909% {
              fill: #24408E;
            }
            45.455% {
              fill: #D4AF37;
            }
            50% {
              fill: #732982;
            }
            54.545% {
              fill: #D4AF37;
            }
            59.091% {
              fill: #5BCEFA;
            }
            63.636% {
              fill: #D4AF37;
            }
            68.182% {
              fill: #F5A9B8;
            }
            72.727% {
              fill: #D4AF37;
            }
            77.273% {
              fill: #FFFFFF;
            }
            81.818% {
              fill: #D4AF37;
            }
            86.364% {
              fill: #613915;
            }
            90.909% {
              fill: #D4AF37;
            }
            95.455% {
              fill: #000000;
            }
            100% {
              fill: #D4AF37;
            }
          }

          .pride-heart {
            animation: pride-heart 75s linear infinite;
          }
        `}
      </style>
      <div className="mx-auto flex max-w-[340px] flex-col items-center gap-4">
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            className="pride-heart"
            d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
            fill="#D4AF37"
          />
        </svg>
        <p className="text-sm font-light">Made with love</p>
        <p className="font-['Great_Vibes',cursive] text-[2.3rem] font-normal leading-none text-stone-800">
          {coupleNames}
        </p>
        <p className="text-sm font-light">See you in Copenhagen 🇩🇰</p>
      </div>
    </footer>
  );
}
