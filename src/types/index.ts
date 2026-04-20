export type UserType = 'individual' | 'residence' | 'villa' | 'office' | 'company' | 'factory' | 'industry';
export type UserRole = 'household' | 'business' | 'municipality' | 'recycler' | 'admin';
export type WasteType = 'plastic' | 'paper' | 'organic' | 'metal' | 'glass' | 'electronic' | 'textile' | 'hazardous' | 'other';
export type WasteFrequency = 'once' | 'daily' | 'weekly' | 'monthly';
export type WasteStatus = 'reported' | 'collected' | 'processing' | 'recycled' | 'disposed';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  role: UserRole;
  createdAt: string;
  avatar?: string;
}

export interface WasteReport {
  id: string;
  userId: string;
  wasteType: WasteType;
  quantity: number;
  unit: 'kg' | 'liters' | 'bags';
  frequency: WasteFrequency;
  description?: string;
  photoUrl?: string;
  latitude: number;
  longitude: number;
  qrCode?: string;
  rfidTag?: string;
  status: WasteStatus;
  createdAt: string;
  updatedAt: string;
  collectedAt?: string;
  recycledAt?: string;
  emirate: string;
}

export interface DashboardStats {
  recyclingScore: number;
  rank: number;
  totalWaste: number;
  recycledWaste: number;
  recyclingPercentage: number;
  emissions: number;
  points: number;
  reportsCount: number;
}