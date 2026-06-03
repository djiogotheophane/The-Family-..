import React, { useState } from "react";
import { Table, Booking } from "../types";
import { MOCK_TABLES, TRANSLATE_DICTIONARY } from "../data";
import { Calendar, Users, Clock, Check, Coffee, Crown, Heart, Map } from "lucide-react";

interface BookingSectionProps {
  currentLang: string;
  isDarkMode: boolean;
  onAwardPoints?: (points: number) => void;
}

export default function BookingSection({ currentLang, isDarkMode, onAwardPoints }: BookingSectionProps) {
  const [tables, setTables] = useState<Table[]>(MOCK_TABLES);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const [date, setDate] = useState("2026-06-04");
  const [timeSlot, setTimeSlot] = useState("20:00");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requirements, setRequirements] = useState("");

  const [isBooked, setIsBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);

  const availableTimeSlots = ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

  const handleTableClick = (table: Table) => {
    if (table.status === "reserved") return;
    setSelectedTable(table);
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert(currentLang === "fr" ? "Veuillez remplir vos informations de contact." : "Please fill out your contact details.");
      return;
    }

    const payload: Booking = {
      date,
      timeSlot,
      guests,
      tableId: selectedTable ? selectedTable.id : null,
      name,
      email,
      phone,
      requirements,
    };

    setBookingDetails(payload);
    setIsBooked(true);

    // Let's award 100 points to the loyalty program!
    if (onAwardPoints) {
      onAwardPoints(150); // Generous reward for booking a VIP room
    }

    // Change status of selected table
    if (selectedTable) {
      setTables((prev) =>
        prev.map((t) => (t.id === selectedTable.id ? { ...t, status: "reserved" } : t))
      );
    }
  };

  const handleReset = () => {
    setIsBooked(false);
    setBookingDetails(null);
    setSelectedTable(null);
    setName("");
    setEmail("");
    setPhone("");
    setRequirements("");
  };

  return (
    <section id="reservation" className="py-24 px-4 bg-gradient-to-b from-stone-900/10 via-stone-500/5 to-stone-900/5 dark:from-stone-950 dark:to-stone-900 Scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-16">
          <div className="h-[1px] w-12 bg-[#D8BC7B] mx-auto mb-4" />
          <p className="text-xs font-bold tracking-[0.25em] text-[#D8BC7B] uppercase mb-1">
            {TRANSLATE_DICTIONARY.bookNow[currentLang] || "Réservation Directe"}
          </p>
          <h2
            className={`text-3xl sm:text-4xl font-light tracking-tight ${
              isDarkMode ? "text-[#D8BC7B]" : "text-[#2F4A2F]"
            }`}
          >
            {currentLang === "fr"
              ? "Système de Plan de Salle en Temps Réel"
              : "Immersive Table Floorplan Selection"}
          </h2>
        </div>

        {isBooked && bookingDetails ? (
          /* Confirmation Board */
          <div className="max-w-2xl mx-auto rounded-3xl p-8 border shadow-xl bg-[#2F4A2F] border-[#D8BC7B]/20 text-white animate-in scale-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#D8BC7B] text-[#2F4A2F] flex items-center justify-center mb-6">
                <Check size={28} className="stroke-[3]" />
              </div>
              <h3 className="text-2xl font-light tracking-tight text-[#D8BC7B] mb-2">
                {currentLang === "fr" ? "Réservation Royale Confirmée !" : "Royal Reservation Confirmed!"}
              </h3>
              <p className="text-xs font-light text-stone-200 uppercase tracking-widest mb-6">
                ID REF: TH-FAMILY-{Math.floor(1000 + Math.random() * 9000)}
              </p>

              <div className="w-full h-[1px] bg-white/10 mb-6" />

              {/* Booking Pass Details */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-left w-full max-w-md mx-auto text-sm">
                <div>
                  <span className="text-xs text-[#D8BC7B]/80 block font-medium">Hôte</span>
                  <span className="font-medium text-stone-100">{bookingDetails.name}</span>
                </div>
                <div>
                  <span className="text-xs text-[#D8BC7B]/80 block font-medium">Invités</span>
                  <span className="font-semibold text-stone-100">{bookingDetails.guests} couverts</span>
                </div>
                <div>
                  <span className="text-xs text-[#D8BC7B]/80 block font-medium">Date</span>
                  <span className="font-semibold text-stone-100">{bookingDetails.date}</span>
                </div>
                <div>
                  <span className="text-xs text-[#D8BC7B]/80 block font-medium">Heure</span>
                  <span className="font-semibold text-stone-100">{bookingDetails.timeSlot}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs text-[#D8BC7B]/80 block font-medium">Emplacement Réservé</span>
                  <span className="font-semibold text-stone-100 flex items-center gap-1.5 mt-0.5">
                    <Crown size={12} className="text-[#D8BC7B]" />
                    {selectedTable
                      ? selectedTable.name
                      : "Salon d'Honneur (Table attribuée par le majordome)"}
                  </span>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/10 my-6" />

              <p className="text-xs font-light text-stone-300 max-w-sm mb-6 leading-relaxed">
                {currentLang === "fr"
                  ? "Un e-mail de confirmation assorti de notre code vestimentaire chic et de votre crédit fidélité de +150 points vient de vous être envoyé."
                  : "A digital confirmation including dressing protocols and your +150 loyalty gift has been transmitted."}
              </p>

              <button
                onClick={handleReset}
                className="px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-[#2F4A2F] hover:bg-[#D8BC7B]/20 hover:text-white transition-all duration-300"
              >
                {currentLang === "fr" ? "Nouvelle Réservation" : "New Booking"}
              </button>
            </div>
          </div>
        ) : (
          /* Realtime Form + Visual Floorplan Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Column 1: Config and Contact Form (lg:col-span-5) */}
            <form
              onSubmit={handleBookSubmit}
              className={`lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl border shadow-sm ${
                isDarkMode ? "bg-stone-900 border-stone-800" : "bg-white border-emerald-100/60"
              }`}
            >
              <div className="space-y-5">
                <h3 className={`text-lg font-medium mb-3 flex items-center gap-2 ${
                  isDarkMode ? "text-stone-100" : "text-[#2F4A2F]"
                }`}>
                  <Calendar size={18} className="text-[#D8BC7B]" />
                  <span>{currentLang === "fr" ? "Détails de la Visite" : "Details of Visit"}</span>
                </h3>

                {/* Date & Guests Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className={`w-full p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-[#D8BC7B] focus:outline-none ${
                        isDarkMode ? "bg-stone-950 border-stone-800 text-stone-100" : "bg-[#F8F5EE] border-emerald-100 text-stone-700"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                      {currentLang === "fr" ? "Convives" : "Guests"}
                    </label>
                    <div className="relative">
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className={`w-full p-2.5 rounded-xl appearance-none text-xs focus:ring-1 focus:ring-[#D8BC7B] focus:outline-none ${
                          isDarkMode ? "bg-stone-950 border-stone-800 text-stone-100" : "bg-[#F8F5EE] border-emerald-100 text-stone-700"
                        }`}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                          <option key={g} value={g}>
                            {g} {g > 1 ? (currentLang === "fr" ? "Couverts" : "Guests") : (currentLang === "fr" ? "Couvert" : "Guest")}
                          </option>
                        ))}
                      </select>
                      <Users className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400" size={12} />
                    </div>
                  </div>
                </div>

                {/* Session Hours Grid */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                    {currentLang === "fr" ? "Heure de dégustation" : "Tasting Time"}
                  </label>
                  <div className="grid grid-cols-5 gap-1.5 max-h-24 overflow-y-auto no-scrollbar pb-1">
                    {availableTimeSlots.map((slot) => {
                      const isSelected = timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`py-1.5 rounded-lg text-[10px] font-semibold font-mono tracking-wider border transition-colors ${
                            isSelected
                              ? "bg-[#2F4A2F] border-transparent text-white"
                              : isDarkMode
                              ? "bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-600"
                              : "bg-[#F8F5EE] border-emerald-100 text-stone-800 hover:bg-[#E9E1D2]"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="space-y-3 pt-2">
                  <div>
                    <input
                      type="text"
                      placeholder={currentLang === "fr" ? "Nom Complet" : "Full Name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={`w-full p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-[#D8BC7B] focus:outline-none ${
                        isDarkMode ? "bg-stone-950 border-stone-800 text-stone-100" : "bg-[#F8F5EE] border-emerald-100 text-stone-700"
                      }`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`w-full p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-[#D8BC7B] focus:outline-none ${
                        isDarkMode ? "bg-stone-950 border-stone-800 text-stone-100" : "bg-[#F8F5EE] border-emerald-100 text-stone-700"
                      }`}
                    />
                    <input
                      type="tel"
                      placeholder={currentLang === "fr" ? "Téléphone" : "Phone Number"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className={`w-full p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-[#D8BC7B] focus:outline-none ${
                        isDarkMode ? "bg-stone-950 border-stone-800 text-stone-100" : "bg-[#F8F5EE] border-emerald-100 text-stone-700"
                      }`}
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder={
                      currentLang === "fr"
                        ? "Notes particulières (ex: Allergies, Anniversaire, Cuisine vue mer...)"
                        : "Special demands (Allergies, Birthday, Sea view...)"
                    }
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className={`w-full p-2.5 rounded-xl text-xs resize-none focus:ring-1 focus:ring-[#D8BC7B] focus:outline-none ${
                      isDarkMode ? "bg-stone-950 border-stone-800 text-stone-100" : "bg-[#F8F5EE] border-emerald-100 text-stone-700"
                    }`}
                  />
                </div>
              </div>

              {/* Submission section */}
              <div className="mt-6 pt-4 border-t border-stone-800">
                <div className="flex justify-between items-center mb-4 text-xs font-medium">
                  <span className="text-stone-400">Emplacement</span>
                  <span className="text-[#D8BC7B]">
                    {selectedTable ? selectedTable.name : "Non sélectionné"}
                  </span>
                </div>
                <button
                  type="submit"
                  id="submit-booking-btn"
                  className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#D8BC7B] text-[#2F4A2F] hover:bg-[#D8BC7B]/80 transition-all duration-300 cursor-pointer shadow-md"
                >
                  {currentLang === "fr" ? "Réserver mon Expérience" : "Finalize My Table"}
                </button>
              </div>
            </form>

            {/* Column 2: Interactive Spatial Plan Map (lg:col-span-7) */}
            <div
              className={`lg:col-span-7 rounded-3xl p-6 border shadow-sm flex flex-col justify-between ${
                isDarkMode ? "bg-[#161815] border-stone-800" : "bg-white border-emerald-100/60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-sm font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                    isDarkMode ? "text-[#D8BC7B]" : "text-[#2F4A2F]"
                  }`}>
                    <Map size={14} className="text-[#D8BC7B]" />
                    <span>{currentLang === "fr" ? "Sélectionnez votre Salon Royal" : "Select Your Private Salon"}</span>
                  </h4>
                  <span className="text-[10px] font-semibold uppercase text-stone-400">
                    Live room scheme
                  </span>
                </div>
                <p className="text-[11px] font-light text-stone-400 leading-relaxed max-w-lg mb-6">
                  {currentLang === "fr"
                    ? "Cliquez librement sur la table de votre choix. Les dômes végétaux offrent un cocon préservé tandis que nos terrasses célèbrent la lueur des lampions."
                    : "Interact directly with our physical floor locations. Premium vegetation domes offer ultimate privacy."}
                </p>
              </div>

              {/* Physical Floorplan Graphics Representation */}
              <div className="relative w-full aspect-[16/10] min-h-[250px] bg-stone-950 border border-stone-800/80 rounded-2xl overflow-hidden shadow-inner p-4">
                {/* Central Open Kitchen/Bar Area */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[20%] border border-[#D8BC7B]/30 bg-black/60 rounded-xl flex flex-col items-center justify-center text-center pointer-events-none z-0">
                  <span className="text-[9px] uppercase tracking-widest font-mono text-[#D8BC7B]/60 font-medium">OPEN SHOWCASE</span>
                  <span className="text-xs font-bold text-[#D8BC7B] tracking-wider uppercase">Chef's Kitchen</span>
                </div>

                {/* Table Markers rendering dynamically with coordinate percentages */}
                {tables.map((table) => {
                  const isReserved = table.status === "reserved";
                  const isSelected = selectedTable && selectedTable.id === table.id;

                  // Define Icons based on reservation type
                  let TypeIcon = Crown;
                  if (table.type === "romantic") TypeIcon = Heart;
                  if (table.type === "terrace") TypeIcon = Coffee;

                  return (
                    <button
                      key={table.id}
                      type="button"
                      onClick={() => handleTableClick(table)}
                      style={{ left: `${table.x}%`, top: `${table.y}%` }}
                      disabled={isReserved}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center ${
                        isReserved
                          ? "bg-stone-900 border-stone-800 text-stone-600 cursor-not-allowed"
                          : isSelected
                          ? "bg-[#D8BC7B] border-[#D8BC7B] text-[#2F4A2F] scale-110 shadow-lg shadow-[#D8BC7B]/20"
                          : "bg-[#2F4A2F]/60 border-[#D8BC7B]/30 text-white/90 hover:scale-105 hover:bg-[#2F4A2F] hover:border-[#D8BC7B]"
                      }`}
                    >
                      <TypeIcon size={12} className={isReserved ? "text-stone-600" : isSelected ? "text-[#2F4A2F]" : "text-[#D8BC7B]"} />
                      <span className="text-[8px] font-semibold mt-1 font-mono tracking-tighter">
                        T.{table.id.split("_")[1]}
                      </span>
                      <span className="text-[7px] opacity-80 uppercase tracking-tighter">
                        {table.capacity}p
                      </span>
                    </button>
                  );
                })}

                {/* Legend panel */}
                <div className="absolute bottom-3 left-3 flex gap-3 text-[9px] uppercase tracking-wider font-semibold p-2 rounded-xl bg-black/80 backdrop-blur-md border border-stone-800/80">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#2F4A2F]/60 border border-[#D8BC7B]/30" />
                    <span className="text-stone-300">Libre</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-[#D8BC7B]" />
                    <span className="text-[#D8BC7B]">Choisie</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-stone-900 border border-stone-800" />
                    <span className="text-stone-500">Réservée</span>
                  </div>
                </div>
              </div>

              {/* Description summary of chosen table layout */}
              <div className="mt-4 pt-4 border-t border-stone-800/20 text-xs">
                {selectedTable ? (
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#D8BC7B]/5 border border-[#D8BC7B]/10">
                    <Crown size={18} className="text-[#D8BC7B] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-[#D8BC7B]">{selectedTable.name}</h5>
                      <p className="text-[11px] font-light text-stone-400 mt-0.5 leading-relaxed">
                        {selectedTable.type === "royal"
                          ? "Expérience exclusive sous dôme cristal translucide, intimité totale, entouré de fougères et orchidées siamoises."
                          : selectedTable.type === "romantic"
                          ? "Cosy et illuminé à la lanterne de soie, parfait pour les conversations confidentielles de couples."
                          : "Table spacieuse entourée d'artisanat boisé, idéal pour les dégustations partagées en famille."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] italic text-stone-400 text-center py-2">
                    {currentLang === "fr"
                      ? "Veuillez choisir un module de table sur le plan pour personnaliser votre expérience."
                      : "Please highlight a table locator on structural blueprint map."}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
