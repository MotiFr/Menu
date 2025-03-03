import { getLanguagesMenu } from "@/server/dbRest";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    const { restname } = data

    try {
        const languages = await getLanguagesMenu(restname);
        return NextResponse.json(languages);
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Failed to fetch items", error: error.message },
            { status: 500 }
        );
    }
}