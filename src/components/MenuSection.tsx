import { useState, useMemo } from "react";
import { MenuItem, CategoryType } from "../types";
import { MENU_ITEMS, TRANSLATE_DICTIONARY } from "../data";
import { Search, Flame, ShoppingBag, Leaf, ShieldAlert } from "lucide-react";

interface MenuSectionProps {
  currentLang: string;
  isDarkMode: boolean;
  onAddToCart: (item: MenuItem, note?: string) => void;
}

export default function MenuSection({ currentLang, isDarkMode, onAddToCart }: MenuSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  const filterCategories: { label: { [key: string]: string }; value: CategoryType }[] = [
    { value: "all", label: { fr: "Tout", en: "All", th: "ทั้งหมด" } },
    { value: "spiced", label: { fr: "Épicé", en: "Spicy", th: "รสเผ็ด" } },
    { value: "non-spiced", label: { fr: "Non-Épicé", en: "Mild", th: "รสไม่เผ็ด" } },
    { value: "vegetarian", label: { fr: "Végétarien", en: "Vegetarian", th: "มังสวิรัติ" } },
    { value: "vegan", label: { fr: "Végan", en: "Vegan", th: "วีแกน" } },
    { value: "gluten-free", label: { fr: "Sans Gluten", en: "Gluten-Free", th: "ปราศจากกลูเตน" } },
    { value: "seafood", label: { fr: "Fruits de Mer", en: "Seafood", th: "ซีฟู้ด/ทะเล" } },
    { value: "chicken", label: { fr: "Poulet", en: "Chicken", th: "เนื้อไก่" } },
    { value: "beef", label: { fr: "Bœuf", en: "Beef", th: "เนื้อวัว" } },
    { value: "desserts", label: { fr: "Desserts", en: "Desserts", th: "ขนมหวาน" } },
    { value: "drinks", label: { fr: "Boissons", en: "Drinks", th: "เครื่องดื่ม" } },
  ];

  // Filter items in real-time
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Search logic checking across names & descriptions in selected language or French/English
      const name = (item.name[currentLang] || item.name["fr"] || "").toLowerCase();
      const desc = (item.description[currentLang] || item.description["fr"] || "").toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchesSearch = name.includes(query) || desc.includes(query);

      if (!matchesSearch) return false;

      // Filter logic
      if (selectedCategory === "all") return true;
      if (selectedCategory === "spiced") return item.isSpicy;
      if (selectedCategory === "non-spiced") return !item.isSpicy;
      if (selectedCategory === "vegetarian") return item.isVegetarian === true;
      if (selectedCategory === "vegan") return item.isVegan === true;
      if (selectedCategory === "gluten-free") return item.isGlutenFree === true;

      return item.tags.includes(selectedCategory);
    });
  }, [searchQuery, selectedCategory, currentLang]);

  return (
    <section id="menu" className="py-24 px-4 max-w-7xl mx-auto Scroll-mt-16">
      {/* Decorative Line & Heading */}
      <div className="text-center mb-16">
        <div className="h-[1px] w-12 bg-[#D8BC7B] mx-auto mb-4" />
        <p className="text-xs font-bold tracking-[0.25em] text-[#D8BC7B] uppercase mb-1">
          {TRANSLATE_DICTIONARY.specialtiesTitle[currentLang] || "Nos Créations"}
        </p>
        <h2
          className={`text-3xl sm:text-4xl font-light tracking-tight ${
            isDarkMode ? "text-stone-100" : "text-[#2F4A2F]"
          }`}
        >
          {TRANSLATE_DICTIONARY.menuIntelligentTitle[currentLang] || "Menu Intelligent"}
        </h2>
      </div>

      {/* Control Panel: Search & Filter Tabs */}
      <div className="max-w-4xl mx-auto mb-12 flex flex-col gap-6">
        {/* Search Bar */}
        <div className="relative w-full">
          <input
            id="menu-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              currentLang === "fr"
                ? "Rechercher par ingrédient, plat (ex: Curry, Coco, Crevettes)..."
                : currentLang === "th"
                ? "ค้นหารสชาติ, ส่วนประกอบ (เช่น แกง, มะพร้าว, กุ้ง)..."
                : "Search by ingredient or dish (e.g., Curry, Coconut, Prawns)..."
            }
            className={`w-full py-4 pl-12 pr-4 rounded-2xl text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#D8BC7B] ${
              isDarkMode
                ? "bg-stone-900 border-stone-800 text-stone-100 placeholder-stone-500"
                : "bg-white border-emerald-100 text-stone-800 placeholder-stone-400 shadow-sm"
            }`}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D8BC7B]" size={18} />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-[#D8BC7B]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Badges - Horizontal Scroller */}
        <div className="flex gap-2 overflow-x-auto pb-3 snap-x scrollbar-none no-scrollbar">
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            const label = cat.label[currentLang] || cat.label["fr"] || cat.label["en"];
            return (
              <button
                key={cat.value}
                id={`btn-menu-filter-${cat.value}`}
                onClick={() => setSelectedCategory(cat.value)}
                className={`snap-center shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-[#2F4A2F] text-[#D8BC7B] shadow-md border-transparent text-white"
                    : isDarkMode
                    ? "bg-stone-950 border-stone-800 text-stone-300 hover:bg-stone-900"
                    : "bg-emerald-50/50 border-emerald-100/50 text-[#374A38] hover:bg-emerald-50 hover:border-emerald-200"
                } border`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Menu Cards */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const localizedName = item.name[currentLang] || item.name["fr"] || item.name["en"];
            const localizedDesc = item.description[currentLang] || item.description["fr"] || item.description["en"];

            return (
              <div
                key={item.id}
                id={`card-dish-${item.id}`}
                className={`flex flex-col h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border group ${
                  isDarkMode ? "bg-stone-900/40 border-stone-800" : "bg-white border-emerald-100/60"
                }`}
              >
                {/* Image viewport with luxury zoom effect */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={localizedName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {item.isVegetarian && (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase rounded-full bg-emerald-950/80 text-emerald-300 backdrop-blur-md">
                        <Leaf size={8} /> Veg
                      </span>
                    )}
                    {item.isVegan && (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase rounded-full bg-emerald-900/80 text-green-300 backdrop-blur-md">
                        <Leaf size={8} /> Vegan
                      </span>
                    )}
                    {item.isGlutenFree && (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase rounded-full bg-amber-950/80 text-amber-300 backdrop-blur-md">
                        <ShieldAlert size={8} /> Sans Gluten
                      </span>
                    )}
                  </div>

                  {/* Spicy Indicators */}
                  {item.isSpicy && (
                    <div className="absolute top-3 right-3 flex gap-0.5 bg-black/50 p-1.5 rounded-full backdrop-blur-md">
                      {Array.from({ length: item.spicyLevel || 1 }).map((_, idx) => (
                        <Flame key={idx} size={11} className="text-red-500 fill-red-500" />
                      ))}
                    </div>
                  )}

                  {/* Price Banner */}
                  <div className="absolute bottom-3 right-3 bg-[#2F4A2F]/90 text-[#D8BC7B] px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wide backdrop-blur-sm shadow border border-[#D8BC7B]/20">
                    {item.price} €
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3
                    className={`text-base font-medium tracking-tight mb-2 group-hover:text-[#D8BC7B] transition-colors ${
                      isDarkMode ? "text-stone-100" : "text-[#2F4A2F]"
                    }`}
                  >
                    {localizedName}
                  </h3>
                  <p className={`text-xs font-light leading-relaxed mb-6 flex-grow line-clamp-3 ${
                    isDarkMode ? "text-[#E9E1D2]/70" : "text-stone-600"
                  }`}>
                    {localizedDesc}
                  </p>

                  {/* Card Button */}
                  <button
                    type="button"
                    onClick={() => onAddToCart(item)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 border bg-transparent border-[#D8BC7B]/60 text-[#D8BC7B] hover:bg-[#D8BC7B]/10 hover:border-[#D8BC7B] active:scale-[0.97]"
                  >
                    <ShoppingBag size={13} />
                    <span>
                      {currentLang === "fr" ? "Commander" : currentLang === "th" ? "สั่งอาหาร" : "Order"}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 max-w-md mx-auto">
          <p className={`text-sm font-light ${isDarkMode ? "text-stone-400" : "text-[#374A38]/70"}`}>
            Aucun délice ne correspond à votre recherche. Essayez d'autres mots clés comme 'Mango' ou 'Curry'.
          </p>
        </div>
      )}
    </section>
  );
}
