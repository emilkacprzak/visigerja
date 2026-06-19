import Home from "./pages/Home";

export default function App() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-stone-50">
      <div className="pointer-events-none fixed -left-48 -top-48 h-[42rem] w-[42rem] rounded-full bg-[#d8c3a5]/[0.08] blur-3xl" />
      <div className="pointer-events-none fixed -bottom-56 -right-48 h-[44rem] w-[44rem] rounded-full bg-[#b9975b]/[0.07] blur-3xl" />

      <div className="relative z-10">
        <Home />
      </div>
    </main>
  );
}
