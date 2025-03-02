import { updateCategory } from "@/server/dbRest";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    const { changedCategory, categoryName, isRTL } = data;

    try {
        await updateCategory(changedCategory, categoryName, isRTL);
        return new NextResponse(JSON.stringify({ message: "successfully stored" }), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "failed to store item", error: error.message }), { status: 500 });
    } 

}