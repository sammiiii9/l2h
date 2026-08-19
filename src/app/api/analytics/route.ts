import { NextResponse } from 'next/server';
import { AnalyticsService } from '@/lib/data-store';

export async function GET() {
  try {
    const summary = AnalyticsService.getSummary();
    return NextResponse.json(summary);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
