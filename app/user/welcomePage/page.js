"use client"
import { QrCode } from "lucide-react";
import { useQRCode } from "next-qrcode";
import { useCallback, useEffect } from "react";

export default function Welcome() {
  const restaurantName = "La Bella Cucina"; // This would come from your user data
  const { Canvas } = useQRCode();

  const redirect = useCallback(() => {
        window.location.href = '/';
      }, []);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/items');
          const json = await response.json();
          if (json.message === "Not authenticated") {
            redirect();
          }
          
        } catch (err) {
          //setError(err);
        } finally {
          //setLoading(false);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {restaurantName}!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Here's your restaurant's dashboard. Your digital menu is live and ready to be shared.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Active
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <QrCode className="h-5 w-5 mr-2 text-primary dark:text-primary-dark" />
              Your Menu QR Code
            </h2>
            <div className="mt-4 aspect-square w-48 mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                  <Canvas
                    text={'https://www.google.com'}
                    options={{
                      errorCorrectionLevel: 'Q',
                      width: 200,
                    }}
                  
                  />
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Download QR Code
                {/*  const { Image } = useQRCode();
                         Image / SVG */}
              </button>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Stats</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Menu Views</dt>
                <dd className="mt-1 text-2xl font-semibold text-primary dark:text-primary-dark">1,234</dd>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Menu Items</dt>
                <dd className="mt-1 text-2xl font-semibold text-primary dark:text-primary-dark">24</dd>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Categories</dt>
                <dd className="mt-1 text-2xl font-semibold text-primary dark:text-primary-dark">4</dd>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
                <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">2 days ago</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary dark:text-primary-dark bg-primary/10 dark:bg-primary-dark/10 hover:bg-primary/20 dark:hover:bg-primary-dark/20">
              Update Menu
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary dark:text-primary-dark bg-primary/10 dark:bg-primary-dark/10 hover:bg-primary/20 dark:hover:bg-primary-dark/20">
              View Analytics
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary dark:text-primary-dark bg-primary/10 dark:bg-primary-dark/10 hover:bg-primary/20 dark:hover:bg-primary-dark/20">
              Share Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}