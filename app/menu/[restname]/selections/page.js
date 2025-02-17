import SelectionPage from "@/components/Menu/selectionPage";
import { getRestaurantsNames, getTheme } from "@/server/dbMenu";

export async function generateStaticParams() {
    const restnames = await getRestaurantsNames();
    return restnames.map((restname) => ({
        restname: restname.toString(),
    }));
}

export default async function selections({ params, searchParams }) {
    const restname = (await params).restname
    const theme = await getTheme(restname)
    const lang = (await searchParams).lang || "heb";
    const isRTL = lang === 'heb';

    return (
        <>
            <SelectionPage 
            lang={lang}
            isRTL={isRTL}
            theme={theme.theme}
            />
        </>
    )
}