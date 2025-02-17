"use client"
import { QrCode, Loader2 } from "lucide-react";
import { useQRCode } from "next-qrcode";
import { useCallback, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const translations = {
  eng: {
    welcome: "Welcome back",
    dashboard: "Here's your restaurant's dashboard. Your digital menu is live and ready to be shared.",
    menuQrCode: "Your Menu QR Code",
    downloadQrCode: "Download QR Code",
    actions: "Actions",
    menuViews: "Menu Views",
    menuItems: "Menu Items",
    categories: "Categories",
    lastUpdated: "Last Updated",
    logout: "Logout",
    active: "Active"
  },
  heb: {
    welcome: "ברוך שובך",
    dashboard: "לוח המחוונים של המסעדה שלך. התפריט הדיגיטלי שלך פעיל ומוכן לשיתוף.",
    menuQrCode: "קוד QR של התפריט שלך",
    downloadQrCode: "הורד קוד QR",
    actions: "פעולות",
    menuViews: "צפיות בתפריט",
    menuItems: "פריטי תפריט",
    categories: "קטגוריות",
    lastUpdated: "עודכן לאחרונה",
    logout: "התנתק",
    active: "פעיל"
  }
};

export default function Welcome() {
  const searchParams = useSearchParams();
  const [currentLang, setCurrentLang] = useState('heb');
  
  useEffect(() => {
    const langParam = searchParams.get('lang');
    
    if (langParam && (langParam === 'eng' || langParam === 'heb')) {
      setCurrentLang(langParam);
    } else {
      const storedLang = localStorage.getItem('preferredLanguage');
      if (storedLang && (storedLang === 'eng' || storedLang === 'heb')) {
        setCurrentLang(storedLang);
      }
    }
  }, [searchParams]);
  
  const { Canvas } = useQRCode();
  const [loading, setLoading] = useState(true);
  const [fullUrl, setFullUrl] = useState('');
  const [restName, setRestName] = useState("");
  const t = translations[currentLang];
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${restName}-qr-code.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  async function logout() {
    try {
      const response = await fetch('/api/logout');
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error('Error logging out:', err);
    }
  }

  const redirect = useCallback(() => {
    window.location.href = '/';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/welcomePage');
        const json = await response.json();
        if (json.message === "Not authenticated") {
          redirect();
        }
        setRestName(json.restname);
        const currentUrl = window.location.href;
        setFullUrl(currentUrl.replace(/\/user\/welcomePage$/, `/menu/${json.restname}`));
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="aspect-square w-48 mx-auto">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="mt-4 flex justify-center">
                <Skeleton className="h-10 w-40" />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <dl className="mt-4 grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" dir={currentLang === 'heb' ? 'rtl' : 'ltr'}>
      <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t.welcome}, {restName}!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {t.dashboard}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {t.active}
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <QrCode className="h-5 w-5 mr-2 text-primary dark:text-primary-dark" />
              {t.menuQrCode}
            </h2>
            <div ref={qrRef} className="mt-4 aspect-square w-48 mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
                <Canvas
                  text={fullUrl}
                  options={{
                    errorCorrectionLevel: 'Q',
                    width: 200,
                  }}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button 
                onClick={downloadQRCode}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {t.downloadQrCode}
              </button>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.actions}</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.menuViews}</dt>
                <dd className="mt-1 text-2xl font-semibold text-primary dark:text-primary-dark">1,234</dd>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.menuItems}</dt>
                <dd className="mt-1 text-2xl font-semibold text-primary dark:text-primary-dark">24</dd>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.categories}</dt>
                <dd className="mt-1 text-2xl font-semibold text-primary dark:text-primary-dark">4</dd>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.lastUpdated}</dt>
                <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">2 days ago</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary dark:text-primary-dark bg-primary/10 dark:bg-primary-dark/10 hover:bg-primary/20 dark:hover:bg-primary-dark/20"
              onClick={logout}
            >
              {t.logout}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}