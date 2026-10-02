const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');

// Core 4 Active Opportunities + Curated Supportive Portfolio
const properties = [
  {
    id: 'prop-shakumbhari-devi',
    slug: 'shakumbhari-devi-saharanpur-plots',
    title: 'Mata Shakumbhari Devi Temple Plotted Development (Shakumbhari Estate)',
    tagline: '100 Sq. Yards Freehold Plots Near Mata Shakumbhari Devi Mandir & Dehradun Foothills (Ganeshpur / Rajaji National Park Border)',
    description: 'Situated in the serene spiritual belt of Mata Shakumbhari Devi Mandir near the Dehradun foothills highway (Ganeshpur / Rajaji National Park border), Shakumbhari Estate Extension & Shivalik Estate provides government-approved, clear-demarcated 100 sq. yards plots, farmhouses, and villa land. Featuring a fully gated township with 24x7 security, 25 ft, 30 ft & 45 ft wide avenue roads with green plantations, full road electrification, parks, and proposed in-township primary school & health center. Designed for devotees, family retreats, vacation living, and high-appreciation land investment starting from ₹9 Lakhs only.',
    price: 900000,
    priceDisplay: 'Starting from ₹9 Lakhs',
    pricePerSqFt: 1000,
    ratePerSqYd: 9000,
    plotSizeSqYd: 100,
    propertyType: 'Plot',
    category: 'Sacred & Spiritual Destinations',
    configuration: '100 sq. yards (and multiples for Villas/Farmhouses)',
    superArea: 900,
    areaUnit: 'sq.yd.',
    possessionStatus: 'Ready to Move',
    possessionDate: 'Immediate Demarcation & Registry',
    reraNumber: 'Govt. Approved Township • Verified Land Records',
    verificationStatus: 'Verified',
    lastUpdated: 'October 2026',
    developer: {
      name: 'Shakumbhari Estate & Shivalik Developers (L2H Verified)',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=120&q=80',
      experienceYears: 15,
      totalProjects: 8,
      description: 'Specialists in verified clear-title gated townships and plotted developments across spiritual and foothills corridors.'
    },
    location: {
      address: 'Shakumbhari Estate Extension & Shivalik Estate, Ganeshpur / Rajaji National Park Border, Mata Shakumbhari Devi Mandir Road',
      locality: 'Ganeshpur / Shakumbhari Devi Belt',
      city: 'Saharanpur',
      state: 'Uttar Pradesh',
      pincode: '247001',
      latitude: 30.1834,
      longitude: 77.6321,
      landmark: 'Near Mata Shakumbhari Devi Mandir, Glocal University & Dehradun Highway'
    },
    highlights: [
      'Demarcated 100 sq. yards freehold plots (with multiples for villas, farmhouses & townships)',
      '24x7 Gated Township with grand entrance gate and security guard post',
      'Wide 25 ft, 30 ft & 45 ft internal sector roads with palm tree plantations',
      'Complete electrification with streetlights installed on every sector road',
      'Just 10 minutes to Mata Shakumbhari Devi Mandir & 10 minutes to Glocal University',
      '1 hour to Dehradun, 1 hour to Paonta Sahib, 2.5 hours to Delhi via Expressways',
      'Upcoming infrastructure: Proposed Shakumbhari Devi railway connection & Delhi-Dehradun expressway expansion',
      'Crystal clear revenue land title with individual registry & demarcation',
      'Accessible starting capital of ₹9 Lakhs per 100 sq. yards'
    ],
    l2hPerspective: {
      bestFor: ['Land', 'End Use', 'Investment'],
      whatWeLike: [
        'Established pilgrimage destination attracting millions of devotees annually, sustaining perpetual demand',
        'Accessible starting ticket of ₹9 Lakhs for 100 sq. yards freehold gated township land ownership',
        'Direct road approach connecting to Saharanpur city, Glocal University, and Dehradun highway network',
        'Pure serene foothills environment with Rajaji National Park greenery away from dense urban congestion',
        'Upcoming regional infrastructure: Proposed direct rail link to Shakumbhari Devi and Delhi-Dehradun Expressway corridor'
      ],
      whatToConsider: [
        'Recommended for medium-to-long term holding, spiritual vacation retreat, or farmhouse living',
        'Buyers planning immediate construction can coordinate with L2H advisory for verified local building resources'
      ],
      locationAssessment: 'Ganeshpur and Shakumbhari Devi corridor is benefiting from major connectivity upgrades, including Delhi-Dehradun expressway links and proposed pilgrimage rail connectivity.',
      valueAssessment: 'Priced at ₹9,000/sq. yard (₹9 Lakhs for 100 sq. yards), representing an exceptional value entry ticket for gated freehold land with wide roads and electrification.',
      connectivityAssessment: '10 mins to Mata Shakumbhari Devi Mandir, 10 mins to Glocal University, 1 hr to Dehradun, and 2.5 hrs to Delhi via upcoming expressways.',
      investmentSuitability: 'Ideal for devotees desiring spiritual grounding, holiday farmhouse retreats, and patient land investors.',
      suitabilityScore: {
        endUseScore: 9.2,
        investmentScore: 9.0,
        rentalScore: 7.0
      }
    },
    amenities: [
      { name: '24x7 Gated Security & Guard Post', category: 'Security' },
      { name: 'Wide 25 ft, 30 ft & 45 ft Roads', category: 'Convenience' },
      { name: 'Palm & Tree Plantation on Roads', category: 'Lifestyle' },
      { name: 'Electrified Streetlights on Every Road', category: 'Convenience' },
      { name: 'Parks & Children\'s Play Area', category: 'Lifestyle' },
      { name: 'In-Township School & Health Center Provision', category: 'Convenience' },
      { name: 'Physical Boundary Stone Demarcation', category: 'Security' },
      { name: 'Pure Foothills & Clean Green Environment', category: 'Lifestyle' }
    ],
    connectivity: [
      { destination: 'Mata Shakumbhari Devi Mandir', distance: '4.5 km', time: '10 mins', type: 'Lifestyle' },
      { destination: 'Glocal University & Medical College', distance: '6 km', time: '10 mins', type: 'Education' },
      { destination: 'Nearest Railway Station', distance: '14 km', time: '15 mins', type: 'Transit' },
      { destination: 'Dehradun City', distance: '55 km', time: '1 hour', type: 'Highway' },
      { destination: 'Paonta Sahib', distance: '48 km', time: '1 hour', type: 'Highway' },
      { destination: 'Haridwar & Rishikesh', distance: '90 km', time: '2 hours', type: 'Highway' },
      { destination: 'Delhi (via Expressways)', distance: '175 km', time: '2.5 hours', type: 'Highway' },
      { destination: 'Mussoorie Hills', distance: '85 km', time: '2.5 hours', type: 'Lifestyle' }
    ],
    floorPlans: [
      {
        title: '100 Sq. Yards Freehold Plot Layout',
        bhk: '100 sq. yards (30 x 30 ft approx)',
        superArea: '900 sq.ft.',
        image: '/shakumbari-estate/brochure-master-plan.jpg',
        price: '₹9 Lakhs'
      },
      {
        title: '150 Sq. Yards Premium Residential Plot',
        bhk: '150 sq. yards (30 x 45 ft approx)',
        superArea: '1350 sq.ft.',
        image: '/shakumbari-estate/brochure-overview.jpg',
        price: '₹13.5 Lakhs'
      },
      {
        title: '200 Sq. Yards Luxury Villa / Farmhouse Plot',
        bhk: '200 sq. yards (40 x 45 ft approx)',
        superArea: '1800 sq.ft.',
        image: '/shakumbari-estate/avenue-road-plantation.jpg',
        price: '₹18 Lakhs'
      },
      {
        title: 'Master Layout & Sector Road Infrastructure Plan',
        bhk: 'Township Master Plan (25/30/45 ft Roads)',
        superArea: 'Full Township',
        image: '/shakumbari-estate/brochure-master-plan.jpg',
        price: 'Starting from ₹9 Lakhs'
      }
    ],
    investmentView: {
      entryPrice: 900000,
      pricePerSqFt: 1000,
      expectedAnnualAppreciationPercent: 14.5,
      estimatedRentalYieldPercent: 5.2,
      holdingPeriodYears: 5,
      demandDrivers: [
        'Millions of annual pilgrims visiting Mata Shakumbhari Devi Mandir sustaining perennial hospitality and homestay demand',
        'Delhi-Dehradun Expressway expansion slashing travel time from Delhi NCR to ~2.5 hours',
        'Proximity to Glocal University & Medical College (10 mins) driving steady educational and housing rental absorption',
        'Proposed direct Shakumbhari Devi railway connection & regional tourist infrastructure development',
        'Strong preference for pollution-free Shivalik foothills weekend second homes and vacation farmhouses'
      ],
      exitStrategies: [
        'Plot resale upon completion of expressway and proposed railway corridor milestones (3-5 years)',
        'Custom holiday farmhouse / spiritual retreat construction for personal sanctuary or weekend homestays',
        'Devotee guest house / lodging development benefiting from round-the-year pilgrimage inflow'
      ],
      risks: [
        'Optimal capital appreciation is realized over a 3 to 5-year infrastructure delivery cycle',
        'Bespoke villa construction requires coordination with local verified contractors'
      ],
      disclaimer: 'Projections are based on historical regional land appreciation, upcoming highway velocity, and corridor growth metrics. Freehold ownership with individual mutation (dakhil kharij).'
    },
    advisorContact: {
      name: 'Arun Kumar Sharma',
      role: 'Principal Advisor — Sacred & Plotted Corridors',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      phone: '+91 98765 43210',
      email: 'advisory@l2hsolution.com'
    },
    images: [
      {
        url: '/shakumbari-estate/brochure-master-plan.jpg',
        caption: 'Project Master Plan & Location Connectivity Infographic — Shakumbhari Estate Extension',
        isFeatured: true
      },
      {
        url: '/shakumbari-estate/site-demarcated-plots.jpg',
        caption: 'On-Site Demarcated Freehold Plots with Shivalik Mountain Backdrop',
        isFeatured: false
      },
      {
        url: '/shakumbari-estate/avenue-road-plantation.jpg',
        caption: 'Township Central Green Avenue Road with Palm Tree Plantations',
        isFeatured: false
      },
      {
        url: '/shakumbari-estate/gated-entrance-gate.jpg',
        caption: 'Gated Township Security Entrance with Wide Approach Road',
        isFeatured: false
      },
      {
        url: '/shakumbari-estate/shakumbhari-devi-temple-view.jpg',
        caption: 'Historic Mata Shakumbhari Devi Mandir in Peaceful Foothills',
        isFeatured: false
      },
      {
        url: '/shakumbari-estate/brochure-overview.jpg',
        caption: 'Township Infrastructure, University & Education Corridor Overview',
        isFeatured: false
      },
      {
        url: '/shakumbari-estate/entrance-arch-view.jpg',
        caption: 'Township Entrance Gate and Electrification Infrastructure',
        isFeatured: false
      }
    ],
    isFeatured: true,
    status: 'Currently Available',
    viewsCount: 1420,
    leadsCount: 68,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-10-01T00:00:00.000Z'
  },
  {
    id: 'prop-shakumbhari-shivalik-farmhouses',
    slug: 'shakumbhari-shivalik-foothills-farmhouses',
    title: 'Shakumbhari Shivalik Luxury Villa & Farmhouse Estate',
    tagline: '200 to 500 Sq. Yards Foothill Villa & Farmhouse Plots Bordering Rajaji National Park (Ganeshpur Corridor)',
    description: 'Nestled along the scenic Shivalik mountain foothills near the Mata Shakumbhari Devi pilgrimage route and Ganeshpur / Rajaji National Park border, Shivalik Estate provides expansive 200 sq. yards, 300 sq. yards, and 500 sq. yards freehold plots tailored for private farmhouses, holiday cottages, and family sanctuaries. Features 45 ft wide palm-lined central avenue roads, complete electrification, 24x7 gated security, boundary demarcation, and uninterrupted natural mountain views starting from ₹18 Lakhs.',
    price: 1800000,
    priceDisplay: 'Starting from ₹18 Lakhs',
    pricePerSqFt: 1000,
    ratePerSqYd: 9000,
    plotSizeSqYd: 200,
    propertyType: 'Plot',
    category: 'Sacred & Spiritual Destinations',
    configuration: '200 - 500 sq. yards (Custom Villa / Farmhouse)',
    superArea: 1800,
    areaUnit: 'sq.yd.',
    possessionStatus: 'Ready to Move',
    possessionDate: 'Immediate Demarcation & Registry',
    reraNumber: 'Govt. Approved Township • Verified Revenue Records',
    verificationStatus: 'Verified',
    lastUpdated: 'October 2026',
    developer: {
      name: 'Shakumbhari Estate & Shivalik Developers (L2H Verified)',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=120&q=80',
      experienceYears: 15,
      totalProjects: 8,
      description: 'Specialists in verified clear-title gated townships and plotted developments across spiritual and foothills corridors.'
    },
    location: {
      address: 'Shivalik Estate, Ganeshpur / Rajaji National Park Border, Mata Shakumbhari Devi Mandir Corridor',
      locality: 'Ganeshpur / Shakumbhari Foothills',
      city: 'Saharanpur',
      state: 'Uttar Pradesh',
      pincode: '247001',
      latitude: 30.1882,
      longitude: 77.6355,
      landmark: 'Near Rajaji National Park Foothills, Mata Shakumbhari Devi Mandir & Glocal University'
    },
    highlights: [
      'Large 200 to 500 sq. yards freehold land parcels tailored for luxury farmhouses and holiday villas',
      'Grand 45 ft wide central avenue road with palm tree plantations and landscaped green borders',
      'Pristine mountain foothills environment with clean air bordering Rajaji National Park',
      '24x7 gated township security with guard post and concrete boundary demarcation',
      '10 minutes to Mata Shakumbhari Devi Mandir & 10 minutes to Glocal University & Medical College',
      '1 hour to Dehradun, 1 hour to Paonta Sahib, 2 hours to Haridwar/Rishikesh, 2.5 hours to Delhi via Expressways',
      'Immediate registry (dakhil kharij) with clean title records',
      'High value appreciation driven by Delhi-Dehradun expressway and proposed Shakumbhari railway connectivity'
    ],
    l2hPerspective: {
      bestFor: [
        'Land',
        'Luxury',
        'End Use',
        'Investment'
      ],
      whatWeLike: [
        'Rare combination of sacred temple corridor proximity and serene Rajaji National Park foothills greenery',
        'Generous 200+ sq. yards land sizes offering flexibility for personal cottages, gardens, and devotee retreats',
        '45 ft wide internal avenues with installed electrification poles and streetlights',
        'Direct highway approach ensuring easy weekend access from Delhi NCR, Dehradun, and Haridwar',
        'Substantial long-term capital moat as infrastructure projects in the Shakumbhari belt mature'
      ],
      whatToConsider: [
        'Best suited for buyers desiring a tranquil weekend farmhouse, spiritual holiday home, or medium-term land investment',
        'L2H advisory can connect buyers with verified local villa architects and construction contractors'
      ],
      locationAssessment: 'Ganeshpur foothills offer pristine air and mountain views while benefiting from upcoming Delhi-Dehradun expressway connectivity.',
      valueAssessment: 'Priced at ₹9,000/sq. yard (₹18 Lakhs for 200 sq. yards), providing unbeatable per-sq-yard value compared to congested urban centers.',
      connectivityAssessment: '10 mins to Mandir, 10 mins to Glocal University, 1 hr to Dehradun, 2.5 hrs to Delhi via upcoming expressway network.',
      investmentSuitability: 'Ideal for families seeking a spiritual vacation retreat or land investors seeking solid appreciation.',
      suitabilityScore: {
        endUseScore: 9.4,
        investmentScore: 9.1,
        rentalScore: 7.5
      }
    },
    amenities: [
      {
        name: '45 ft Wide Palm-Lined Central Avenues',
        category: 'Convenience'
      },
      {
        name: '24x7 Gated Security & Guard Post',
        category: 'Security'
      },
      {
        name: 'Electrified Streetlights & Power Infrastructure',
        category: 'Convenience'
      },
      {
        name: 'Panoramic Shivalik Mountain Views',
        category: 'Lifestyle'
      },
      {
        name: 'Boundary Demarcation Stones',
        category: 'Security'
      },
      {
        name: 'Parks & Landscaped Open Spaces',
        category: 'Lifestyle'
      },
      {
        name: 'In-Township Health & School Provision',
        category: 'Convenience'
      },
      {
        name: 'Clean Air & Eco-Buffer Zone',
        category: 'Lifestyle'
      }
    ],
    connectivity: [
      {
        destination: 'Mata Shakumbhari Devi Mandir',
        distance: '4.5 km',
        time: '10 mins',
        type: 'Lifestyle'
      },
      {
        destination: 'Glocal University & Medical College',
        distance: '6 km',
        time: '10 mins',
        type: 'Education'
      },
      {
        destination: 'Nearest Railway Station',
        distance: '14 km',
        time: '15 mins',
        type: 'Transit'
      },
      {
        destination: 'Dehradun City',
        distance: '55 km',
        time: '1 hour',
        type: 'Highway'
      },
      {
        destination: 'Paonta Sahib',
        distance: '48 km',
        time: '1 hour',
        type: 'Highway'
      },
      {
        destination: 'Haridwar & Rishikesh',
        distance: '90 km',
        time: '2 hours',
        type: 'Highway'
      },
      {
        destination: 'Delhi (via Expressways)',
        distance: '175 km',
        time: '2.5 hours',
        type: 'Highway'
      },
      {
        destination: 'Mussoorie Hills',
        distance: '85 km',
        time: '2.5 hours',
        type: 'Lifestyle'
      }
    ],
    floorPlans: [
      {
        title: '200 Sq. Yards Luxury Villa / Farmhouse Plot',
        bhk: '200 sq. yards (40 x 45 ft approx)',
        superArea: '1800 sq.ft.',
        image: '/shakumbari-estate/avenue-road-plantation.jpg',
        price: '₹18 Lakhs'
      },
      {
        title: '300 Sq. Yards Deluxe Estate Plot',
        bhk: '300 sq. yards (45 x 60 ft approx)',
        superArea: '2700 sq.ft.',
        image: '/shakumbari-estate/site-demarcated-plots.jpg',
        price: '₹27 Lakhs'
      },
      {
        title: '500 Sq. Yards Grand Farmhouse Parcel',
        bhk: '500 sq. yards (60 x 75 ft approx)',
        superArea: '4500 sq.ft.',
        image: '/shakumbari-estate/brochure-overview.jpg',
        price: '₹45 Lakhs'
      },
      {
        title: 'Master Layout & Sector Road Infrastructure Plan',
        bhk: 'Township Master Plan (45 ft Avenue)',
        superArea: 'Full Township',
        image: '/shakumbari-estate/brochure-master-plan.jpg',
        price: 'Starting from ₹18 Lakhs'
      }
    ],
    investmentView: {
      entryPrice: 1800000,
      pricePerSqFt: 1000,
      expectedAnnualAppreciationPercent: 15.0,
      estimatedRentalYieldPercent: 5.5,
      holdingPeriodYears: 5,
      demandDrivers: [
        'Rapidly expanding demand for Shivalik foothills second homes and vacation retreats away from NCR pollution',
        'Delhi-Dehradun Expressway corridor slashing road transit to ~2.5 hours from NCR',
        'Proximity to Mata Shakumbhari Devi Mandir generating strong weekend devotee homestay interest',
        'Limited availability of legally demarcated, clear-title foothill land parcels bordering national park green buffers'
      ],
      exitStrategies: [
        'Land parcel resale upon delivery of expressway and regional tourism infrastructure (3-5 years)',
        'Farmhouse / boutique cottage development for personal holiday retreat or vacation rental income'
      ],
      risks: [
        'Longer holding period recommended to realize full expressway and railway infrastructure upside'
      ],
      disclaimer: 'Projections are based on regional land appreciation and infrastructure expansion. Freehold title with individual mutation.'
    },
    advisorContact: {
      name: 'Arun Kumar Sharma',
      role: 'Principal Advisor — Sacred & Plotted Corridors',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      phone: '+91 98765 43210',
      email: 'advisory@l2hsolution.com'
    },
    images: [
      {
        url: '/shakumbari-estate/avenue-road-plantation.jpg',
        caption: 'Township Central Green Avenue Road with Palm Tree Plantations — Shivalik Estate',
        isFeatured: true
      },
      {
        url: '/shakumbari-estate/site-demarcated-plots.jpg',
        caption: 'On-Site Demarcated Freehold Farmhouse Plots with Shivalik Mountain Backdrop',
        isFeatured: false
      },
      {
        url: '/shakumbari-estate/gated-entrance-gate.jpg',
        caption: 'Gated Township Security Entrance with Wide Approach Road',
        isFeatured: false
      },
      {
        url: '/shakumbari-estate/brochure-master-plan.jpg',
        caption: 'Project Master Plan & Location Connectivity Infographic — Shakumbhari Estate',
        isFeatured: false
      },
      {
        url: '/shakumbari-estate/shakumbhari-devi-temple-view.jpg',
        caption: 'Historic Mata Shakumbhari Devi Mandir in Peaceful Foothills',
        isFeatured: false
      },
      {
        url: '/shakumbari-estate/brochure-overview.jpg',
        caption: 'Township Infrastructure, University & Education Corridor Overview',
        isFeatured: false
      },
      {
        url: '/shakumbari-estate/entrance-arch-view.jpg',
        caption: 'Township Entrance Gate and Electrification Infrastructure',
        isFeatured: false
      }
    ],
    isFeatured: true,
    status: 'Currently Available',
    viewsCount: 940,
    leadsCount: 42,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-10-01T00:00:00.000Z'
  },
  {
    id: 'prop-dholera-sir',
    slug: 'dholera-sir-smart-city-plots',
    title: 'Dholera Industrial & Growth Corridor Plots',
    tagline: '100 Sq. Yards Industrial & Growth Corridor Plotted Opportunities in Dholera SIR',
    description: 'Strategically situated in the emerging industrial and infrastructure hub of Dholera Special Investment Region (SIR), Gujarat. These 100 sq. yards plots offer disciplined, clear-title land exposure in a planned smart-city ecosystem backed by world-class expressway networks, dedicated freight corridors, and planned international cargo connectivity.',
    price: 1000000,
    priceDisplay: 'Starting from ₹10 Lakhs',
    pricePerSqFt: 1111,
    ratePerSqYd: 10000,
    plotSizeSqYd: 100,
    propertyType: 'Plot',
    category: 'Industrial & Growth Corridors',
    configuration: '100 sq. yards (and multiples)',
    superArea: 900,
    areaUnit: 'sq.yd.',
    possessionStatus: 'Ready to Move',
    possessionDate: 'Clear Demarcation & TP Scheme Registry',
    reraNumber: 'Verified Land Records & TP Scheme Compliance',
    verificationStatus: 'Verified',
    lastUpdated: 'October 2026',
    developer: {
      name: 'L2H Verified Corridor Partner',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80',
      experienceYears: 18,
      totalProjects: 12,
      description: 'Infrastructure and corridor plot specialists with extensive TP scheme knowledge.'
    },
    location: {
      address: 'Dholera SIR Growth Corridor, TP Scheme Zone',
      locality: 'Dholera SIR',
      city: 'Dholera',
      state: 'Gujarat',
      pincode: '382455',
      latitude: 22.2464,
      longitude: 72.1969,
      landmark: 'Ahmedabad-Dholera Expressway Corridor & Activation Zone'
    },
    highlights: [
      '100 sq. yards demarcated freehold plot parcels within planned Town Planning schemes',
      'Direct connectivity to the 4-lane Ahmedabad-Dholera Expressway',
      'Proximity to planned Dholera International Airport and DSIR Activation Zone',
      'Transparent revenue documentation and physical boundary demarcation',
      'Disciplined starting price of ₹10 Lakhs for 100 sq. yards'
    ],
    l2hPerspective: {
      bestFor: ['Investment', 'Land'],
      whatWeLike: [
        'Positioned in India’s premier greenfield industrial master-planned zone',
        'Accessible ₹10 Lakhs entry ticket for 100 sq. yards plot ownership',
        'Visible government infrastructure execution: Ahmedabad-Dholera Expressway and international airport',
        'Master-planned Town Planning (TP) scheme layout with organized road grids'
      ],
      whatToConsider: [
        'Dholera is an infrastructure-gestation corridor; holding horizon should be 5 to 8+ years for full maturity',
        'Buyers should focus on capital appreciation rather than immediate residential rental yields'
      ],
      locationAssessment: 'India’s flagship smart city node with massive industrial manufacturing, defense, and semiconductor corridor interest.',
      valueAssessment: 'Priced at ₹10 Lakhs for 100 sq. yards, providing an affordable gateway into greenfield industrial expansion.',
      connectivityAssessment: 'Connected via Ahmedabad-Dholera Expressway, Bhavnagar rail link, and planned international cargo airport.',
      investmentSuitability: 'Recommended for patient investors seeking long-term industrial corridor appreciation.',
      suitabilityScore: {
        endUseScore: 7.2,
        investmentScore: 9.3,
        rentalScore: 6.0
      }
    },
    amenities: [
      { name: 'Wide Internal Sector Roads', category: 'Convenience' },
      { name: 'Clear Title Deeds & TP Passbook', category: 'Security' },
      { name: 'Underground Infrastructure Ducting Alignment', category: 'Convenience' },
      { name: 'Immediate Physical Site Demarcation', category: 'Security' }
    ],
    connectivity: [
      { destination: 'Ahmedabad-Dholera Expressway', distance: '2.5 km', time: '5 mins', type: 'Highway' },
      { destination: 'Upcoming Dholera International Airport', distance: '14 km', time: '18 mins', type: 'Airport' },
      { destination: 'DSIR Activation Zone / ABCD Building', distance: '8 km', time: '12 mins', type: 'Business' },
      { destination: 'Ahmedabad City Center', distance: '95 km', time: '1 hr 15 mins', type: 'Highway' }
    ],
    floorPlans: [
      {
        title: '100 Sq. Yards Commercial / Residential Plot Layout',
        bhk: '100 sq. yards (30 x 30 ft approx)',
        superArea: '900 sq.ft.',
        image: 'https://images.unsplash.com/photo-1524813686514-a57563d77d46?auto=format&fit=crop&w=1000&q=80',
        price: '₹10 Lakhs'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
        caption: 'Modern planned industrial and infrastructure corridor in Dholera SIR',
        isFeatured: true
      },
      {
        url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=85',
        caption: 'Wide planned road network and expressway infrastructure',
        isFeatured: false
      },
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1200&q=85',
        caption: 'Demarcated land parcels in planned TP scheme zone',
        isFeatured: false
      }
    ],
    isFeatured: true,
    status: 'Currently Available',
    viewsCount: 1890,
    leadsCount: 94,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-10-01T00:00:00.000Z'
  },
  {
    id: 'prop-goa-holiday',
    slug: 'goa-holiday-leisure-plots',
    title: 'Goa Holiday & Leisure Plotted Opportunities',
    tagline: '100 Sq. Yards Plotted Opportunities for Vacation Living and Boutique Retreats in Goa',
    description: 'Carefully selected plotted opportunities in Goa designed for leisure, second-home living, and boutique vacation retreats. Offering 100 sq. yards clear-title land parcels in serene green belts with convenient beach and lifestyle access, combining authentic coastal tranquility with tangible property ownership.',
    price: 3500000,
    priceDisplay: 'Starting from ₹35 Lakhs',
    pricePerSqFt: 3888,
    ratePerSqYd: 35000,
    plotSizeSqYd: 100,
    propertyType: 'Plot',
    category: 'Holiday & Leisure Destinations',
    configuration: '100 sq. yards (and multiples)',
    superArea: 900,
    areaUnit: 'sq.yd.',
    possessionStatus: 'Ready to Move',
    possessionDate: 'Clear Mutation & Immediate Possession',
    reraNumber: 'Title Verified & Clear Mutation Records',
    verificationStatus: 'Verified',
    lastUpdated: 'October 2026',
    developer: {
      name: 'L2H Coastal Partner',
      logo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=120&q=80',
      experienceYears: 14,
      totalProjects: 6,
      description: 'Lifestyle and second-home development consultants in coastal and hinterland Goa.'
    },
    location: {
      address: 'Scenic Coastal & Green Belt Corridor',
      locality: 'North / Central Goa Belt',
      city: 'Goa',
      state: 'Goa',
      pincode: '403001',
      latitude: 15.4989,
      longitude: 73.8278,
      landmark: 'Convenient drive to Manohar International Airport (MOPA) & coastal lifestyle'
    },
    highlights: [
      '100 sq. yards freehold plots surrounded by lush greenery and coconut groves',
      'Ideal canvas for building private holiday villas, homestays, or wellness retreats',
      'Clear title deeds with verified settlement zoning and proper road access',
      'Starting price of ₹35 Lakhs for prime leisure destination land',
      'High lifestyle and leisure quotient in India’s most desirable holiday state'
    ],
    l2hPerspective: {
      bestFor: ['End Use', 'Investment', 'Luxury'],
      whatWeLike: [
        'Perennial holiday demand and lifestyle appeal that holds strong across economic cycles',
        'Starting price of ₹35 Lakhs for 100 sq. yards freehold land compared to expensive ready-built villas',
        'MOPA Airport operationalization has unlocked rapid connectivity to North Goa belts',
        'Peaceful village ambience with convenient access to premier dining and beaches'
      ],
      whatToConsider: [
        'Villa construction and architectural design must adhere to local panchayat and CRZ environmental regulations',
        'Holiday rental cash flows materialize post-construction with dedicated hospitality management'
      ],
      locationAssessment: 'India’s premier leisure and holiday destination with sustained domestic tourism, work-from-anywhere appeal, and international traveler interest.',
      valueAssessment: 'Attractive ₹35 Lakhs entry point for 100 sq. yards plotted land.',
      connectivityAssessment: 'Smooth access via Manohar International Airport (MOPA, ~35 mins) and national highway 66.',
      investmentSuitability: 'Ideal for families seeking a holiday retreat home or investors seeking lifestyle land appreciation.',
      suitabilityScore: {
        endUseScore: 9.4,
        investmentScore: 8.9,
        rentalScore: 8.2
      }
    },
    amenities: [
      { name: 'Paved Internal Access Roads', category: 'Convenience' },
      { name: 'Lush Green Landscaped Boundaries', category: 'Wellness' },
      { name: 'Gated Perimeter Security', category: 'Security' },
      { name: 'Water & Electricity Connection Points', category: 'Convenience' }
    ],
    connectivity: [
      { destination: 'Manohar International Airport (MOPA)', distance: '28 km', time: '35 mins', type: 'Airport' },
      { destination: 'Pristine Coastal Beaches', distance: '12 km', time: '18 mins', type: 'Lifestyle' },
      { destination: 'Panaji Capital City', distance: '22 km', time: '30 mins', type: 'Business' },
      { destination: 'Dabolim Airport (South Goa)', distance: '48 km', time: '55 mins', type: 'Airport' }
    ],
    floorPlans: [
      {
        title: '100 Sq. Yards Holiday Villa Canvas',
        bhk: '100 sq. yards (30 x 30 ft approx)',
        superArea: '900 sq.ft.',
        image: 'https://images.unsplash.com/photo-1524813686514-a57563d77d46?auto=format&fit=crop&w=1000&q=80',
        price: '₹35 Lakhs'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85',
        caption: 'Tropical coastal living and serene green landscapes in Goa',
        isFeatured: true
      },
      {
        url: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1200&q=85',
        caption: 'Peaceful holiday retreat environment and lush coastal vegetation',
        isFeatured: false
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
        caption: 'Goa coastal beaches and leisure lifestyle destinations',
        isFeatured: false
      }
    ],
    isFeatured: true,
    status: 'Currently Available',
    viewsCount: 2240,
    leadsCount: 112,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-10-01T00:00:00.000Z'
  },
  {
    id: 'prop-noida-residential',
    slug: 'noida-expressway-residential-residences',
    title: 'Noida Expressway Curated Residential Homes',
    tagline: 'Ready-to-Move & Off-Plan Residential Homes in Noida Expressway Sectors Starting ₹80 Lakhs',
    description: 'Curated selection of modern residential apartments and family homes across prime Noida sectors (including Sector 150, Sector 128, Sector 143, and Noida Expressway). Available across Ready-to-Move, Under-Construction, and Off-Plan stages, featuring verified approvals, spacious layouts, lush green surroundings, and seamless metro connectivity for end users and residential investors.',
    price: 8000000,
    priceDisplay: 'Starting from ₹80 Lakhs',
    pricePerSqFt: 6950,
    propertyType: 'Apartment',
    category: 'Residential Properties — Noida',
    configuration: '2 & 3 BHK Modern Homes / Ready & Off-Plan',
    bedrooms: 2,
    bathrooms: 2,
    superArea: 1150,
    carpetArea: 890,
    areaUnit: 'sq.ft.',
    possessionStatus: 'Ready to Move',
    possessionDate: 'Ready-to-Move & Off-Plan Options',
    reraNumber: 'UPRERA Approved Projects Panel',
    verificationStatus: 'Verified',
    lastUpdated: 'October 2026',
    developer: {
      name: 'L2H Verified Noida Residential Panel',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=120&q=80',
      experienceYears: 22,
      totalProjects: 20,
      description: 'Top-tier Noida developers with verified delivery track records.'
    },
    location: {
      address: 'Prime Residential Sectors, Noida Expressway',
      locality: 'Sector 150 / 143 / Expressway',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201310',
      latitude: 28.4522,
      longitude: 77.4981,
      landmark: 'Aqua Line Metro & Noida-Greater Noida Expressway'
    },
    highlights: [
      'Options starting from ₹80 Lakhs for 2 BHK and 3 BHK family configurations',
      'Spans Ready-to-Move, Under-Construction, and strategic Off-Plan new launches',
      'Located in high-growth green sectors with low density and sports infrastructure',
      'Direct connection to Noida-Greater Noida Expressway and Aqua Line Metro',
      'Ideal for end-user families seeking lifestyle upgrades or investors seeking steady rental yields'
    ],
    l2hPerspective: {
      bestFor: ['End Use', 'Investment', 'Rental'],
      whatWeLike: [
        'Starting from ₹80 Lakhs, providing an accessible entry into prime Noida residential hubs',
        'Broad choice between immediate Ready-to-Move possession and structured Off-Plan milestones',
        'Prime expressway connectivity to South Delhi, IT hubs, and upcoming Jewar Airport corridor',
        'Developed social infrastructure: prominent schools, hospitals, and parks in immediate vicinity'
      ],
      whatToConsider: [
        'Off-plan purchases should be planned around construction-linked milestone verification',
        'Evaluate maintenance costs and club amenity charges before finalizing specific sector projects'
      ],
      locationAssessment: 'Noida Expressway is the most resilient residential corridor in NCR with rapid commercial job growth.',
      valueAssessment: 'Starting at ₹80 Lakhs, offering strong value per square foot compared to Gurugram or Central Delhi.',
      connectivityAssessment: 'Direct expressway signal-free transit, Aqua line metro within 1.5 km, Jewar Airport within 35 mins.',
      investmentSuitability: 'Strong dual proposition for end-user living and consistent 3.5% - 4.5% gross residential rental yield.',
      suitabilityScore: {
        endUseScore: 9.5,
        investmentScore: 9.0,
        rentalScore: 8.8
      }
    },
    amenities: [
      { name: 'Residents Clubhouse & Pool', category: 'Lifestyle' },
      { name: 'Lush Landscaped Green Parks', category: 'Wellness' },
      { name: 'Multitier 24x7 Security & CCTV', category: 'Security' },
      { name: 'Covered Parking & EV Charging', category: 'Convenience' }
    ],
    connectivity: [
      { destination: 'Aqua Line Metro Station', distance: '1.2 km', time: '3 mins', type: 'Metro' },
      { destination: 'Noida-Greater Noida Expressway', distance: '0.8 km', time: '2 mins', type: 'Highway' },
      { destination: 'South Delhi / DND Flyway', distance: '18 km', time: '20 mins', type: 'Highway' },
      { destination: 'Upcoming Noida Intl Airport (Jewar)', distance: '32 km', time: '30 mins', type: 'Airport' }
    ],
    floorPlans: [
      {
        title: '2 BHK Modern Living Layout',
        bhk: '2 BHK (1150 sq.ft.)',
        superArea: '1150 sq.ft.',
        carpetArea: '890 sq.ft.',
        image: 'https://images.unsplash.com/photo-1524813686514-a57563d77d46?auto=format&fit=crop&w=1000&q=80',
        price: 'Starting ₹80 Lakhs'
      },
      {
        title: '3 BHK Premium Family Layout',
        bhk: '3 BHK (1550 sq.ft.)',
        superArea: '1550 sq.ft.',
        carpetArea: '1220 sq.ft.',
        image: 'https://images.unsplash.com/photo-1524813686514-a57563d77d46?auto=format&fit=crop&w=1000&q=80',
        price: 'Starting ₹1.15 Cr'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
        caption: 'Contemporary residential architecture in prime Noida Expressway sector',
        isFeatured: true
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        caption: 'Modern luxury living interiors with abundant natural light',
        isFeatured: false
      },
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
        caption: 'Green surroundings and clubhouse amenities in Noida',
        isFeatured: false
      }
    ],
    isFeatured: true,
    status: 'Currently Available',
    viewsCount: 3120,
    leadsCount: 165,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-10-01T00:00:00.000Z'
  }
];

