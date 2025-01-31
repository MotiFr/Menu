import { getUserNEmail } from "@/server/dbUsers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await getUserNEmail();
        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch items", error: error.message },
            { status: 500 }
        );
    } 
}