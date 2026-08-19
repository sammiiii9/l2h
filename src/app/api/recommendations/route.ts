import { NextResponse } from 'next/server';
import { PropertyService } from '@/lib/data-store';
import { RecommendationEngine } from '@/lib/recommendation-engine';
import { RecommendationInput } from '@/types';

export async function POST(request: Request) {
  try {
    const body: RecommendationInput = await request.json();
    const { properties } = PropertyService.getAll({ limit: 50 });
    const ranked = RecommendationEngine.rankProperties(properties, body);

    return NextResponse.json({
      success: true,
      totalMatches: ranked.length,
      recommendations: ranked.slice(0, 6)
    });
  } catch (error) {
    console.error('Error computing recommendations:', error);
    return NextResponse.json({ success: false, error: 'Failed to compute recommendations' }, { status: 500 });
  }
}
