export type PropertyCategory = 
  | 'Homes'
  | 'Apartments'
  | 'Villas'
  | 'Plots'
  | 'Land'
  | 'Farmhouses'
  | 'Studios'
  | 'Commercial'
  | 'Offices'
  | 'Retail'
  | 'Investments'
  | 'Luxury Properties';

export type PropertyType =
  | 'Apartment'
  | 'Villa'
  | 'Plot'
  | 'Land'
  | 'Farmhouse'
  | 'Studio'
  | 'Office'
  | 'Retail'
  | 'Penthouse'
  | 'Duplex'
  | 'Commercial'
  | 'Other';

export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'New Launch';

export type PropertyStatus = 'Active' | 'Draft' | 'Sold Out' | 'Coming Soon' | 'Archived';

export type VerificationStatus = 
  | 'Verified'
  | 'Partially Verified'
  | 'Developer Provided'
  | 'Information Pending Verification';

export type PurposeType = 'End Use' | 'Investment' | 'Rental' | 'Capital Appreciation' | 'Both';

export interface Advisor {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  specialization: string[];
  activeLeadsCount: number;
  rating: number;
  totalDealsClosed: number;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface SavedProperty {
  id: string;
  propertyId: string;
  savedAt: string;
  notes?: string;
  property?: Property;
}

export interface AnalyticsEvent {
  id: string;
  name: 
    | 'property_view' 
    | 'property_save' 
    | 'property_compare' 
    | 'property_share' 
    | 'search' 
    | 'filter_apply' 
    | 'find_match_start' 
    | 'find_match_complete' 
    | 'ai_concierge_query' 
    | 'lead_submit' 
    | 'schedule_visit' 
    | 'whatsapp_click' 
    | 'call_click' 
    | 'report_download' 
    | 'calculator_run';
  payload: Record<string, any>;
  timestamp: string;
  sessionId?: string;
  path?: string;
}

export interface RecommendationInput {
  category?: string;
  budgetMin?: number;
  budgetMax?: number;
  location?: string;
  bedrooms?: string | number;
  purpose?: PurposeType;
  timeline?: string;
  lifestylePreferences?: string[];
}

export interface RecommendationResult {
  property: Property;
  matchPercentage: number;
  matchScore: number;
  matchHighlights: string[];
  rationale: string;
}

export interface ConciergeMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedProperties?: Property[];
  suggestedActions?: { label: string; action: string; url?: string }[];
}

export interface Developer {
  name: string;
  logo?: string;
  experienceYears?: number;
  totalProjects?: number;
  description?: string;
}

export interface Amenity {
  name: string;
  category: 'Wellness' | 'Sports' | 'Security' | 'Lifestyle' | 'Convenience' | 'Eco';
  icon?: string;
}

export interface ConnectivityItem {
  destination: string;
  distance: string;
  time: string;
  type: 'Metro' | 'Airport' | 'Highway' | 'School' | 'Hospital' | 'Business' | 'Retail' | 'Lifestyle';
}

export interface FloorPlan {
  title: string;
  bhk: string;
  superArea: string;
  carpetArea?: string;
  image: string;
  price?: string;
}

export interface L2HPerspective {
  bestFor: ('End Use' | 'Investment' | 'Rental' | 'Luxury' | 'Commercial' | 'Land')[];
  whatWeLike: string[]; // 3-5 concise points
  whatToConsider: string[]; // 2-4 honest advisory points
  locationAssessment: string;
  valueAssessment: string;
  connectivityAssessment: string;
  investmentSuitability: string;
  suitabilityScore?: {
    endUseScore: number; // 1-10
    investmentScore: number; // 1-10
    rentalScore: number; // 1-10
  };
}

export interface InvestmentView {
  entryPrice?: number;
  pricePerSqFt?: number;
  expectedAnnualAppreciationPercent?: number; // e.g. 10.5
  estimatedRentalYieldPercent?: number; // e.g. 4.2
  estimatedMonthlyRental?: number; // in INR
  holdingPeriodYears?: number; // e.g. 5
  demandDrivers: string[];
  comparableProjects?: {
    name: string;
    locality: string;
    pricePerSqFt: number;
    possessionStatus: string;
  }[];
  liquidityRating?: 'High' | 'Moderate' | 'Selective';
  exitStrategies: string[];
  risks: string[];
  disclaimer: string;
}

