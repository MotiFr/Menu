import { verifyAuthSession } from "@/lib/auth";
import { getCategories, getItemsThemeText } from "@/server/dbRest";
import { NextResponse } from "next/server";

export async function GET() {
    const result = await verifyAuthSession();

    if (!result.user) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    
    try {
        const { theme, items, header, description } = await getItemsThemeText();
        const categoriesOb = await getCategories();
        const categories = categoriesOb.categories;
        return NextResponse.json({ theme, items, header, description, categories });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch items", error: error.message },
            { status: 500 }
        );
    } 
}