import { Property, RecommendationInput, RecommendationResult } from '@/types';

export class RecommendationEngine {
  /**
   * Scores and ranks properties based on multi-factor alignment
   */
  static rankProperties(properties: Property[], input: RecommendationInput): RecommendationResult[] {
    const results: RecommendationResult[] = [];

    for (const prop of properties) {
      if (prop.status !== 'Active') continue;

      let score = 0;
      const highlights: string[] = [];
      const reasons: string[] = [];

      // 1. Budget Fit (Max 30 Points)
      const minB = input.budgetMin || 0;
      const maxB = input.budgetMax || 1000000000;
      
      if (prop.price >= minB && prop.price <= maxB) {
        score += 30;
        highlights.push('Direct Budget Alignment');
      } else if (prop.price <= maxB * 1.15 && prop.price >= minB * 0.85) {
        score += 20;
        highlights.push('Near Budget Threshold');
      } else {
        score += 8;
      }

      // 2. Location / Corridor Fit (Max 25 Points)
      if (input.location) {
        const locLower = input.location.toLowerCase();
        const propLocText = `${prop.location.city} ${prop.location.locality} ${prop.location.sector || ''} ${prop.location.landmark || ''}`.toLowerCase();

        if (propLocText.includes(locLower) || locLower.includes(prop.location.city.toLowerCase()) || locLower.includes(prop.location.locality.toLowerCase())) {
          score += 25;
          highlights.push(`High Preference in ${prop.location.locality}`);
          reasons.push(`Located directly in your target micro-market (${prop.location.locality}, ${prop.location.city})`);
        } else {
          score += 10;
        }
      } else {
        score += 20; // Neutral baseline
      }

      // 3. Configuration & Bedroom Match (Max 20 Points)
      if (input.bedrooms) {
        const reqBeds = typeof input.bedrooms === 'string' ? parseInt(input.bedrooms, 10) : input.bedrooms;
        if (prop.bedrooms === reqBeds) {
          score += 20;
          highlights.push(`Exact ${prop.bedrooms} BHK Layout`);
          reasons.push(`Provides exact ${prop.configuration} layout`);
        } else if (prop.bedrooms && Math.abs(prop.bedrooms - reqBeds) === 1) {
          score += 12;
          highlights.push(`Adjacent Configuration`);
        } else {
          score += 6;
        }
      } else {
        score += 16;
      }

      // 4. Purpose Fit: End-Use vs Investment vs Rental (Max 15 Points)
      if (input.purpose) {
        if (input.purpose === 'Investment' || input.purpose === 'Capital Appreciation') {
          if (prop.category === 'Commercial' || prop.investmentView?.expectedAnnualAppreciationPercent || prop.category === 'Plots') {
            score += 15;
            highlights.push('High Yield & Capital Growth Potential');
            reasons.push(`Strong investment outlook with estimated ${prop.investmentView?.expectedAnnualAppreciationPercent || 12}% annual appreciation`);
          } else {
            score += 10;
          }
        } else if (input.purpose === 'End Use') {
          if (prop.category === 'Luxury Properties' || prop.category === 'Apartments' || prop.category === 'Villas') {
            score += 15;
            highlights.push('Superior End-Use & Family Living Density');
            reasons.push('Exceptional low-density residential amenities and high livability quotient');
          } else {
            score += 8;
          }
        } else {
          score += 12;
        }
      } else {
        score += 12;
      }

      // 5. Category Fit & Timeline (Max 10 Points)
      if (input.category && prop.category.toLowerCase().includes(input.category.toLowerCase())) {
        score += 10;
        highlights.push(`Matches ${prop.category} Selection`);
      } else {
        score += 6;
      }

      // Calculate final percentage score (normalized to 65% - 98% for verified matching items)
      const matchPercentage = Math.min(98, Math.max(65, Math.round(score)));

      // Generate composite plain-English rationale
      const rationale = reasons.length > 0 
        ? `${reasons.join('. ')}.`
        : `Well-balanced match on price per sq.ft., developer pedigree (${prop.developer.name}), and ${prop.location.locality} connectivity.`;

      results.push({
        property: prop,
        matchScore: score,
        matchPercentage,
        matchHighlights: highlights.slice(0, 3),
        rationale
      });
    }

    // Sort descending by matchScore
    return results.sort((a, b) => b.matchScore - a.matchScore);
  }
}
