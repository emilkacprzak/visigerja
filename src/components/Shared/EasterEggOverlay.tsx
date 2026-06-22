import { useEffect, type ReactNode } from "react";

type EasterEggOverlayProps = {
  children: ReactNode;
  isExiting?: boolean;
  onClose?: () => void;
  ariaLabel?: string;
  className?: string;
};

export default function EasterEggOverlay({
  children,
  isExiting = false,
  onClose,
  ariaLabel = "Close Easter egg",
  className = "",
}: EasterEggOverlayProps) {
  useEffect(() => {
    if (!onClose) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const overlayClassName = `fixed inset-0 z-[9999] flex items-center justify-center bg-stone-950/15 px-6 backdrop-blur-[2px] ${
    isExiting ? "easter-egg-overlay-exit" : "easter-egg-overlay-enter"
  } ${className}`;

  if (onClose) {
    return (
      <>
        <OverlayAnimationStyles />
        <button
          type="button"
          className={`${overlayClassName} cursor-default`}
          aria-label={ariaLabel}
          onClick={onClose}
        >
          {children}
        </button>
      </>
    );
  }

  return (
    <>
      <OverlayAnimationStyles />
      <div className={`pointer-events-none ${overlayClassName}`}>{children}</div>
    </>
  );
}

function OverlayAnimationStyles() {
  return (
    <style>
      {`
        @keyframes easter-egg-overlay-enter {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes easter-egg-overlay-exit {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .easter-egg-overlay-enter {
          animation: easter-egg-overlay-enter 400ms ease-out 1 both;
        }

        .easter-egg-overlay-exit {
          animation: easter-egg-overlay-exit 400ms ease-in 1 both;
        }
      `}
    </style>
  );
}
