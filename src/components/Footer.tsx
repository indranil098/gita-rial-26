import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full py-16 px-8 border-t border-shanti-gold/10 bg-shanti-ink/5 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="text-xl sanskrit text-shanti-gold mb-2">श्रीमद्भगवद्गीता</Link>
          <p className="text-[10px] tracking-widest uppercase opacity-50">Eternal Wisdom</p>
        </div>
        
        <div className="flex gap-8 text-[11px] uppercase tracking-widest opacity-60">
          <Link to="/" className="hover:text-shanti-gold transition-colors">Journey</Link>
          <Link to="/chapters" className="hover:text-shanti-gold transition-colors">Chapters</Link>
          <Link to="/oracle" className="hover:text-shanti-gold transition-colors">Oracle</Link>
        </div>

        <div className="text-[10px] uppercase tracking-widest opacity-40">
          © {new Date().getFullYear()} Prashanti
        </div>
      </div>
    </footer>
  );
}
