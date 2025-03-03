import { getLanguages } from "@/server/dbRest";
import { NextResponse } from "next/server";

export async function GET() {

    
    try {
        const languages = await getLanguages();
        return NextResponse.json(languages);
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Failed to fetch items", error: error.message },
            { status: 500 }
        );
    }
}