import { getRestaurantsNames, getRestInfo } from "@/server/dbMenu";
import { revalidatePath, unstable_cache } from 'next/cache';
import ErrorRetryButton from "@/components/Menu/ReloadButton";
import Def from "@/components/ViewMenu/Def";
import CategoryMenu from "@/components/ViewMenu/CategoryMenu";

export const dynamic = 'force-static';
export const revalidate = 3600;

async function fetchRestaurantData(restname) {
  "use server";

  const getCachedRestInfo = async (restname) => {
    return unstable_cache(
      async () => {
        const data = await getRestInfo(restname);
        if (!data || !data.categories) {
          console.error(`Invalid data structure for ${restname}`);
        }
        return data;
      },
      ['rest-info', restname],
      { revalidate: 3600 }
    )();
  };

  const getFreshData = async (restname) => {
    console.log(`Performing fresh data fetch for ${restname}`);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return await getRestInfo(restname);
    } catch (error) {
      console.error(`Fresh data fetch failed for ${restname}:`, error);
      throw error;
    }
  };

  let restInfo = await getCachedRestInfo(restname);

  if (!restInfo || !restInfo.categories) {
    console.log(`Initial data fetch missing categories for ${restname}, performing fresh fetch...`);
    restInfo = await getFreshData(restname);
  }

  if (!restInfo || !restInfo.categories) {
    return null;
  }

  const processedMenu = restInfo.items.map(item => ({
    ...item,
    _id: item._id.toString()
  }));

  return {
    ...restInfo,
    items: processedMenu
  };
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
    title: `${restname}'s Menu`,
    description: `View ${restname}'s restaurant menu items`,
    openGraph: {
      title: `${restname}'s Menu`,
      description: `Browse ${restname}'s restaurant menu items`,
      type: 'website',
    },
  };
}

export async function revalidateMenuAction(restname) {
  "use server";
  revalidatePath(`/${restname}`);
  console.log(`Cache revalidated for restaurant: ${restname}`);
  return { success: true };
}

export default async function Menu({ params }) {
  const restname = (await params).restname;


  try {
    const restInfo = await fetchRestaurantData(restname);

    if (!restInfo) {
      throw new Error(`Failed to get valid restaurant data for ${restname}`);
    }

    const {
      categories: CATEGORIES,
      theme,
      header,
      description,
      items,
      footerText,
      socialLinks,
      menu,
      bg
    } = restInfo;

    if (menu === 'CategoryMenu') {
      return (
        <CategoryMenu
        CATEGORIES={CATEGORIES}
        theme={theme}
        header={header}
        description={description}
        menu={items}
        bg={bg}
        footerText={footerText}
        socialLinks={socialLinks}
        restname={restname}
      />
      )

    } else {
      return (
        <Def
        CATEGORIES={CATEGORIES}
        theme={theme}
        bg={bg}
        header={header}
        description={description}
        menu={items}
        footerText={footerText}
        socialLinks={socialLinks}
        restname={restname}
      />
      )
    }

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
          <ErrorRetryButton
            restname={restname}
            isRTL={isRTL}
            revalidateAction={revalidateMenuAction}
            theme={null}
          />
        </div>
      </div>
    );
  }
}