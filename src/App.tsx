import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Chapters from "./pages/Chapters";
import Oracle from "./pages/Oracle";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen relative w-full bg-shanti-bg text-shanti-ink selection:bg-shanti-gold/20 selection:text-shanti-ink font-sans transition-colors duration-500 flex flex-col">
      <Navigation />

      {/* Shared Background */}
      <div className="fixed inset-0 z-0 pointer-events-none hidden md:block opacity-[0.04] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] max-w-[2000px] max-h-[2000px] z-0 pointer-events-none transform-gpu opacity-50">
        <div className="absolute top-[10%] right-[20%] w-[40vw] h-[40vw] bg-shanti-gold/10 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[120px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[45vw] h-[45vw] bg-shanti-sage/10 rounded-full mix-blend-multiply filter blur-[120px] md:blur-[140px]" />
      </div>

      <main className="relative z-10 w-full pt-20 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/oracle" element={<Oracle />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
