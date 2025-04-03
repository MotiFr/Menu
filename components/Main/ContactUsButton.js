"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';

const translations = {
    eng: {
        title: "Let's Talk",
        subtitle: "We'd love to hear from you",
        fullName: "Full Name",
        email: "Email",
        phone: "Phone Number",
        context: "Tell us more",
        cancel: "Maybe Later",
        send: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "An error occurred. Please try again.",
        required: "Required"
    },
    heb: {
        title: "בואו נדבר",
        subtitle: "נשמח לשמוע מכם",
        fullName: "שם מלא",
        email: "אימייל",
        phone: "מספר טלפון",
        context: "ספרו לנו עוד",
        cancel: "אולי מאוחר יותר",
        send: "שלח הודעה",
        sending: "שולח...",
        success: "ההודעה נשלחה בהצלחה!",
        error: "אירעה שגיאה. אנא נסה שוב.",
        required: "שדה חובה"
    }
};

export default function ContactUsButton({ text = 'Contact Us', lang = 'heb' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        context: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    
    const t = translations[lang] || translations.eng;
    const isRTL = lang === 'heb';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setTimeout(() => {
                setIsOpen(false);
                setSubmitStatus(null);
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    context: ''
                });
            }, 2000);
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium transition-all duration-300 rounded-full overflow-hidden bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 dark:from-amber-500 dark:via-amber-600 dark:to-amber-700 transform hover:scale-105 active:scale-100"
            >
                {/* Background animations */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 dark:from-amber-500 dark:via-amber-600 dark:to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 dark:from-amber-500 dark:via-amber-600 dark:to-amber-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {/* Content */}
                <div className={`relative flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 text-white transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-white">{text}</span>
                </div>
            </button>

            <Dialog
                open={isOpen}
                onClose={() => !isSubmitting && setIsOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-3xl bg-gradient-to-br from-white to-amber-50 dark:from-gray-900 dark:to-gray-800 p-8 text-left align-middle shadow-2xl transition-all ${isRTL ? 'rtl' : 'ltr'}`}>
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute -top-32 -left-32 w-64 h-64 bg-amber-200 dark:bg-amber-700/30 rounded-full blur-3xl opacity-30"></div>
                            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-amber-300 dark:bg-amber-600/30 rounded-full blur-3xl opacity-30"></div>
                        </div>

                        <div className="relative">
                            <Dialog.Title className={`text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-400 dark:to-amber-500 bg-clip-text text-transparent ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t.title}
                            </Dialog.Title>
                            <p className={`mt-1 text-amber-600 dark:text-amber-400/80 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t.subtitle}
                            </p>

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="fullName" className={`block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                                            {t.fullName} <span className="text-amber-500">*</span>
                                            <span className={`text-amber-500/60 text-xs ${isRTL ? 'mr-1' : 'ml-1'}`}>({t.required})</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border-2 border-amber-200 dark:border-amber-700/50 rounded-xl focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 focus:border-transparent dark:text-white placeholder-amber-600/50 dark:placeholder-amber-400/50 ${isRTL ? 'text-right' : 'text-left'}`}
                                            disabled={isSubmitting}
                                            placeholder={isRTL ? "הכנס שם מלא" : "Enter your full name"}
                                            dir={isRTL ? 'rtl' : 'ltr'}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className={`block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                                            {t.email} <span className="text-amber-500">*</span>
                                            <span className={`text-amber-500/60 text-xs ${isRTL ? 'mr-1' : 'ml-1'}`}>({t.required})</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border-2 border-amber-200 dark:border-amber-700/50 rounded-xl focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 focus:border-transparent dark:text-white placeholder-amber-600/50 dark:placeholder-amber-400/50 ${isRTL ? 'text-right' : 'text-left'}`}
                                            disabled={isSubmitting}
                                            placeholder={isRTL ? "הכנס כתובת אימייל" : "Enter your email"}
                                            dir="ltr"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className={`block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                                            {t.phone} <span className="text-amber-500">*</span>
                                            <span className={`text-amber-500/60 text-xs ${isRTL ? 'mr-1' : 'ml-1'}`}>({t.required})</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border-2 border-amber-200 dark:border-amber-700/50 rounded-xl focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 focus:border-transparent dark:text-white placeholder-amber-600/50 dark:placeholder-amber-400/50 ${isRTL ? 'text-right' : 'text-left'}`}
                                            disabled={isSubmitting}
                                            placeholder={isRTL ? "הכנס מספר טלפון" : "Enter your phone number"}
                                            dir="ltr"
                                            pattern="[0-9+\-\(\)\s]*"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="context" className={`block text-sm font-medium text-amber-700 dark:text-amber-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                                            {t.context}
                                        </label>
                                        <textarea
                                            id="context"
                                            name="context"
                                            rows="4"
                                            value={formData.context}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border-2 border-amber-200 dark:border-amber-700/50 rounded-xl focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 focus:border-transparent dark:text-white placeholder-amber-600/50 dark:placeholder-amber-400/50 resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                                            disabled={isSubmitting}
                                            placeholder={isRTL ? "הוסף פרטים נוספים" : "Add any additional details"}
                                            dir={isRTL ? 'rtl' : 'ltr'}
                                        ></textarea>
                                    </div>
                                </div>

                                {submitStatus === 'error' && (
                                    <p className={`text-red-500 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                                        {t.error}
                                    </p>
                                )}

                                {submitStatus === 'success' && (
                                    <p className={`text-green-500 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                                        {t.success}
                                    </p>
                                )}

                                <div className={`flex ${isRTL ? 'flex-row-reverse justify-start' : 'flex-row justify-end'} gap-4 mt-8`}>
                                    <button
                                        type="button"
                                        onClick={() => !isSubmitting && setIsOpen(false)}
                                        className="px-6 py-3 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 focus:outline-none rounded-xl transition-colors duration-300"
                                        disabled={isSubmitting}
                                    >
                                        {t.cancel}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="relative px-8 py-3 text-sm font-medium text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-100 disabled:opacity-50 disabled:hover:scale-100"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 dark:from-amber-500 dark:via-amber-600 dark:to-amber-700"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
                                        <span className="relative">
                                            {isSubmitting ? t.sending : t.send}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
} 