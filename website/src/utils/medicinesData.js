export const medicinesData = [
    {
        id: 'paracetamol-500',
        name: 'Paracetamol 500mg',
        brand: 'Panadol',
        category: 'Analgesics',
        price: 15,
        rating: 4.8,
        description: 'Used for mild to moderate pain relief and fever reduction.',
        usage: 'Take 1-2 tablets every 4-6 hours as needed.',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
        inStock: true,
        prescriptionRequired: false
    },
    {
        id: 'amoxicillin-250',
        name: 'Amoxicillin 250mg',
        brand: 'Amoxil',
        category: 'Antibiotics',
        price: 120,
        rating: 4.5,
        description: 'Commonly used to treat bacterial infections.',
        usage: 'Take 1 capsule every 8 hours for 7 days.',
        image: 'https://images.unsplash.com/photo-1471864190281-ad5fe9ac072b?q=80&w=2070&auto=format&fit=crop',
        inStock: true,
        prescriptionRequired: true
    },
    {
        id: 'atorvastatin-20',
        name: 'Atorvastatin 20mg',
        brand: 'Lipitor',
        category: 'Statins',
        price: 85,
        rating: 4.7,
        description: 'Used to lower cholesterol and reduce the risk of heart disease.',
        usage: 'Take 1 tablet daily at night.',
        image: 'https://images.unsplash.com/photo-1550572017-ed31c3fcbc61?q=80&w=2070&auto=format&fit=crop',
        inStock: true,
        prescriptionRequired: true
    },
    {
        id: 'metformin-500',
        name: 'Metformin 500mg',
        brand: 'Glucophage',
        category: 'Antidiabetics',
        price: 45,
        rating: 4.6,
        description: 'Used to control blood sugar levels in patients with type 2 diabetes.',
        usage: 'Take 1 tablet twice daily with meals.',
        image: 'https://images.unsplash.com/photo-1583946099379-f9c9cb8bc030?q=80&w=2070&auto=format&fit=crop',
        inStock: true,
        prescriptionRequired: true
    },
    {
        id: 'cetirizine-10',
        name: 'Cetirizine 10mg',
        brand: 'Zyrtec',
        category: 'Antihistamines',
        price: 25,
        rating: 4.9,
        description: 'Used for relief of allergy symptoms like sneezing and runny nose.',
        usage: 'Take 1 tablet daily.',
        image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070&auto=format&fit=crop',
        inStock: true,
        prescriptionRequired: false
    },
    {
        id: 'ibuprofen-400',
        name: 'Ibuprofen 400mg',
        brand: 'Advil',
        category: 'NSAIDs',
        price: 35,
        rating: 4.7,
        description: 'Used for pain relief, fever reduction, and anti-inflammatory effects.',
        usage: 'Take 1 tablet every 6 hours after food.',
        image: 'https://images.unsplash.com/photo-1550572017-ed31c3fcbc61?q=80&w=2070&auto=format&fit=crop',
        inStock: true,
        prescriptionRequired: false
    },
    {
        id: 'omeprazole-20',
        name: 'Omeprazole 20mg',
        brand: 'Prilosec',
        category: 'Antacids',
        price: 60,
        rating: 4.8,
        description: 'Used to treat heartburn and stomach ulcers.',
        usage: 'Take 1 capsule daily before breakfast.',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
        inStock: true,
        prescriptionRequired: true
    }
];

// Dynamically generate ~500 more entries for high variety
const categories = ['Analgesics', 'Antibiotics', 'Statins', 'Antidiabetics', 'Antihistamines', 'NSAIDs', 'Antacids', 'Vitamins', 'Cardiovascular', 'Dermatology', 'Neurology', 'Psychiatry'];
const bases = ['Amlodipine', 'Azithromycin', 'Ciprofloxacin', 'Losartan', 'Lisinopril', 'Gabapentin', 'Levothyroxine', 'Sertraline', 'Albuterol', 'Pantoprazole', 'Simvastatin', 'Escitalopram', 'Montelukast', 'Furosemide', 'Prednisone', 'Hydrochlorothiazide', 'Fluticasone', 'Clopidogrel', 'Warfarin', 'Carvedilol'];

for (let i = 0; i < 500; i++) {
    const base = bases[i % bases.length];
    const category = categories[i % categories.length];
    const dose = (i % 3 + 1) * 10;
    medicinesData.push({
        id: `${base.toLowerCase()}-${i}`,
        name: `${base} ${dose}mg`,
        brand: `Pharma-${i}`,
        category: category,
        price: Math.floor(Math.random() * 500) + 10,
        rating: parseFloat((Math.random() * (5.0 - 3.5) + 3.5).toFixed(1)),
        description: `Highly effective ${category.toLowerCase()} medicine for specialized clinical use.`,
        usage: `Standard clinical dosage: ${dose}mg per day or as directed by physician.`,
        image: `https://images.unsplash.com/photo-${1584308666000 + (i % 1000)}?auto=format&fit=crop&q=60`,
        inStock: Math.random() > 0.1,
        prescriptionRequired: i % 2 === 0
    });
}
