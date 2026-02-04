export const marketTrends = [
    {
        category: 'Analgesics',
        marketShare: 24,
        genericAdoption: 82,
        priceIndex: [
            { month: 'Jan', price: 120, generic: 15 },
            { month: 'Feb', price: 118, generic: 14 },
            { month: 'Mar', price: 125, generic: 14 },
            { month: 'Apr', price: 115, generic: 13 },
        ],
        growth: '+12.4%'
    },
    {
        category: 'Cardiovascular',
        marketShare: 18,
        genericAdoption: 45,
        priceIndex: [
            { month: 'Jan', price: 450, generic: 210 },
            { month: 'Feb', price: 445, generic: 205 },
            { month: 'Mar', price: 460, generic: 200 },
            { month: 'Apr', price: 430, generic: 190 },
        ],
        growth: '+8.2%'
    },
    {
        category: 'Dermatology',
        marketShare: 12,
        genericAdoption: 65,
        priceIndex: [
            { month: 'Jan', price: 320, generic: 180 },
            { month: 'Feb', price: 315, generic: 175 },
            { month: 'Mar', price: 330, generic: 170 },
            { month: 'Apr', price: 310, generic: 160 },
        ],
        growth: '+15.7%'
    }
];

export const priceComparisons = [
    {
        name: 'Atorvastatin',
        brandPrice: 420,
        genericPrice: 85,
        savings: '79%',
        efficacy: 'Bio-equivalent',
        trend: 'down'
    },
    {
        name: 'Metformin',
        brandPrice: 180,
        genericPrice: 24,
        savings: '86%',
        efficacy: 'Bio-equivalent',
        trend: 'stable'
    },
    {
        name: 'Omeprazole',
        brandPrice: 280,
        genericPrice: 45,
        savings: '84%',
        efficacy: 'Bio-equivalent',
        trend: 'up'
    }
];

export const institutionTimeline = [
    { year: 2020, event: 'Foundational Research Phase', detail: 'Consolidation of 12 clinical research centers into the CareSync Global Network.' },
    { year: 2021, event: 'AI Integration Milestone', detail: 'Launched the proprietary neural diagnostic engine for oncology screening.' },
    { year: 2022, event: 'Expansion to Pharmacy Duniya', detail: 'Digitalization of the supply chain with blockchain verification for all medicines.' },
    { year: 2024, event: 'Global Hub Status', detail: 'Recognized as the primary therapeutic center for regenerative medicine in the region.' }
];
