"use client";
import React, { useEffect, useState } from 'react';

export default function ThemedBackground({ theme }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const updateDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        updateDarkMode();

        const observer = new MutationObserver(updateDarkMode);

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const patterns = {
        forest: {
            light: {
                backgroundImage: `linear-gradient(120deg, #F1F2EB 0%, #F1F2EB 100%), radial-gradient(at 50% 50%, #A4C2A5 0%, transparent 50%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #1A1C16 0%, #1A1C16 100%), radial-gradient(at 50% 50%, #566246 0%, transparent 50%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        sea: {
            light: {
                backgroundImage: `linear-gradient(120deg, #98B9F2 0%, #98B9F2 100%), radial-gradient(at 50% 50%, #6F9CEB 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #0A0D21 0%, #0A0D21 100%), radial-gradient(at 50% 50%, #141B41 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        dust: {
            light: {
                backgroundImage: `linear-gradient(120deg, #F4F3EE 0%, #F4F3EE 100%), radial-gradient(at 50% 50%, #BCB8B1 0%, transparent 70%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #161412 0%, #161412 100%), radial-gradient(at 50% 50%, #463F3A 0%, transparent 70%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        violet: {
            light: {
                backgroundImage: `linear-gradient(120deg, #F5E6FA 0%, #F5E6FA 100%), radial-gradient(at 50% 50%, #9221CE 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #14010F 0%, #14010F 100%), radial-gradient(at 50% 50%, #CC2383 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        darkWood: {
            light: {
                backgroundImage: `linear-gradient(120deg, #7D7461 0%, #7D7461 100%), radial-gradient(at 50% 50%, #635C51 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #0F0F18 0%, #0F0F18 100%), radial-gradient(at 50% 50%, #202030 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        sky: {
            light: {
                backgroundImage: `linear-gradient(120deg, #62BFED 0%, #62BFED 100%), radial-gradient(at 50% 50%, #8FB8ED 0%, transparent 70%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #0B2335 0%, #0B2335 100%), radial-gradient(at 50% 50%, #174769 0%, transparent 70%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        default: {
            light: {
                backgroundImage: `linear-gradient(120deg, #FFFFFF 0%, #FFFFFF 100%), radial-gradient(at 50% 50%, #B3793C 0%, transparent 70%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #000000 0%, #000000 100%), radial-gradient(at 50% 50%, #617073 0%, transparent 70%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        }
    };

    return (
        <div
            className="fixed inset-0 -z-10 transition-all duration-500"
            style={isDarkMode ? patterns[theme]?.dark : patterns[theme]?.light}
        />
    );
}
