export type OfferCategory = 'Gold' | 'Diamond' | 'Silver' | 'Collections';
export type DiscountType = 'Percentage' | 'Flat' | 'Buy1Get1' | 'Special';
export type OfferStatus = 'pending' | 'approved' | 'rejected' | 'expired';
export type VendorStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export interface Location {
  state: string;
  city: string;
  pincode: string;
}

export interface Shop {
  name: string;
  address: string;
  location: Location;
  googleMapsLink: string;
  phone: string;
}

export interface Offer {
  id: string;
  vendorId: string;
  vendorName: string;
  category: OfferCategory;
  discountType: DiscountType;
  title: string;
  description: string;
  posterUrl: string;
  shop: Shop;
  validFrom: string;
  validUntil: string;
  status: OfferStatus;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  posts: number;
  months: number;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  gstNumber: string;
  kycDocuments: string[];
  status: VendorStatus;
  subscriptionPlanId: string | null;
  remainingPosts: number;
  createdAt: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
}
