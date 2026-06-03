import { useEffect, useState } from "react";
import { HERO_CAROUSEL_IMAGES, TRANSLATE_DICTIONARY } from "../data";
import { ChevronLeft, ChevronRight, Sparkles, Calendar, ShoppingBag } from "lucide-react";

interface HeroCarouselProps {
  currentLang: string;
  isDarkMode: boolean;
  onBookClick: () => void;
  onOrderClick: () => void;
}

export default function HeroCarousel({ currentLang, isDarkMode, onBookClick, onOrderClick }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CAROUSEL_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_CAROUSEL_IMAGES.length) % HERO_CAROUSEL_IMAGES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_CAROUSEL_IMAGES.length);
  };

  const welcomeText = TRANSLATE_DICTIONARY.welcome[currentLang] || TRANSLATE_DICTIONARY.welcome["en"];
  const taglineText = TRANSLATE_DICTIONARY.tagline[currentLang] || TRANSLATE_DICTIONARY.tagline["en"];
  const bookText = TRANSLATE_DICTIONARY.bookNow[currentLang] || TRANSLATE_DICTIONARY.bookNow["en"];
  const orderText = TRANSLATE_DICTIONARY.orderNow[currentLang] || TRANSLATE_DICTIONARY.orderNow["en"];

  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Slideshow */}
      {HERO_CAROUSEL_IMAGES.map((img, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
            }`}
          >
            <img
              src={img.url}
              alt=""
              className="w-full h-full object-cover brightness-[0.35]"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      })}

      {/* Elegant Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2F4A2F]/40 via-black/25 to-[#2F4A2F]/70 z-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 z-20" />

      {/* Decorative Thai Leaves/Lotus details behind content (opacity 5-10% as requested) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] z-20 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80')] mix-blend-overlay backdrop-blur-3xl" />

      {/* Floating Sparkles decorative effects */}
      <div className="absolute inset-x-0 top-0 bottom-40 flex items-center justify-center overflow-hidden pointer-events-none z-30">
        <div className="absolute w-[500px] h-[500px] bg-[#D8BC7B]/5 rounded-full filter blur-[120px] animate-pulse" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-30 max-w-4xl text-center px-4 mt-20 flex flex-col items-center">
        {/* Superior Label */}
        <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#D8BC7B]/40 bg-[#2F4A2F]/60 backdrop-blur-md shadow-lg animate-in slide-in-from-top-6 duration-1000">
          <Sparkles size={14} className="text-[#D8BC7B]" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8BC7B] uppercase">
            5-Star standard Thai gastronomy
          </span>
        </div>

        {/* Dynamic Multi-lingual Hero Titles */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-tight font-sans tracking-tight mb-6">
          <span className="block font-medium text-white">THE FAMILY</span>
          <span className="block text-2xl sm:text-4xl font-light text-[#D8BC7B] mt-2 font-mono italic">
            {welcomeText}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-stone-200 font-light max-w-2xl leading-relaxed mb-10 max-h-24 overflow-hidden">
          {taglineText}
        </p>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md">
          <button
            id="hero-book-btn"
            onClick={onBookClick}
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D8BC7B] to-[#C1A25B] text-[#2F4A2F] font-bold text-sm tracking-widest uppercase shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            <Calendar size={16} />
            <span>{bookText}</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>

          <button
            id="hero-order-btn"
            onClick={onOrderClick}
            className="flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/60 bg-white/10 backdrop-blur-md text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-[#2F4A2F] active:scale-[0.98]"
          >
            <ShoppingBag size={16} />
            <span>{orderText}</span>
          </button>
        </div>
      </div>

      {/* Manual Sliding Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-white/20 bg-black/30 text-white/80 hover:bg-black/60 hover:text-white transition-all duration-300"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-white/20 bg-black/30 text-white/80 hover:bg-black/60 hover:text-white transition-all duration-300"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {HERO_CAROUSEL_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === activeIndex ? "w-8 bg-[#D8BC7B]" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
