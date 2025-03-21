import { verifyAuthSession } from "@/lib/auth";
import { getRestStatics } from "@/server/dbRest";
import { NextResponse } from "next/server";

export async function GET() {
    const result = await verifyAuthSession();

    if (!result.user) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    
    try {
        const {restname, catCount, itemCount, views} = await getRestStatics();
        return NextResponse.json({restname, catCount, itemCount, views});
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch items", error: error.message },
            { status: 500 }
        );
    } 
}