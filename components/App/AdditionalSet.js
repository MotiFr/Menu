import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const SettingsDialog = ({ t, currentLang }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    return (
        <>
            <button
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary dark:text-primary-dark bg-primary/10 dark:bg-primary-dark/10 hover:bg-primary/20 dark:hover:bg-primary-dark/20"
                onClick={openDialog}
            >
                {t.contact}
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeDialog}
                >
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 relative rtl"
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={closeDialog}
                            className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>

                        <div dir={currentLang === 'heb' ? 'rtl' : 'ltr'}>
                            <h3 className="text-lg font-bold mb-4 text-gray-800">{t.contact}</h3>
                            <p className="mb-4 text-gray-700">{t.additional1}</p>

                            <div className="flex items-center justify-end mt-6">
                                <a
                                    href="mailto:contact@example.com"
                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    <span className="ml-2 mr-2">{t.additional2}</span>
                                    <Mail size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SettingsDialog;