import { motion, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

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

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="flex flex-col items-center w-full"
    >
      {/* Hero Container - tall to allow scrolling while sticky */}
      <div className="w-full h-[150vh] relative">
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="h-screen sticky top-0 flex flex-col items-center justify-center relative w-full pt-20 overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-[0.03]">
            <span className="sanskrit text-[80vw] md:text-[80vh] text-shanti-ink select-none leading-none drop-shadow-sm">ॐ</span>
          </div>
          
          <div className="text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="sanskrit text-6xl md:text-8xl lg:text-9xl text-shanti-ink mb-6 drop-shadow-2xl font-normal tracking-tight"
            >
              श्रीमद्भगवद्गीता
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
              className="font-serif text-3xl md:text-5xl opacity-90 mb-6 text-shanti-gold"
            >
              The Divine Song
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="text-[10px] md:text-xs tracking-[1em] uppercase font-light"
            >
              A Journey Within
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="absolute bottom-12 flex flex-col items-center"
          >
            <div className="text-[10px] tracking-[0.5em] uppercase font-medium opacity-50 mb-6 animate-pulse">
              Scroll to Begin
            </div>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-16 bg-gradient-to-b from-shanti-gold/80 to-transparent" 
            />
          </motion.div>
        </motion.section>
      </div>

      {/* Philosophies Content */}
      <div className="w-full relative z-10 bg-shanti-bg shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <section className="w-full max-w-4xl mx-auto px-6 py-32 space-y-40">
          <div className="text-center mb-20">
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="font-serif text-2xl md:text-4xl leading-relaxed opacity-80"
            >
              "You have the right to perform your prescribed duty, but you are not entitled to the fruits of action."
            </motion.p>
          </div>

          {PHILOSOPHIES.map((phil, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-200px" }}
              transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="text-center flex flex-col items-center"
            >
              <div className="glass rounded-[40px] p-10 md:p-20 shadow-2xl relative overflow-hidden group border-t-shanti-gold/20 w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-shanti-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <h2 className="sanskrit text-6xl md:text-8xl mb-8 grad-text font-normal">
                  {phil.sanskrit}
                </h2>
                <h3 className="font-serif text-2xl md:text-3xl mb-8 text-shanti-gold">
                  {phil.name}
                </h3>
                <div className="uppercase tracking-[0.5em] text-[10px] opacity-50 mb-8 font-semibold">
                  {phil.meaning}
                </div>
                <div className="w-12 h-[1px] bg-shanti-ink/20 mx-auto mb-8" />
                <p className="text-lg md:text-2xl font-light italic leading-relaxed opacity-70 max-w-2xl mx-auto">
                  "{phil.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Action Panel */}
        <section className="w-full py-40 flex flex-col items-center border-t border-shanti-gold/10 bg-shanti-ink/5 overflow-hidden relative">
          <div className="absolute inset-0 flex justify-center items-center opacity-5">
            <div className="w-[100vw] h-[100vw] rounded-full border border-shanti-gold blur-sm scale-150" />
            <div className="absolute w-[80vw] h-[80vw] rounded-full border border-shanti-gold blur-md scale-150" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center gap-16 px-6">
            <h2 className="font-serif text-4xl md:text-6xl text-center opacity-90 max-w-2xl leading-tight">
              Seek the Wisdom. Ascend Your Path.
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              <button
                onClick={() => navigate('/chapters')}
                className="group flex items-center justify-center gap-4 px-10 py-5 rounded-full border border-shanti-gold/30 bg-shanti-bg/50 backdrop-blur-md hover:bg-shanti-gold/10 hover:border-shanti-gold transition-all duration-500 overflow-hidden relative"
              >
                <span className="relative z-10 text-xs tracking-[0.3em] uppercase font-medium">Read the Verses</span>
                <span className="relative z-10 text-shanti-gold group-hover:translate-x-1 transition-transform">→</span>
              </button>
              
              <button
                onClick={() => navigate('/oracle')}
                className="group flex items-center justify-center gap-4 px-10 py-5 rounded-full border border-shanti-gold/30 bg-shanti-gold text-shanti-bg hover:bg-shanti-gold/90 transition-all duration-500 shadow-xl shadow-shanti-gold/20"
              >
                <span className="text-xs tracking-[0.3em] uppercase font-bold">Ask the Oracle</span>
                <span className="group-hover:translate-x-1 transition-transform">✧</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
