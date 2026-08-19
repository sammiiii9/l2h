import { NextResponse } from 'next/server';
import { AnalyticsEventService } from '@/lib/data-store';
import { AnalyticsEvent } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const events = AnalyticsEventService.getAll(limit);

    return NextResponse.json({
      success: true,
      total: events.length,
      events
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch analytics events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: Omit<AnalyticsEvent, 'id' | 'timestamp'> = await request.json();

    if (!body.name) {
      return NextResponse.json({ success: false, error: 'Event name is required' }, { status: 400 });
    }

    const created = AnalyticsEventService.log(body);

    return NextResponse.json({
      success: true,
      event: created
    }, { status: 201 });
  } catch (error) {
    console.error('Error logging analytics event:', error);
    return NextResponse.json({ success: false, error: 'Failed to log event' }, { status: 500 });
  }
}
