import React, { useState } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can we help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages([...messages, userMsg]);
        setInput('');

        // Mock bot response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Thank you for your message. A representative will be with you shortly.",
                sender: 'bot'
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[60]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="bg-white w-[350px] h-[500px] rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden mb-6"
                    >
                        {/* Header */}
                        <div className="bg-medical-600 p-6 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold">CareSupport</h4>
                                    <span className="text-xs text-medical-100 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                        Always Online
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-medium ${msg.sender === 'user'
                                            ? 'bg-medical-600 text-white rounded-tr-none'
                                            : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your message..."
                                    className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-medical-500 transition-all font-medium"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1.5 p-2 bg-medical-600 text-white rounded-xl hover:bg-medical-700 transition-colors shadow-lg shadow-medical-200"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-medical-600 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all group"
            >
                {isOpen ? <X className="w-8 h-8" /> : (
                    <div className="relative">
                        <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full" />
                    </div>
                )}
            </button>
        </div>
    );
};

export default ChatWidget;
