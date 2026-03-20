import { Type } from "@google/genai";

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CHECKED_IN = "CHECKED_IN",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  NO_SHOW = "NO_SHOW"
}

export enum TokenStatus {
  WAITING = "WAITING",
  CALLED = "CALLED",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  SKIPPED = "SKIPPED",
  CANCELLED = "CANCELLED"
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'CUSTOMER' | 'MERCHANT_STAFF' | 'MERCHANT_ADMIN' | 'PLATFORM_ADMIN';
  loyaltyPoints: number;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'VIP';
}

export interface Merchant {
  id: string;
  name: string;
  category: string;
  logo: string;
  rating: number;
}

export interface Branch {
  id: string;
  merchantId: string;
  name: string;
  address: string;
  image: string;
  distance: string;
  categories: string[];
}

export interface Service {
  id: string;
  branchId: string;
  name: string;
  duration: number; // minutes
  price: number;
  description: string;
}

export interface Staff {
  id: string;
  branchId: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  specialties: string[];
}

export interface Booking {
  id: string;
  userId: string;
  branchId: string;
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  status: BookingStatus;
  fee: number;
}

export interface QueueToken {
  id: string;
  bookingId?: string;
  branchId: string;
  userId?: string;
  tokenNumber: string;
  status: TokenStatus;
  estimatedWait: number; // minutes
  position: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
}
