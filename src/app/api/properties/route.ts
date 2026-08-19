import { NextRequest, NextResponse } from 'next/server';
import { PropertyService } from '@/lib/data-store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const propertyType = searchParams.get('propertyType') || undefined;
    const city = searchParams.get('city') || undefined;
    const locality = searchParams.get('locality') || undefined;
    const possession = searchParams.get('possession') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const bedrooms = searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined;
    const search = searchParams.get('search') || undefined;
    const featuredOnly = searchParams.get('featured') === 'true';
    const sortBy = (searchParams.get('sortBy') as any) || undefined;
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 50;
    const allStatus = searchParams.get('allStatus') === 'true';

    if (allStatus) {
      const allProps = PropertyService.getAllAdmin();
      return NextResponse.json({ properties: allProps, total: allProps.length });
    }

    const result = PropertyService.getAll({
      category,
      propertyType,
      city,
      locality,
      possession,
      minPrice,
      maxPrice,
      bedrooms,
      search,
      featuredOnly,
      sortBy,
      page,
      limit
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties', details: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.price || !body.propertyType || !body.location?.city) {
      return NextResponse.json({ error: 'Missing required property fields' }, { status: 400 });
    }

    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const newProp = PropertyService.create(body);
    return NextResponse.json({ success: true, property: newProp }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create property', details: error.message }, { status: 500 });
  }
}