export interface InvestmentInsight {
  expectedRoi?: string;
  rentalYield?: string;
  growthDrivers: string[];
  capitalAppreciationNotes: string;
  infrastructureCatalysts: string[];
}

export interface PropertyImage {
  url: string;
  caption?: string;
  isFeatured?: boolean;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  price: number; // in INR
  priceDisplay: string; // e.g. "₹2.45 Cr onwards"
  pricePerSqFt?: number;
  propertyType: PropertyType;
  category: PropertyCategory;
  configuration: string; // e.g. "3 BHK + Servant", "4 BHK Luxury Villa", "Commercial Grade-A"
  bedrooms?: number;
  bathrooms?: number;
  superArea: number; // in sq ft
  carpetArea?: number; // in sq ft
  areaUnit: 'sq.ft.' | 'sq.yd.' | 'Acres';
  possessionStatus: PossessionStatus;
  possessionDate?: string;
  reraNumber: string;
  verificationStatus?: VerificationStatus;
  lastUpdated?: string;
  developer: Developer;
  location: {
    address: string;
    locality: string;
    sector?: string;
    city: string;
    state: string;
    pincode?: string;
    mapUrl?: string;
    landmark?: string;
    latitude?: number;
    longitude?: number;
  };
  highlights: string[];
  amenities: Amenity[];
  connectivity: ConnectivityItem[];
  l2hPerspective?: L2HPerspective;
  investmentView?: InvestmentView;
  investmentInsights?: InvestmentInsight;
  floorPlans: FloorPlan[];
  images: PropertyImage[];
  brochureUrl?: string;
  isFeatured: boolean;
  status: PropertyStatus;
  viewsCount: number;
  leadsCount: number;
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Site Visit'
  | 'Negotiation'
  | 'Converted'
  | 'Lost';

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  referenceId: string; // e.g. "L2H-8921"
  name: string;
  phone: string;
  email: string;
  lookingFor?: PropertyCategory | string;
  propertyType?: PropertyType | string;
  preferredLocation?: string;
  budgetMin?: number;
  budgetMax?: number;
  budgetDisplay?: string;
  timeline?: 'Immediately' | '1–3 months' | '3–6 months' | '6+ months' | string;
  purpose?: PurposeType | string;
  preferredContactMethod?: 'Phone' | 'WhatsApp' | 'Email';
  preferredContactTime?: string;
  propertyId?: string;
  propertyName?: string;
  propertySlug?: string;
  message?: string;
  source: 'Website' | 'WhatsApp' | 'Google' | 'Instagram' | 'Facebook' | 'Property Page' | 'Campaign' | 'Referral' | 'Direct' | 'Requirement Wizard' | 'Market Report' | string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  status: LeadStatus;
  assignedAdvisor?: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  notes: LeadNote[];
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteVisit {
  id: string;
  referenceId: string;
  leadId?: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  propertyId: string;
  propertyName: string;
  propertyLocation: string;
  visitDate: string;
  timeSlot: string;
  attendeesCount?: number;
  pickupRequired?: boolean;
  pickupAddress?: string;
  assignedAdvisor?: string;
  status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled';
  notes?: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  readTime: string;
  isPublished: boolean;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface MarketReport {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  period: string; // e.g. "Q1 2026 Edition"
  location: string;
  keyTakeaways: string[];
  pdfFileSize?: string;
  downloadCount: number;
  publishedAt: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export interface LocationHub {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  heroImage: string;
  tagline: string;
  overview: string;
  priceRange: string;
  avgPricePerSqFt: string;
  growthRateYoY: string;
  popularMicroMarkets: string[];
  connectivityHighlights: string[];
  lifestyleAndSocialInfra: string[];
  investmentOutlook: string;
  faqs: { question: string; answer: string }[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  designation?: string;
  location: string;
  photo?: string;
  propertyPurchased: string;
  propertyType: string;
  rating: number; // 1-5
  content: string;
  isFeatured: boolean;
  date: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Sales Advisor';
  phone?: string;
  avatar?: string;
  token?: string;
}
