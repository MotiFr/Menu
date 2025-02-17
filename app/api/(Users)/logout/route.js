import { destroyAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await destroyAuthSession();
        return NextResponse.json( { status: 200 } )
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch items", error: error.message },
            { status: 500 }
        );
    } 
}