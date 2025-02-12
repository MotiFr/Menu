import SelectionPage from "@/components/Menu/selectionPage";
import { getTheme } from "@/server/dbMenu";

export default async function selections({ params }) {
    const restname = (await params).restname
    const theme = await getTheme(restname)
   
    return <SelectionPage theme={theme.theme} />
}