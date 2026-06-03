export interface Language {
  code: string;
  name: string;
  flag: string;
}

export type CategoryType =
  | "all"
  | "spiced"
  | "non-spiced"
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "seafood"
  | "chicken"
  | "beef"
  | "desserts"
  | "drinks";

export interface MenuItem {
  id: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  price: number;
  image: string;
  isSpicy: boolean;
  spicyLevel?: number; // 1-3
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  tags: CategoryType[];
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
  status: "available" | "reserved" | "selected";
  x: number; // percentage from left
  y: number; // percentage from top
  type: "royal" | "romantic" | "family" | "terrace";
}

export interface Booking {
  date: string;
  timeSlot: string;
  guests: number;
  tableId: string | null;
  name: string;
  email: string;
  phone: string;
  requirements?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: { [key: string]: string };
  tag: string;
  image?: string;
}

export interface FAQItem {
  id: string;
  question: { [key: string]: string };
  answer: { [key: string]: string };
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface LoyaltyProfile {
  name: string;
  points: number;
  level: "Bronze" | "Silver" | "Gold" | "Jasmine Royal";
  memberSince: string;
  claimedRewards: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}
