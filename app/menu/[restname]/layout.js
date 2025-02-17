import { Suspense } from 'react';
import NavBarMenu from "@/components/NavBar/NavBarMenu";
import { Skeleton } from "@/components/ui/skeleton";
import { getTheme } from "@/server/dbMenu";
import NavTopMenu from '@/components/NavBar/NavTopMenu';

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
    const theme = await getTheme(restname);

    return (
        <div className="min-h-screen flex flex-col">
            <Suspense fallback={<LoadingSkeleton />}>
                <NavTopMenu
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

