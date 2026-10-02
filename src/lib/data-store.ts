import fs from 'fs';
import path from 'path';
import { 
  Property, 
  Lead, 
  SiteVisit, 
  BlogPost, 
  Testimonial, 
  MarketReport, 
  LocationHub, 
  Advisor,
  SavedProperty,
  AnalyticsEvent,
  PropertyStatus, 
  LeadStatus 
} from '@/types';
import { 
  SEED_PROPERTIES, 
  SEED_BLOG_POSTS, 
  SEED_TESTIMONIALS, 
  SEED_LEADS, 
  SEED_SITE_VISITS,
  SEED_MARKET_REPORTS,
  SEED_LOCATION_HUBS,
  SEED_ADVISORS,
  SEED_ANALYTICS_EVENTS
} from '@/data/seed-properties';

interface DataStoreSchema {
  properties: Property[];
  leads: Lead[];
  siteVisits: SiteVisit[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  marketReports: MarketReport[];
  locationHubs: LocationHub[];
  advisors: Advisor[];
  savedProperties: SavedProperty[];
  analyticsEvents: AnalyticsEvent[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

// Initialize local database storage
function initDataStore(): DataStoreSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // Ensure seed items exist if empty
      if (!parsed.properties || parsed.properties.length === 0) parsed.properties = SEED_PROPERTIES;
      if (!parsed.leads || parsed.leads.length === 0) parsed.leads = SEED_LEADS;
      if (!parsed.siteVisits || parsed.siteVisits.length === 0) parsed.siteVisits = SEED_SITE_VISITS;
      if (!parsed.blogPosts || parsed.blogPosts.length === 0) parsed.blogPosts = SEED_BLOG_POSTS;
      if (!parsed.testimonials || parsed.testimonials.length === 0) parsed.testimonials = SEED_TESTIMONIALS;
      if (!parsed.marketReports || parsed.marketReports.length === 0) parsed.marketReports = SEED_MARKET_REPORTS;
      if (!parsed.locationHubs || parsed.locationHubs.length === 0) parsed.locationHubs = SEED_LOCATION_HUBS;
      if (!parsed.advisors || parsed.advisors.length === 0) parsed.advisors = SEED_ADVISORS;
      if (!parsed.savedProperties) parsed.savedProperties = [];
      if (!parsed.analyticsEvents || parsed.analyticsEvents.length === 0) parsed.analyticsEvents = SEED_ANALYTICS_EVENTS;
      return parsed;
    }
  } catch (error) {
    console.error('Error reading data store file, falling back to memory seed:', error);
  }

  const initialData: DataStoreSchema = {
    properties: SEED_PROPERTIES,
    leads: SEED_LEADS,
    siteVisits: SEED_SITE_VISITS,
    blogPosts: SEED_BLOG_POSTS,
    testimonials: SEED_TESTIMONIALS,
    marketReports: SEED_MARKET_REPORTS,
    locationHubs: SEED_LOCATION_HUBS,
    advisors: SEED_ADVISORS,
    savedProperties: [],
    analyticsEvents: SEED_ANALYTICS_EVENTS
  };

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  } catch (e) {
    // Read-only environment safe fallback
  }

  return initialData;
}

// In-memory cache synced with disk
let cachedStore: DataStoreSchema = initDataStore();

function persistStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(cachedStore, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to persist store:', e);
  }
}

