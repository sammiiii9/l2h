import { NextRequest, NextResponse } from 'next/server';
import { LeadService } from '@/lib/data-store';
import { LeadStatus } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get('status') as LeadStatus) || undefined;
    const search = searchParams.get('search') || undefined;
    const source = searchParams.get('source') || undefined;
    const format = searchParams.get('format');

    const leads = LeadService.getAll({ status, search, source });

    if (format === 'csv') {
      const headers = ['Reference ID', 'Name', 'Phone', 'Email', 'Looking For', 'Budget', 'Location', 'Timeline', 'Purpose', 'Property', 'Source', 'Status', 'Created At'];
      const rows = leads.map(l => [
        l.referenceId,
        `"${l.name.replace(/"/g, '""')}"`,
        `"${l.phone}"`,
        `"${l.email}"`,
        `"${l.lookingFor || ''}"`,
        `"${l.budgetDisplay || ''}"`,
        `"${l.preferredLocation || ''}"`,
        `"${l.timeline || ''}"`,
        `"${l.purpose || ''}"`,
        `"${(l.propertyName || '').replace(/"/g, '""')}"`,
        `"${l.source}"`,
        `"${l.status}"`,
        `"${new Date(l.createdAt).toLocaleDateString()}"`
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="l2h-leads-export-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }

    return NextResponse.json({ leads, total: leads.length });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch leads', details: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json({ error: 'Name and Phone Number are required.' }, { status: 400 });
    }

    const newLead = LeadService.create(body);
    return NextResponse.json({ success: true, lead: newLead, referenceId: newLead.referenceId }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create lead', details: error.message }, { status: 500 });
  }
}
