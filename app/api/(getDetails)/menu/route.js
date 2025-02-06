import { getRestInfo } from "@/server/dbMenu";
import { NextResponse } from "next/server";

export async function GET(request) {

    const { searchParams } = new URL(request.url);
    const restname = searchParams.get('restname');

    try {
        const { items, categories } = await getRestInfo(restname);
        return NextResponse.json({ items, categories });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Failed to fetch items", error: error.message },
            { status: 500 }
        );
    }
}