// Property Operations
export const PropertyService = {
  getAll: (filters?: {
    category?: string;
    propertyType?: string;
    city?: string;
    locality?: string;
    possession?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    purpose?: string;
    status?: PropertyStatus;
    search?: string;
    featuredOnly?: boolean;
    sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'area' | 'featured';
    page?: number;
    limit?: number;
  }) => {
    let list = [...cachedStore.properties];

    if (filters) {
      if (filters.status) {
        list = list.filter(p => p.status === filters.status);
      } else {
        // Default to active for public browsing unless specified
        list = list.filter(p => p.status === 'Active' || p.status === 'Coming Soon');
      }

      if (filters.featuredOnly) {
        list = list.filter(p => p.isFeatured);
      }

      if (filters.category && filters.category !== 'All') {
        const catLower = filters.category.toLowerCase();
        if (catLower.includes('sacred') || catLower.includes('spiritual')) {
          list = list.filter(p => 
            p.category.toLowerCase().includes('sacred') || 
            p.category.toLowerCase().includes('spiritual')
          );
        } else if (catLower.includes('holiday') || catLower.includes('leisure')) {
          list = list.filter(p => 
            p.category.toLowerCase().includes('holiday') || 
            p.category.toLowerCase().includes('leisure')
          );
        } else if (catLower.includes('industrial') || catLower.includes('growth')) {
          list = list.filter(p => 
            p.category.toLowerCase().includes('industrial') || 
            p.category.toLowerCase().includes('growth')
          );
        } else if (catLower.includes('noida') || catLower.includes('residential') || catLower.includes('home') || catLower.includes('apartment')) {
          list = list.filter(p => 
            p.category.toLowerCase().includes('residential') || 
            p.category.toLowerCase().includes('noida') ||
            p.propertyType.toLowerCase() === 'apartment' || 
            p.propertyType.toLowerCase() === 'residential' ||
            p.propertyType.toLowerCase() === 'penthouse' || 
            p.propertyType.toLowerCase() === 'villa'
          );
        } else if (catLower === 'plots' || catLower === 'plot' || catLower === 'land') {
          list = list.filter(p => 
            p.propertyType.toLowerCase() === 'plot' || 
            p.category.toLowerCase().includes('plot') ||
            p.category.toLowerCase().includes('sacred') ||
            p.category.toLowerCase().includes('holiday') ||
            p.category.toLowerCase().includes('industrial')
          );
        } else {
          list = list.filter(p => p.category.toLowerCase().includes(catLower) || p.propertyType.toLowerCase() === catLower);
        }
      }

      if (filters.propertyType && filters.propertyType !== 'All') {
        const typeLower = filters.propertyType.toLowerCase();
        list = list.filter(p => p.propertyType.toLowerCase() === typeLower);
      }

      if (filters.city && filters.city !== 'All') {
        const cityLower = filters.city.toLowerCase();
        list = list.filter(p => p.location.city.toLowerCase() === cityLower);
      }

      if (filters.locality && filters.locality !== 'All') {
        const locLower = filters.locality.toLowerCase();
        list = list.filter(p => p.location.locality.toLowerCase().includes(locLower) || (p.location.sector && p.location.sector.toLowerCase().includes(locLower)));
      }

      if (filters.possession && filters.possession !== 'All') {
        list = list.filter(p => p.possessionStatus === filters.possession);
      }

      if (filters.minPrice) {
        list = list.filter(p => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice) {
        list = list.filter(p => p.price <= filters.maxPrice!);
      }

      if (filters.bedrooms) {
        if (filters.bedrooms >= 5) {
          list = list.filter(p => (p.bedrooms || 0) >= 5);
        } else {
          list = list.filter(p => p.bedrooms === filters.bedrooms);
        }
      }

      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(p => 
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.locality.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.developer.name.toLowerCase().includes(q) ||
          p.configuration.toLowerCase().includes(q)
        );
      }

      if (filters.sortBy) {
        if (filters.sortBy === 'price-asc') {
          list.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === 'price-desc') {
          list.sort((a, b) => b.price - a.price);
        } else if (filters.sortBy === 'newest') {
          list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (filters.sortBy === 'area') {
          list.sort((a, b) => b.superArea - a.superArea);
        } else if (filters.sortBy === 'featured') {
          list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        }
      }
    }

    const total = list.length;
    const page = filters?.page || 1;
    const limit = filters?.limit || 50;
    const paginated = list.slice((page - 1) * limit, page * limit);

    return {
      properties: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  },

  getAllAdmin: () => {
    return cachedStore.properties;
  },

  getBySlug: (slug: string) => {
    const prop = cachedStore.properties.find(p => p.slug === slug);
    if (prop) {
      prop.viewsCount = (prop.viewsCount || 0) + 1;
      persistStore();
    }
    return prop;
  },

  getById: (id: string) => {
    return cachedStore.properties.find(p => p.id === id);
  },

  create: (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'leadsCount'>) => {
    const id = `prop-${Date.now()}`;
    const newProp: Property = {
      ...propertyData,
      id,
      viewsCount: 0,
      leadsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    cachedStore.properties.unshift(newProp);
    persistStore();
    return newProp;
  },

  update: (id: string, updates: Partial<Property>) => {
    const idx = cachedStore.properties.findIndex(p => p.id === id);
    if (idx === -1) return null;

    cachedStore.properties[idx] = {
      ...cachedStore.properties[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    persistStore();
    return cachedStore.properties[idx];
  },

  delete: (id: string) => {
    const idx = cachedStore.properties.findIndex(p => p.id === id);
    if (idx === -1) return false;
    cachedStore.properties.splice(idx, 1);
    persistStore();
    return true;
  },

  duplicate: (id: string) => {
    const original = cachedStore.properties.find(p => p.id === id);
    if (!original) return null;

    const newProp: Property = {
      ...original,
      id: `prop-${Date.now()}`,
      slug: `${original.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      title: `${original.title} (Copy)`,
      status: 'Draft',
      viewsCount: 0,
      leadsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    cachedStore.properties.unshift(newProp);
    persistStore();
    return newProp;
  }
};

// Lead & CRM Operations
export const LeadService = {
  getAll: (filters?: { status?: LeadStatus; search?: string; source?: string }) => {
    let list = [...cachedStore.leads];

    if (filters?.status) {
      list = list.filter(l => l.status === filters.status);
    }
    if (filters?.source) {
      list = list.filter(l => l.source.toLowerCase() === filters.source!.toLowerCase());
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(l => 
        l.name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.propertyName && l.propertyName.toLowerCase().includes(q)) ||
        l.referenceId.toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getById: (id: string) => {
    return cachedStore.leads.find(l => l.id === id);
  },

  create: (leadData: Partial<Lead>) => {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `L2H-${randNum}`;
    const id = `lead-${Date.now()}`;

    const newLead: Lead = {
      id,
      referenceId,
      name: leadData.name || 'Anonymous Client',
      phone: leadData.phone || '',
      email: leadData.email || '',
      lookingFor: leadData.lookingFor || 'Luxury Property',
      propertyType: leadData.propertyType,
      preferredLocation: leadData.preferredLocation,
      budgetMin: leadData.budgetMin,
      budgetMax: leadData.budgetMax,
      budgetDisplay: leadData.budgetDisplay,
      timeline: leadData.timeline || '1–3 months',
      purpose: leadData.purpose || 'End Use',
      preferredContactMethod: leadData.preferredContactMethod || 'WhatsApp',
      preferredContactTime: leadData.preferredContactTime,
      propertyId: leadData.propertyId,
      propertyName: leadData.propertyName,
      propertySlug: leadData.propertySlug,
      message: leadData.message,
      source: leadData.source || 'Website',
      utmSource: leadData.utmSource,
      utmMedium: leadData.utmMedium,
      utmCampaign: leadData.utmCampaign,
      utmContent: leadData.utmContent,
      status: 'New',
      notes: leadData.notes || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    cachedStore.leads.unshift(newLead);

    // Increment lead count on property if linked
    if (leadData.propertyId) {
      const prop = cachedStore.properties.find(p => p.id === leadData.propertyId);
      if (prop) {
        prop.leadsCount = (prop.leadsCount || 0) + 1;
      }
    }

    persistStore();
    return newLead;
  },

  updateStatus: (id: string, status: LeadStatus) => {
    const lead = cachedStore.leads.find(l => l.id === id);
    if (!lead) return null;

    lead.status = status;
    lead.updatedAt = new Date().toISOString();
    persistStore();
    return lead;
  },

  addNote: (leadId: string, author: string, text: string) => {
    const lead = cachedStore.leads.find(l => l.id === leadId);
    if (!lead) return null;

    const note = {
      id: `note-${Date.now()}`,
      author,
      text,
      createdAt: new Date().toISOString()
    };

    lead.notes.unshift(note);
    lead.updatedAt = new Date().toISOString();
    persistStore();
    return lead;
  },

  assignAdvisor: (leadId: string, advisor: { id: string; name: string; phone: string; email: string }) => {
    const lead = cachedStore.leads.find(l => l.id === leadId);
    if (!lead) return null;

    lead.assignedAdvisor = advisor;
    lead.updatedAt = new Date().toISOString();
    persistStore();
    return lead;
  },

  delete: (id: string) => {
    const idx = cachedStore.leads.findIndex(l => l.id === id);
    if (idx === -1) return false;
    cachedStore.leads.splice(idx, 1);
    persistStore();
    return true;
  }
};

// Site Visits
export const SiteVisitService = {
  getAll: () => {
    return cachedStore.siteVisits.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  create: (visitData: Partial<SiteVisit>) => {
    const id = `visit-${Date.now()}`;
    const rand = Math.floor(1000 + Math.random() * 9000);
    const newVisit: SiteVisit = {
      id,
      referenceId: `SV-${rand}`,
      leadId: visitData.leadId,
      clientName: visitData.clientName || 'Client',
      clientPhone: visitData.clientPhone || '',
      clientEmail: visitData.clientEmail,
      propertyId: visitData.propertyId || '',
      propertyName: visitData.propertyName || 'Selected Property',
      propertyLocation: visitData.propertyLocation || 'Delhi NCR',
      visitDate: visitData.visitDate || new Date().toISOString().split('T')[0],
      timeSlot: visitData.timeSlot || '11:00 AM',
      attendeesCount: visitData.attendeesCount || 2,
      pickupRequired: visitData.pickupRequired || false,
      pickupAddress: visitData.pickupAddress,
      assignedAdvisor: visitData.assignedAdvisor || 'Senior Advisory Lead',
      status: 'Scheduled',
      notes: visitData.notes,
      createdAt: new Date().toISOString()
    };

    cachedStore.siteVisits.unshift(newVisit);
    persistStore();
    return newVisit;
  },

  updateStatus: (id: string, status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled') => {
    const visit = cachedStore.siteVisits.find(v => v.id === id);
    if (!visit) return null;
    visit.status = status;
    persistStore();
    return visit;
  }
};

// Blog Posts
export const BlogService = {
  getAll: () => {
    return cachedStore.blogPosts.filter(b => b.isPublished);
  },

  getAllAdmin: () => {
    return cachedStore.blogPosts;
  },

  getBySlug: (slug: string) => {
    return cachedStore.blogPosts.find(b => b.slug === slug);
  },

  create: (postData: Omit<BlogPost, 'id'>) => {
    const id = `post-${Date.now()}`;
    const newPost: BlogPost = {
      ...postData,
      id
    };
    cachedStore.blogPosts.unshift(newPost);
    persistStore();
    return newPost;
  },

  update: (id: string, updates: Partial<BlogPost>) => {
    const idx = cachedStore.blogPosts.findIndex(b => b.id === id);
    if (idx === -1) return null;
    cachedStore.blogPosts[idx] = { ...cachedStore.blogPosts[idx], ...updates };
    persistStore();
    return cachedStore.blogPosts[idx];
  },

  delete: (id: string) => {
    const idx = cachedStore.blogPosts.findIndex(b => b.id === id);
    if (idx === -1) return false;
    cachedStore.blogPosts.splice(idx, 1);
    persistStore();
    return true;
  }
};

// Location Hub Services & CRUD
export const LocationService = {
  getAll: () => {
    return cachedStore.locationHubs || SEED_LOCATION_HUBS;
  },
  getBySlug: (slug: string) => {
    const list = cachedStore.locationHubs || SEED_LOCATION_HUBS;
    return list.find(l => l.slug === slug);
  },
  create: (data: Omit<LocationHub, 'id'>) => {
    const newLoc: LocationHub = {
      ...data,
      id: `loc-${Date.now()}`
    };
    cachedStore.locationHubs.unshift(newLoc);
    persistStore();
    return newLoc;
  },
  update: (id: string, updates: Partial<LocationHub>) => {
    const idx = cachedStore.locationHubs.findIndex(l => l.id === id);
    if (idx === -1) return null;
    cachedStore.locationHubs[idx] = { ...cachedStore.locationHubs[idx], ...updates };
    persistStore();
    return cachedStore.locationHubs[idx];
  },
  delete: (id: string) => {
    const idx = cachedStore.locationHubs.findIndex(l => l.id === id);
    if (idx === -1) return false;
    cachedStore.locationHubs.splice(idx, 1);
    persistStore();
    return true;
  }
};

// Market Reports Services & CRUD
export const MarketReportService = {
  getAll: () => {
    return cachedStore.marketReports || SEED_MARKET_REPORTS;
  },
  getBySlug: (slug: string) => {
    const list = cachedStore.marketReports || SEED_MARKET_REPORTS;
    return list.find(r => r.slug === slug);
  },
  incrementDownload: (id: string) => {
    const list = cachedStore.marketReports || SEED_MARKET_REPORTS;
    const report = list.find(r => r.id === id);
    if (report) {
      report.downloadCount = (report.downloadCount || 0) + 1;
      persistStore();
    }
    return report;
  },
  create: (data: Omit<MarketReport, 'id'>) => {
    const newReport: MarketReport = {
      ...data,
      id: `report-${Date.now()}`,
      downloadCount: 0
    };
    cachedStore.marketReports.unshift(newReport);
    persistStore();
    return newReport;
  },
  update: (id: string, updates: Partial<MarketReport>) => {
    const idx = cachedStore.marketReports.findIndex(r => r.id === id);
    if (idx === -1) return null;
    cachedStore.marketReports[idx] = { ...cachedStore.marketReports[idx], ...updates };
    persistStore();
    return cachedStore.marketReports[idx];
  },
  delete: (id: string) => {
    const idx = cachedStore.marketReports.findIndex(r => r.id === id);
    if (idx === -1) return false;
    cachedStore.marketReports.splice(idx, 1);
    persistStore();
    return true;
  }
};

// Advisor Services & CRM Assignment
export const AdvisorService = {
  getAll: () => {
    return cachedStore.advisors || SEED_ADVISORS;
  },
  getById: (id: string) => {
    const list = cachedStore.advisors || SEED_ADVISORS;
    return list.find(a => a.id === id);
  },
  create: (data: Omit<Advisor, 'id'>) => {
    const newAdvisor: Advisor = {
      ...data,
      id: `adv-${Date.now()}`
    };
    cachedStore.advisors.unshift(newAdvisor);
    persistStore();
    return newAdvisor;
  },
  update: (id: string, updates: Partial<Advisor>) => {
    const idx = cachedStore.advisors.findIndex(a => a.id === id);
    if (idx === -1) return null;
    cachedStore.advisors[idx] = { ...cachedStore.advisors[idx], ...updates };
    persistStore();
    return cachedStore.advisors[idx];
  },
  delete: (id: string) => {
    const idx = cachedStore.advisors.findIndex(a => a.id === id);
    if (idx === -1) return false;
    cachedStore.advisors.splice(idx, 1);
    persistStore();
    return true;
  }
};

// Analytics Event Ingestion
export const AnalyticsEventService = {
  log: (event: Omit<AnalyticsEvent, 'id' | 'timestamp'>) => {
    const newEvent: AnalyticsEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString()
    };
    if (!cachedStore.analyticsEvents) cachedStore.analyticsEvents = [];
    cachedStore.analyticsEvents.unshift(newEvent);
    // Keep max 1000 events in active memory
    if (cachedStore.analyticsEvents.length > 1000) {
      cachedStore.analyticsEvents = cachedStore.analyticsEvents.slice(0, 1000);
    }
    persistStore();
    return newEvent;
  },
  getAll: (limit = 100) => {
    return (cachedStore.analyticsEvents || SEED_ANALYTICS_EVENTS).slice(0, limit);
  },
  getEventCounts: () => {
    const events = cachedStore.analyticsEvents || SEED_ANALYTICS_EVENTS;
    const counts: Record<string, number> = {};
    events.forEach(e => {
      counts[e.name] = (counts[e.name] || 0) + 1;
    });
    return counts;
  }
};

// Saved Properties Service
export const SavedPropertyService = {
  getAll: () => {
    return cachedStore.savedProperties || [];
  },
  save: (propertyId: string, notes?: string) => {
    if (!cachedStore.savedProperties) cachedStore.savedProperties = [];
    const existing = cachedStore.savedProperties.find(s => s.propertyId === propertyId);
    if (existing) {
      if (notes !== undefined) existing.notes = notes;
      persistStore();
      return existing;
    }
    const prop = cachedStore.properties.find(p => p.id === propertyId);
    const item: SavedProperty = {
      id: `saved-${Date.now()}`,
      propertyId,
      savedAt: new Date().toISOString(),
      notes,
      property: prop
    };
    cachedStore.savedProperties.unshift(item);
    persistStore();
    return item;
  },
  remove: (propertyId: string) => {
    if (!cachedStore.savedProperties) return false;
    const idx = cachedStore.savedProperties.findIndex(s => s.propertyId === propertyId);
    if (idx === -1) return false;
    cachedStore.savedProperties.splice(idx, 1);
    persistStore();
    return true;
  }
};

// Analytics & KPI Metrics
export const AnalyticsService = {
  getSummary: () => {
    const totalProps = cachedStore.properties.length;
    const activeProps = cachedStore.properties.filter(p => p.status === 'Active').length;
    const draftProps = cachedStore.properties.filter(p => p.status === 'Draft').length;
    const totalLeads = cachedStore.leads.length;
    const siteVisits = cachedStore.siteVisits.length;
    
    // Status breakdown
    const leadFunnel: Record<string, number> = {
      New: 0,
      Contacted: 0,
      Qualified: 0,
      'Site Visit': 0,
      Negotiation: 0,
      Converted: 0,
      Lost: 0
    };

    cachedStore.leads.forEach(l => {
      if (leadFunnel[l.status] !== undefined) {
        leadFunnel[l.status]++;
      }
    });

    // Sources breakdown
    const sourceBreakdown: Record<string, number> = {};
    cachedStore.leads.forEach(l => {
      const src = l.source || 'Website';
      sourceBreakdown[src] = (sourceBreakdown[src] || 0) + 1;
    });

    // Top properties
    const topViewed = [...cachedStore.properties]
      .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
      .slice(0, 5);

    const topLeads = [...cachedStore.properties]
      .sort((a, b) => (b.leadsCount || 0) - (a.leadsCount || 0))
      .slice(0, 5);

    const eventCounts = AnalyticsEventService.getEventCounts();

    return {
      kpis: {
        totalProperties: totalProps,
        activeProperties: activeProps,
        draftProperties: draftProps,
        totalLeads,
        scheduledVisits: siteVisits,
        conversionRate: totalLeads > 0 ? ((leadFunnel['Converted'] / totalLeads) * 100).toFixed(1) : '0',
        totalEventsLogged: (cachedStore.analyticsEvents || []).length
      },
      leadFunnel,
      sourceBreakdown,
      eventCounts,
      topViewed,
      topLeads,
      recentLeads: cachedStore.leads.slice(0, 8),
      recentEvents: (cachedStore.analyticsEvents || []).slice(0, 10)
    };
  }
};

