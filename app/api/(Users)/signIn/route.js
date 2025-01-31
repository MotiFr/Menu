import { signIn } from "@/server/dbUsers";
import { NextResponse } from "next/server";


export async function POST(req) {
    const { formData } = await req.json();
    const { username, password } = formData;

    try {
        const response = await signIn( username, password );
        if (response === null) {
            return new NextResponse(JSON.stringify({ message: "Incorrect username" }), { status: 400 });
        }
        if (response === false) {
            return new NextResponse(JSON.stringify({ message: "Incorrect password" }), { status: 400 });
        }
        
        return new NextResponse(JSON.stringify({ message: "successfully logged in" }), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "failed to store item", error: error.message }), { status: 500 });
    }
}