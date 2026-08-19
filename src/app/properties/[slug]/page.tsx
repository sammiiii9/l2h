import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PropertyService } from '@/lib/data-store';
import PropertyDetailClient from './PropertyDetailClient';

interface PageProps {
  params: Promise<{
    slug: string;
  }> | {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const property = PropertyService.getBySlug(resolvedParams.slug);
  if (!property) {
    return { title: 'Property Not Found — L2H Solution' };
  }

  const canonicalUrl = `https://l2hsolution.com/properties/${property.slug}`;

  return {
    title: `${property.title} in ${property.location.locality}, ${property.location.city}`,
    description: `${property.tagline} Price: ${property.priceDisplay}. Configuration: ${property.configuration}. RERA ID: ${property.reraNumber}. Verified advisory, floor plans, and VIP site visit coordination.`,
    keywords: [
      property.title,
      `${property.category} in ${property.location.locality}`,
      `${property.propertyType} in ${property.location.city}`,
      `RERA ${property.reraNumber}`,
      `${property.location.locality} real estate`,
      `Buy property ${property.location.city}`,
      'L2H Solution property advisory'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${property.title} — L2H Solution`,
      description: property.tagline,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: property.images[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
          width: 1200,
          height: 630,
          alt: property.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.title} | L2H Solution`,
      description: property.tagline,
      images: [property.images[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80']
    }
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const property = PropertyService.getBySlug(resolvedParams.slug);

  if (!property) {
    notFound();
  }

  // Similar properties in same category or city
  const { properties: similarProps } = PropertyService.getAll({
    category: property.category,
    limit: 3
  });

  const filteredSimilar = similarProps.filter(p => p.id !== property.id).slice(0, 3);
  const canonicalUrl = `https://l2hsolution.com/properties/${property.slug}`;

  // Comprehensive JSON-LD Graph for Google Real Estate Rich Results & AEO
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://l2hsolution.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Properties',
            item: 'https://l2hsolution.com/properties'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: property.category,
            item: `https://l2hsolution.com/properties?category=${encodeURIComponent(property.category)}`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: property.title,
            item: canonicalUrl
          }
        ]
      },
      {
        '@type': ['RealEstateListing', 'SingleFamilyResidence', 'Product'],
        '@id': `${canonicalUrl}#listing`,
        name: property.title,
        description: property.description,
        url: canonicalUrl,
        image: property.images.map(img => img.url),
        offers: {
          '@type': 'Offer',
          price: property.price,
          priceCurrency: 'INR',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: property.price,
            priceCurrency: 'INR',
            unitText: property.areaUnit
          },
          availability: 'https://schema.org/InStock',
          validFrom: property.createdAt || '2026-01-01',
          seller: {
            '@type': 'Organization',
            name: 'L2H Solution'
          }
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: property.location.address,
          addressLocality: property.location.locality,
          addressRegion: property.location.state,
          postalCode: property.location.pincode,
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: property.location.latitude || 28.5482,
          longitude: property.location.longitude || 77.3411
        },
        numberOfBedrooms: property.bedrooms || undefined,
        floorSize: {
          '@type': 'QuantitativeValue',
          value: property.superArea,
          unitText: property.areaUnit || 'sq.ft.'
        },
        amenityFeature: property.amenities?.map(a => ({
          '@type': 'LocationFeatureSpecification',
          name: a.name,
          value: true
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <PropertyDetailClient property={property} similarProperties={filteredSimilar} />
    </>
  );
}
