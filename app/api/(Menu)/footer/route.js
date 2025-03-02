import { changeFooter } from "@/server/dbMenu";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    const { footerText, socialLinks } = data;

    try {
        await changeFooter(footerText, socialLinks);
        return new NextResponse(JSON.stringify({ message: "successfully stored" }), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "failed to store item", error: error.message }), { status: 500 });
    } 

}


