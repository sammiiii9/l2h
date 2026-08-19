import { NextResponse } from 'next/server';
import { LocationService } from '@/lib/data-store';

export async function GET() {
  try {
    const locations = LocationService.getAll();
    return NextResponse.json({ success: true, locations });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch locations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, error: 'Name and slug are required' }, { status: 400 });
    }
    const created = LocationService.create(body);
    return NextResponse.json({ success: true, location: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create location' }, { status: 500 });
  }
}
