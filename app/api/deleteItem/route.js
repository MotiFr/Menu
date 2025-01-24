import { deleteOneItem } from "@/server/dbRest";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    const { id } = data;

    // Store in db 
    const restname = "Moti's restaurant"
    try {
        await deleteOneItem(restname, id);
        return new NextResponse(JSON.stringify({ message: "successfully stored" }), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "failed to store item", error: error.message }), { status: 500 });
    } 

}