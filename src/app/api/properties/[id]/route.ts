import { NextRequest, NextResponse } from 'next/server';
import { PropertyService } from '@/lib/data-store';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const id = resolvedParams.id;
    let property = PropertyService.getById(id);
    if (!property) {
      property = PropertyService.getBySlug(id);
    }

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(property);
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

    if (body.action === 'duplicate') {
      const duplicated = PropertyService.duplicate(id);
      if (!duplicated) return NextResponse.json({ error: 'Property not found' }, { status: 404 });
      return NextResponse.json({ success: true, property: duplicated });
    }

    const updated = PropertyService.update(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, property: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update property', details: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const id = resolvedParams.id;
    const success = PropertyService.delete(id);
    if (!success) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
