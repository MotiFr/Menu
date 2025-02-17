import { uploadImage } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const file = await req.formData();
        const image = file.get("image");
        
        if (!image) {
            return new NextResponse(JSON.stringify({ message: "No image provided" }), { status: 400 });
        }

        const url = await uploadImage(image);
        return NextResponse.json({ url });
        
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Failed to store item", error: error.message }), { status: 500 });
    } 
}