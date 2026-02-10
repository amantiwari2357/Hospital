const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Disease = require('./models/Disease');

dotenv.config();

const diseasesData = [
    {
        id: 'cancer',
        name: 'Cancer Care',
        category: 'Major',
        description: 'Comprehensive oncology services including screening, diagnosis, and advanced treatment options.',
        symptoms: ['Unexplained weight loss', 'Persistent fatigue', 'Changes in skin', 'Persistent cough'],
        treatments: ['Chemotherapy', 'Radiation Therapy', 'Surgery', 'Immunotherapy'],
        image: 'https://images.unsplash.com/photo-1579154236594-c6b74769fe1c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'smoking-cessation',
        name: 'Smoking Addiction',
        category: 'Addiction',
        description: 'Expert-led programs to help you quit smoking and restore lung health.',
        symptoms: ['Cravings', 'Irritability', 'Difficulty concentrating', 'Increased appetite'],
        treatments: ['Nicotine Replacement Therapy', 'Counseling', 'Support Groups', 'Behavioral Therapy'],
        image: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'alcohol-addiction',
        name: 'Alcohol De-addiction',
        category: 'Addiction',
        description: 'Safe detoxification and long-term recovery support for alcohol dependency.',
        symptoms: ['Inability to limit drinking', 'Withdrawal symptoms', 'Neglecting responsibilities'],
        treatments: ['Medical Detox', 'Behavioral Counseling', 'Rehabilitation', 'Medication'],
        image: 'https://images.unsplash.com/photo-1541535650810-10121ee90304?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'pimples-acne',
        name: 'Pimples & Acne',
        category: 'Skin/Face',
        description: 'Advanced dermatological treatments for clear, healthy skin and scar prevention.',
        symptoms: ['Whiteheads', 'Blackheads', 'Red bumps', 'Painful cysts'],
        treatments: ['Topic Medications', 'Oral Antibiotics', 'Laser Therapy', 'Chemical Peels'],
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'chronic-fissure',
        name: 'Chronic Fissure',
        category: 'Chronic',
        description: 'Specialized care for anal fissures, focusing on pain relief and permanent healing.',
        symptoms: ['Pain during bowel movements', 'Bright red blood', 'Visible crack in skin'],
        treatments: ['Dietary Changes', 'Stool Softeners', 'Topical Ointments', 'Sphincterotomy'],
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop'
    }
    // ... more can be added later or imported
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
