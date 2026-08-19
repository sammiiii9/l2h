import { NextRequest, NextResponse } from 'next/server';
import { AdvisorService } from '@/lib/data-store';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const id = resolvedParams.id;
    const advisor = AdvisorService.getById(id);
    if (!advisor) {
      return NextResponse.json({ error: 'Advisor not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, advisor });
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
    const updated = AdvisorService.update(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Advisor not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, advisor: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update advisor' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const id = resolvedParams.id;
    const deleted = AdvisorService.delete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Advisor not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete advisor' }, { status: 500 });
  }
}
