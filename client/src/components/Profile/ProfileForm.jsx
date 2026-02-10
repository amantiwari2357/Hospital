import { User, Mail, Phone, Hash, Tag, X, FileText, Globe, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ProfileForm = ({ data, onChange }) => {
    // Local state for tags input handling
    const [newTag, setNewTag] = useState('');
    const tags = data?.tags || [];

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        onChange({ [name]: value });
    };

    const handleSocialChange = (platform, value) => {
        const currentLinks = data?.socialLinks || {};
        onChange({
            socialLinks: {
                ...currentLinks,
                [platform]: value
            }
        });
    };

    const addTag = (e) => {
        if (e.key === 'Enter' && newTag.trim()) {
            if (!tags.includes(newTag.trim())) {
                onChange({ tags: [...tags, newTag.trim()] });
            }
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        onChange({ tags: tags.filter(tag => tag !== tagToRemove) });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange({ image: reader.result });
                toast.success("Profile photo updated");
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-8">Personal Information</h3>

            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                    <img
                        src={data?.image || "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200&h=200"}
                        alt={data?.name || "Dr. User"}
                        className="w-32 h-32 rounded-full border-4 border-blue-50 object-cover shadow-sm"
                    />
                    <label htmlFor="photo-upload" className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 transition-all border-4 border-white cursor-pointer">
                        <User className="w-4 h-4" />
                    </label>
                    <input
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>
                <label htmlFor="photo-upload" className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">Change Profile Photo</label>
            </div>

            <div className="space-y-6">
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={data?.name || ''}
                            onChange={handleTextChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium"
                        />
                    </div>
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Bio</label>
                    <div className="relative">
                        <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                        <textarea
                            name="bio"
                            value={data?.bio || ''}
                            onChange={handleTextChange}
                            rows="3"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium resize-none"
                            placeholder="Brief description about yourself..."
                        />
                    </div>
                </div>

                {/* License ID */}
                <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Medical License ID</label>
                    <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="licenseId"
                            value={data?.licenseId || ''}
                            onChange={handleTextChange}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium font-mono"
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
                            name="email"
                            value={data?.email || ''}
                            onChange={handleTextChange}
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
                            name="phone"
                            value={data?.phone || ''}
                            onChange={handleTextChange}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-medium"
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Specialization Tags</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold">
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
                            placeholder="Add specialization..."
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
