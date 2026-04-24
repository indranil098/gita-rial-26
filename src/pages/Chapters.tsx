import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const FALLBACK_CHAPTERS = [
  {
    chapter_number: 1,
    name: "Arjuna Visada Yoga",
    translation: "The Distress of Arjuna",
    meaning: { en: "Arjuna's Dilemma" },
    summary: { en: "Observing the armies on the battlefield of Kurukshetra." },
    verses_count: 47
  },
  {
    chapter_number: 2,
    name: "Sankhya Yoga",
    translation: "The Book of Doctrines",
    meaning: { en: "Transcendental Knowledge" },
    summary: { en: "The soul is eternal; only the body dies." },
    verses_count: 72
  },
];

export default function Chapters() {
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState<any>(null);

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-32 flex flex-col items-center"
    >
      <div className="text-center mb-16 px-6 relative z-10">
        <h2 className="sanskrit text-5xl md:text-7xl grad-text drop-shadow-lg font-normal mb-6">
          अध्याय
        </h2>
        <h3 className="font-serif text-3xl md:text-4xl opacity-90 text-shanti-gold">
          The Eighteen Chapters
        </h3>
        <p className="text-xs uppercase tracking-[0.4em] mt-6 opacity-60 text-shanti-ink/80">
          Scroll horizontally to read
        </p>
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center opacity-50 tracking-widest text-sm uppercase animate-pulse">
          Awakening truths...
        </div>
      ) : (
        <div className="w-full flex-1 relative flex items-center py-10">
          <div className="w-full overflow-x-auto flex gap-6 md:gap-12 px-8 md:px-[15vw] pb-16 pt-8 snap-x snap-mandatory scrollbar-hide hide-scrollbar" style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
            {chapters.map((chapter: any, i: number) => (
              <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[480px]">
                <ChapterCard chapter={chapter} onClick={() => setActiveChapter(chapter)} />
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {activeChapter && (
          <ChapterModal
            chapter={activeChapter}
            onClose={() => setActiveChapter(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ChapterCard({ chapter, onClick }: any) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="w-full h-full min-h-[550px] glass rounded-[40px] p-8 md:p-12 cursor-pointer flex flex-col group overflow-hidden border border-shanti-gold/10 hover:border-shanti-gold/50 transition-colors duration-500 shadow-2xl relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-shanti-bg/50 to-shanti-bg/95 pointer-events-none z-0" />
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-shanti-gold/10 rounded-full blur-3xl group-hover:bg-shanti-gold/20 transition-all duration-700 z-0" />

      <div className="relative z-10 flex-1 flex flex-col h-full pointer-events-none">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold text-shanti-gold">
              Chapter
            </span>
            <span className="font-serif text-4xl opacity-100 drop-shadow-md text-shanti-ink">
              {chapter.chapter_number}
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-shanti-gold/40 to-transparent" />
          </div>

          <h4 className="sanskrit text-4xl md:text-5xl mb-6 grad-text drop-shadow-lg font-normal leading-tight">
            {chapter.name}
          </h4>
          <h5 className="font-serif text-xl md:text-2xl opacity-90 mb-8 text-shanti-gold">
            {chapter.translation}
          </h5>

          <p className="font-light text-sm md:text-base leading-relaxed text-shanti-ink/60 line-clamp-6 text-justify">
            {chapter.summary?.en || chapter.meaning?.en || "In search of truth and profound realization."}
          </p>
        </div>

        <div className="pt-8 mt-8 flex items-center justify-between border-t border-shanti-gold/20 group-hover:border-shanti-gold/50 transition-colors duration-500">
          <span className="text-xs tracking-[0.3em] uppercase font-medium text-shanti-gold/60 group-hover:text-shanti-gold transition-colors duration-500">
            Explore Verses
          </span>
          <div className="flex items-center justify-center w-14 h-14 rounded-full border border-shanti-gold/20 bg-shanti-gold/5 group-hover:bg-shanti-gold/20 transition-all duration-500">
            <span className="text-lg text-shanti-gold group-hover:translate-x-1 transition-all duration-500">
              →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
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
    fetch(`https://vedicscriptures.github.io/slok/${chapter.chapter_number}/${currentVerse}`)
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-shanti-bg/95 backdrop-blur-3xl"
    >
      <div className="absolute inset-0 pointer-events-auto" onClick={onClose} style={{ background: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 80%)" }} />
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto glass rounded-[40px] p-8 md:p-16 shadow-2xl flex flex-col items-center border border-shanti-gold/20 hide-scrollbar"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:top-10 md:right-10 text-[10px] uppercase tracking-[0.3em] font-medium text-shanti-gold/60 hover:text-shanti-gold transition-colors duration-300 bg-shanti-ink/5 p-4 rounded-full"
        >
          Close
        </button>

        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-24 items-start text-left mt-10 md:mt-4">
          <div className="flex-1 lg:sticky top-0">
            <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-shanti-gold/60 mb-6 flex items-center gap-4 font-semibold">
              <span className="w-8 h-[1px] bg-shanti-gold/30" />
              Chapter {chapter.chapter_number}
            </p>

            <h2 className="sanskrit text-5xl md:text-7xl grad-text font-normal mb-6 drop-shadow-lg leading-tight">
              {chapter.name}
            </h2>
            <h3 className="font-serif text-2xl md:text-3xl opacity-90 mb-10 text-shanti-gold filter drop-shadow-sm">
              {chapter.translation}
            </h3>

            <div className="w-16 h-[1px] bg-shanti-gold/30 mb-8" />

            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-shanti-gold/60 mb-4 font-semibold">
                Essence
              </p>
              <p className="font-light leading-relaxed text-shanti-ink/70 text-sm md:text-base text-justify">
                {chapter.summary?.en || chapter.meaning?.en || "No summary available."}
              </p>
            </div>

            <div className="flex gap-4 text-[10px] tracking-widest uppercase text-shanti-gold/80 font-medium bg-shanti-ink/5 p-4 rounded-2xl w-fit">
              <span>{chapter.verses_count} Verses Collection</span>
            </div>
          </div>

          <div className="flex-[1.2] w-full min-h-[500px] flex flex-col bg-shanti-ink-[0.02] rounded-[32px] p-6 md:p-12 border border-shanti-gold/10 relative overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 w-80 h-80 bg-shanti-gold/5 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-shanti-gold/5 blur-[100px]" />

            <div className="flex justify-between items-center w-full mb-12 opacity-80 border-b border-shanti-gold/10 pb-6 relative z-10">
              <button
                onClick={() => setCurrentVerse(Math.max(1, currentVerse - 1))}
                disabled={currentVerse === 1 || loading}
                className="text-[10px] uppercase tracking-[0.3em] font-medium hover:text-shanti-gold disabled:opacity-30 transition-all flex items-center gap-2"
              >
                ← Prev
              </button>
              <span className="text-[10px] tracking-[0.4em] uppercase text-shanti-gold font-semibold bg-shanti-gold/10 px-4 py-2 rounded-full hidden md:inline-block">
                Verse {currentVerse} / {chapter.verses_count}
              </span>
              <span className="text-[10px] tracking-[0.4em] uppercase text-shanti-gold font-semibold md:hidden">
                {currentVerse} / {chapter.verses_count}
              </span>
              <button
                onClick={() => setCurrentVerse(Math.min(chapter.verses_count, currentVerse + 1))}
                disabled={currentVerse === chapter.verses_count || loading}
                className="text-[10px] uppercase tracking-[0.3em] font-medium hover:text-shanti-gold disabled:opacity-30 transition-all flex items-center gap-2"
              >
                Next →
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10 py-8">
              {loading ? (
                 <div className="flex flex-col items-center gap-6 opacity-50">
                   <div className="w-8 h-8 border-2 border-shanti-gold border-t-transparent rounded-full animate-spin" />
                   <div className="text-[10px] tracking-[0.4em] uppercase text-shanti-gold text-center animate-pulse">Meditating...</div>
                 </div>
              ) : verseData ? (
                <motion.div
                  key={currentVerse}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full flex flex-col h-full items-center justify-center text-center"
                >
                  <p className="sanskrit text-3xl md:text-5xl whitespace-pre-wrap leading-[1.6] grad-text mb-10 drop-shadow-lg w-full">
                    {verseData.slok}
                  </p>
                  <p className="font-serif italic text-base md:text-xl opacity-70 mb-12 whitespace-pre-wrap text-shanti-ink/90 w-full">
                    {verseData.transliteration}
                  </p>

                  <div className="mt-auto pt-10 border-t border-shanti-gold/10 w-full relative">
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-shanti-bg px-4 text-[10px] uppercase tracking-[0.2em] text-shanti-gold/40">Meaning</div>
                    {verseData.siva?.et ? (
                      <p className="font-light text-base md:text-lg leading-relaxed text-shanti-ink/80 max-w-2xl mx-auto">
                        "{verseData.siva.et}"
                      </p>
                    ) : verseData.tej?.ht ? (
                      <p className="font-light text-base md:text-lg leading-relaxed text-shanti-ink/80 max-w-2xl mx-auto">
                        "{verseData.tej.ht}"
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
}
