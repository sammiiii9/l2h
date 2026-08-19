import { NextResponse } from 'next/server';
import { AdvisorService } from '@/lib/data-store';

export async function GET() {
  try {
    const advisors = AdvisorService.getAll();
    return NextResponse.json({ success: true, advisors });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch advisors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
    }
    const created = AdvisorService.create(body);
    return NextResponse.json({ success: true, advisor: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create advisor' }, { status: 500 });
  }
}
