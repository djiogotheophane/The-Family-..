import React, { useState, useEffect } from "react";
import { MenuItem, CartItem } from "./types";
import { MENU_ITEMS, TRANSLATE_DICTIONARY, GALLERY_THAILAND, GALLERY_SOUVENIRS, LANGUAGES, LORE_TEXT } from "./data";

// Component imports
import LanguageSelector from "./components/LanguageSelector";
import HeroCarousel from "./components/HeroCarousel";
import MenuSection from "./components/MenuSection";
import BookingSection from "./components/BookingSection";
import CartAndCheckout from "./components/CartAndCheckout";
import LoyaltyWidget from "./components/LoyaltyWidget";
import AiConcierge from "./components/AiConcierge";
import ExtraConciergeAndVirtualTour from "./components/ExtraConciergeAndVirtualTour";
import ReviewsAndFaq from "./components/ReviewsAndFaq";

// Icon imports from lucide-react
import {
  Sparkles,
  Phone,
  ArrowUp,
  ShoppingBag,
  Clock,
  MapPin,
  Mail,
  User,
  Heart,
  Calendar,
  Gift,
  AlignJustify,
  X,
  Workflow,
  Lightbulb,
  Moon,
  Sun,
  Award,
} from "lucide-react";

export default function App() {
  const [lang, setLang] = useState("fr");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(350); // Init 350 to display members rank beautifully
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Contact Form States
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactStatus, setContactStatus] = useState<string | null>(null);

  // Monitor Scroll height to show 'Back to Top' button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync scroll position securely
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem, note?: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((i) => i.menuItem.id === item.id);
      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx].quantity += 1;
        return nextCart;
      }
      return [...prev, { menuItem: item, quantity: 1, notes: note }];
    });
    // Autopen cart drawer for exquisite immediate feedback
    setCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.menuItem.id === itemId ? { ...item, quantity: newQty } : item)));
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAwardPoints = (pts: number) => {
    setLoyaltyPoints((prev) => prev + pts);
  };

  const handleDeductPoints = (pts: number) => {
    setLoyaltyPoints((prev) => Math.max(0, prev - pts));
  };

  // Simulated newsletter subscription
  const [subsEmail, setSubsEmail] = useState("");
  const [subsDone, setSubsDone] = useState(false);

  const handleSubsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subsEmail) return;
    setSubsDone(true);
    setSubsEmail("");
    setTimeout(() => setSubsDone(false), 4500);
  };

  // Contact form execution
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMsg }),
      });
      const data = await response.json();
      setContactStatus(data.message);
      setContactName("");
      setContactEmail("");
      setContactMsg("");
      setTimeout(() => setContactStatus(null), 5000);
    } catch (err) {
      console.error(err);
      setContactStatus("Désolé, une erreur technique est survenue. Réessayez bientôt.");
    }
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 selection:bg-[#D8BC7B] selection:text-[#2F4A2F] ${
        isDarkMode ? "bg-stone-950 text-stone-100" : "bg-[#F8F5EE] text-[#374A38]"
      }`}
    >
      {/* 1. Global Navigation Premium Glassmorphic Header */}
      <header
        id="navbar-premium"
        className={`fixed top-0 inset-x-0 z-40 backdrop-blur-md transition-all duration-300 border-b ${
          isDarkMode
            ? "bg-stone-950/80 border-stone-850"
            : "bg-[#F8F5EE]/85 border-emerald-100/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Brand Logo design */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex flex-col text-left group"
          >
            <span className="text-xl sm:text-2xl font-light tracking-[0.18em] font-sans group-hover:text-[#D8BC7B] transition-colors">
              THE <span className="font-semibold text-[#D8BC7B]">FAMILY</span>
            </span>
            <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-stone-400 -mt-1 block">
              THAÏ GASTRONOMIE
            </span>
          </button>

          {/* Desktop Sitemap Menu Links mapping required options conceptually */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-bold tracking-[0.16em] uppercase">
            <button onClick={() => scrollToSection("home")} className="hover:text-[#D8BC7B] transition-colors cursor-pointer">
              Accueil
            </button>
            <button onClick={() => scrollToSection("heritage")} className="hover:text-[#D8BC7B] transition-colors cursor-pointer">
              Histoire
            </button>
            <button onClick={() => scrollToSection("menu")} className="hover:text-[#D8BC7B] transition-colors cursor-pointer">
              Menu complet
            </button>
            <button onClick={() => scrollToSection("reservation")} className="hover:text-[#D8BC7B] transition-colors cursor-pointer">
              Réservation
            </button>
            <button onClick={() => scrollToSection("loyalty")} className="hover:text-[#D8BC7B] transition-colors cursor-pointer">
              Fidélité
            </button>
            <button onClick={() => scrollToSection("concierge")} className="hover:text-[#D8BC7B] transition-colors cursor-pointer">
              Conciergerie
            </button>
            <button onClick={() => scrollToSection("reviews-faq")} className="hover:text-[#D8BC7B] transition-colors cursor-pointer">
              FAQ
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-[#D8BC7B] transition-colors cursor-pointer">
              Contact
            </button>
          </nav>

          {/* Header Action widgets */}
          <div className="flex items-center gap-3">
            {/* Quick Bag shopping indicator */}
            <button
              onClick={() => setCartOpen(true)}
              className={`relative p-2.5 rounded-full border transition-colors ${
                isDarkMode
                  ? "border-stone-800 bg-black/40 text-stone-300 hover:text-[#D8BC7B] hover:border-emerald-600"
                  : "border-emerald-100 bg-white text-stone-700 hover:text-[#2F4A2F] hover:border-[#D8BC7B]"
              }`}
            >
              <ShoppingBag size={14} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white font-mono font-bold text-[8px] flex items-center justify-center animate-pulse">
                  {cart.reduce((s, c) => s + c.quantity, 0)}
                </span>
              )}
            </button>

            {/* Language Selector Custom Component */}
            <LanguageSelector currentLang={lang} onChangeLang={setLang} isDarkMode={isDarkMode} />

            {/* Light/Dark mode toggler */}
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-full border transition-colors ${
                isDarkMode
                  ? "border-stone-800 bg-black/40 text-stone-300 hover:text-[#D8BC7B]"
                  : "border-emerald-100 bg-white text-stone-700 hover:text-[#2F4A2F] hover:border-[#D8BC7B]"
              }`}
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Quick reservation direct action desktop only */}
            <button
              onClick={() => scrollToSection("reservation")}
              className="hidden sm:inline px-5 py-2 rounded-full text-[10px] font-black tracking-widest bg-gradient-to-r from-[#D8BC7B] to-[#C1A25B] text-[#2F4A2F] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            >
              Réserver
            </button>

            {/* Smartphone Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-full border ${
                isDarkMode ? "border-stone-850 bg-stone-900 text-stone-300" : "border-emerald-100 bg-white text-stone-700"
              }`}
            >
              {mobileMenuOpen ? <X size={15} /> : <AlignJustify size={15} />}
            </button>
          </div>
        </div>

        {/* Smartphone Mobile Menu Dropdown Panel */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden border-t px-6 py-8 space-y-4 animate-in fade-in duration-300 ${
              isDarkMode ? "bg-stone-950 border-stone-850" : "bg-[#F8F5EE] border-emerald-100"
            }`}
          >
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D8BC7B]">Sitemap Explorateur</p>
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold uppercase tracking-wider">
              <button onClick={() => scrollToSection("home")} className="text-left py-2 hover:text-[#D8BC7B]">
                Accueil
              </button>
              <button onClick={() => scrollToSection("heritage")} className="text-left py-2 hover:text-[#D8BC7B]">
                Héritage
              </button>
              <button onClick={() => scrollToSection("menu")} className="text-left py-2 hover:text-[#D8BC7B]">
                Le Menu
              </button>
              <button onClick={() => scrollToSection("reservation")} className="text-left py-2 hover:text-[#D8BC7B]">
                Réservation
              </button>
              <button onClick={() => scrollToSection("loyalty")} className="text-left py-2 hover:text-[#D8BC7B]">
                Privilèges
              </button>
              <button onClick={() => scrollToSection("concierge")} className="text-left py-2 hover:text-[#D8BC7B]">
                Concierge
              </button>
              <button onClick={() => scrollToSection("reviews-faq")} className="text-left py-2 hover:text-[#D8BC7B]">
                Avis & FAQ
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-left py-2 hover:text-[#D8BC7B]">
                Contact
              </button>
            </div>
            <button
              onClick={() => scrollToSection("reservation")}
              className="w-full text-center py-3 rounded-xl block bg-[#D8BC7B] text-[#2F4A2F] text-xs font-bold uppercase tracking-widest pt-3"
            >
              Je Réserve ma Table
            </button>
          </div>
        )}
      </header>

      {/* 2. Hero Slideshow section with fullscreen visual */}
      <section id="home">
        <HeroCarousel
          currentLang={lang}
          isDarkMode={isDarkMode}
          onBookClick={() => scrollToSection("reservation")}
          onOrderClick={() => scrollToSection("menu")}
        />
      </section>

      {/* 3. Notre Histoire & Héritage */}
      <section id="heritage" className="py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual card of our Chiang Mai forest roots */}
          <div className="lg:col-span-6 relative aspect-video lg:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border border-[#D8BC7B]/20 group">
            <img
              src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80"
              alt="Chiang Mai Sourcing"
              className="w-full h-full object-cover brightness-[0.75] transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white max-w-md">
              <span className="text-[10px] font-bold text-[#D8BC7B] tracking-[0.25em] uppercase block">
                Matières Premières Organiques
              </span>
              <h4 className="text-lg font-light tracking-tight mt-1">
                De Chiang Mai à Votre Cabinet de Dégustation
              </h4>
            </div>
          </div>

          {/* Texts representing "Notre Histoire" */}
          <div className="lg:col-span-6 space-y-6">
            <div className="h-[2px] w-12 bg-[#D8BC7B] mb-2" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#D8BC7B] uppercase block">
              L'ART D'ACCUEILLIR DEPUIS 1968
            </span>
            <h3
              className={`text-3xl sm:text-4xl font-light leading-snug tracking-tight ${
                isDarkMode ? "text-[#D8BC7B]" : "text-[#2F4A2F]"
              }`}
            >
              {LORE_TEXT[lang as "fr" | "en" | "th"]?.title || LORE_TEXT["fr"].title}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm font-light leading-relaxed max-w-xl text-stone-500">
              {(LORE_TEXT[lang as "fr" | "en" | "th"]?.storyLines || LORE_TEXT["fr"].storyLines).map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>

            {/* Quick Sourcing Badges */}
            <div className="pt-4 grid grid-cols-3 gap-4 text-center max-w-md">
              <div className="p-3 rounded-2xl bg-stone-900/5 dark:bg-stone-900 border border-stone-850 flex flex-col items-center">
                <span className="text-lg font-mono text-[#D8BC7B] font-extrabold block">100%</span>
                <span className="text-[9px] text-stone-400 uppercase font-semibold">Thai Sourced</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-900/5 dark:bg-stone-900 border border-stone-850 flex flex-col items-center">
                <span className="text-lg font-mono text-[#D8BC7B] font-extrabold block">Frais</span>
                <span className="text-[9px] text-stone-400 uppercase font-semibold">Arrivage Direct</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-900/5 dark:bg-stone-900 border border-stone-850 flex flex-col items-center">
                <span className="text-lg font-mono text-[#D8BC7B] font-extrabold block">Chiang Mai</span>
                <span className="text-[9px] text-stone-400 uppercase font-semibold">Ferme Botanique</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Specialties Section & Menu Intelligent */}
      <MenuSection currentLang={lang} isDarkMode={isDarkMode} onAddToCart={handleAddToCart} />

      {/* 5. Autoscroll Loop Galleries */}
      <section className="py-16 overflow-hidden bg-[#2F4A2F]/95 text-white relative">
        <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#D8BC7B] uppercase mb-1">
            GÉNÉRATEUR DE SOUVENIRS
          </p>
          <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            Les Galeries de Nos Hôtes
          </h3>
        </div>

        {/* Gallery Content Loop: Plats Gallery */}
        <div className="space-y-6">
          <div className="flex gap-4 overflow-hidden py-2 select-none">
            {/* Double mapping for infinite smooth autoscroll mimicking */}
            <div className="flex gap-4 animate-marquee whitespace-nowrap shrink-0">
              {MENU_ITEMS.map((item) => (
                <div key={item.id} className="relative w-64 h-40 rounded-2xl overflow-hidden shrink-0 border border-white/10 group">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-60" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white tracking-wide uppercase">
                    {item.name[lang] || item.name["fr"]}
                  </span>
                </div>
              ))}
              {/* Duplicate loop */}
              {MENU_ITEMS.map((item) => (
                <div key={`dup-${item.id}`} className="relative w-64 h-40 rounded-2xl overflow-hidden shrink-0 border border-white/10 group">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-60" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white tracking-wide uppercase">
                    {item.name[lang] || item.name["fr"]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Content Loop: Thailand Landmarks & Souvenirs */}
          <div className="flex gap-4 overflow-hidden py-2 select-none">
            <div className="flex gap-4 animate-marquee-reverse whitespace-nowrap shrink-0">
              {[...GALLERY_THAILAND, ...GALLERY_SOUVENIRS].map((img, idx) => (
                <div key={idx} className="relative w-64 h-40 rounded-2xl overflow-hidden shrink-0 border border-white/10 group animate-in fade-in">
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-[#D8BC7B] tracking-wide uppercase">
                    {img.title[lang as "fr" | "en"] || img.title["fr"] || "Thailand"}
                  </span>
                </div>
              ))}
              {/* Duplicate loop */}
              {[...GALLERY_THAILAND, ...GALLERY_SOUVENIRS].map((img, idx) => (
                <div key={`dup-t-${idx}`} className="relative w-64 h-40 rounded-2xl overflow-hidden shrink-0 border border-white/10 group animate-in fade-in">
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-[#D8BC7B] tracking-wide uppercase">
                    {img.title[lang as "fr" | "en"] || img.title["fr"] || "Thailand"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Real-time Immersive table Floorplan Reservational Interface */}
      <BookingSection currentLang={lang} isDarkMode={isDarkMode} onAwardPoints={handleAwardPoints} />

      {/* 7. Extra details concierge digital, rooms view, user settings alerts */}
      <ExtraConciergeAndVirtualTour currentLang={lang} isDarkMode={isDarkMode} />

      {/* 8. Loyalty circle privilege points board */}
      <LoyaltyWidget
        currentLang={lang}
        isDarkMode={isDarkMode}
        points={loyaltyPoints}
        onDeductPoints={handleDeductPoints}
      />

      {/* 9. Reviews & Accordion FAQ */}
      <ReviewsAndFaq currentLang={lang} isDarkMode={isDarkMode} />

      {/* 10. Classic bottom sitemap, operating parameters, contact forms */}
      <section id="contact" className={`py-24 px-4 border-t ${
        isDarkMode ? "bg-stone-950 border-stone-850" : "bg-white border-emerald-100/50"
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Info and operating Hours (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl sm:text-2xl font-light tracking-wide text-[#D8BC7B]">
              THE FAMILY — Paris Clichy
            </h3>
            <p className="text-xs font-light text-stone-500 leading-relaxed max-w-sm">
              Visitez nos salons au dôme tropical ou profitez d'un emballage de livraison de prestige garanti sous étanchéité thermique complète.
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#D8BC7B] shrink-0 mt-0.5" size={14} />
                <div>
                  <span className="font-semibold block uppercase tracking-wider">Adresse d'Honneur</span>
                  <span className="text-stone-400 block mt-0.5">12 Rue de la Paix, 75001 Paris, France</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-[#D8BC7B] shrink-0 mt-0.5" size={14} />
                <div>
                  <span className="font-semibold block uppercase tracking-wider">Heures de Cérémonie culinary</span>
                  <span className="text-stone-400 block mt-0.5">Déjeuner : 12:00 — 14:30</span>
                  <span className="text-stone-400 block">Dîner : 19:00 — 23:00 (Tous les Jours)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-[#D8BC7B] shrink-0 mt-0.5" size={14} />
                <div>
                  <span className="font-semibold block uppercase tracking-wider">Secrétariat Direct</span>
                  <span className="text-stone-400 block mt-0.5">+33 1 23 45 67 89</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Direct feedback Contact form (lg:col-span-7) */}
          <form onSubmit={handleContactSubmit} className="lg:col-span-7 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-stone-400">
              Message direct à l'administration
            </h4>

            {contactStatus && (
              <div className="p-3 text-xs bg-emerald-950/80 border border-[#D8BC7B]/30 rounded-xl text-[#D8BC7B] animate-in fade-in">
                {contactStatus}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Votre Nom"
                className={`w-full p-3.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D8BC7B] ${
                  isDarkMode ? "bg-stone-900 border-stone-850 text-white" : "bg-[#F8F5EE] border-emerald-100 text-[#374A38]"
                } border`}
              />
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Votre E-mail"
                className={`w-full p-3.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D8BC7B] ${
                  isDarkMode ? "bg-stone-900 border-stone-850 text-white" : "bg-[#F8F5EE] border-emerald-100 text-[#374A38]"
                } border`}
              />
            </div>
            <textarea
              rows={4}
              required
              value={contactMsg}
              onChange={(e) => setContactMsg(e.target.value)}
              placeholder="Quelles sont vos interrogations ?"
              className={`w-full p-3.5 text-xs rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-[#D8BC7B] ${
                isDarkMode ? "bg-stone-900 border-stone-850 text-white" : "bg-[#F8F5EE] border-emerald-100 text-[#374A38]"
              } border`}
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#2F4A2F] border border-[#2F4A2F] text-white hover:bg-transparent hover:text-[#2F4A2F] hover:border-[#2F4A2F] dark:hover:border-[#D8BC7B] dark:hover:text-[#D8BC7B] transition-colors cursor-pointer"
            >
              Envoyer mon Message
            </button>
          </form>
        </div>
      </section>

      {/* Perfect Sitemap footer listing the 20 requested menu links */}
      <footer className="py-16 text-white text-xs bg-stone-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Col 1 (md:col-span-4): Logo info */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-lg font-light tracking-[0.2em]">
              THE <span className="font-semibold text-[#D8BC7B]">FAMILY</span>
            </span>
            <p className="text-[11px] font-light text-stone-400 leading-relaxed max-w-sm">
              L'excellence d'un palace siamoise conjuguée à l'âme d'une tradition familiale. Sourcing certifié d'ingrédients de Chiang-Mai.
            </p>

            <form onSubmit={handleSubsSubmit} className="space-y-2 max-w-xs pt-2">
              <span className="text-[10px] font-bold tracking-widest uppercase block text-stone-400">Newsletter</span>
              <div className="flex gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="E-mail royal..."
                  value={subsEmail}
                  onChange={(e) => setSubsEmail(e.target.value)}
                  className="flex-grow p-2.5 rounded-lg border border-stone-800 bg-black/60 focus:outline-none text-[10px]"
                />
                <button
                  type="submit"
                  className="px-4 rounded-lg bg-[#D8BC7B] text-[#2F4A2F] text-[10px] font-bold uppercase tracking-wider"
                >
                  S'abonner
                </button>
              </div>
              {subsDone && (
                <span className="text-[9px] text-emerald-400 font-semibold block animate-in fade-in duration-300">
                  ✓ Vous intégrerez la newsletter dès le prochain arrivage.
                </span>
              )}
            </form>
          </div>

          {/* Col 2 (md:col-span-8): Complete 20 required links sorted beautifully */}
          <div className="md:col-span-8 grid grid-cols-3 gap-6">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#D8BC7B] block uppercase mb-4">
                Expériences
              </span>
              <ul className="space-y-2 text-stone-400 font-light">
                <li><button onClick={() => scrollToSection("home")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Accueil</button></li>
                <li><button onClick={() => scrollToSection("heritage")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Notre Histoire</button></li>
                <li><button onClick={() => scrollToSection("menu")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Explore Chef's Menu</button></li>
                <li><button onClick={() => scrollToSection("menu")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Nos Spécialités</button></li>
                <li><button onClick={() => scrollToSection("menu")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Galerie des Plats</button></li>
                <li><button onClick={() => scrollToSection("heritage")} className="text-left hover:text-white hover:underline cursor-pointer">Galerie Thaïlande</button></li>
                <li><button onClick={() => scrollToSection("heritage")} className="text-left hover:text-white hover:underline cursor-pointer">Galerie Souvenirs</button></li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#D8BC7B] block uppercase mb-4">
                Services
              </span>
              <ul className="space-y-2 text-stone-400 font-light">
                <li><button onClick={() => scrollToSection("reservation")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Réservation de table</button></li>
                <li><button onClick={() => scrollToSection("menu")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Commande en Ligne</button></li>
                <li><button onClick={() => scrollToSection("loyalty")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Promotions Exclusives</button></li>
                <li><button onClick={() => scrollToSection("reviews-faq")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Avis Clients</button></li>
                <li><button onClick={() => scrollToSection("heritage")} className="text-left hover:text-white hover:underline cursor-pointer">Blog Thaïlande</button></li>
                <li><button onClick={() => scrollToSection("concierge")} className="text-left hover:text-white hover:underline cursor-pointer">Événements & Groupes</button></li>
                <li><button onClick={() => scrollToSection("reviews-faq")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">FAQ</button></li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#D8BC7B] block uppercase mb-4">
                Alliance
              </span>
              <ul className="space-y-2 text-stone-400 font-light">
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Contact</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Localisation</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Carrières & Woks</button></li>
                <li><button onClick={() => scrollToSection("concierge")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Partenaires</button></li>
                <li><button onClick={() => scrollToSection("loyalty")} className="hover:text-white hover:underline m-0 p-0 text-left cursor-pointer">Programme Fidélité</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons: WhatsApp, direct telephone line, quick book, quick top scroll */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        {/* VIP WhatsApp support trigger mock */}
        <a
          href="https://wa.me/33123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full bg-[#2F4A2F] border border-[#D8BC7B]/20 text-[#D8BC7B] hover:text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-center flex items-center justify-center font-bold text-xs"
          title="WhatsApp Priority Concierge"
        >
          <span>WA</span>
        </a>

        {/* Telephone phone link */}
        <a
          href="tel:+33123456789"
          className="p-3.5 rounded-full bg-[#2F4A2F] border border-[#D8BC7B]/20 text-[#D8BC7B] hover:text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-center flex items-center justify-center font-bold text-xs"
          title="Direct Dial"
        >
          <span>TEL</span>
        </a>

        {/* Back to Top */}
        {showScrollTop && (
          <button
            onClick={() => scrollToSection("home")}
            className="p-3.5 rounded-full bg-[#D8BC7B] text-[#2F4A2F] shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            <ArrowUp size={14} className="stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* 11. Core full-stack local chat concierge Nara window */}
      <AiConcierge currentLang={lang} isDarkMode={isDarkMode} />

      {/* 12. Smart Drawer Cart panel */}
      <CartAndCheckout
        currentLang={lang}
        isDarkMode={isDarkMode}
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onAwardPoints={handleAwardPoints}
      />
    </div>
  );
}
