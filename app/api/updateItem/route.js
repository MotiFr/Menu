import { updateItem } from "@/server/dbRest";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    const { _id, name, price, description, url, allergens, category } = data;

    const restname = "Moti's restaurant"
    try {
        await updateItem(restname, _id, name, price, description, url, allergens, category);
        return new NextResponse(JSON.stringify({ message: "successfully stored" }), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "failed to store item", error: error.message }), { status: 500 });
    } 

}