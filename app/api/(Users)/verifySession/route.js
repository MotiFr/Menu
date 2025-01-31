import { verifyAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const result = await verifyAuthSession();

        if (!result.user) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }
        else {
            return NextResponse.json({ message: "Authenticated" }, { status: 200 });
        }
    } catch {
        return NextResponse.json({ message: "Failed to verify session" }, { status: 500 });
    }

}