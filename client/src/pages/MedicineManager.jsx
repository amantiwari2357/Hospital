import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import {
    Package,
    Plus,
    Search,
    Filter,
    Trash2,
    Edit,
    Save,
    X,
    ShoppingCart,
    Tag,
    DollarSign,
    Loader,
    CheckCircle,
    AlertCircle,
    Image as ImageIcon
} from 'lucide-react';

const MedicineManager = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: '',
        price: '',
        description: '',
        usage: '',
        image: '',
        inStock: true,
        prescriptionRequired: false
    });

    const categories = ['Analgesics', 'Antibiotics', 'Statins', 'Antidiabetics', 'Antihistamines', 'NSAIDs', 'Antacids', 'Vitamins', 'Cardiovascular', 'Dermatology', 'Neurology', 'Psychiatry'];

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await fetch('https://hospital-40m0.onrender.com/api/medicines');
            const data = await response.json();
            setMedicines(data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch('https://hospital-40m0.onrender.com/api/medicines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Medicine added successfully!');
                setIsAddModalOpen(false);
                setFormData({
                    name: '', brand: '', category: '', price: '',
                    description: '', usage: '', image: '',
                    inStock: true, prescriptionRequired: false
                });
                fetchMedicines();
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to add medicine');
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('Server error');
        }
    };

    const filteredMedicines = medicines.filter(m =>
        (m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.brand.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedCategory === 'All' || m.category === selectedCategory)
    );

    return (
        <Layout title="Pharmacy Inventory">
            <div className="space-y-8 italic">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">Pharmacy Catalog</h2>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Manage your clinical medicines and inventory</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                    >
                        <Plus className="w-4 h-4" /> Add New Medicine
                    </button>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Medicines', value: medicines.length, icon: Package, color: 'blue' },
                        { label: 'Categories', value: [...new Set(medicines.map(m => m.category))].length, icon: Tag, color: 'purple' },
                        { label: 'In Stock', value: medicines.filter(m => m.inStock).length, icon: CheckCircle, color: 'green' },
                        { label: 'Requires Rx', value: medicines.filter(m => m.prescriptionRequired).length, icon: AlertCircle, color: 'red' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group">
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, brand..."
                            className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-gray-50 border-none rounded-2xl py-4 px-8 text-sm font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-600"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Medicine</th>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Rx Required</th>
                                    <th className="text-right py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredMedicines.map(m => (
                                    <tr key={m._id} className="hover:bg-blue-50/20 transition-all group">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
                                                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 uppercase tracking-tight">{m.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{m.brand}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8 font-bold text-gray-600 text-sm uppercase">{m.category}</td>
                                        <td className="py-6 px-8 font-black text-gray-900 text-lg">â‚¹{m.price}</td>
                                        <td className="py-6 px-8">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${m.inStock ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {m.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="py-6 px-8">
                                            {m.prescriptionRequired && (
                                                <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-fit">
                                                    <AlertCircle className="w-3 h-3" /> Rx
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-all">
                                                <Edit className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">New Medicine</h3>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Add item to global pharmacy catalog</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-3 hover:bg-white rounded-full transition-all shadow-sm">
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar italic">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                        <Package className="w-3 h-3" /> Medicine Name
                                    </label>
                                    <input
                                        type="text" name="name" required value={formData.name} onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-none rounded-2xl p-5 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                        placeholder="e.g. Paracetamol 500mg"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                        <Tag className="w-3 h-3" /> Brand/Laboratory
                                    </label>
                                    <input
                                        type="text" name="brand" required value={formData.brand} onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-none rounded-2xl p-5 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                        placeholder="e.g. Panadol"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
                                    <select
                                        name="category" required value={formData.category} onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-none rounded-2xl p-5 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                    >
                                        <option value="">Select Domain..</option>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                        <DollarSign className="w-3 h-3" /> Price (INR)
                                    </label>
                                    <input
                                        type="number" name="price" required value={formData.price} onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-none rounded-2xl p-5 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="col-span-2 space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                        <ImageIcon className="w-3 h-3" /> Image URL
                                    </label>
                                    <input
                                        type="text" name="image" required value={formData.image} onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-none rounded-2xl p-5 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                        placeholder="Paste image link here..."
                                    />
                                </div>
                                <div className="col-span-2 space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description</label>
                                    <textarea
                                        name="description" required rows="3" value={formData.description} onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-none rounded-2xl p-5 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
                                        placeholder="Briefly describe the clinical benefits..."
                                    />
                                </div>
                                <div className="col-span-2 space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Clinical Usage</label>
                                    <input
                                        type="text" name="usage" required value={formData.usage} onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-none rounded-2xl p-5 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                        placeholder="Dosage instructions..."
                                    />
                                </div>
                                <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                    <input
                                        type="checkbox" name="inStock" checked={formData.inStock} onChange={handleInputChange}
                                        className="w-5 h-5 text-blue-600 rounded-lg"
                                    />
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-700">Currently In Stock</span>
                                </div>
                                <div className="flex items-center gap-4 p-5 bg-red-50 rounded-2xl border border-red-100">
                                    <input
                                        type="checkbox" name="prescriptionRequired" checked={formData.prescriptionRequired} onChange={handleInputChange}
                                        className="w-5 h-5 text-red-600 rounded-lg"
                                    />
                                    <span className="text-xs font-black uppercase tracking-widest text-red-600">Rx Required</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-10 py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200"
                            >
                                Confirm and Catalog
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default MedicineManager;
