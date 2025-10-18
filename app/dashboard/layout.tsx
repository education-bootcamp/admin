'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardHome() {
    const [stats, setStats] = useState({
        hotels: 0,
        users: 0,
        rooms: 0,
        bookings: 0
    });
    const [loading, setLoading] = useState(true);
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        // Simulate API call to fetch stats
        const fetchStats = async () => {
            try {
                setTimeout(() => {
                    setStats({
                        hotels: 24,
                        users: 1567,
                        rooms: 342,
                        bookings: 89
                    });
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const openModal = (modalType: string) => {
        setActiveModal(modalType);
        setFormData({});
    };

    const closeModal = () => {
        setActiveModal(null);
        setFormData({});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission based on activeModal type
        console.log(`Submitting ${activeModal}:`, formData);
        // Add your API call here
        alert(`${activeModal} added successfully!`);
        closeModal();
    };

    const cards = [
        {
            title: "Total Hotels",
            value: stats.hotels,
            icon: "🏨",
            color: "from-blue-500 to-blue-600",
            bgLight: "bg-blue-50",
            textColor: "text-blue-600",
            change: "+12%",
            changePositive: true
        },
        {
            title: "Total Users",
            value: stats.users,
            icon: "👥",
            color: "from-green-500 to-green-600",
            bgLight: "bg-green-50",
            textColor: "text-green-600",
            change: "+8%",
            changePositive: true
        },
        {
            title: "Total Rooms",
            value: stats.rooms,
            icon: "🛏️",
            color: "from-purple-500 to-purple-600",
            bgLight: "bg-purple-50",
            textColor: "text-purple-600",
            change: "+5%",
            changePositive: true
        },
        {
            title: "Active Bookings",
            value: stats.bookings,
            icon: "📅",
            color: "from-orange-500 to-orange-600",
            bgLight: "bg-orange-50",
            textColor: "text-orange-600",
            change: "-3%",
            changePositive: false
        }
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back! 👋</h2>
                <p className="text-gray-600">Here's what's happening with your business today.</p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group"
                    >
                        <div className={`bg-gradient-to-r ${card.color} p-4`}>
                            <div className="flex items-center justify-between">
                                <div className={`${card.bgLight} rounded-full p-3 group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="text-3xl">{card.icon}</span>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    card.changePositive
                                        ? 'bg-white bg-opacity-30 text-white'
                                        : 'bg-black bg-opacity-20 text-white'
                                }`}>
                                    {card.change}
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-gray-600 text-sm font-medium mb-2">{card.title}</h3>
                            {loading ? (
                                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                            ) : (
                                <p className={`text-4xl font-bold ${card.textColor} group-hover:scale-105 transition-transform duration-300`}>
                                    {card.value.toLocaleString()}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 mt-3">
                                {card.changePositive ? '↑' : '↓'} vs last month
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                        onClick={() => openModal('hotel')}
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                    >
                        <span className="text-2xl group-hover:scale-110 transition-transform">➕</span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Add New Hotel</span>
                    </button>
                    <button
                        onClick={() => openModal('user')}
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
                    >
                        <span className="text-2xl group-hover:scale-110 transition-transform">👤</span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">Add New User</span>
                    </button>
                    <button
                        onClick={() => openModal('room')}
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 group"
                    >
                        <span className="text-2xl group-hover:scale-110 transition-transform">🛏️</span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">Add New Room</span>
                    </button>
                    <button
                        onClick={() => openModal('booking')}
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group"
                    >
                        <span className="text-2xl group-hover:scale-110 transition-transform">📝</span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">New Booking</span>
                    </button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    {[
                        { text: "New booking received from John Doe", time: "5 minutes ago", icon: "📅" },
                        { text: "Hotel Grand Plaza was updated", time: "1 hour ago", icon: "🏨" },
                        { text: "New user registration: Jane Smith", time: "2 hours ago", icon: "👤" },
                        { text: "Room 305 marked as available", time: "3 hours ago", icon: "✅" }
                    ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <span className="text-2xl">{activity.icon}</span>
                            <div className="flex-1">
                                <p className="text-sm text-gray-700">{activity.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            {activeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Add New {activeModal.charAt(0).toUpperCase() + activeModal.slice(1)}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Hotel Form */}
                            {activeModal === 'hotel' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Grand Plaza Hotel"
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="New York, USA"
                                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Rooms</label>
                                        <input
                                            type="number"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="100"
                                            onChange={(e) => setFormData({...formData, totalRooms: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="$200 - $500"
                                            onChange={(e) => setFormData({...formData, priceRange: e.target.value})}
                                        />
                                    </div>
                                </>
                            )}

                            {/* User Form */}
                            {activeModal === 'user' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="John Doe"
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="john@example.com"
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="+1 234-567-8900"
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                        <select
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="manager">Manager</option>
                                            <option value="staff">Staff</option>
                                            <option value="customer">Customer</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {/* Room Form */}
                            {activeModal === 'room' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="305"
                                            onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Hotel</label>
                                        <select
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            onChange={(e) => setFormData({...formData, hotel: e.target.value})}
                                        >
                                            <option value="">Select Hotel</option>
                                            <option value="1">Grand Plaza Hotel</option>
                                            <option value="2">Ocean View Resort</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                                        <select
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="single">Single</option>
                                            <option value="double">Double</option>
                                            <option value="suite">Suite</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night</label>
                                        <input
                                            type="number"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="250"
                                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Booking Form */}
                            {activeModal === 'booking' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Guest Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="John Doe"
                                            onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Hotel</label>
                                        <select
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            onChange={(e) => setFormData({...formData, hotel: e.target.value})}
                                        >
                                            <option value="">Select Hotel</option>
                                            <option value="1">Grand Plaza Hotel</option>
                                            <option value="2">Ocean View Resort</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="305"
                                            onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
                                            <input
                                                type="date"
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
                                            <input
                                                type="date"
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                >
                                    Add {activeModal.charAt(0).toUpperCase() + activeModal.slice(1)}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}