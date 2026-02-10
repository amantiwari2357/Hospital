import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    Truck,
    CheckCircle,
    Clock,
    Search,
    Filter,
    Eye,
    MoreVertical,
    Package,
    MapPin,
    Phone,
    User,
    Calendar,
    Loader,
    X,
    AlertCircle,
    ArrowRight
} from 'lucide-react';

const PharmacyOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch('https://hospital-40m0.onrender.com/api/orders', {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            });
            const data = await response.json();
            if (response.status === 401) {
                localStorage.removeItem('userInfo');
                navigate('/login');
                return;
            }
            if (Array.isArray(data)) {
                setOrders(data);
            } else {
                setOrders([]);
                console.error('Expected array but received:', data);
            }
        } catch (error) {
            setOrders([]);
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch(`https://hospital-40m0.onrender.com/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchOrders();
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Update status error:', error);
        }
    };

    const filteredOrders = Array.isArray(orders) ? orders.filter(o =>
        (o.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o._id.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedStatus === 'All' || o.status === selectedStatus)
    ) : [];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100 text-amber-600';
            case 'Processing': return 'bg-blue-100 text-blue-600';
            case 'Shipped': return 'bg-purple-100 text-purple-600';
            case 'Delivered': return 'bg-green-100 text-green-600';
            case 'Cancelled': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <Layout title="Pharmacy Orders">
            <div className="space-y-8 italic">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">Pharmacy Orders</h2>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Track and fulfill medicine deliveries</p>
                    </div>
                </div>

                {/* Orders Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Pending', count: (Array.isArray(orders) ? orders : []).filter(o => o.status === 'Pending').length, icon: Clock, color: 'amber' },
                        { label: 'In Transit', count: (Array.isArray(orders) ? orders : []).filter(o => o.status === 'Shipped').length, icon: Truck, color: 'blue' },
                        { label: 'Delivered', count: (Array.isArray(orders) ? orders : []).filter(o => o.status === 'Delivered').length, icon: CheckCircle, color: 'green' },
                        { label: 'Total Sales', count: `â‚¹${(Array.isArray(orders) ? orders : []).filter(o => o.status === 'Delivered').reduce((acc, curr) => acc + curr.totalAmount, 0)}`, icon: ShoppingBag, color: 'purple' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group">
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-gray-900 tracking-tighter">{stat.count}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by Patient or Order ID..."
                            className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(status => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedStatus === status ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-400 hover:bg-white border border-transparent'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders List */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100 font-black uppercase tracking-widest text-[10px] text-gray-400">
                                <tr>
                                    <th className="py-6 px-8 text-left">Order ID</th>
                                    <th className="py-6 px-8 text-left">Patient</th>
                                    <th className="py-6 px-8 text-left">Amount</th>
                                    <th className="py-6 px-8 text-left">Status</th>
                                    <th className="py-6 px-8 text-left">Payment</th>
                                    <th className="py-6 px-8 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.map(order => (
                                    <tr key={order._id} className="hover:bg-blue-50/20 transition-all group">
                                        <td className="py-6 px-8 font-black text-xs text-gray-400 uppercase tracking-tighter">#{order._id.slice(-6)}</td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-black text-gray-400">
                                                    {order.user?.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 text-sm uppercase">{order.user?.name || 'Unknown'}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8 font-black text-gray-900 text-lg tracking-tighter">â‚¹{order.totalAmount}</td>
                                        <td className="py-6 px-8">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${order.isPaid ? 'text-green-600' : 'text-amber-600'}`}>
                                                {order.isPaid ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                {order.isPaid ? 'Paid' : 'Unpaid'} ({order.paymentMethod})
                                            </span>
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setIsModalOpen(true);
                                                }}
                                                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-300 italic">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter flex items-center gap-3">
                                    <ShoppingBag className="w-6 h-6 text-blue-600" /> Order Details
                                </h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: {selectedOrder._id}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full"><X className="w-6 h-6 text-gray-400" /></button>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto">
                            {/* Left Side: Items and Shipping */}
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2 italic">
                                        <Package className="w-3 h-3" /> Order Items ({(selectedOrder.orderItems || []).length})
                                    </h4>
                                    <div className="space-y-3">
                                        {(selectedOrder.orderItems || []).map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shadow-inner">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-black text-gray-900 text-xs uppercase">{item.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">â‚¹{item.price} x {item.quantity}</p>
                                                </div>
                                                <p className="font-black text-gray-900 text-sm italic pr-2">â‚¹{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4 flex items-center gap-2 italic">
                                        <MapPin className="w-3 h-3" /> Delivery Information
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm"><User className="w-5 h-5" /></div>
                                            <div>
                                                <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Patient</p>
                                                <p className="font-black text-gray-900 text-xs uppercase">{selectedOrder.user?.name || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm"><MapPin className="w-5 h-5" /></div>
                                            <div>
                                                <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Address</p>
                                                <p className="font-black text-gray-900 text-xs uppercase leading-tight italic">
                                                    {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city} - {selectedOrder.shippingAddress.postalCode}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm"><Phone className="w-5 h-5" /></div>
                                            <div>
                                                <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Contact</p>
                                                <p className="font-black text-gray-900 text-xs uppercase">{selectedOrder.shippingAddress.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Actions and Summary */}
                            <div className="space-y-8 flex flex-col">
                                <div className="p-8 bg-gray-900 rounded-[2.5rem] text-white">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 italic">Status Management</h4>
                                    <div className="grid grid-cols-2 gap-3 mb-8">
                                        {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                                            <button
                                                key={s}
                                                onClick={() => updateStatus(selectedOrder._id, s)}
                                                className={`py-3 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedOrder.status === s ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="space-y-4 pt-6 border-t border-gray-800">
                                        <div className="flex justify-between items-center font-bold text-[10px] uppercase tracking-widest text-gray-400">
                                            <span>Subtotal</span>
                                            <span className="text-white font-black italic">â‚¹{selectedOrder.totalAmount}</span>
                                        </div>
                                        <div className="flex justify-between items-center font-bold text-[10px] uppercase tracking-widest text-gray-400">
                                            <span>Delivery</span>
                                            <span className="text-green-500 font-black italic">FREE</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-xl font-black uppercase italic tracking-tighter">Total Price</span>
                                            <span className="text-3xl font-black text-blue-500 italic tracking-tighter pr-1">â‚¹{selectedOrder.totalAmount}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-grow p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col items-center justify-center text-center italic">
                                    <Truck className="w-10 h-10 text-gray-300 mb-4" />
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                                        Expected fulfillment within <span className="text-blue-600">24 hours</span> of clinical verification for order #{selectedOrder._id.slice(-6)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default PharmacyOrders;
