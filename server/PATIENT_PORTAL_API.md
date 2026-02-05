# Patient Portal API Documentation

## Base URL
```
http://localhost:5000/api/patient-portal
```

## Authentication
Protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. Register New Patient
**POST** `/register`

**Request Body:**
```json
{
  "name": "Mahan Kumar",
  "email": "mahan@example.com",
  "password": "password123",
  "age": 28,
  "gender": "Male",
  "phone": "+91 98765 43210",
  "address": "123 Main St, Delhi",
  "bloodGroup": "O+"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "patient": {
      "id": "65f1234567890abcdef12345",
      "patientId": "P-992834",
      "name": "Mahan Kumar",
      "email": "mahan@example.com",
      "age": 28,
      "gender": "Male",
      "phone": "+91 98765 43210",
      "bloodGroup": "O+"
    }
  }
}
```

---

### 2. Login Patient
**POST** `/login`

**Request Body:**
```json
{
  "email": "mahan@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "patient": {
      "id": "65f1234567890abcdef12345",
      "patientId": "P-992834",
      "name": "Mahan Kumar",
      "email": "mahan@example.com",
      "age": 28,
      "gender": "Male",
      "phone": "+91 98765 43210",
      "bloodGroup": "O+",
      "status": "Active"
    }
  }
}
```

---

### 3. Get Patient Profile
**GET** `/profile` 🔒 Protected

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f1234567890abcdef12345",
    "patientId": "P-992834",
    "name": "Mahan Kumar",
    "email": "mahan@example.com",
    "age": 28,
    "gender": "Male",
    "phone": "+91 98765 43210",
    "address": "123 Main St, Delhi",
    "bloodGroup": "O+",
    "height": "178 cm",
    "weight": "72 kg",
    "allergies": ["Penicillin", "Peanuts"],
    "chronicConditions": ["Hypertension"],
    "status": "Active",
    "appointments": 12,
    "prescriptions": 8,
    "orders": 2,
    "lastVisit": "2024-02-05T10:30:00.000Z",
    "createdAt": "2024-01-15T08:20:00.000Z"
  }
}
```

---

### 4. Update Patient Profile
**PUT** `/profile` 🔒 Protected

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (all fields optional):**
```json
{
  "name": "Mahan Kumar",
  "age": 29,
  "phone": "+91 98765 43210",
  "address": "456 New Address, Delhi",
  "bloodGroup": "O+",
  "height": "178 cm",
  "weight": "75 kg",
  "allergies": ["Penicillin", "Peanuts", "Dust"],
  "chronicConditions": ["Hypertension", "Diabetes"]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "65f1234567890abcdef12345",
    "patientId": "P-992834",
    "name": "Mahan Kumar",
    "email": "mahan@example.com",
    "age": 29,
    "gender": "Male",
    "phone": "+91 98765 43210",
    "address": "456 New Address, Delhi",
    "bloodGroup": "O+",
    "height": "178 cm",
    "weight": "75 kg",
    "allergies": ["Penicillin", "Peanuts", "Dust"],
    "chronicConditions": ["Hypertension", "Diabetes"]
  }
}
```

---

### 5. Get All Patients (CRM)
**GET** `/all`

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "65f1234567890abcdef12345",
      "patientId": "P-992834",
      "name": "Mahan Kumar",
      "email": "mahan@example.com",
      "age": 28,
      "gender": "Male",
      "phone": "+91 98765 43210",
      "bloodGroup": "O+",
      "status": "Active",
      "appointments": 12,
      "prescriptions": 8,
      "orders": 2,
      "lastVisit": "2024-02-05T10:30:00.000Z"
    }
    // ... more patients
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Patient not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details..."
}
```

---

## Frontend Integration Example

### Registration
```javascript
const register = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/patient-portal/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store token
      localStorage.setItem('patientToken', data.data.token);
      localStorage.setItem('patientData', JSON.stringify(data.data.patient));
      // Redirect to profile
    }
  } catch (error) {
    console.error('Registration error:', error);
  }
};
```

### Login
```javascript
const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/patient-portal/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('patientToken', data.data.token);
      localStorage.setItem('patientData', JSON.stringify(data.data.patient));
      // Redirect to profile
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

### Get Profile
```javascript
const getProfile = async () => {
  try {
    const token = localStorage.getItem('patientToken');
    
    const response = await fetch('http://localhost:5000/api/patient-portal/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.error('Get profile error:', error);
  }
};
```

### Update Profile
```javascript
const updateProfile = async (updates) => {
  try {
    const token = localStorage.getItem('patientToken');
    
    const response = await fetch('http://localhost:5000/api/patient-portal/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('patientData', JSON.stringify(data.data));
      return data.data;
    }
  } catch (error) {
    console.error('Update profile error:', error);
  }
};
```

---

## CRM Integration

The CRM Patient Manager can fetch all patients using:

```javascript
const fetchPatients = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/patient-portal/all');
    const data = await response.json();
    
    if (data.success) {
      return data.data; // Array of all patients
    }
  } catch (error) {
    console.error('Fetch patients error:', error);
  }
};
```

---

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt with 10 salt rounds
2. **JWT Tokens**: 30-day expiration, includes patient ID and email
3. **Protected Routes**: Middleware verifies JWT token before accessing profile data
4. **Auto-Generated Patient IDs**: Unique 6-digit IDs (e.g., P-992834)
5. **Email Uniqueness**: Prevents duplicate registrations

---

## Database Schema

### PatientPortal Model
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  patientId: String (unique, auto-generated),
  name: String (required),
  age: Number (required),
  gender: String (required),
  phone: String (required),
  address: String,
  bloodGroup: String,
  height: String,
  weight: String,
  allergies: [String],
  chronicConditions: [String],
  status: String (default: 'Active'),
  appointments: Number (default: 0),
  prescriptions: Number (default: 0),
  orders: Number (default: 0),
  lastVisit: Date,
  createdAt: Date,
  updatedAt: Date
}
```