// Location Hubs: Active Projects + Destinations We're Exploring (Clearly Flagged)
const locationHubs = [
  {
    id: 'loc-saharanpur',
    slug: 'saharanpur-shakumbhari-devi',
    name: 'Mata Shakumbhari Devi, Saharanpur',
    city: 'Saharanpur',
    state: 'Uttar Pradesh',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
    tagline: 'Sacred Foothills Destination & Pilgrimage Plotted Development',
    overview: 'Saharanpur is an established cultural and pilgrimage gateway in Northern Uttar Pradesh, anchored by the ancient Shaktipeeth of Mata Shakumbhari Devi. Attracting millions of devotees year-round, the region is experiencing renewed infrastructure attention with the Delhi-Dehradun Economic Corridor.',
    priceRange: '₹9 Lakhs onwards',
    avgPricePerSqFt: '₹1,000 / sq.ft. (₹9,000 / sq.yd.)',
    growthRateYoY: 'Emerging Corridor',
    popularMicroMarkets: ['Shakumbhari Devi Mandir Corridor', 'Delhi-Dehradun Link Road', 'Saharanpur Foothills'],
    connectivityHighlights: [
      'Close proximity to Mata Shakumbhari Devi Mandir',
      'Connected via Saharanpur Junction (~35 km)',
      'Direct link to upcoming Delhi-Dehradun Expressway'
    ],
    lifestyleAndSocialInfra: [
      'Sacred Mata Shakumbhari Devi Shaktipeeth',
      'Saharanpur Botanical Garden & Cultural Heritage',
      'District Medical & Educational Facilities'
    ],
    investmentOutlook: 'High spiritual value and stable land banking potential driven by perpetual pilgrim footfall and regional connectivity enhancements.',
    categoryType: 'Sacred',
    isActiveProject: true,
    isExploring: false,
    statusText: 'Active Project',
    startingPriceDisplay: '₹9 Lakhs',
    plotSizeDisplay: '100 sq. yards',
    faqs: [
      {
        question: 'What is the starting investment for plots in Shakumbhari Devi?',
        answer: 'Investment starts from ₹9 Lakhs for a standard 100 sq. yards demarcated freehold plot.'
      },
      {
        question: 'Is the property near the temple?',
        answer: 'Yes, the plots are located in the designated pilgrimage corridor near Mata Shakumbhari Devi Mandir.'
      }
    ]
  },
  {
    id: 'loc-dholera',
    slug: 'dholera-sir-smart-city',
    name: 'Dholera Special Investment Region (SIR)',
    city: 'Dholera',
    state: 'Gujarat',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    tagline: 'India’s Flagship Greenfield Industrial & Smart City Node',
    overview: 'Dholera SIR is India’s largest planned greenfield industrial and smart city development. Spanning over 920 sq. km, Dholera features underground utility ducting, dedicated industrial zones, an upcoming international cargo airport, and direct expressway connectivity to Ahmedabad.',
    priceRange: '₹10 Lakhs onwards',
    avgPricePerSqFt: '₹1,111 / sq.ft. (₹10,000 / sq.yd.)',
    growthRateYoY: 'High-Growth Corridor',
    popularMicroMarkets: ['Activation Zone', 'TP 1 & TP 2 Schemes', 'Airport Corridor', 'ABCD Complex Area'],
    connectivityHighlights: [
      'Ahmedabad-Dholera 4-lane Expressway',
      'Upcoming Dholera International Airport',
      'Dedicated Freight Corridor (DFC) proximity'
    ],
    lifestyleAndSocialInfra: [
      'Master-planned Administrative and Business Center (ABCD)',
      'Underground civic infrastructure & trunk utilities',
      'Planned solar park & semiconductor manufacturing hubs'
    ],
    investmentOutlook: 'Strategic long-term industrial corridor play with substantial public and private infrastructure momentum.',
    categoryType: 'Industrial',
    isActiveProject: true,
    isExploring: false,
    statusText: 'Active Project',
    startingPriceDisplay: '₹10 Lakhs',
    plotSizeDisplay: '100 sq. yards',
    faqs: [
      {
        question: 'What is the minimum plot size in Dholera?',
        answer: 'Plot investments start from ₹10 Lakhs for 100 sq. yards with clear TP scheme demarcation.'
      }
    ]
  },
  {
    id: 'loc-goa',
    slug: 'goa-holiday-destinations',
    name: 'Goa Coastal & Green Belt',
    city: 'Goa',
    state: 'Goa',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=80',
    tagline: 'India’s Premier Leisure, Vacation & Lifestyle Property Destination',
    overview: 'Goa remains the undisputed holiday and second-home capital of India. With the opening of Manohar International Airport at MOPA, connectivity to North Goa green belts and coastal villages has made plotted leisure development highly accessible for boutique vacation homes and personal retreats.',
    priceRange: '₹35 Lakhs onwards',
    avgPricePerSqFt: '₹3,888 / sq.ft. (₹35,000 / sq.yd.)',
    growthRateYoY: 'High Demand',
    popularMicroMarkets: ['North Goa MOPA Corridor', 'Coastal Hinterland', 'Central Green Belt'],
    connectivityHighlights: [
      'Manohar International Airport (MOPA) & Dabolim Airport',
      'Smooth National Highway 66 network',
      'Convenient drive to beaches and dining lifestyle hubs'
    ],
    lifestyleAndSocialInfra: [
      'World-class culinary and hospitality ecosystem',
      'Pristine Arabian Sea beaches and heritage Portuguese architecture',
      'Vibrant creative and wellness community'
    ],
    investmentOutlook: 'Enduring lifestyle capital value backed by strong tourism demand and personal use utility.',
    categoryType: 'Holiday',
    isActiveProject: true,
    isExploring: false,
    statusText: 'Active Project',
    startingPriceDisplay: '₹35 Lakhs',
    plotSizeDisplay: '100 sq. yards',
    faqs: [
      {
        question: 'What is the starting price for plots in Goa?',
        answer: 'Plotted investment opportunities in Goa start from ₹35 Lakhs for 100 sq. yards.'
      }
    ]
  },
  {
    id: 'loc-noida',
    slug: 'noida-residential-expressway',
    name: 'Noida Residential Corridors',
    city: 'Noida',
    state: 'Uttar Pradesh',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    tagline: 'Prime Urban Residential Living, Modern Infrastructure & Green Sectors',
    overview: 'Noida offers North India’s most organized residential infrastructure, boasting wide signal-free expressways, extensive green cover in Sector 150, direct Aqua Line metro connectivity, and rapid accessibility to South Delhi and the upcoming Jewar International Airport.',
    priceRange: '₹80 Lakhs onwards',
    avgPricePerSqFt: '₹6,950 – ₹16,000 / sq.ft.',
    growthRateYoY: 'Steady Appreciation',
    popularMicroMarkets: ['Sector 150 (Sports City)', 'Sector 128 (Jaypee Greens)', 'Sector 143', 'Noida Expressway'],
    connectivityHighlights: [
      'Noida-Greater Noida Expressway',
      'Aqua Line Metro network',
      '30-35 mins to upcoming Jewar International Airport',
      'Direct DND / Kalindi Kunj access to Delhi'
    ],
    lifestyleAndSocialInfra: [
      'Shaheed Bhagat Singh 40-Acre Sports City Park',
      'Jaypee 18-Hole Championship Golf Course',
      'Leading international schools: Step by Step, Shiv Nadar, Genesis',
      'Jaypee & Fortis Multispecialty Hospitals'
    ],
    investmentOutlook: 'Robust end-user demand paired with healthy 3.5% - 4.5% residential rental yields and commercial job expansion.',
    categoryType: 'Residential',
    isActiveProject: true,
    isExploring: false,
    statusText: 'Active Project',
    startingPriceDisplay: '₹80 Lakhs',
    plotSizeDisplay: 'Ready-to-Move & Off-Plan 2/3/4 BHK',
    faqs: [
      {
        question: 'What is the starting price for residential properties in Noida?',
        answer: 'Residential properties in Noida start from ₹80 Lakhs for ready-to-move, under-construction, and off-plan options.'
      }
    ]
  },
  // Future / Exploratory Destinations (Clearly Flagged)
  {
    id: 'loc-haridwar',
    slug: 'haridwar-spiritual-corridor',
    name: 'Haridwar (Future Opportunity)',
    city: 'Haridwar',
    state: 'Uttarakhand',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80',
    tagline: 'Sacred Gateway on the Banks of Holy Ganga',
    overview: 'Haridwar is one of India’s most sacred pilgrimage centers. L2H Solution is actively researching and evaluating clear-title plotted development opportunities in Haridwar for future project onboarding.',
    priceRange: 'Pipeline / Under Evaluation',
    avgPricePerSqFt: 'Contact Advisory',
    growthRateYoY: 'Exploring Phase',
    popularMicroMarkets: ['Har Ki Pauri Belt', 'Delhi-Haridwar Highway Corridor'],
    connectivityHighlights: [
      'Delhi-Dehradun Expressway',
      'Haridwar Railway Junction',
      'Jolly Grant Airport Dehradun'
    ],
    lifestyleAndSocialInfra: [
      'Ganga Ghats and historic temples',
      'Ayurvedic and wellness ashrams'
    ],
    investmentOutlook: 'Evaluating opportunities for upcoming launch.',
    categoryType: 'Sacred',
    isActiveProject: false,
    isExploring: true,
    statusText: 'Destinations We’re Exploring (Future Opportunity)',
    startingPriceDisplay: 'Coming Soon',
    plotSizeDisplay: 'Pipeline Exploration',
    faqs: [
      {
        question: 'Is Haridwar currently an active project?',
        answer: 'Haridwar is currently under research and exploration. Contact our team to be notified when a verified project is officially onboarded.'
      }
    ]
  },
  {
    id: 'loc-rishikesh',
    slug: 'rishikesh-spiritual-holiday',
    name: 'Rishikesh (Future Opportunity)',
    city: 'Rishikesh',
    state: 'Uttarakhand',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    tagline: 'Yoga Capital of the World & Himalayan Foothills Retreat',
    overview: 'Known globally as the Yoga Capital, Rishikesh combines spiritual significance with leisure and wellness appeal. L2H Solution is evaluating clear-title parcels for future holiday and spiritual plotted projects.',
    priceRange: 'Pipeline / Under Evaluation',
    avgPricePerSqFt: 'Contact Advisory',
    growthRateYoY: 'Exploring Phase',
    popularMicroMarkets: ['Tapovan', 'Neelkanth Road Corridor', 'Ganga Foothills'],
    connectivityHighlights: [
      'Delhi-Dehradun Expressway link',
      'Jolly Grant Airport (20 mins)',
      'Rishikesh-Karnaprayag Railway Line'
    ],
    lifestyleAndSocialInfra: [
      'World-famous Yoga centers and Ashrams',
      'Adventure and eco-tourism hubs'
    ],
    investmentOutlook: 'Evaluating opportunities for upcoming launch.',
    categoryType: 'Sacred',
    isActiveProject: false,
    isExploring: true,
    statusText: 'Destinations We’re Exploring (Future Opportunity)',
    startingPriceDisplay: 'Coming Soon',
    plotSizeDisplay: 'Pipeline Exploration',
    faqs: [
      {
        question: 'Is Rishikesh currently an active project?',
        answer: 'Rishikesh is currently under exploration for future plotted developments.'
      }
    ]
  },
  {
    id: 'loc-ayodhya',
    slug: 'ayodhya-spiritual-capital',
    name: 'Ayodhya (Future Opportunity)',
    city: 'Ayodhya',
    state: 'Uttar Pradesh',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
    tagline: 'Historic Spiritual Capital & Fast-Emerging Pilgrimage Hub',
    overview: 'With the consecration of Shri Ram Janmabhoomi Mandir and Maharishi Valmiki International Airport, Ayodhya is witnessing monumental infrastructure growth. L2H Solution is exploring verified land opportunities in the region.',
    priceRange: 'Pipeline / Under Evaluation',
    avgPricePerSqFt: 'Contact Advisory',
    growthRateYoY: 'Exploring Phase',
    popularMicroMarkets: ['Ram Janmabhoomi Corridor', 'Chowdhury Charan Singh Ghat', 'Ayodhya Bypass'],
    connectivityHighlights: [
      'Maharishi Valmiki International Airport Ayodhya',
      'Ayodhya Dham Junction & Vande Bharat Express',
      'Gorakhpur-Lucknow Highway'
    ],
    lifestyleAndSocialInfra: [
      'Shri Ram Janmabhoomi Mandir Complex',
      'Saryu Riverfront promenade and cultural parks'
    ],
    investmentOutlook: 'Evaluating opportunities for upcoming launch.',
    categoryType: 'Sacred',
    isActiveProject: false,
    isExploring: true,
    statusText: 'Destinations We’re Exploring (Future Opportunity)',
    startingPriceDisplay: 'Coming Soon',
    plotSizeDisplay: 'Pipeline Exploration',
    faqs: [
      {
        question: 'Is Ayodhya currently available for booking?',
        answer: 'Ayodhya is currently an exploratory location in our research pipeline. It is not currently active for booking.'
      }
    ]
  },
  {
    id: 'loc-vrindavan',
    slug: 'vrindavan-spiritual-hub',
    name: 'Vrindavan (Future Opportunity)',
    city: 'Vrindavan',
    state: 'Uttar Pradesh',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1400&q=80',
    tagline: 'Sacred Land of Shri Krishna & Devotional Serenity',
    overview: 'Vrindavan is one of India’s most revered pilgrimage destinations. L2H Solution is evaluating clear-title plotted developments in Mathura-Vrindavan for devotees and retreat seekers.',
    priceRange: 'Pipeline / Under Evaluation',
    avgPricePerSqFt: 'Contact Advisory',
    growthRateYoY: 'Exploring Phase',
    popularMicroMarkets: ['Prem Mandir Corridor', 'Vrindavan-Mathura Road', 'Yamuna Expressway Link'],
    connectivityHighlights: [
      'Yamuna Expressway (15 mins from exit)',
      'Mathura Junction',
      'Proposed Heritage Corridor'
    ],
    lifestyleAndSocialInfra: [
      'Prem Mandir, Banke Bihari Mandir, ISKCON',
      'Ashrams and devotional centers'
    ],
    investmentOutlook: 'Evaluating opportunities for upcoming launch.',
    categoryType: 'Sacred',
    isActiveProject: false,
    isExploring: true,
    statusText: 'Destinations We’re Exploring (Future Opportunity)',
    startingPriceDisplay: 'Coming Soon',
    plotSizeDisplay: 'Pipeline Exploration',
    faqs: [
      {
        question: 'Is Vrindavan currently active?',
        answer: 'Vrindavan is currently under research and evaluation for future project onboarding.'
      }
    ]
  },
  {
    id: 'loc-salasar-balaji',
    slug: 'salasar-balaji-spiritual',
    name: 'Salasar Balaji (Future Opportunity)',
    city: 'Salasar',
    state: 'Rajasthan',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=80',
    tagline: 'Revered Balaji Mandir Destination in Rajasthan',
    overview: 'Salasar Balaji in Rajasthan is a profoundly revered shrine visited by millions of devotees. L2H Solution is evaluating plotted development potential in the surrounding pilgrimage zone.',
    priceRange: 'Pipeline / Under Evaluation',
    avgPricePerSqFt: 'Contact Advisory',
    growthRateYoY: 'Exploring Phase',
    popularMicroMarkets: ['Salasar Dham Corridor', 'Sikar-Salasar Highway'],
    connectivityHighlights: [
      'Jaipur International Airport (~170 km)',
      'Sujangarh & Sikar Rail Links',
      'National Highway 58'
    ],
    lifestyleAndSocialInfra: [
      'Salasar Balaji Temple Complex',
      'Pilgrimage dharamshalas and community centers'
    ],
    investmentOutlook: 'Evaluating opportunities for upcoming launch.',
    categoryType: 'Sacred',
    isActiveProject: false,
    isExploring: true,
    statusText: 'Destinations We’re Exploring (Future Opportunity)',
    startingPriceDisplay: 'Coming Soon',
    plotSizeDisplay: 'Pipeline Exploration',
    faqs: [
      {
        question: 'Is Salasar Balaji currently active?',
        answer: 'Salasar Balaji is an exploratory location in our future pipeline. It is not currently an active project.'
      }
    ]
  }
];

// Read existing db.json to preserve leads, blogPosts, testimonials, etc.
let existingData = {};
try {
  if (fs.existsSync(DB_FILE)) {
    existingData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  }
} catch (e) {
  console.error('Error reading existing db.json:', e);
}

const updatedData = {
  ...existingData,
  properties: properties,
  locationHubs: locationHubs
};

fs.writeFileSync(DB_FILE, JSON.stringify(updatedData, null, 2), 'utf-8');
console.log('Successfully updated data/db.json with 4 core opportunities and location hubs!');
