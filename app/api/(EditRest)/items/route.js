import { verifyAuthSession } from "@/lib/auth";
import { getCategories, getItemsThemeText } from "@/server/dbRest";
import { NextResponse } from "next/server";

export async function GET() {
    const result = await verifyAuthSession();

    if (!result.user) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    
    try {
        const { theme, items, header, description, footer } = await getItemsThemeText();
        const categoriesOb = await getCategories();
        const categories = categoriesOb.categories;
        const menu = categoriesOb.menu;
        const bg = categoriesOb.bg;
        const {footerText, socialLinks, message} = footer
        return NextResponse.json({ theme, items, header, description, categories, menu, bg, footerText, socialLinks, message });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch items", error: error.message },
            { status: 500 }
        );
    } 
}