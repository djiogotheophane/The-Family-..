import { useState } from "react";
import { Review, FAQItem } from "../types";
import { MOCK_REVIEWS, FAQS, TRANSLATE_DICTIONARY } from "../data";
import { Star, MessageSquare, ChevronDown } from "lucide-react";

interface ReviewsAndFaqProps {
  currentLang: string;
  isDarkMode: boolean;
}

export default function ReviewsAndFaq({ currentLang, isDarkMode }: ReviewsAndFaqProps) {
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  const faqListTitle = TRANSLATE_DICTIONARY.faqTitle[currentLang] || TRANSLATE_DICTIONARY.faqTitle["en"];
  const reviewTitle = TRANSLATE_DICTIONARY.reviewsTitle[currentLang] || TRANSLATE_DICTIONARY.reviewsTitle["en"];

  return (
    <section id="reviews-faq" className="py-24 px-4 max-w-7xl mx-auto scroll-mt-16 space-y-24">
      {/* Testimonials block */}
      <div>
        <div className="text-center mb-16">
          <div className="h-[1px] w-12 bg-[#D8BC7B] mx-auto mb-4" />
          <p className="text-xs font-bold tracking-[0.25em] text-[#D8BC7B] uppercase mb-1">
            {currentLang === "fr" ? "Témoignages Clients" : "Praise From Guests"}
          </p>
          <h2
            className={`text-3xl sm:text-4xl font-light tracking-tight mb-2 ${
              isDarkMode ? "text-stone-100" : "text-[#2F4A2F]"
            }`}
          >
            {reviewTitle}
          </h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} size={15} className="text-[#D8BC7B] fill-[#D8BC7B]" />
            ))}
            <span className="text-xs font-semibold ml-2 font-mono tracking-wider opacity-85">
              4.9/5 • 1,240+ avis vérifiés Google
            </span>
          </div>
        </div>

        {/* Carousel grid layouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((review) => {
            const localizedComment = review.comment[currentLang] || review.comment["fr"] || review.comment["en"];

            return (
              <div
                key={review.id}
                className={`p-6 rounded-3xl border shadow-sm flex flex-col justify-between ${
                  isDarkMode ? "bg-stone-900/55 border-stone-850" : "bg-white border-emerald-100/60"
                }`}
              >
                <div>
                  <div className="flex gap-1 mb-4 text-[#D8BC7B]">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star key={idx} size={13} className="fill-[#D8BC7B]" />
                    ))}
                  </div>

                  <p className={`text-xs font-light leading-relaxed italic ${
                    isDarkMode ? "text-[#E9E1D2]/80" : "text-stone-600"
                  }`}>
                    "{localizedComment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-stone-800/10">
                  <img
                    src={review.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover border border-[#D8BC7B]/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-semibold">{review.author}</h4>
                    <span className="text-[9px] text-[#D8BC7B] font-mono uppercase tracking-wider block mt-0.5">
                      {review.tag}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accordion Block (FAQ) */}
      <div id="faq" className="max-w-4xl mx-auto scroll-mt-20">
        <div className="text-center mb-12">
          <div className="h-[1px] w-12 bg-[#D8BC7B] mx-auto mb-4" />
          <h2
            className={`text-2xl sm:text-3xl font-light tracking-tight ${
              isDarkMode ? "text-[#D8BC7B]" : "text-[#2F4A2F]"
            }`}
          >
            {faqListTitle}
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            const qText = faq.question[currentLang] || faq.question["fr"] || faq.question["en"];
            const aText = faq.answer[currentLang] || faq.answer["fr"] || faq.answer["en"];

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? isDarkMode
                      ? "bg-stone-900 border-stone-800 shadow"
                      : "bg-emerald-50/20 border-emerald-100 shadow-sm"
                    : isDarkMode
                    ? "bg-[#161815] border-stone-850 hover:border-stone-800"
                    : "bg-white border-emerald-100/60 hover:border-emerald-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className={`text-xs sm:text-sm font-semibold ${
                    isDarkMode ? "text-stone-100" : "text-[#2F4A2F]"
                  }`}>
                    {qText}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`text-[#D8BC7B] shrink-0 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-1 duration-300">
                    <p className={`text-xs font-light leading-relaxed ${
                      isDarkMode ? "text-stone-300" : "text-stone-600"
                    }`}>
                      {aText}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
