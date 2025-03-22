import SelectionPage from "@/components/Menu/selectionPage";
import { getRestaurantsNames, getTheme } from "@/server/dbMenu";
import { unstable_cache } from 'next/cache';

export const dynamic = 'force-static';
export const revalidate = 3600; 


async function getCachedTheme(restname) {
    "use server";
    return unstable_cache(
        async () => {
            try {
                const themeData = await getTheme(restname);
                return themeData;
            } catch (error) {
                console.error(`Error fetching theme for ${restname}:`, error);
                return { theme: {} };
            }
        },
        ['theme-data', restname],
        { revalidate: 3600 }
    )();
}

export async function generateStaticParams() {
    "use server";
    try {
        const restnames = await getRestaurantsNames();
        return restnames.map((restname) => ({
            restname: restname.toString(),
        }));
    } catch (error) {
        console.error("Failed to generate static params:", error);
        return []; 
    }
}

export async function generateMetadata({ params }) {
    "use server";
    const restname = (await params).restname;
    return {
        title: `${restname} Selections`,
        description: `Make your selections for ${restname}`,
    };
}

export default async function Selections({ params }) {
    const restname = (await params).restname


    try {
        const themeData = await getCachedTheme(restname);

        return (
            <>
                <SelectionPage
                    theme={themeData.theme}
                />
            </>
        );
    } catch (error) {
        console.error(`Error rendering selections for ${restname}:`, error);

        return (
            <div className="max-w-4xl mx-auto p-8" dir={isRTL ? 'rtl' : 'ltr'}>
                <h1 className="text-2xl font-bold text-red-600">
                    {isRTL ? 'שגיאה בטעינת דף הבחירות' : 'Error Loading Selections Page'}
                </h1>
                <p className="mt-2 text-gray-600">
                    {isRTL ? 'לא ניתן לטעון את אפשרויות הבחירה. אנא נסו שוב מאוחר יותר.' : 'Unable to load selection options. Please try again later.'}
                </p>
            </div>
        );
    }
}