import { User, Mail, Phone, Hash, Tag, X } from 'lucide-react';
import { useState } from 'react';

const ProfileForm = () => {
    const [tags, setTags] = useState(['Cardiology', 'Surgery']);
    const [newTag, setNewTag] = useState('');

    const addTag = (e) => {
        if (e.key === 'Enter' && newTag.trim()) {
            if (!tags.includes(newTag.trim())) {
                setTags([...tags, newTag.trim()]);
            }
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-8">Personal Information</h3>

            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                    <img
                        src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200&h=200"
                        alt="Dr. Sarah Jenkins"
                        className="w-32 h-32 rounded-full border-4 border-blue-50 object-cover shadow-sm"
                    />
                    <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 transition-all border-4 border-white">
                        <User className="w-4 h-4" />
                    </button>
                </div>
                <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">Change Profile Photo</button>
            </div>

            <div className="space-y-6">
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                        <input
                            type="text"
                            defaultValue="Dr. Sarah Jenkins"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium"
                        />
                    </div>
                </div>

                {/* License ID */}
                <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Medical License ID</label>
                    <div className="relative">
                        <input
                            type="text"
                            defaultValue="MED-9921"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium font-mono"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="email"
                            defaultValue="sarah.jenkins@hms.com"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            defaultValue="+1 (555) 000-0000"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium"
                        />
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Specialization Tags</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold">
                                {tag}
                                <button onClick={() => removeTag(tag)} className="hover:text-blue-800 transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="relative">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Add..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={addTag}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
