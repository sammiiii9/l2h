import { NextRequest, NextResponse } from 'next/server';
import { SiteVisitService } from '@/lib/data-store';

export async function GET() {
  try {
    const visits = SiteVisitService.getAll();
    return NextResponse.json({ visits, total: visits.length });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch site visits' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.clientName || !body.clientPhone || !body.visitDate) {
      return NextResponse.json({ error: 'Name, Phone and Visit Date are required' }, { status: 400 });
    }

    const newVisit = SiteVisitService.create(body);
    return NextResponse.json({ success: true, visit: newVisit, referenceId: newVisit.referenceId }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to schedule site visit' }, { status: 500 });
  }
}
