import React, { useState } from "react";
import { Compass, Sparkles, Send, Bell, Key, Crown, MapPin, Calendar } from "lucide-react";

interface ExtraConciergeAndVirtualTourProps {
  currentLang: string;
  isDarkMode: boolean;
}

export default function ExtraConciergeAndVirtualTour({ currentLang, isDarkMode }: ExtraConciergeAndVirtualTourProps) {
  const [activeTourAngle, setActiveTourAngle] = useState("dome");
  const [tourRotated, setTourRotated] = useState(false);

  // Concierge Form States
  const [conciergeMsg, setConciergeMsg] = useState("");
  const [conciergeSent, setConciergeSent] = useState(false);

  // Personalized Notification States
  const [notifPromo, setNotifPromo] = useState(true);
  const [notifCatering, setNotifCatering] = useState(false);
  const [savedSettings, setSavedSettings] = useState(false);

  const virtualTourOptions = [
    {
      id: "dome",
      name: { fr: "Le Dôme de Cristal Végétal", en: "The Botanical Crystal Dome" },
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
      stats: "360° view • Ambient tropical lighting • High acoustic absorption",
    },
    {
      id: "pavilion",
      name: { fr: "Le Pavillon Millénaire Chiang Mai", en: "Chiang Mai Millenary Pavilion" },
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
      stats: "360° view • Original teakwood architecture • Scented Jasmine fog",
    },
    {
      id: "terrace",
      name: { fr: "La Grande Terrasse des Lampions", en: "The Grand Lantern Terrace" },
      image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=1200&q=80",
      stats: "360° view • Panoramic starry sky • Traditional Yi Peng lampions",
    },
  ];

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conciergeMsg.trim()) return;
    setConciergeSent(true);
    setTimeout(() => {
      setConciergeSent(false);
      setConciergeMsg("");
    }, 4000);
  };

  const handleSaveNotifs = () => {
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 3000);
  };

  const activeTour = virtualTourOptions.find((t) => t.id === activeTourAngle) || virtualTourOptions[0];

  return (
    <section id="concierge" className="py-24 px-4 bg-stone-900/10 dark:bg-stone-950/20 Scroll-mt-16">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Row 1: Virtual Tour & Personalized Notifications (Grid 12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual 360° Tour Selector (lg:col-span-8) */}
          <div
            className={`lg:col-span-8 p-6 rounded-3xl border shadow-sm flex flex-col justify-between ${
              isDarkMode ? "bg-stone-900 border-stone-850" : "bg-white border-emerald-100/60"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Compass className="text-[#D8BC7B] animate-spin [animation-duration:8s]" size={18} />
                  <h3 className={`text-base font-semibold uppercase tracking-wider ${
                    isDarkMode ? "text-stone-100" : "text-[#2F4A2F]"
                  }`}>
                    {currentLang === "fr" ? "Visite Virtuelle Immersive 360°" : "360° Room Virtual Explorer"}
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-full animate-pulse">
                  SIMULATEUR 4K
                </span>
              </div>
              <p className="text-xs font-light text-stone-400 leading-relaxed max-w-2xl mb-6">
                Explorez virtuellement l'agencement noble de nos espaces. Choisissez un angle panoramique pour inspecter la précision des lampions et le majestueux dôme central d'orchidées sauvages.
              </p>
            </div>

            {/* Simulated 4K Interactive Picture box */}
            <div className="relative w-full aspect-[2/1] min-h-[220px] rounded-2xl overflow-hidden shadow-inner border border-stone-800">
              <img
                src={activeTour.image}
                alt=""
                className={`w-full h-full object-cover brightness-[0.7] transition-all duration-1000 ${
                  tourRotated ? "rotate-1 scale-105" : ""
                }`}
                referrerPolicy="no-referrer"
              />

              {/* View compass indicators overlay */}
              <div className="absolute inset-x-0 bottom-4 text-center z-10">
                <span className="px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider bg-black/80 text-white border border-stone-800">
                  {activeTour.stats}
                </span>
              </div>

              {/* Interactive Rotation simulation dials */}
              <button
                onClick={() => setTourRotated(!tourRotated)}
                className="absolute right-4 top-4 p-2.5 rounded-full bg-black/60 border border-[#D8BC7B]/30 text-[#D8BC7B] hover:bg-[#D8BC7B] hover:text-[#2F4A2F] transition-all z-20"
                title="Slightly rotate view angle"
              >
                <Compass size={16} />
              </button>

              {/* Angle Selector Tabs overlay left */}
              <div className="absolute left-4 top-4 flex flex-col gap-1.5 z-20 max-w-[170px] sm:max-w-xs">
                {virtualTourOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setActiveTourAngle(opt.id)}
                    className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-left rounded-lg transition-all ${
                      activeTourAngle === opt.id
                        ? "bg-[#D8BC7B] text-[#2F4A2F] shadow-md"
                        : "bg-black/60 text-white hover:bg-black/80"
                    }`}
                  >
                    {opt.name[currentLang as "fr" | "en"] || opt.name["fr"]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Personalized Notifications (lg:col-span-4) */}
          <div
            className={`lg:col-span-4 p-6 rounded-3xl border shadow-sm flex flex-col justify-between ${
              isDarkMode ? "bg-stone-900 border-stone-850" : "bg-white border-emerald-100/60"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bell size={18} className="text-[#D8BC7B]" />
                <h3 className={`text-base font-semibold uppercase tracking-wider ${
                  isDarkMode ? "text-stone-100" : "text-[#2F4A2F]"
                }`}>
                  Push Curation
                </h3>
              </div>
              <p className="text-xs font-light text-stone-400 leading-relaxed mb-6">
                Activez nos alertes instantanées pour recevoir en priorité les arrivages de piments frais de Chiang Mai et l'ouverture des salons VIP.
              </p>

              {/* Notifications selectors forms */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/30 border border-stone-800">
                  <div>
                    <span className="text-[11px] font-semibold block">Recettes & Événements</span>
                    <span className="text-[9px] text-stone-400 block mt-0.5">Soirées de pleine lune siamoise</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifPromo}
                    onChange={() => setNotifPromo(!notifPromo)}
                    className="w-4 h-4 rounded text-[#D8BC7B] focus:ring-[#D8BC7B] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/30 border border-stone-800">
                  <div>
                    <span className="text-[11px] font-semibold block">Conciergerie Personnelle</span>
                    <span className="text-[9px] text-stone-400 block mt-0.5">Suivi des réservations privées VIP</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifCatering}
                    onChange={() => setNotifCatering(!notifCatering)}
                    className="w-4 h-4 rounded text-[#D8BC7B] focus:ring-[#D8BC7B] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800">
              {savedSettings && (
                <p className="text-[10px] text-emerald-400 font-semibold mb-2 animate-in fade-in">
                  ✓ Préférences d'alertes validées avec l'hôte principal.
                </p>
              )}
              <button
                type="button"
                onClick={handleSaveNotifs}
                className="w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-[#D8BC7B]/40 text-[#D8BC7B] hover:bg-[#D8BC7B]/10 transition-all"
              >
                Sauvegarder mon Profil
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Digital Concierge request Center & Premium Member Card Space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Member Space card visual (lg:col-span-5) */}
          <div
            className={`lg:col-span-5 p-8 rounded-3xl border shadow-xl flex flex-col justify-between ${
              isDarkMode ? "bg-[#161815] border-stone-850" : "bg-white border-emerald-100"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Key className="text-[#D8BC7B]" size={18} />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D8BC7B]">
                  Espace Exceptionnel THE FAMILY
                </h4>
              </div>
              <p className="text-xs font-light text-stone-400 leading-relaxed mb-4">
                Prélèvement de loyautés supérieures, service de portier privé, bouteilles de saké ou thés blancs rares importés en cuvées limitées de Chiang Mai.
              </p>

              {/* VIP perks bullet list */}
              <ul className="space-y-2 text-[11px] font-light text-stone-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#D8BC7B]">✦</span>
                  <span>Sélection de tables prioritaires (les dômes cristal sont garantis)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#D8BC7B]">✦</span>
                  <span>Port de l'étoile Jasmine royale : invitations VIP exclusives</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#D8BC7B]">✦</span>
                  <span>Absence de frais fiscaux de service royal lors d'achats en ligne</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <div className="p-4 rounded-2xl bg-gradient-to-tr from-stone-900 to-stone-950 border border-[#D8BC7B]/20 text-center text-xs text-stone-400">
                <Crown className="text-[#D8BC7B] mx-auto mb-2" size={18} />
                <span>Bienvenue dans la Noblesse Siamoise</span>
              </div>
            </div>
          </div>

          {/* Concierge Desk custom planning form (lg:col-span-7) */}
          <form
            onSubmit={handleConciergeSubmit}
            className={`lg:col-span-7 p-8 rounded-3xl border shadow-sm flex flex-col justify-between ${
              isDarkMode ? "bg-stone-900 border-stone-850" : "bg-white border-emerald-100/60"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Crown className="text-[#D8BC7B]" size={18} />
                  <h3 className={`text-base font-semibold uppercase tracking-wider ${
                    isDarkMode ? "text-stone-100" : "text-[#2F4A2F]"
                  }`}>
                    {currentLang === "fr" ? "Secrétariat de Concierge Privé" : "Digital Elite Custom Service Desk"}
                  </h3>
                </div>
                <Sparkles size={16} className="text-[#D8BC7B] animate-pulse" />
              </div>
              <p className="text-xs font-light text-stone-400 leading-relaxed mb-6">
                Des désirs d'accords mets-vins insolites, d'une soirée de demandes en mariage sous dômes, ou de restauration de yacht privé ? Laissez notre majordome principal organiser vos rituels d'exception.
              </p>

              {/* Prompt message fields */}
              <div className="space-y-4">
                <textarea
                  rows={4}
                  required
                  value={conciergeMsg}
                  onChange={(e) => setConciergeMsg(e.target.value)}
                  placeholder={
                    currentLang === "fr"
                      ? "Formulez vos voeux de prestation (ex: Privatisation, Majordome, Chef à domicile...)"
                      : "Describe your high-end bespoke desires (e.g., dome privatization, private home chef...)"
                  }
                  className="w-full p-3.5 text-xs rounded-2xl border border-stone-800 bg-[#161815] text-white focus:outline-none focus:ring-1 focus:ring-[#D8BC7B] resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-8 py-3 w-full sm:w-auto rounded-xl text-xs font-bold uppercase tracking-widest bg-[#D8BC7B] text-[#2F4A2F] hover:bg-[#C1A25B] transition-colors"
              >
                <Send size={12} />
                <span>Soumettre aux Officiers</span>
              </button>

              {conciergeSent && (
                <span className="text-xs text-emerald-400 font-semibold animate-in fade-in duration-300">
                  ✓ Demande reçue. Nous préparons vos arrangements dans l'heure.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
