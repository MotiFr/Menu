import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Skeleton } from "@/components/ui/skeleton";
import { getTheme } from "@/server/dbMenu";
import { unstable_cache } from 'next/cache';

const NavBarMenu = dynamic(() => import("@/components/NavBar/NavBarMenu"), {
  loading: () => <div className="h-16" />
});
const NavTopMenu = dynamic(() => import('@/components/NavBar/NavTopMenu'), {
  loading: () => <div className="h-16 bg-gray-100 dark:bg-gray-900" />
});

const getCachedTheme = unstable_cache(
  async (restname) => {
    return await getTheme(restname);
  },
  ['theme-data'],
  { revalidate: 3600 } 
);

const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🛠️ Under Maintenance</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          We're currently performing some maintenance on our site.
          <br />
          Please check back later.
        </p>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
    const skeletonItems = Array.from({ length: 4 });

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm p-8">
            <Skeleton className="h-8 w-48" />
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    <div>
                        <Skeleton className="h-8 w-48 mb-4" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skeletonItems.map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                                >
                                    <div className="flex items-start space-x-4">
                                        <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-6 w-3/4" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-2/3" />
                                            <Skeleton className="h-5 w-16 mt-2" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default async function RestaurantLayout({ params, children }) {
    const restname = (await params)?.restname;
    const theme = await getCachedTheme(restname);
    
    // Set this to true to enable maintenance mode
    const isMaintenanceMode = false;

    if (isMaintenanceMode) {
        return <MaintenancePage />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Script
                src="https://cdn.enable.co.il/licenses/enable-L40551evm91dijcz-0325-69756/init.js"
                strategy="afterInteractive"
            />
            <Suspense fallback={<LoadingSkeleton />}>
                <NavTopMenu
                    restname={restname}
                    theme={theme}
                />
                <main className="flex-1">
                    {children}
                </main>
                <NavBarMenu
                    theme={theme}
                    id={restname}
                />
            </Suspense>
        </div>
    );
};