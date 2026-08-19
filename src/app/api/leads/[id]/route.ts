import { NextRequest, NextResponse } from 'next/server';
import { LeadService } from '@/lib/data-store';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const id = resolvedParams.id;
    const lead = LeadService.getById(id);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json(lead);
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

    let updatedLead = null;

    if (body.status) {
      updatedLead = LeadService.updateStatus(id, body.status);
    }

    if (body.note) {
      updatedLead = LeadService.addNote(id, body.note.author || 'Advisor', body.note.text);
    }

    if (body.advisor) {
      updatedLead = LeadService.assignAdvisor(id, body.advisor);
    }

    if (!updatedLead) {
      return NextResponse.json({ error: 'Lead not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update lead', details: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const id = resolvedParams.id;
    const success = LeadService.delete(id);
    if (!success) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
