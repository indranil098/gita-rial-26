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

  // Track scroll position for the whole 1200vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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
      className="h-[1800vh] relative w-full bg-shanti-bg text-shanti-ink selection:bg-shanti-gold/20 selection:text-shanti-ink font-sans"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-multiply pointer-events-none">
        <span className="text-xs tracking-[0.4em] uppercase font-light opacity-80 pointer-events-auto">
          प्रशान्ति
        </span>
        <div className="flex gap-6 pointer-events-auto text-xs tracking-widest uppercase opacity-50">
          The Gita API
        </div>
      </nav>

      {/* Fixed 3D Viewport window */}
      <motion.div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center [transform-style:preserve-3d] [perspective:1000px]">
        {/* Aesthetic Background Sub-layers */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-multiply" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute flex items-center justify-center w-[150vw] h-[150vw] max-w-[2000px] max-h-[2000px] z-0 pointer-events-none"
        >
          <div className="absolute top-[10%] right-[20%] w-[40vw] h-[40vw] bg-shanti-gold/15 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[120px]" />
          <div className="absolute bottom-[10%] left-[20%] w-[45vw] h-[45vw] bg-shanti-sage/15 rounded-full mix-blend-multiply filter blur-[120px] md:blur-[140px]" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-[0.02]">
          <span className="sanskrit text-[120vh] text-shanti-ink select-none leading-none drop-shadow-sm">ॐ</span>
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
                window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' });
              }}
              className="group flex flex-col items-center gap-6 cursor-pointer"
            >
              <div className="text-[10px] tracking-[0.5em] uppercase font-medium opacity-50 group-hover:opacity-100 group-hover:text-shanti-gold transition-all duration-500">
                Begin Journey
              </div>
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-shanti-ink/20 group-hover:border-shanti-gold/50 group-hover:bg-shanti-gold/5 transition-all duration-500">
                <motion.div
                  animate={{ y: [-2, 4, -2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
              val > 0 ? "auto" : "none",
            ),
          }}
          className="absolute inset-0 flex flex-col pt-32 pb-16 px-12 overflow-hidden"
        >
          <div className="text-center mb-16">
            <h2 className="sanskrit text-4xl mb-2">श्रीमद्भगवद्गीता</h2>
            <h3 className="font-serif text-2xl opacity-60">
              The Bhagavad Gita
            </h3>
            <p className="text-xs uppercase tracking-widest mt-4 opacity-40">
              18 Chapters of Wisdom
            </p>
          </div>

          <div className="flex-1 w-full flex items-center relative">
            {loading ? (
              <div className="w-full text-center opacity-50 tracking-widest text-sm uppercase">
                Awakening truths...
              </div>
            ) : (
              <motion.div
                style={{ x: gitaX }}
                className="flex gap-8 md:gap-16 items-center px-[20vw]"
              >
                {chapters.map((chapter, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, y: -10 }}
                    onClick={() => setActiveChapter(chapter)}
                    className="flex-shrink-0 w-[320px] md:w-[450px] h-[450px] md:h-[500px] glass rounded-2xl p-10 cursor-pointer flex flex-col group relative overflow-hidden"
                  >
                    {/* Decorative Background Element */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-shanti-gold/10 rounded-full blur-3xl group-hover:bg-shanti-gold/20 transition-colors duration-700" />

                    <div className="flex-1 flex flex-col relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                        <span className="text-xs tracking-[0.4em] uppercase font-light opacity-50">
                          Chapter
                        </span>
                        <span className="font-serif text-3xl opacity-80">
                          {chapter.chapter_number}
                        </span>
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-shanti-ink/20 to-transparent" />
                      </div>

                      <h4 className="sanskrit text-3xl md:text-4xl mb-4 grad-text font-normal">
                        {chapter.name}
                      </h4>
                      <h5 className="font-serif text-lg md:text-xl opacity-80 mb-6">
                        {chapter.translation}
                      </h5>

                      <p className="font-light text-sm leading-relaxed opacity-70 line-clamp-6 text-justify">
                        {chapter.summary?.en ||
                          chapter.meaning?.en ||
                          "In search of truth and profound realization."}
                      </p>
                    </div>

                    <div className="relative z-10 mt-auto flex items-center justify-between pt-6 border-t border-shanti-ink/10 group-hover:border-shanti-gold/30 transition-colors duration-500">
                      <span className="text-xs tracking-[0.2em] uppercase font-medium opacity-50 group-hover:opacity-100 group-hover:text-shanti-gold transition-colors duration-500">
                        Read Chapter
                      </span>
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-shanti-ink/10 bg-shanti-ink/5 group-hover:border-shanti-gold/40 group-hover:bg-shanti-gold/10 transition-all duration-500">
                        <span className="text-sm opacity-50 group-hover:opacity-100 group-hover:text-shanti-gold group-hover:translate-x-0.5 transition-all duration-500">
                          →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
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
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-shanti-bg/90 backdrop-blur-xl"
    >
      <div
        className="absolute inset-0 pointer-events-auto"
        onClick={onClose}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(194, 168, 120, 0.1) 0%, transparent 60%)",
        }}
      />
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass rounded-2xl p-8 md:p-16 shadow-2xl flex flex-col items-center text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-xs uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
        >
          Close
        </button>

        <div className="w-full flex flex-col md:flex-row gap-12 items-start text-left">
          {/* Left Column: Chapter Info */}
          <div className="flex-1 md:sticky top-0">
            <p className="text-xs tracking-[0.6em] uppercase opacity-40 mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-shanti-ink/20" />
              Chapter {chapter.chapter_number}
            </p>

            <h2 className="sanskrit text-4xl md:text-6xl grad-text font-normal mb-2">
              {chapter.name}
            </h2>
            <h3 className="font-serif text-2xl md:text-3xl opacity-80 mb-8">
              {chapter.translation}
            </h3>

            <div className="w-16 h-[1px] bg-shanti-ink/10 mb-8" />

            <div className="mb-8">
              <p className="text-sm uppercase tracking-widest opacity-40 mb-4">
                Essence
              </p>
              <p className="font-light leading-relaxed opacity-80 text-sm md:text-base text-justify">
                {chapter.summary?.en ||
                  chapter.meaning?.en ||
                  "No summary available."}
              </p>
            </div>

            <div className="flex gap-4 opacity-40 text-xs tracking-widest uppercase">
              <span>{chapter.verses_count} Verses</span>
            </div>
          </div>

          {/* Right Column: Verse Reader */}
          <div className="flex-1 w-full min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center w-full mb-8 opacity-50 border-b border-shanti-ink/10 pb-4">
              <button
                onClick={() => setCurrentVerse(Math.max(1, currentVerse - 1))}
                disabled={currentVerse === 1 || loading}
                className="text-xs uppercase tracking-widest hover:opacity-100 disabled:opacity-30 transition-opacity"
              >
                ← Prev
              </button>
              <span className="text-xs tracking-widest uppercase">
                Verse {currentVerse} / {chapter.verses_count}
              </span>
              <button
                onClick={() =>
                  setCurrentVerse(
                    Math.min(chapter.verses_count, currentVerse + 1),
                  )
                }
                disabled={currentVerse === chapter.verses_count || loading}
                className="text-xs uppercase tracking-widest hover:opacity-100 disabled:opacity-30 transition-opacity"
              >
                Next →
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {loading ? (
                <div className="opacity-50 text-xs tracking-widest uppercase text-center animate-pulse">
                  Meditating on verses...
                </div>
              ) : verseData ? (
                <motion.div
                  key={currentVerse}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <p className="sanskrit text-2xl md:text-4xl whitespace-pre-wrap leading-relaxed grad-text mb-8 text-center drop-shadow-sm">
                    {verseData.slok}
                  </p>
                  <p className="font-serif italic text-sm md:text-base opacity-60 mb-8 whitespace-pre-wrap text-center">
                    {verseData.transliteration}
                  </p>
                  {verseData.siva?.et ? (
                    <p className="font-light text-sm md:text-lg leading-relaxed opacity-80 text-justify border-t border-shanti-ink/10 pt-8 mt-4">
                      {verseData.siva.et}
                    </p>
                  ) : verseData.tej?.ht ? (
                    <p className="font-light text-sm md:text-lg leading-relaxed opacity-80 text-justify border-t border-shanti-ink/10 pt-8 mt-4">
                      {verseData.tej.ht}
                    </p>
                  ) : null}
                </motion.div>
              ) : (
                <div className="opacity-50 text-xs tracking-widest uppercase text-center">
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
