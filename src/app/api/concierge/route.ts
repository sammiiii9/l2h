import { NextResponse } from 'next/server';
import { PropertyService } from '@/lib/data-store';
import { Property } from '@/types';

export async function POST(request: Request) {
  try {
    const { query, history } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ success: false, error: 'Query is required' }, { status: 400 });
    }

    const q = query.toLowerCase().trim();
    const { properties } = PropertyService.getAll({ limit: 50 });

    // Parse Intent Factors
    const matchedProperties = properties.filter((p) => {
      let score = 0;
      const text = `${p.title} ${p.description} ${p.category} ${p.propertyType} ${p.configuration} ${p.location.locality} ${p.location.city} ${p.location.sector || ''}`.toLowerCase();

      // Location match
      if (q.includes('noida') && text.includes('noida')) score += 3;
      if (q.includes('150') && text.includes('150')) score += 5;
      if (q.includes('124') && text.includes('124')) score += 5;
      if (q.includes('128') && text.includes('128')) score += 5;
      if (q.includes('140') && text.includes('140')) score += 5;
      if ((q.includes('gurgaon') || q.includes('gurugram')) && (text.includes('gurgaon') || text.includes('gurugram'))) score += 3;
      if (q.includes('golf course') && text.includes('golf course')) score += 5;
      if ((q.includes('yamuna') || q.includes('jewar')) && (text.includes('yamuna') || text.includes('jewar'))) score += 5;

      // Category / Type match
      if (q.includes('plot') && (p.category === 'Plots' || p.propertyType === 'Plot')) score += 5;
      if (q.includes('commercial') && (p.category === 'Commercial' || p.propertyType === 'Commercial' || p.propertyType === 'Office')) score += 5;
      if (q.includes('farmhouse') && (p.category === 'Farmhouses' || p.propertyType === 'Farmhouse')) score += 5;
      if (q.includes('3 bhk') && (text.includes('3 bhk') || p.bedrooms === 3)) score += 4;
      if (q.includes('4 bhk') && (text.includes('4 bhk') || p.bedrooms === 4)) score += 4;
      if (q.includes('5 bhk') && (text.includes('5 bhk') || p.bedrooms === 5)) score += 4;
      if (q.includes('luxury') && (p.category === 'Luxury Properties' || text.includes('luxury'))) score += 3;

      // Budget match
      if (q.includes('2.5 cr') || q.includes('2.5cr') || q.includes('2 cr')) {
        if (p.price <= 30000000) score += 4;
      }
      if (q.includes('1 cr') || q.includes('lakhs') || q.includes('under 1 cr')) {
        if (p.price <= 15000000) score += 4;
      }

      // Keyword match
      const keywords = q.split(/\s+/).filter(w => w.length > 3);
      keywords.forEach(w => {
        if (text.includes(w)) score += 2;
      });

      return score >= 4;
    });

    let responseText = '';
    if (matchedProperties.length > 0) {
      responseText = `I analyzed your request for "${query}". Based on verified RERA filings and current developer inventory, here are the top curated opportunities that match your criteria:`;
    } else {
      responseText = `I analyzed our verified inventory for "${query}". We do not currently have an exact active match in our public catalog, but our advisory desk tracks off-market and upcoming launches. Would you like an advisor to source this privately?`;
    }

    return NextResponse.json({
      success: true,
      query,
      answer: responseText,
      properties: matchedProperties.slice(0, 4),
      suggestedActions: [
        { label: 'Schedule Site Visit', action: 'visit' },
        { label: 'Discuss with an Advisor', action: 'advisor' },
        { label: 'Compare Side-by-Side', action: 'compare' }
      ]
    });
  } catch (error) {
    console.error('Error in concierge API:', error);
    return NextResponse.json({ success: false, error: 'Failed to process concierge query' }, { status: 500 });
  }
}
