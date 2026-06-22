import { useEffect, useState, type MouseEvent } from "react";

const navItems = [
  { label: "Love", href: "#home" },
  { label: "Wedding", href: "#wedding" },
  { label: "Travel", href: "#travel" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "Gallery", href: "#gallery" },
];

function isHTMLElement(element: HTMLElement | null): element is HTMLElement {
  return Boolean(element);
}

export default function Navigation() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    let animationFrame: number | undefined;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 120;
      const activeItem = navItems
        .map((item) => document.getElementById(item.href.slice(1)))
        .filter(isHTMLElement)
        .sort((first, second) => second.offsetTop - first.offsetTop)
        .find((section) => section.offsetTop <= scrollPosition);

      if (activeItem) {
        setActiveId(activeItem.id);
      }
    };

    const handleScroll = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const target = document.getElementById(href.slice(1));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
    setActiveId(target.id);
  };

  return (
    <nav
      className="fixed left-1/2 top-4 z-40 w-[calc(100%-1rem)] max-w-[42rem] -translate-x-1/2 rounded-full border border-stone-200/80 bg-stone-50/85 px-2 py-2 shadow-[0_16px_45px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:w-fit"
      aria-label="Main navigation"
    >
      <ul className="flex w-full scroll-px-2 items-center justify-start gap-1 overflow-x-auto px-0.5 [scrollbar-width:none] sm:w-auto sm:justify-center [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => {
          const id = item.href.slice(1);
          const isActive = activeId === id;

          return (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                className={`block rounded-full px-2.5 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 sm:px-4 ${
                  isActive
                    ? "bg-stone-900 text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                    : "text-stone-500 hover:bg-white/80 hover:text-stone-900"
                }`}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => handleClick(event, item.href)}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
