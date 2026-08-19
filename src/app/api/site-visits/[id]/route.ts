import { NextRequest, NextResponse } from 'next/server';
import { SiteVisitService } from '@/lib/data-store';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const id = resolvedParams.id;
    const visits = SiteVisitService.getAll();
    const visit = visits.find(v => v.id === id || v.referenceId === id);
    if (!visit) {
      return NextResponse.json({ error: 'Site visit not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, visit });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const id = resolvedParams.id;
    const body = await request.json();
    const updated = SiteVisitService.updateStatus(id, body.status);
    if (!updated) {
      return NextResponse.json({ error: 'Site visit not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, visit: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update site visit' }, { status: 500 });
  }
}
