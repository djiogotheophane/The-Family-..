import { useState } from "react";
import { Language } from "../types";
import { LANGUAGES } from "../data";
import { Globe, ChevronDown } from "lucide-react";

interface LanguageSelectorProps {
  currentLang: string;
  onChangeLang: (code: string) => void;
  isDarkMode: boolean;
}

export default function LanguageSelector({ currentLang, onChangeLang, isDarkMode }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selected = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const handleSelect = (code: string) => {
    onChangeLang(code);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        id="btn-lang-selector"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
          isDarkMode
            ? "border-emerald-800 bg-black/60 text-[#D8BC7B] hover:border-emerald-600 hover:bg-black/80"
            : "border-emerald-100 bg-white/70 text-[#374A38] hover:border-[#D8BC7B] hover:bg-white"
        }`}
      >
        <Globe size={13} className="text-[#D8BC7B]" />
        <span>{selected.flag}</span>
        <span className="hidden sm:inline">{selected.name}</span>
        <span className="inline sm:hidden">{selected.code}</span>
        <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop Click */}
          <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsOpen(false)} />

          <ul
            id="lang-selector-dropdown"
            className={`absolute right-0 mt-2 w-44 rounded-xl border p-1 shadow-xl z-50 animate-in fade-in-50 slide-in-from-top-3 duration-300 overflow-hidden ${
              isDarkMode
                ? "bg-stone-900/95 border-stone-800 text-stone-200"
                : "bg-white/95 border-emerald-100/80 text-stone-800"
            }`}
          >
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`flex items-center justify-between w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors leading-none ${
                    lang.code === currentLang
                      ? isDarkMode
                        ? "bg-emerald-950/60 text-[#D8BC7B]"
                        : "bg-emerald-50 text-[#2F4A2F]"
                      : isDarkMode
                      ? "hover:bg-stone-800/80 hover:text-white"
                      : "hover:bg-emerald-50/50 hover:text-[#2F4A2F]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {lang.code === currentLang && <span className="text-[#D8BC7B] text-[10px]">●</span>}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
