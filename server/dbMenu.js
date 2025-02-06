"use server";
import { MongoClient } from "mongodb";


const uri = process.env.NEXT_ATLAS_URI;

let client = null;
let isConnected = false;

export async function getMongoClient() {
    if (!client) {
        client = new MongoClient(uri);
    }

    if (!isConnected) {
        await client.connect();
        isConnected = true;
    }

    return client;
}



export async function getRestInfo(restname) {

    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        const items = await db.collection(restname).find({}).sort({ order: 1 }).toArray();
        const categoriesOb = await db.collection(`${restname} Data`).findOne({ categories: { $exists: true } }, { projection: { categories: 1, _id: 0 } });
        const categories = categoriesOb.categories
        return { items, categories };
    } catch (error) {
        console.error('Error getting items:', error);
        throw error;
    }
}

