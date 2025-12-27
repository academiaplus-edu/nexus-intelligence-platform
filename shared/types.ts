export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type UserTier = 'Free' | 'Academic' | 'Industry' | 'Enterprise';
export interface User {
  id: string;
  name: string;
  email: string;
  tier: UserTier;
}
export interface Brief {
  id: string;
  slug: string;
  title: string;
  category: "Academic" | "Industry" | "Policy";
  summary: string;
  fullContent: string;
  isPremium: boolean;
  date: string;
  author: string;
  readTime: string;
}
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  type: "Consulting" | "Training";
}
export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  cta: string;
}
// Keeping existing demo types for compatibility
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}