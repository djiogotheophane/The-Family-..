import { useState } from "react";
import { Award, Gift, Sparkles, Check, HelpCircle } from "lucide-react";

interface LoyaltyWidgetProps {
  currentLang: string;
  isDarkMode: boolean;
  points: number;
  onDeductPoints: (pts: number) => void;
}

interface LoyaltyReward {
  id: string;
  cost: number;
  label: { fr: string; en: string };
  desc: { fr: string; en: string };
  claimedMsg: { fr: string; en: string };
}

export default function LoyaltyWidget({ currentLang, isDarkMode, points, onDeductPoints }: LoyaltyWidgetProps) {
  const [claimedList, setClaimedList] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const rewards: LoyaltyReward[] = [
    {
      id: "rew_tea",
      cost: 100,
      label: { fr: "Cha Yen Classique Offert", en: "Complementary Cha Yen" },
      desc: { fr: "Profitez d'un authentique thé glacé thaïlandais à l'anis étoilé.", en: "Savor an authentic iced black tea brewed with star anise." },
      claimedMsg: { fr: "Boisson offerte ajoutée à votre profil membre !", en: "Free tea credited to your elite profile!" },
    },
    {
      id: "rew_mango",
      cost: 200,
      label: { fr: "Mango Sticky Rice Céleste", en: "Heavenly Mango Sticky Rice" },
      desc: { fr: "Riz gluant infusé au pandan et mangue siamoise mûre.", en: "Sweet sticky rice cooked with pandan and golden mango." },
      claimedMsg: { fr: "Votre dessert royal offert est prêt ! Présentez ce pass.", en: "Your free royal dessert is prepared! Show this card." },
    },
    {
      id: "rew_discount",
      cost: 500,
      label: { fr: "Réduction Privilège -15%", en: "Elite 15% Reduction" },
      desc: { fr: "Valable sur l'ensemble de votre prochaine addition gastronomique.", en: "Applicable on your entire next culinary degustation bill." },
      claimedMsg: { fr: "Code PRIVILEGE15 activé avec succès !", en: "Promo PRIVILEGE15 successfully unlocked!" },
    },
    {
      id: "rew_vip",
      cost: 1000,
      label: { fr: "Accès Salon Privé Chiang Mai", en: "Chiang Mai Salon Seat" },
      desc: { fr: "Pour deux couverts au cœur du salon floral ou du dôme impérial.", en: "Priority premium table allocation under the botanical dome." },
      claimedMsg: { fr: "Majordome notifié. Votre salon de Chiang Mai vous attend.", en: "Butler notified. Your private lounge is waiting." },
    },
  ];

  const currentTier =
    points >= 2500 ? "Jasmine Royal" : points >= 1000 ? "Or Impérial" : points >= 500 ? "Argent" : "Bronze";

  const nextTierPoints = points >= 2500 ? 5000 : points >= 1000 ? 2500 : points >= 500 ? 1000 : 500;
  const progressPercent = Math.min((points / nextTierPoints) * 100, 100);

  const handleClaim = (reward: LoyaltyReward) => {
    if (points < reward.cost) {
      alert(currentLang === "fr" ? "Points insuffisants pour s'accorder cette récompense." : "Insufficient points balance.");
      return;
    }

    onDeductPoints(reward.cost);
    setClaimedList((prev) => [...prev, reward.id]);
    setActiveMessage(reward.claimedMsg[currentLang as "fr" | "en"] || reward.claimedMsg["fr"]);

    setTimeout(() => {
      setActiveMessage(null);
    }, 4000);
  };

  return (
    <section id="loyalty" className="py-24 px-4 bg-stone-900/5 dark:bg-stone-950/40 Scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="h-[1px] w-12 bg-[#D8BC7B] mx-auto mb-4" />
          <p className="text-xs font-bold tracking-[0.25em] text-[#D8BC7B] uppercase mb-1">
            {currentLang === "fr" ? "Jasmine Club Privilèges" : "Loyalty Circle Rewards"}
          </p>
          <h2
            className={`text-3xl sm:text-4xl font-light tracking-tight mb-2 ${
              isDarkMode ? "text-[#D8BC7B]" : "text-[#2F4A2F]"
            }`}
          >
            Le Cercle de Fidélité THE FAMILY
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Member Card & Tier Meter Status (lg:col-span-5) */}
          <div
            className={`lg:col-span-5 p-6 rounded-3xl border shadow-lg ${
              isDarkMode ? "bg-stone-900 border-stone-850" : "bg-white border-emerald-100/60"
            }`}
          >
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#D8BC7B]/10 flex items-center justify-center text-[#D8BC7B]">
                <Award size={22} className="stroke-[1.5]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  {currentLang === "fr" ? "Rang Membre" : "Tier Rank"}
                </span>
                <h4 className={`text-base font-medium flex items-center gap-1.5 ${
                  isDarkMode ? "text-stone-100" : "text-[#2F4A2F]"
                }`}>
                  <span>{currentTier}</span>
                  <Sparkles size={13} className="text-[#D8BC7B] animate-pulse" />
                </h4>
              </div>
            </div>

            {/* Simulated Gold Member Pass Canvas */}
            <div className="relative w-full aspect-[1.8/1] bg-gradient-to-br from-[#2D3F2E] via-[#3C583E] to-[#1E2D1E] rounded-2xl p-5 text-white overflow-hidden shadow-inner flex flex-col justify-between">
              {/* Absolutes back flowers layout */}
              <div className="absolute inset-0 opacity-[0.04] bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80')] mix-blend-overlay" />

              <div className="flex justify-between items-start z-10">
                <div>
                  <span className="text-[7px] font-bold tracking-[0.2em] text-[#D8BC7B]/80 block uppercase">
                    THE FAMILY EXTRAGAO
                  </span>
                  <span className="text-sm font-light tracking-wider font-sans text-stone-100">
                    Jasmine Royal Card
                  </span>
                </div>
                <Award size={24} className="text-[#D8BC7B]/80 stroke-[1.2]" />
              </div>

              <div className="z-10">
                <span className="text-[7px] font-bold tracking-[0.2em] text-[#D8BC7B]/70 block uppercase">
                  SOLDE ACCUMULÉ
                </span>
                <span className="text-3xl font-light font-mono text-[#D8BC7B] tracking-tight">
                  {points} <span className="text-xs font-sans tracking-normal opacity-80">points</span>
                </span>
              </div>

              <div className="flex justify-between items-end z-10 text-[9px] font-mono text-stone-300">
                <span>MEMBRE #978345</span>
                <span>DEPUIS 2026</span>
              </div>
            </div>

            {/* Level status progress bar visual */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-stone-400">Prochain Rang: {points >= 2500 ? "Légende" : "Or Impérial"}</span>
                <span className="font-mono text-stone-400">
                  {points}/{nextTierPoints} Pts
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D8BC7B] to-[#C1A25B] transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] font-light text-stone-500 leading-normal italic pt-1.5">
                {currentLang === "fr"
                  ? "Vous obtenez +10 points sur chaque Euro consommé au restaurant et +150 points lors d'une réservation de dôme royal en ligne."
                  : "Earn +10 points per Euro spent on dining orders and +150 points on automated dome reservations."}
              </p>
            </div>
          </div>

          {/* Claim rewards catalog area (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-1.5 ${
              isDarkMode ? "text-stone-200" : "text-[#2F4A2F]"
            }`}>
              <Gift size={14} className="text-[#D8BC7B]" />
              <span>{currentLang === "fr" ? "Privilèges à Collecter" : "Redeemable Perks"}</span>
            </h4>

            {activeMessage && (
              <div className="p-3 text-xs bg-emerald-900 border border-[#D8BC7B]/30 rounded-xl text-[#D8BC7B] animate-in fade-in duration-300">
                {activeMessage}
              </div>
            )}

            {rewards.map((rew) => {
              const isClaimed = claimedList.includes(rew.id);
              const labelText = rew.label[currentLang as "fr" | "en"] || rew.label["fr"];
              const descText = rew.desc[currentLang as "fr" | "en"] || rew.desc["fr"];
              const meetsRequirement = points >= rew.cost;

              return (
                <div
                  key={rew.id}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                    isClaimed
                      ? "opacity-50 bg-stone-900/10 border-stone-800"
                      : isDarkMode
                      ? "bg-[#161815] border-stone-850 hover:border-[#D8BC7B]/30"
                      : "bg-white border-emerald-100/60 hover:border-[#D8BC7B]"
                  }`}
                >
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className={`text-sm font-semibold truncate ${
                        isDarkMode ? "text-stone-100" : "text-[#2F4A2F]"
                      }`}>
                        {labelText}
                      </h5>
                      {isClaimed && (
                        <span className="flex items-center text-[8px] tracking-wider uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full">
                          Débloqué
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-light text-stone-400 mt-1 leading-relaxed">
                      {descText}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={isClaimed || !meetsRequirement}
                    onClick={() => handleClaim(rew)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                      isClaimed
                        ? "bg-transparent text-stone-400 border border-stone-800 cursor-not-allowed"
                        : meetsRequirement
                        ? "bg-[#D8BC7B] text-[#2F4A2F] hover:bg-[#C1A25B] cursor-pointer"
                        : "bg-transparent text-stone-500 border border-stone-800/60 cursor-not-allowed"
                    }`}
                  >
                    {isClaimed ? (
                      <span className="flex items-center gap-1">
                        <Check size={10} /> Consommé
                      </span>
                    ) : (
                      <span>{rew.cost} Pts</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
