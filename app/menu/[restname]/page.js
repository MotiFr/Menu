import MenuCard from "@/components/Menu/MenuCard";
import ThemedBackground from "@/components/Menu/ThemeBG";
import { getRestaurantsNames, getRestInfo } from "@/server/dbMenu";
import { categoryClasses } from '@/components/Menu/Themes';

export async function generateStaticParams() {
    const restnames = await getRestaurantsNames();
    return restnames.map((restname) => ({
        restname: restname.toString(),
    }));
}

export async function generateMetadata({ params }) {
    const restname = (await params).restname;
    try {
        return {
            title: `${restname}'s Menu`,
            description: `View ${restname}'s restaurant menu items`,
        };
    } catch (error) {
        return {
            title: 'Restaurant Menu',
            description: 'View restaurant menu items',
        };
    }
}

export default async function Menu({ params }) {
    const restname = (await params).restname;
    try {
        const response = await getRestInfo(restname);
        const CATEGORIES = response.categories;
        const theme = response.theme;
        const header = response.header;
        const description = response.description
        const menu = response.items.map(item => ({
            ...item,
            _id: item._id.toString()
        }));

        return (
            <div className="min-h-screen transition-all duration-500">
              <ThemedBackground theme={theme} />
              <div className="max-w-7xl mx-auto px-2 py-8">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold mb-4">{header}</h1>
                  <p className="text-lg opacity-80">{description}</p>
                </div>
        
                <div className="space-y-4">
                  {CATEGORIES && CATEGORIES.length > 0 && (
                    CATEGORIES.map((category) => {
                      const items = menu.filter((item) => 
                        item.category === category.name && item.seen === true
                      );
                      if (items.length === 0) return null;
        
                      return (
                        <div
                          key={category.name}
                          className={`${categoryClasses[theme]} rounded-2xl border backdrop-blur-md p-2`}
                        >
                          <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                          <p className="opacity-80 mb-8">{category.description}</p>
                          <div className="space-y-2">
                            <MenuCard items={items} theme={theme} />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          );
    } catch (error) {
        console.log(error)
        return (
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-2xl font-bold text-red-600">
                    Error Loading Menu
                </h1>
                <p className="mt-2 text-gray-600">
                    Unable to load menu items. Please try again later.
                </p>
            </div>
        );
    }
}

