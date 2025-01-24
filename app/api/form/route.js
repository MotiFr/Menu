import { storeNewItem } from "@/server/dbRest";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    const { name, price, category, description, url, allergens } = data;

    const restname = "Moti's restaurant"
    try {
        await storeNewItem(restname, name, price, category, description, url, allergens);
        return new NextResponse(JSON.stringify({ message: "successfully stored" }), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "failed to store item", error: error.message }), { status: 500 });
    } 

}

