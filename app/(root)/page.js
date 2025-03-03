import { FeatureCard } from "@/components/Main/Card";
import MaxWidth from "@/components/Main/MaxWidth";
import { QrCode, ScanLine, UtensilsCrossed } from "lucide-react";

export default function Home() {
  return (
    <MaxWidth>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Transform Your Menu</span>
              <span className="block text-primary dark:text-primary-dark">Into a Digital Experience</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Create beautiful digital menus for your restaurant. Generate QR codes instantly and let your customers browse your menu with ease.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                {/* <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-hover-dark md:py-4 md:text-lg md:px-10 transition-colors duration-200">
                  Get Started
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Simple steps to digitize your menu</p>
        </div>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          <FeatureCard
            icon={UtensilsCrossed}
            title="Upload Your Menu"
            description="Easily upload and manage your restaurant's menu items, prices, and categories."
          />
          <FeatureCard
            icon={QrCode}
            title="Generate QR Code"
            description="Get a unique QR code for your digital menu that you can print or display."
          />
          <FeatureCard
            icon={ScanLine}
            title="Customers Scan & Order"
            description="Customers can easily view your menu by scanning the QR code with their phones."
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-bg dark:bg-primary-bg-dark">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to modernize your restaurant?
            </h2>
            {/* <p className="mt-4 text-lg leading-6 text-primary-light">
              Join thousands of restaurants already using MenuQR to enhance their dining experience.
            </p> */}
            {/* <button className="mt-8 bg-white dark:bg-gray-900 text-primary-bg dark:text-primary-dark px-8 py-3 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
              Start Free Trial
            </button> */}
          </div>
        </div>
      </div>
    </div>
    </MaxWidth>
  );
}
