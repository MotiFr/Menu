import { signUp } from "@/server/dbUsers";
import { NextResponse } from "next/server";


export async function POST(req) {
    const { formData } = await req.json();
    const { username, password, email, restaurantName, phone, languages } = formData;

    try {
        const response = await signUp(username, password, email, restaurantName, phone, languages);
        if (!response) {
            return new NextResponse(JSON.stringify({ message: "username or email already exists" }), { status: 400 });
        }
        return new NextResponse(JSON.stringify({ message: "successfully stored" }), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "failed to store item", error: error.message }), { status: 500 });
    } 
}