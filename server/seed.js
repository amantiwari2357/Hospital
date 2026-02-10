const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Disease = require('./models/Disease');

dotenv.config();

const diseasesData = [
    {
        id: 'melanoma',
        name: 'Melanoma (Skin Cancer)',
        category: 'Skin/Face',
        description: 'The most serious type of skin cancer, developing in the melanocytes that produce melanin.',
        symptoms: ['Large brownish spot with darker speckles', 'Mole that changes in color, size or feel', 'Small lesion with an irregular border'],
        treatments: ['Surgical Excision', 'Immunotherapy', 'Targeted Therapy', 'Radiation'],
        image: 'https://images.unsplash.com/photo-1579154236594-c6b74769fe1c?q=80&w=2070'
    },
    {
        id: 'eczema-atopic',
        name: 'Atopic Dermatitis (Eczema)',
        category: 'Skin/Face',
        description: 'A condition that makes your skin red and itchy. It is common in children but can occur at any age.',
        symptoms: ['Dry skin', 'Itching', 'Red to brownish-gray patches', 'Small, raised bumps'],
        treatments: ['Moisturizers', 'Topical Steroids', 'Light Therapy', 'Immune-modulators'],
        image: 'https://images.unsplash.com/photo-1612632823277-3253a6341249?q=80&w=2070'
    },
    {
        id: 'psoriasis-plaque',
        name: 'Psoriasis (Plaque)',
        category: 'Skin/Face',
        description: 'A skin disease that causes red, itchy scaly patches, most commonly on the knees, elbows, trunk and scalp.',
        symptoms: ['Red patches of skin covered with thick, silvery scales', 'Small scaling spots', 'Dry, cracked skin'],
        treatments: ['Topical Corticosteroids', 'Vitamin D Analogues', 'Phototherapy', 'Systemic Medications'],
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070'
    },
    {
        id: 'rosacea-flare',
        name: 'Rosacea',
        category: 'Skin/Face',
        description: 'A common skin condition that causes blushing or flushing and visible blood vessels in your face.',
        symptoms: ['Facial blushing or flushing', 'Visible veins', 'Swollen bumps', 'Burning sensation'],
        treatments: ['Topical Gels', 'Oral Antibiotics', 'Laser Therapy', 'Electrosurgery'],
        image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070'
    },
    {
        id: 'fungal-infection',
        name: 'Fungal Skin Infection (Ringworm)',
        category: 'Skin/Face',
        description: 'A common skin infection caused by a fungus. It is often called ringworm because it can cause a circular rash.',
        symptoms: ['Scaly ring-shaped area', 'Itchiness', 'Red, scaly, cracked skin', 'Hair loss in affected area'],
        treatments: ['Antifungal Creams', 'Antifungal Pills', 'Proper Hygiene', 'Keeping area dry'],
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070'
    },
    {
        id: 'vitiligo',
        name: 'Vitiligo',
        category: 'Skin/Face',
        description: 'A disease that causes loss of skin color in patches. The discolored areas usually get bigger with time.',
        symptoms: ['Patchy loss of skin color', 'Premature whitening or graying of hair', 'Loss of color in tissues inside mouth'],
        treatments: ['Restoration Creams', 'Light Therapy', 'Skin Grafting', 'Depigmentation'],
        image: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2070'
    },
    {
        id: 'pimples-acne',
        name: 'Pimples & Acne',
        category: 'Skin/Face',
        description: 'Advanced dermatological treatments for clear, healthy skin and scar prevention.',
        symptoms: ['Whiteheads', 'Blackheads', 'Red bumps', 'Painful cysts'],
        treatments: ['Topic Medications', 'Oral Antibiotics', 'Laser Therapy', 'Chemical Peels'],
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070'
    },
    {
        id: 'chronic-fissure',
        name: 'Chronic Fissure',
        category: 'Chronic',
        description: 'Specialized care for anal fissures, focusing on pain relief and permanent healing.',
        symptoms: ['Pain during bowel movements', 'Bright red blood', 'Visible crack in skin'],
        treatments: ['Dietary Changes', 'Stool Softeners', 'Topical Ointments', 'Sphincterotomy'],
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070'
    },
    {
        id: 'cancer',
        name: 'General Oncology (Cancer)',
        category: 'Major',
        description: 'Comprehensive oncology services including screening, diagnosis, and advanced treatment options.',
        symptoms: ['Unexplained weight loss', 'Persistent fatigue', 'Changes in skin', 'Persistent cough'],
        treatments: ['Chemotherapy', 'Radiation Therapy', 'Surgery', 'Immunotherapy'],
        image: 'https://images.unsplash.com/photo-1579154236594-c6b74769fe1c?q=80&w=2070'
    }
];

const doctorsData = [
    { name: 'Dr. Sarah Wilson', specialization: 'Cardiology', role: 'doctor', roleDescription: 'Chief Cardiologist', rating: 4.9, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Dr. Robert Knight', specialization: 'Cardiology', role: 'doctor', roleDescription: 'Senior Cardiologist', rating: 4.7, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Dr. James Miller', specialization: 'Neurology', role: 'doctor', roleDescription: 'Senior Neurologist', rating: 4.8, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Dr. Elena Rodriguez', specialization: 'Pediatrics', role: 'doctor', roleDescription: 'Pediatric Surgeon', rating: 5.0, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop' },
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Seed Diseases
        await Disease.deleteMany({});
        await Disease.insertMany(diseasesData);
        console.log('Diseases Seeded');

        // Seed/Update Doctors
        for (const dr of doctorsData) {
            await User.findOneAndUpdate(
                { name: dr.name },
                {
                    specialization: dr.specialization,
                    department: dr.specialization,
                    role: 'doctor',
                    roleDescription: dr.roleDescription,
                    rating: dr.rating,
                    image: dr.image,
                    isAdmin: false,
                    email: dr.name.toLowerCase().replace(/ /g, '.') + '@hospital.com',
                    password: 'password123' // default password
                },
                { upsert: true, new: true }
            );
        }
        console.log('Doctors Seeded/Updated');

        process.exit();
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
