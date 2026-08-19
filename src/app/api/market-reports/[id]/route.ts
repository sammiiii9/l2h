import { NextRequest, NextResponse } from 'next/server';
import { MarketReportService } from '@/lib/data-store';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const id = resolvedParams.id;
    const report = MarketReportService.getBySlug(id);
    if (!report) {
      return NextResponse.json({ error: 'Market report not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const id = resolvedParams.id;
    const body = await request.json();
    const updated = MarketReportService.update(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Market report not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, report: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update market report' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const id = resolvedParams.id;
    const deleted = MarketReportService.delete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Market report not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete market report' }, { status: 500 });
  }
}
