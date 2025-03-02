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
                backgroundImage: `linear-gradient(120deg, #F7F8F2 0%, #F7F8F2 100%), radial-gradient(at 50% 50%, #A4C2A5 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #1A1C16 0%, #1A1C16 100%), radial-gradient(at 50% 50%, #566246 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        sea: {
            light: {
                backgroundImage: `linear-gradient(120deg, #E8F0FF 0%, #E8F0FF 100%), radial-gradient(at 50% 50%, #6F9CEB 0%, transparent 60%)`,
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
                backgroundImage: `linear-gradient(120deg, #F9F8F5 0%, #F9F8F5 100%), radial-gradient(at 50% 50%, #BCB8B1 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #161412 0%, #161412 100%), radial-gradient(at 50% 50%, #463F3A 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        violet: {
            light: {
                backgroundImage: `linear-gradient(120deg, #FAF0FD 0%, #FAF0FD 100%), radial-gradient(at 50% 50%, #CC2383 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #14010F 0%, #14010F 100%), radial-gradient(at 50% 50%, #9221CE 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        darkWood: {
            light: {
                backgroundImage: `linear-gradient(120deg, #EAE5DB 0%, #EAE5DB 100%), radial-gradient(at 50% 50%, #635C51 0%, transparent 60%)`,
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
                backgroundImage: `linear-gradient(120deg, #E6F4FF 0%, #E6F4FF 100%), radial-gradient(at 50% 50%, #8FB8ED 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #0B2335 0%, #0B2335 100%), radial-gradient(at 50% 50%, #174769 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        // New theme: Terracotta
        terracotta: {
            light: {
                backgroundImage: `linear-gradient(120deg, #FFF8EC 0%, #FFF8EC 100%), radial-gradient(at 50% 50%, #D2691E 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #241811 0%, #241811 100%), radial-gradient(at 50% 50%, #993D20 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        // New theme: Mint
        mint: {
            light: {
                backgroundImage: `linear-gradient(120deg, #F0FFF4 0%, #F0FFF4 100%), radial-gradient(at 50% 50%, #52B788 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #0A2E21 0%, #0A2E21 100%), radial-gradient(at 50% 50%, #0E8A6E 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        // New theme: Berry
        berry: {
            light: {
                backgroundImage: `linear-gradient(120deg, #FCF2F6 0%, #FCF2F6 100%), radial-gradient(at 50% 50%, #7B2869 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #25091F 0%, #25091F 100%), radial-gradient(at 50% 50%, #4A1942 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }
        },
        default: {
            light: {
                backgroundImage: `linear-gradient(120deg, #FFFFFF 0%, #FFFFFF 100%), radial-gradient(at 50% 50%, #B3793C 0%, transparent 60%)`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            },
            dark: {
                backgroundImage: `linear-gradient(120deg, #0F1214 0%, #0F1214 100%), radial-gradient(at 50% 50%, #617073 0%, transparent 60%)`,
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