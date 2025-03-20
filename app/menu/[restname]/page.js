"use server"
import { getRestaurantsNames, getRestInfo } from "@/server/dbMenu";
import { revalidatePath, unstable_cache } from 'next/cache';
import ErrorRetryButton from "@/components/Menu/ReloadButton";
import Def from "@/components/ViewMenu/Def";

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

export async function revalidateMenuAction(restname) {
  "use server";

  revalidatePath(`/${restname}`);
  console.log(`Cache revalidated for restaurant: ${restname}`);
  return { success: true };
}


export default async function Menu({ params, searchParams }) {
  const restname = (await params).restname;
  const lang = (await searchParams).lang || 'heb';
  const isRTL = lang === 'heb';


  const getLocalizedValue = (engValue, hebValue) => lang === 'eng' ? engValue : hebValue;
  try {
    let restInfo = await getCachedRestInfo(restname);
    
    if (!restInfo || !restInfo.categories) {
      console.log(`Initial data fetch missing categories for ${restname}, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 300));
      restInfo = await getCachedRestInfo(restname);
    }
    
    if (!restInfo || !restInfo.categories) {
      throw new Error(`Failed to get valid restaurant data for ${restname} after retry`);
    }

    const { categories: CATEGORIES, theme, header, description, items, footerText, socialLinks } = restInfo;
    const menu = items.map(item => ({ ...item, _id: item._id.toString() }));
    
    return (
      <Def
        CATEGORIES={CATEGORIES}
        theme={theme}
        header={header}
        description={description}
        menu={menu}
        footerText={footerText}
        socialLinks={socialLinks}
        restname={restname}
        isRTL={isRTL}
        getLocalizedValue={getLocalizedValue}
      />
    );
  } catch (error) {
    console.error(`Error rendering menu for ${restname}:`, error);


    return (
      <div className="max-w-4xl mx-auto p-8" dir={isRTL ? 'rtl' : 'ltr'}>
        <h1 className="text-2xl font-bold text-red-600">
          {isRTL ? 'שגיאה בטעינת התפריט' : 'Error Loading Menu'}
        </h1>
        <p className="mt-2 text-gray-600">
          {isRTL ? 'לא ניתן לטעון את פריטי התפריט. אנא נסו שוב מאוחר יותר.' : 'Unable to load menu items. Please try again later.'}
        </p>
        <div className="mt-4 text-center">
          {typeof theme !== 'undefined' && theme ?
            <ErrorRetryButton
              restname={restname}
              isRTL={isRTL}
              revalidateAction={revalidateMenuAction}
              theme={theme}
            />
            :
            <ErrorRetryButton
              restname={restname}
              isRTL={isRTL}
              revalidateAction={revalidateMenuAction}
            />
          }


        </div>
      </div>
    );
  }
}