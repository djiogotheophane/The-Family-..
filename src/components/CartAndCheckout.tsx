import React, { useState } from "react";
import { MenuItem, CartItem } from "../types";
import { CreditCard, ShieldCheck, X, Plus, Minus, Trash2, ShoppingBag, Truck, Store, Gift } from "lucide-react";

interface CartAndCheckoutProps {
  currentLang: string;
  isDarkMode: boolean;
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onAwardPoints?: (points: number) => void;
}

export default function CartAndCheckout({
  currentLang,
  isDarkMode,
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAwardPoints,
}: CartAndCheckoutProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"delivery" | "takeaway">("takeaway");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");

  // Card form states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const deliveryFee = deliveryType === "delivery" ? 5 : 0;
  const royalTax = Number((subtotal * 0.1).toFixed(2)); // luxury service tax
  const total = subtotal + deliveryFee + royalTax;

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);

      const loyaltyEarned = Math.floor(subtotal * 10); // +10 points per Euro
      if (onAwardPoints) {
        onAwardPoints(loyaltyEarned);
      }
    }, 2000);
  };

  const handleResetCheckout = () => {
    setIsCheckoutOpen(false);
    setIsPaid(false);
    onClearCart();
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvv("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Sidebar Cart Drawer */}
      <div className="fixed inset-0 z-50 overflow-hidden font-sans">
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <div
            className={`w-screen max-w-md h-full flex flex-col justify-between shadow-2xl relative z-10 animate-in slide-in-from-right duration-300 ${
              isDarkMode ? "bg-[#161815] text-stone-100" : "bg-white text-[#2F4A2F]"
            }`}
          >
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-stone-850 flex items-center justify-between">
              <h3 className="text-lg font-medium tracking-tight flex items-center gap-2">
                <ShoppingBag size={18} className="text-[#D8BC7B]" />
                <span>{currentLang === "fr" ? "Mon Panier Privé" : "My Luxury Cart"}</span>
              </h3>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-stone-550/20 text-stone-400">
                <X size={20} />
              </button>
            </div>

            {/* Cart list content */}
            <div className="flex-grow overflow-y-auto p-6 space-y-5 no-scrollbar">
              {cart.length > 0 ? (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className={`flex gap-4 p-3 rounded-2xl border ${
                        isDarkMode ? "bg-stone-900/60 border-stone-800" : "bg-stone-50 border-emerald-100"
                      }`}
                    >
                      <img
                        src={item.menuItem.image}
                        alt=""
                        className="w-16 h-16 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="text-xs font-semibold truncate">
                          {item.menuItem.name[currentLang] || item.menuItem.name["fr"]}
                        </h4>
                        <span className="text-xs font-mono font-medium text-[#D8BC7B] block mt-0.5">
                          {item.menuItem.price} € x {item.quantity}
                        </span>

                        {/* Quantity manipulators */}
                        <div className="flex items-center gap-2.5 mt-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                            className="p-1 rounded-md bg-stone-550/10 border border-stone-800 text-stone-400 hover:text-[#D8BC7B]"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-bold font-mono">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                            className="p-1 rounded-md bg-stone-550/10 border border-stone-800 text-stone-400 hover:text-[#D8BC7B]"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>

                      {/* Remove trash */}
                      <button
                        onClick={() => onRemoveItem(item.menuItem.id)}
                        className="text-stone-400 hover:text-red-500 self-start p-1"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}

                  {/* Delivery preference tabs */}
                  <div className="pt-4 border-t border-stone-800">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                      {currentLang === "fr" ? "Méthode d'Expédition" : "Shipment Channel"}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryType("takeaway")}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          deliveryType === "takeaway"
                            ? "bg-[#2F4A2F] border-transparent text-[#D8BC7B]"
                            : "bg-transparent border-stone-800 text-stone-400"
                        }`}
                      >
                        <Store size={14} />
                        <span>Retrait 15min</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryType("delivery")}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          deliveryType === "delivery"
                            ? "bg-[#2F4A2F] border-transparent text-[#D8BC7B]"
                            : "bg-transparent border-stone-800 text-stone-400"
                        }`}
                      >
                        <Truck size={14} />
                        <span>Livraison Gants Blancs</span>
                      </button>
                    </div>
                  </div>

                  {deliveryType === "delivery" && (
                    <div className="space-y-2 pt-2 animate-in fade-in duration-300">
                      <input
                        type="text"
                        placeholder="Adresse de livraison prestigieuse"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-xl border border-stone-800 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#D8BC7B]"
                      />
                      <input
                        type="text"
                        placeholder="Code postal"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-xl border border-stone-800 bg-transparent focus:outline-none focus:ring-1 focus:ring-[#D8BC7B]"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <ShoppingBag size={32} className="text-stone-600 mb-4 stroke-[1.5]" />
                  <p className="text-xs font-light text-stone-500">
                    Votre panier est actuellement libre de tout délice.
                  </p>
                </div>
              )}
            </div>

            {/* Total recap & Checkout Trigger */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-800 bg-stone-900/40">
                <div className="space-y-2 text-xs font-light mb-6">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Sous-total</span>
                    <span className="font-mono font-medium">{subtotal} €</span>
                  </div>
                  {deliveryType === "delivery" && (
                    <div className="flex justify-between">
                      <span className="text-stone-400">Livraison Gants Blancs</span>
                      <span className="font-mono font-medium">{deliveryFee} €</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-stone-400">Frais de Service Royal (10%)</span>
                    <span className="font-mono font-medium">{royalTax} €</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold pt-2 border-t border-stone-800">
                    <span className="text-[#D8BC7B]">Total Unique</span>
                    <span className="font-mono text-[#D8BC7B]">{total.toFixed(2)} €</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#D8BC7B] text-[#2F4A2F] hover:bg-[#D8BC7B]/90 transition-all duration-300"
                >
                  Procéder au Paiement Sécurisé
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Credit Card Secure Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsCheckoutOpen(false)} />

          <div
            className={`relative max-w-md w-full rounded-3xl p-6 border shadow-2xl z-10 animate-in zoom-in-95 duration-300 ${
              isDarkMode ? "bg-stone-950 border-stone-850 text-stone-100" : "bg-white border-emerald-100 text-stone-800"
            }`}
          >
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-stone-850/50 text-stone-400"
            >
              <X size={18} />
            </button>

            {isPaid ? (
              /* Success confirmation within card checkout modal */
              <div className="text-center py-6 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-950/80 text-[#D8BC7B] flex items-center justify-center mb-4">
                  <ShieldCheck size={28} />
                </div>
                <h4 className="text-lg font-medium text-[#D8BC7B] mb-2">
                  Transaction Exécutée avec Succès
                </h4>
                <p className="text-xs font-light text-stone-400 max-w-sm leading-relaxed mb-6">
                  Le majestueux pilon de cuisine à Chiang Mai vient de s'activer ! Votre repas vous parviendra sous de superbes cloches en argent.
                </p>

                {/* Card Points Booster display */}
                <div className="mb-6 p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center gap-3.5 max-w-xs text-left">
                  <Gift className="text-[#D8BC7B] shrink-0" size={24} />
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#D8BC7B]">BOOSTER FIDÉLITÉ</h5>
                    <p className="text-xs font-bold text-white mt-0.5">+{Math.floor(subtotal * 10)} Points Jasmin royal</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetCheckout}
                  className="px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#D8BC7B] text-[#2F4A2F] hover:bg-[#D8BC7B]/80"
                >
                  Terminer
                </button>
              </div>
            ) : (
              /* Payment Information Form with card simulation graphics */
              <form onSubmit={handlePaySubmit} className="space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="text-[#D8BC7B]" size={20} />
                  <h4 className="text-sm font-semibold uppercase tracking-wider">
                    Coffre-fort Monétaire Sécurisé
                  </h4>
                </div>

                {/* Visual Premium Holographic-style Credit Card */}
                <div className="relative w-full aspect-[1.586/1] bg-gradient-to-tr from-stone-900 via-emerald-950 to-stone-950 border border-[#D8BC7B]/30 rounded-2xl p-5 text-stone-200 overflow-hidden shadow-lg select-none">
                  {/* Chip and logo mockup */}
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-8 rounded-lg bg-gradient-to-r from-yellow-600 to-amber-300 opacity-80 shadow" />
                    <span className="text-xs font-black tracking-widest italic text-[#D8BC7B]">THE FAMILY PLATINUM</span>
                  </div>

                  {/* Card number representation */}
                  <div className="mt-8 font-mono text-base tracking-[0.2em]">
                    {cardNumber ? cardNumber.replace(/\s?/g, "").match(/.{1,4}/g)?.join(" ") : "•••• •••• •••• ••••"}
                  </div>

                  {/* Footer card metrics */}
                  <div className="mt-6 flex justify-between items-end">
                    <div>
                      <span className="text-[7px] uppercase block tracking-wider opacity-60">TITULAIRE</span>
                      <span className="text-xs font-bold tracking-wide truncate max-w-[120px] block">
                        {cardName ? cardName.toUpperCase() : "MEMBRE VIP"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[7px] uppercase block tracking-wider opacity-60">EXPIRE</span>
                      <span className="text-xs font-bold font-mono block">
                        {cardExpiry ? cardExpiry : "MM/AA"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Input form fields */}
                <div className="space-y-3">
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="Numéro de carte (16 chiffres)"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                    required
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-800 bg-[#161815] text-white focus:outline-none focus:ring-1 focus:ring-[#D8BC7B]"
                  />
                  <input
                    type="text"
                    placeholder="Nom complet du titulaire"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-800 bg-[#161815] text-white focus:outline-none focus:ring-1 focus:ring-[#D8BC7B]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="MM/AA"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                      className="w-full p-2.5 text-xs rounded-xl border border-stone-800 bg-[#161815] text-white focus:outline-none focus:ring-1 focus:ring-[#D8BC7B]"
                    />
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="CVV"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                      required
                      className="w-full p-2.5 text-xs rounded-xl border border-stone-800 bg-[#161815] text-white focus:outline-none focus:ring-1 focus:ring-[#D8BC7B]"
                    />
                  </div>
                </div>

                {/* Submitting state button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#D8BC7B] text-[#2F4A2F] rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:bg-[#D8BC7B]/80 disabled:opacity-50"
                >
                  {isProcessing ? "Sécurisation bancaire en cours..." : `Payer ${total.toFixed(2)} €`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
