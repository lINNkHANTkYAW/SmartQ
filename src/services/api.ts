import { 
  User, Merchant, Branch, Service, Staff, Booking, 
  QueueToken, Product, Offer, BookingStatus, TokenStatus 
} from '../types';

// Mock Data
export const MOCK_USER: User = {
  id: 'u1',
  name: 'Kyaw Zayar',
  phone: '09123456789',
  role: 'CUSTOMER',
  loyaltyPoints: 1250,
  tier: 'SILVER'
};

export const MOCK_MERCHANTS: Merchant[] = [
  { id: 'm1', name: 'Glow Up Studio', category: 'Beauty Salon', logo: 'https://picsum.photos/seed/glow/100/100', rating: 4.8 },
  { id: 'm2', name: 'Zen Spa & Wellness', category: 'Spa', logo: 'https://picsum.photos/seed/zen/100/100', rating: 4.9 }
];

export const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', merchantId: 'm1', name: 'Glow Up - Junction City', address: 'Level 3, Junction City, Yangon', image: 'https://picsum.photos/seed/b1/400/200', distance: '1.2 km', categories: ['Hair', 'Nails'] },
  { id: 'b2', merchantId: 'm1', name: 'Glow Up - Hledan', address: 'Hledan Center, Yangon', image: 'https://picsum.photos/seed/b2/400/200', distance: '4.5 km', categories: ['Hair', 'Nails'] },
  { id: 'b3', merchantId: 'm2', name: 'Zen Spa - Sedona', address: 'Sedona Hotel, Yangon', image: 'https://picsum.photos/seed/b3/400/200', distance: '3.8 km', categories: ['Spa', 'Massage', 'Facial'] },
  { id: 'b4', merchantId: 'm2', name: 'Zen Spa - Inya', address: 'Inya Road, Bahan, Yangon', image: 'https://picsum.photos/seed/b4/400/200', distance: '2.5 km', categories: ['Massage', 'Spa'] },
  { id: 'b5', merchantId: 'm1', name: 'Glow Up - Times City', address: 'Times City, Jewel Tower, Yangon', image: 'https://picsum.photos/seed/b5/400/200', distance: '0.5 km', categories: ['Hair', 'Facial'] },
  { id: 'b6', merchantId: 'm3', name: 'Urban Gent Barbershop', address: 'Myanmar Plaza, Ground Floor', distance: '3.1 km', image: 'https://picsum.photos/seed/urban/800/600', categories: ['Hair'] },
];

export const MOCK_SERVICES: Service[] = [
  { id: 's1', branchId: 'b1', name: 'Hair Cut & Styling', duration: 45, price: 15000, description: 'Professional hair cut with styling' },
  { id: 's2', branchId: 'b1', name: 'Manicure', duration: 30, price: 8000, description: 'Basic manicure with polish' },
  { id: 's3', branchId: 'b3', name: 'Thai Massage', duration: 60, price: 25000, description: 'Traditional Thai full body massage' },
  { id: 's4', branchId: 'b3', name: 'Aroma Therapy', duration: 90, price: 35000, description: 'Relaxing essential oils' },
  { id: 's5', branchId: 'b4', name: 'Deep Tissue Massage', duration: 60, price: 40000, description: 'Intense muscle relief' },
  { id: 's6', branchId: 'b5', name: 'Hydra Facial', duration: 60, price: 55000, description: 'Deep skin hydration treatment' },
];

export const MOCK_STAFF: Staff[] = [
  { id: 'st1', branchId: 'b1', name: 'Su Su', role: 'Senior Stylist', avatar: 'https://picsum.photos/seed/st1/100/100', rating: 4.9, specialties: ['Hair Cut', 'Coloring'] },
  { id: 'st2', branchId: 'b1', name: 'Aung Aung', role: 'Junior Stylist', avatar: 'https://picsum.photos/seed/st2/100/100', rating: 4.5, specialties: ['Hair Cut'] },
  { id: 'st3', branchId: 'b3', name: 'Daw Nu', role: 'Master Therapist', avatar: 'https://picsum.photos/seed/st3/100/100', rating: 5.0, specialties: ['Thai Massage'] },
  { id: 'st4', branchId: 'b4', name: 'Ko Htet', role: 'Senior Therapist', avatar: 'https://picsum.photos/seed/st4/100/100', rating: 4.8, specialties: ['Deep Tissue'] },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Argan Oil Shampoo', price: 12000, image: 'https://picsum.photos/seed/p1/200/200', category: 'Hair Care' },
  { id: 'p2', name: 'Face Mask Set', price: 5000, image: 'https://picsum.photos/seed/p2/200/200', category: 'Skin Care' }
];

export const MOCK_OFFERS: Offer[] = [
  { id: 'o1', title: 'Wait-time Special', description: 'Get 10% off any hair product while you wait!', discount: '10%', image: 'https://picsum.photos/seed/o1/400/200' }
];

// Mock API Service
class MockApiService {
  private bookings: Booking[] = [];
  private tokens: QueueToken[] = [];

  async getBranches() { return MOCK_BRANCHES; }
  async getBranch(id: string) { return MOCK_BRANCHES.find(b => b.id === id); }
  async getServices(branchId: string) { return MOCK_SERVICES.filter(s => s.branchId === branchId); }
  async getStaff(branchId: string) { return MOCK_STAFF.filter(s => s.branchId === branchId); }
  
  async createBooking(booking: Omit<Booking, 'id' | 'status'>) {
    const newBooking: Booking = {
      ...booking,
      id: `bk-${Date.now()}`,
      status: BookingStatus.CONFIRMED
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  async getMyBookings(userId: string) {
    return this.bookings.filter(b => b.userId === userId);
  }

  async getMyTokens(userId: string) {
    return this.tokens.filter(t => t.userId === userId);
  }

  async createToken(branchId: string, userId?: string, bookingId?: string) {
    const token: QueueToken = {
      id: `tk-${Date.now()}`,
      branchId,
      userId,
      bookingId,
      tokenNumber: `A${Math.floor(Math.random() * 100)}`,
      status: TokenStatus.WAITING,
      estimatedWait: 15,
      position: 3,
      createdAt: new Date().toISOString()
    };
    this.tokens.push(token);
    return token;
  }

  async getQueueStatus(tokenId: string) {
    const token = this.tokens.find(t => t.id === tokenId);
    if (!token) return null;
    // Simulate queue moving
    return {
      ...token,
      position: Math.max(0, token.position - (Math.random() > 0.8 ? 1 : 0))
    };
  }
}

export const api = new MockApiService();
