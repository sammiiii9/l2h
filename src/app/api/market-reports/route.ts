import { NextResponse } from 'next/server';
import { MarketReportService } from '@/lib/data-store';

export async function GET() {
  try {
    const reports = MarketReportService.getAll();
    return NextResponse.json({ success: true, reports });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch market reports' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ success: false, error: 'Title and slug are required' }, { status: 400 });
    }
    const created = MarketReportService.create(body);
    return NextResponse.json({ success: true, report: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create market report' }, { status: 500 });
  }
}
