import { NextRequest, NextResponse } from 'next/server';
import { LeadService } from '@/lib/data-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json({ error: 'Name and Phone Number are required.' }, { status: 400 });
    }

    const newLead = LeadService.create({
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      preferredLocation: body.location || '',
      propertyType: body.propertyType || '',
      budgetDisplay: body.budget || '',
      purpose: body.purpose || 'End Use',
      message: body.message || 'General advisory consultation inquiry',
      preferredContactMethod: body.preferredContactMethod || 'Phone',
      source: body.source || 'Website',
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign
    });

    return NextResponse.json({
      success: true,
      referenceId: newLead.referenceId,
      message: 'Inquiry received. A senior advisor will connect shortly.'
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
