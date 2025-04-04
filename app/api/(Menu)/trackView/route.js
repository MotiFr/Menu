import { updateViewCount } from "@/server/dbMenu";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    const { restname } = data;

    try {
        await updateViewCount(restname);
        return new NextResponse(JSON.stringify({ message: "successfully stored" }), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "failed to update views", error: error.message }), { status: 500 });
    } 

}


