import { getCategories, getItems } from "@/server/dbRest";
import { NextResponse } from "next/server";

export async function GET() {
    const restname = "Moti's restaurant";
    try {
        const items = await getItems(restname);
        const categoriesOb = await getCategories(restname);
        const categories = categoriesOb.categories;
        return NextResponse.json({ items, categories });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch items", error: error.message },
            { status: 500 }
        );
    } 
}