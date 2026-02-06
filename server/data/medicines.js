const medicines = [
    {
        name: 'Paracetamol 500mg',
        brand: 'Panadol',
        category: 'Analgesics',
        price: 15,
        rating: 4.8,
        description: 'Used for mild to moderate pain relief and fever reduction.',
        usage: 'Take 1-2 tablets every 4-6 hours as needed.',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop',
        inStock: true,
        prescriptionRequired: false,
        customId: 'paracetamol-500'
    },
    {
        name: 'Amoxicillin 250mg',
        brand: 'Amoxil',
        category: 'Antibiotics',
        price: 120,
        rating: 4.5,
        description: 'Commonly used to treat bacterial infections.',
        usage: 'Take 1 capsule every 8 hours for 7 days.',
        image: 'https://images.unsplash.com/photo-1471864190281-ad5fe9ac072b?q=80&w=2070&auto=format&fit=crop',
        inStock: true,
        prescriptionRequired: true,
        customId: 'amoxicillin-250'
    },
    {
        name: 'Atorvastatin 20mg',
        brand: 'Lipitor',
        category: 'Statins',
        price: 85,
        rating: 4.7,
        description: 'Used to lower cholesterol and reduce the risk of heart disease.',
        usage: 'Take 1 tablet daily at night.',
        image: 'https://images.unsplash.com/photo-1550572017-ed31c3fcbc61?q=80&w=2070&auto=format&fit=crop',
        inStock: true,
        prescriptionRequired: true,
        customId: 'atorvastatin-20'
    },
    {
        name: 'Metformin 500mg',
        brand: 'Glucophage',
        category: 'Antidiabetics',
        price: 45,
        rating: 4.6,
        description: 'Used to control blood sugar levels in patients with type 2 diabetes.',
        usage: 'Take 1 tablet twice daily with meals.',
        image: 'https://images.unsplash.com/photo-1583946099379-f9c9cb8bc030?q=80&w=2070&auto=format&fit=crop',
        inStock: true,
        prescriptionRequired: true,
        customId: 'metformin-500'
    }
];

// Generate 50 more
const categoriesList = ['Analgesics', 'Antibiotics', 'Statins', 'Antidiabetics', 'Antihistamines', 'NSAIDs', 'Antacids', 'Vitamins', 'Cardiovascular', 'Dermatology', 'Neurology', 'Psychiatry'];
const basesList = ['Amlodipine', 'Azithromycin', 'Ciprofloxacin', 'Losartan', 'Lisinopril', 'Gabapentin', 'Levothyroxine', 'Sertraline', 'Albuterol', 'Pantoprazole', 'Simvastatin', 'Escitalopram', 'Montelukast', 'Furosemide', 'Prednisone', 'Hydrochlorothiazide', 'Fluticasone', 'Clopidogrel', 'Warfarin', 'Carvedilol'];

for (let i = 0; i < 100; i++) {
    const base = basesList[i % basesList.length];
    const category = categoriesList[i % categoriesList.length];
    const dose = (i % 3 + 1) * 10;
    medicines.push({
        name: `${base} ${dose}mg`,
        brand: `Pharma-${i}`,
        category: category,
        price: Math.floor(Math.random() * 500) + 10,
        rating: parseFloat((Math.random() * (5.0 - 3.5) + 3.5).toFixed(1)),
        description: `Highly effective ${category.toLowerCase()} medicine for specialized clinical use.`,
        usage: `Standard clinical dosage: ${dose}mg per day or as directed by physician.`,
        image: `https://images.unsplash.com/photo-${1584308666000 + (i % 1000)}?auto=format&fit=crop&q=60`,
        inStock: Math.random() > 0.1,
        prescriptionRequired: i % 2 === 0,
        customId: `${base.toLowerCase()}-${i}`
    });
}

module.exports = medicines;
