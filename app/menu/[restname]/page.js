"use server"
import MenuCard from "@/components/Menu/MenuCard";
import ThemedBackground from "@/components/Menu/ThemeBG";
import { getRestaurantsNames, getRestInfo } from "@/server/dbMenu";
import { categoryClasses } from '@/components/Menu/Themes';
import { unstable_cache } from 'next/cache';
import MenuFooter from "@/components/Menu/FooterView";
import ViewTracker from "@/components/Menu/ViewTracker";

const getCachedRestInfo = unstable_cache(
  async (restname) => {
    return await getRestInfo(restname);
  },
  ['rest-info'],
  { revalidate: 3600 }
);

export async function generateStaticParams() {
  const restnames = await getRestaurantsNames();
  return restnames.map((restname) => ({
    restname: restname.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const restname = (await params).restname;
  return {
    title: `${restname}'s Menu`,
    description: `View ${restname}'s restaurant menu items`,
  };
}

export default async function Menu({ params, searchParams }) {
  const restname = (await params).restname;
  const lang = (await searchParams).lang || 'heb';
  const isRTL = lang === 'heb';

  const getLocalizedValue = (engValue, hebValue) => lang === 'eng' ? engValue : hebValue;
  try {
    const { categories: CATEGORIES, theme, header, description, items, footerText, socialLinks } = await getCachedRestInfo(restname);
    const menu = items.map(item => ({ ...item, _id: item._id.toString() }));
    return (
      <div className="min-h-screen transition-all duration-500" dir={isRTL ? 'rtl' : 'ltr'}>
        <ThemedBackground theme={theme} />
        <div className="max-w-7xl mx-auto px-2 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              {getLocalizedValue(header.eng, header.heb)}
            </h1>
            <p className="text-lg opacity-80">
              {getLocalizedValue(description.eng, description.heb)}
            </p>
          </div>

          <div className="space-y-4">
            {CATEGORIES?.map((category) => {
              const items = menu.filter(item => item.category === category.name && item.seen);
              if (items.length === 0) return null;

              return (
                <div
                  key={category.name}
                  className={`${categoryClasses[theme]} rounded-2xl border backdrop-blur-md p-2`}
                >
                  <h2 className={`text-2xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {getLocalizedValue(category.name_eng, category.name_heb)}
                  </h2>
                  <p className={`opacity-80 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {getLocalizedValue(category.description_eng, category.description_heb)}
                  </p>
                  <div className="space-y-2">
                    <MenuCard
                      items={items.map(item => ({
                        ...item,
                        name: getLocalizedValue(item.name_eng, item.name_heb),
                        description: getLocalizedValue(item.description_eng, item.description_heb)
                      }))}
                      theme={theme}
                      isRTL={isRTL}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ViewTracker
          restname={restname}
        />
        <MenuFooter
          currentLang={isRTL ? 'heb' : 'eng'}
          currentTheme={theme}
          Footer={{ footerText, socialLinks }}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-8" dir={isRTL ? 'rtl' : 'ltr'}>
        <h1 className="text-2xl font-bold text-red-600">
          {isRTL ? 'שגיאה בטעינת התפריט' : 'Error Loading Menu'}
        </h1>
        <p className="mt-2 text-gray-600">
          {isRTL ? 'לא ניתן לטעון את פריטי התפריט. אנא נסו שוב מאוחר יותר.' : 'Unable to load menu items. Please try again later.'}
        </p>
      </div>
    );
  }
}