
export interface Seller {
  name: string;
  id: string;
  phone?: string;
  rating?: number;
  memberSince?: string;
  availableHours?: string;
  isVerified?: boolean;
  subscriptionType?: 'free' | 'basic' | 'pro';
}

export interface ListingProps {
  id: string;
  title: string;
  price: number;
  image: string;
  additionalImages?: string[];
  location: string;
  type: "sell" | "rent" | "recycle" | "donate";
  featured?: boolean;
  seller: Seller;
  createdAt: Date;
  description?: string;
  keywords?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  messages?: ChatMessage[];
  category?: string;
  condition?: string;
  impactMetrics?: {
    carbonSaved: number;
    wasteDiverted: number;
  };
  escrowStatus?: 'pending' | 'active' | 'completed' | 'disputed';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
}

export interface UserImpact {
  itemsListed: number;
  itemsSold: number;
  itemsRented: number;
  wasteDiverted: number;
  carbonSaved: number;
  badges: string[];
}

export interface PaymentMethod {
  type: 'card' | 'upi' | 'wallet';
  name: string;
  lastFourDigits?: string;
  expiryDate?: string;
  upiId?: string;
}
