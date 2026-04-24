/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";

// Fallback Gita Data
const FALLBACK_CHAPTERS = [
  {
    chapter_number: 1,
    name: "Arjuna Visada Yoga",
    translation: "The Distress of Arjuna",
    meaning: { en: "Arjuna's Dilemma" },
    summary: { en: "Observing the armies on the battlefield of Kurukshetra." },
  },
  {
    chapter_number: 2,
    name: "Sankhya Yoga",
    translation: "The Book of Doctrines",
    meaning: { en: "Transcendental Knowledge" },
    summary: { en: "The soul is eternal; only the body dies." },
  },
  {
    chapter_number: 3,
    name: "Karma Yoga",
    translation: "The Path of Action",
    meaning: { en: "Action" },
    summary: { en: "Perform your duty without attachment to the results." },
  },
  {
    chapter_number: 4,
    name: "Jnana Karma Sanyasa Yoga",
    translation: "The Path of Knowledge",
    meaning: { en: "Wisdom" },
    summary: { en: "Spiritual knowledge and the path of action." },
  },
];

const PHILOSOPHIES = [
  {
    sanskrit: "कर्मयोग",
    name: "Karma Yoga",
    meaning: "The Path of Action",
    text: "Do your duty, but do not concern yourself with the results. The fruit of action is not your domain.",
  },
  {
    sanskrit: "ज्ञानयोग",
    name: "Jnana Yoga",
    meaning: "The Path of Wisdom",
    text: "When the mind is peaceful and free from attachment, true spiritual insight emerges.",
  },
  {
    sanskrit: "भक्तियोग",
    name: "Bhakti Yoga",
    meaning: "The Path of Devotion",
    text: "Through pure love and devotion, the highest state of peace and connection is realized.",
  },
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  // Track scroll position for the whole 1200vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [isDark]);

  useEffect(() => {
    fetch("https://vedicscriptures.github.io/chapters")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setChapters(data);
        else setChapters(FALLBACK_CHAPTERS);
      })
      .catch(() => setChapters(FALLBACK_CHAPTERS))
      .finally(() => setLoading(false));
  }, []);

  const [activeChapter, setActiveChapter] = useState<any>(null);

  // Hero Animations (0 - 0.15)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 20]);
  const heroBlur = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["blur(0px)", "blur(20px)"],
  );

  // Philosophy Animations (0.15 - 0.5)
  const getPhilTransform = (index: number) => {
    const start = 0.15 + index * 0.1;
    const peak = start + 0.05;
    const end = peak + 0.1;
    return {
      opacity: useTransform(
        scrollYProgress,
        [start, peak, end - 0.05, end],
        [0, 1, 1, 0],
      ),
      z: useTransform(scrollYProgress, [start, end], [-1000, 500]),
      rotateX: useTransform(scrollYProgress, [start, end], [45, -20]),
    };
  };

  // Gita Horizon (0.5 - 0.9)
  const gitaOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.5, 0.9, 0.95],
    [0, 1, 1, 0],
  );
  const gitaX = useTransform(scrollYProgress, [0.45, 0.9], ["60vw", "-550vw"]);
  const gitaZ = useTransform(scrollYProgress, [0.45, 0.5], [-500, 0]);

  // Footer (0.9 - 1.0)
  const footerOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  const footerY = useTransform(scrollYProgress, [0.9, 1], [100, 0]);

  return (
    <div
      ref={containerRef}
      className="h-[800vh] md:h-[1800vh] relative w-full bg-shanti-bg text-shanti-ink selection:bg-shanti-gold/20 selection:text-shanti-ink font-sans transition-colors duration-500"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center pointer-events-none">
        <span className="text-xs tracking-[0.4em] uppercase font-light opacity-80 pointer-events-auto">
          प्रशान्ति
        </span>
        <div className="flex gap-6 pointer-events-auto items-center">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-full hover:bg-shanti-ink/5 transition-colors group"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5 opacity-80 group-hover:opacity-100 group-hover:text-shanti-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 opacity-80 group-hover:opacity-100 group-hover:text-shanti-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Fixed 3D Viewport window */}
      <motion.div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center [transform-style:preserve-3d] [perspective:1400px]">
        {/* Aesthetic Background Sub-layers */}
        <div
          className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-multiply hidden md:block"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute flex items-center justify-center w-[150vw] h-[150vw] max-w-[2000px] max-h-[2000px] z-0 pointer-events-none will-change-transform transform-gpu"
        >
          <div className="absolute top-[10%] right-[20%] w-[40vw] h-[40vw] bg-shanti-gold/15 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[120px]" />
          <div className="absolute bottom-[10%] left-[20%] w-[45vw] h-[45vw] bg-shanti-sage/15 rounded-full mix-blend-multiply filter blur-[120px] md:blur-[140px]" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-[0.02]">
          <span className="sanskrit text-[120vh] text-shanti-ink select-none leading-none drop-shadow-sm">
            ॐ
          </span>
        </div>

        {/* HERO SECTION */}
        <motion.section
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            filter: heroBlur,
            pointerEvents: useTransform(heroOpacity, (val) =>
              val > 0 ? "auto" : "none",
            ),
          }}
          className="absolute inset-0 flex flex-col items-center justify-center [transform-style:preserve-3d]"
        >
          <div
            className="text-center"
            style={{ transform: "translateZ(50px)" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="sanskrit text-6xl md:text-9xl text-shanti-ink mb-6 drop-shadow-2xl font-normal"
            >
              प्रशान्ति
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1, duration: 2 }}
              className="text-xs md:text-sm tracking-[1em] uppercase font-light"
            >
              Supreme Peace
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            className="absolute bottom-12 flex flex-col items-center"
          >
            <button
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight * 1.5,
                  behavior: "smooth",
                });
              }}
              className="group flex flex-col items-center gap-6 cursor-pointer"
            >
              <div className="text-[10px] tracking-[0.5em] uppercase font-medium opacity-50 group-hover:opacity-100 group-hover:text-shanti-gold transition-all duration-500">
                Begin Journey
              </div>
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-shanti-ink/20 group-hover:border-shanti-gold/50 group-hover:bg-shanti-gold/5 transition-all duration-500">
                <motion.div
                  animate={{ y: [-2, 4, -2] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-[1px] h-5 bg-shanti-ink/50 group-hover:bg-shanti-gold transition-colors duration-500"
                />
              </div>
            </button>
          </motion.div>
        </motion.section>

        {/* PHILOSOPHY PATHS (3D Scroll sequence) */}
        {PHILOSOPHIES.map((phil, i) => {
          const transforms = getPhilTransform(i);
          return (
            <motion.div
              key={i}
              style={{
                opacity: transforms.opacity,
                z: transforms.z,
                rotateX: transforms.rotateX,
                pointerEvents: useTransform(transforms.opacity, (val) =>
                  val > 0.5 ? "auto" : "none",
                ),
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="max-w-2xl px-6 text-center glass rounded-2xl p-12 lg:p-24 shadow-2xl">
                <h2 className="sanskrit text-5xl md:text-7xl mb-4 grad-text font-normal">
                  {phil.sanskrit}
                </h2>
                <h3 className="font-serif text-xl md:text-3xl mb-8 opacity-80">
                  {phil.name}
                </h3>
                <div className="w-12 h-[1px] bg-shanti-ink/20 mx-auto mb-8" />
                <p className="text-lg md:text-xl font-light italic leading-relaxed opacity-70">
                  "{phil.text}"
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* BHAGAVAD GITA CAROUSEL */}
        <motion.section
          style={{
            opacity: gitaOpacity,
            z: gitaZ,
            pointerEvents: useTransform(gitaOpacity, (val) =>
              val > 0.1 ? "auto" : "none",
            ),
          }}
          className="absolute inset-0 flex flex-col overflow-hidden [transform-style:preserve-3d]"
        >
          <div className="absolute top-16 left-0 right-0 z-20 text-center pointer-events-none">
            <h2 className="sanskrit text-5xl md:text-6xl mb-4 grad-text drop-shadow-lg font-normal mb-2">
              श्रीमद्भगवद्गीता
            </h2>
            <h3 className="font-serif text-2xl md:text-3xl opacity-80 text-shanti-gold">
              The Bhagavad Gita
            </h3>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] mt-6 opacity-50 text-shanti-ink">
              18 Chapters of Wisdom
            </p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
            {loading ? (
              <div className="w-full text-center opacity-50 tracking-widest text-sm uppercase">
                Awakening truths...
              </div>
            ) : (
              chapters.map((chapter, i) => (
                <ChapterCard
                  key={i}
                  chapter={chapter}
                  index={i}
                  total={chapters.length}
                  scrollYProgress={scrollYProgress}
                  onClick={() => setActiveChapter(chapter)}
                />
              ))
            )}
          </div>
        </motion.section>

        {/* FOOTER SECTION */}
        <motion.section
          style={{
            opacity: footerOpacity,
            y: footerY,
            pointerEvents: useTransform(footerOpacity, (val) =>
              val > 0.5 ? "auto" : "none",
            ),
          }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-shanti-bg"
        >
          <div className="text-center space-y-12">
            <h2 className="sanskrit text-4xl md:text-6xl opacity-80 leading-relaxed font-normal">
              ॐ शान्तिः शान्तिः शान्तिः
            </h2>
            <div className="w-12 h-[1px] bg-shanti-ink/20 mx-auto" />
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.8em] uppercase opacity-40 font-light">
                Crafted for Peace
              </p>
              <p className="text-[9px] font-light opacity-20">
                प्रशान्ति — 2026
              </p>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-16 group inline-flex flex-col items-center gap-4 cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-shanti-ink/20 group-hover:border-shanti-gold/40 group-hover:bg-shanti-gold/5 transition-all duration-500">
                <span className="text-sm opacity-50 group-hover:opacity-100 group-hover:text-shanti-gold group-hover:-translate-y-0.5 transition-all duration-500">
                  ↑
                </span>
              </div>
              <span className="text-[9px] tracking-[0.4em] uppercase opacity-40 group-hover:opacity-100 group-hover:text-shanti-gold transition-colors duration-500">
                Return to Surface
              </span>
            </button>
          </div>
        </motion.section>

        <AnimatePresence>
          {activeChapter && (
            <ChapterModal
              chapter={activeChapter}
              onClose={() => setActiveChapter(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const ChapterModal = ({
  chapter,
  onClose,
}: {
  chapter: any;
  onClose: () => void;
}) => {
  const [currentVerse, setCurrentVerse] = useState(1);
  const [verseData, setVerseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://vedicscriptures.github.io/slok/${chapter.chapter_number}/${currentVerse}`,
    )
      .then((r) => r.json())
      .then((data) => setVerseData(data))
      .catch(() => setVerseData(null))
      .finally(() => setLoading(false));
  }, [chapter, currentVerse]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-shanti-bg/95 backdrop-blur-2xl"
    >
      <div
        className="absolute inset-0 pointer-events-auto"
        onClick={onClose}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass rounded-2xl p-8 md:p-16 shadow-2xl flex flex-col items-center text-center !backdrop-blur-3xl !border-shanti-gold/20"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-[10px] uppercase tracking-[0.3em] font-medium text-shanti-gold/60 hover:text-shanti-gold transition-colors duration-300"
        >
          Close
        </button>

        <div className="w-full flex flex-col md:flex-row gap-12 md:gap-20 items-start text-left mt-4">
          {/* Left Column: Chapter Info */}
          <div className="flex-1 md:sticky top-0">
            <p className="text-xs tracking-[0.6em] uppercase text-shanti-gold/60 mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-shanti-gold/30" />
              Chapter {chapter.chapter_number}
            </p>

            <h2 className="sanskrit text-5xl md:text-6xl grad-text font-normal mb-4 drop-shadow-lg">
              {chapter.name}
            </h2>
            <h3 className="font-serif text-2xl md:text-3xl opacity-90 mb-10 text-shanti-ink/90">
              {chapter.translation}
            </h3>

            <div className="w-16 h-[1px] bg-shanti-gold/30 mb-8" />

            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-shanti-gold/60 mb-4 font-medium">
                Essence
              </p>
              <p className="font-light leading-relaxed text-shanti-ink/70 text-sm md:text-base text-justify">
                {chapter.summary?.en ||
                  chapter.meaning?.en ||
                  "No summary available."}
              </p>
            </div>

            <div className="flex gap-4 text-[10px] tracking-widest uppercase text-shanti-gold/80 font-medium">
              <span>{chapter.verses_count} Verses Collection</span>
            </div>
          </div>

          {/* Right Column: Verse Reader */}
          <div className="flex-1 w-full min-h-[450px] flex flex-col bg-shanti-ink/5 rounded-2xl p-6 md:p-10 border border-shanti-gold/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-shanti-gold/5 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-shanti-gold/5 blur-[80px]" />

            <div className="flex justify-between items-center w-full mb-10 opacity-70 border-b border-shanti-gold/20 pb-6 relative z-10">
              <button
                onClick={() => setCurrentVerse(Math.max(1, currentVerse - 1))}
                disabled={currentVerse === 1 || loading}
                className="text-[10px] uppercase tracking-[0.3em] font-medium hover:text-shanti-gold disabled:opacity-30 transition-all"
              >
                ← Prev
              </button>
              <span className="text-[10px] tracking-[0.3em] uppercase text-shanti-gold/80 font-medium">
                Verse {currentVerse} / {chapter.verses_count}
              </span>
              <button
                onClick={() =>
                  setCurrentVerse(
                    Math.min(chapter.verses_count, currentVerse + 1),
                  )
                }
                disabled={currentVerse === chapter.verses_count || loading}
                className="text-[10px] uppercase tracking-[0.3em] font-medium hover:text-shanti-gold disabled:opacity-30 transition-all"
              >
                Next →
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              {loading ? (
                <div className="opacity-50 text-[10px] tracking-[0.4em] uppercase text-shanti-gold text-center animate-pulse">
                  Meditating on verses...
                </div>
              ) : verseData ? (
                <motion.div
                  key={currentVerse}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full flex flex-col h-full"
                >
                  <p className="sanskrit text-2xl md:text-3xl whitespace-pre-wrap leading-[1.8] grad-text mb-8 text-center drop-shadow-lg">
                    {verseData.slok}
                  </p>
                  <p className="font-serif italic text-sm md:text-base opacity-70 mb-10 whitespace-pre-wrap text-center text-shanti-ink/90">
                    {verseData.transliteration}
                  </p>

                  <div className="mt-auto pt-8 border-t border-shanti-gold/10">
                    {verseData.siva?.et ? (
                      <p className="font-light text-sm md:text-base leading-relaxed text-shanti-ink/80 text-justify">
                        {verseData.siva.et}
                      </p>
                    ) : verseData.tej?.ht ? (
                      <p className="font-light text-sm md:text-base leading-relaxed text-shanti-ink/80 text-justify">
                        {verseData.tej.ht}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              ) : (
                <div className="opacity-50 text-xs tracking-widest uppercase text-center text-red-300">
                  Failed to awaken verse
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ChapterCard = ({
  chapter,
  index,
  total,
  scrollYProgress,
  onClick,
}: any) => {
  // Logic for 3D positioning
  const centerProgress = 0.45 + 0.45 * (index / Math.max(1, total - 1));
  const cardRange = 0.45 / Math.max(1, total - 1);

  const distance = useTransform(scrollYProgress, (val: number) => {
    return (val - centerProgress) / cardRange;
  });

  const x = useTransform(
    distance,
    [-3, -1, 0, 1, 3],
    ["120vw", "40vw", "0vw", "-40vw", "-120vw"],
  );
  const z = useTransform(
    distance,
    [-4, -2, 0, 2, 4],
    [-2400, -800, 100, -800, -2400],
  );
  const rotateY = useTransform(
    distance,
    [-3, -1, 0, 1, 3],
    [40, 20, 0, -20, -40],
  );
  const opacity = useTransform(
    distance,
    [-3, -1.5, -0.5, 0, 0.5, 1.5, 3],
    [0, 0.3, 0.8, 1, 0.8, 0.3, 0],
  );
  const scale = useTransform(distance, [-2, 0, 2], [0.8, 1, 0.8]);
  const pointerEvents = useTransform(distance, (val: number) =>
    val > -0.5 && val < 0.5 ? "auto" : "none",
  );

  return (
    <motion.div
      onClick={onClick}
      style={{ x, z, rotateY, opacity, scale, pointerEvents }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="absolute flex-shrink-0 w-[85vw] max-w-[450px] md:max-w-[500px] h-[65vh] max-h-[600px] md:max-h-[700px] glass rounded-3xl p-8 md:p-12 cursor-pointer flex flex-col group overflow-hidden border border-shanti-gold/10 hover:border-shanti-gold/50 transition-colors duration-500 shadow-2xl shadow-shanti-gold/5 hover:shadow-shanti-gold/20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-shanti-bg/95 pointer-events-none z-0" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-shanti-gold/10 rounded-full blur-3xl group-hover:bg-shanti-gold/20 transition-all duration-700 z-0" />

      <div className="relative z-10 flex-1 flex flex-col h-full pointer-events-none">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold text-shanti-gold">
              Chapter
            </span>
            <span className="font-serif text-3xl opacity-100 drop-shadow-md">
              {chapter.chapter_number}
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-shanti-gold/40 to-transparent" />
          </div>

          <h4 className="sanskrit text-4xl md:text-5xl mb-4 grad-text drop-shadow-lg font-normal leading-tight">
            {chapter.name}
          </h4>
          <h5 className="font-serif text-xl opacity-90 mb-8 text-shanti-ink">
            {chapter.translation}
          </h5>

          <p className="font-light text-sm leading-relaxed text-shanti-ink/50 line-clamp-6 text-justify">
            {chapter.summary?.en ||
              chapter.meaning?.en ||
              "In search of truth and profound realization."}
          </p>
        </div>

        <div className="pt-6 mt-6 flex items-center justify-between border-t border-shanti-gold/20 group-hover:border-shanti-gold/50 transition-colors duration-500">
          <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-shanti-gold/60 group-hover:text-shanti-gold transition-colors duration-500">
            Explore Verses
          </span>
          <div className="flex items-center justify-center w-12 h-12 rounded-full border border-shanti-gold/20 bg-shanti-gold/5 group-hover:bg-shanti-gold/20 transition-all duration-500">
            <span className="text-sm text-shanti-gold group-hover:translate-x-1 transition-all duration-500">
              →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
