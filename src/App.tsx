import Home from "./pages/Home";
import Menu from "./pages/Menu";
import { useEffect, useState } from "react";

export default function App() {
  const [showMenu, setShowMenu] = useState(window.location.hash === "#menu");

  useEffect(() => {
    const updatePage = () => setShowMenu(window.location.hash === "#menu");
    window.addEventListener("hashchange", updatePage);
    return () => window.removeEventListener("hashchange", updatePage);
  }, []);

  useEffect(() => {
    if (showMenu) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (window.location.hash === "#celebration") {
      document.getElementById("celebration")?.scrollIntoView({ behavior: "instant" });
    }
  }, [showMenu]);
  return (
    <main className="relative min-h-svh overflow-hidden bg-stone-50">
      <div className="pointer-events-none fixed -left-48 -top-48 h-[42rem] w-[42rem] rounded-full bg-[#d8c3a5]/[0.08] blur-3xl" />
      <div className="pointer-events-none fixed -bottom-56 -right-48 h-[44rem] w-[44rem] rounded-full bg-[#b9975b]/[0.07] blur-3xl" />

      <div className="relative z-10">
        {showMenu ? <Menu /> : <Home />}
      </div>
    </main>
  );
}
