const patients = [
    {
        name: 'Robert Fox',
        age: 68,
        gender: 'Male',
        address: '123 Main St',
        phone: '555-0101',
        diagnosis: 'COPD',
        status: 'Critical',
        bedNumber: 'A-04',
        ward: 'Ward A',
        vitals: {
            heartRate: 112,
            bloodPressure: '150/95',
            temperature: 38.5,
            oxygenSaturation: 92
        }
    },
    {
        name: 'Jane Cooper',
        age: 32,
        gender: 'Female',
        address: '456 Oak Ave',
        phone: '555-0102',
        diagnosis: 'Post-Op',
        status: 'Stable',
        bedNumber: 'A-05',
        ward: 'Ward A',
        vitals: {
            heartRate: 72,
            bloodPressure: '120/80',
            temperature: 36.5,
            oxygenSaturation: 98
        }
    },
    {
        name: 'Guy Hawkins',
        age: 55,
        gender: 'Male',
        address: '789 Pine Ln',
        phone: '555-0103',
        diagnosis: 'Diabetes T2',
        status: 'Observation',
        bedNumber: 'A-06',
        ward: 'Ward A',
        vitals: {
            heartRate: 88,
            bloodPressure: '130/85',
            temperature: 37.0,
            oxygenSaturation: 95
        }
    },
    {
        name: 'Eleanor Pena',
        age: 72,
        gender: 'Female',
        address: '321 Elm St',
        phone: '555-0104',
        diagnosis: 'Hip Replacement',
        status: 'Stable',
        bedNumber: 'A-02',
        ward: 'Ward A',
        vitals: {
            heartRate: 68,
            bloodPressure: '125/82',
            temperature: 36.8,
            oxygenSaturation: 97
        }
    },
    {
        name: 'Cody Fisher',
        age: 28,
        gender: 'Male',
        address: '654 Birch Rd',
        phone: '555-0105',
        diagnosis: 'Appendicitis',
        status: 'Stable',
        bedNumber: 'A-09',
        ward: 'Ward A',
        vitals: {
            heartRate: 76,
            bloodPressure: '118/75',
            temperature: 37.2,
            oxygenSaturation: 99
        }
    },
    {
        name: 'Esther Howard',
        age: 81,
        gender: 'Female',
        address: '987 Cedar Blvd',
        phone: '555-0106',
        diagnosis: 'Pneumonia',
        status: 'Critical',
        bedNumber: 'A-11',
        ward: 'Ward A',
        vitals: {
            heartRate: 88,
            bloodPressure: '140/90',
            temperature: 39.1,
            oxygenSaturation: 88
        }
    }
];

module.exports = patients;
