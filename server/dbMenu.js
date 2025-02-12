"use server";
import { MongoClient } from "mongodb";
import { getRestaurant } from "./dbRest";
import { revalidatePath } from "next/cache";

const uri = process.env.NEXT_ATLAS_URI;
let client = null;
let isConnected = false;

export async function getMongoClient() {
    if (!client) {
        client = new MongoClient(uri, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
    }

    if (!isConnected) {
        try {
            await client.connect();
            isConnected = true;
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw new Error('Failed to connect to database');
        }
    }

    return client;
}

export async function changeMenu(theme, header, description) {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");

        const res = await db.collection(`${restname} Data`).updateOne(
            {},
            {
                $set: {
                    theme: theme,
                    header: header,
                    description: description
                }
            }
        );

        revalidatePath(`/menu/${restname}`)

    } catch (error) {
        console.error('Error storing new item:', error);
        throw error;
    }
}


export async function getRestInfo(restname) {
    if (!restname) {
        throw new Error('Restaurant name is required');
    }

    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");

        const items = await db.collection(restname)
            .find({})
            .sort({ order: 1 })
            .toArray();

        const categoriesOb = await db.collection(`${restname} Data`)
            .findOne(
                { categories: { $exists: true } },
                { projection: { categories: 1, _id: 0 } }
            );

        const details = await db.collection(`${restname} Data`)
            .findOne(
                { theme: { $exists: true } },
            );
        const categories = categoriesOb ? categoriesOb.categories : [];
        const theme = details.theme
        const header = details.header
        const description = details.description

        return { items, categories, theme, header, description };
    } catch (error) {
        console.error('Error getting restaurant info:', error);
        throw new Error('Failed to fetch restaurant information');
    }
}

export async function getTheme(restname) {
    if (!restname) {
        throw new Error('Restaurant name is required');
    }

    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");

        const details = await db.collection(`${restname} Data`)
            .findOne(
                { theme: { $exists: true } },
            );
        const theme = details.theme

        return { theme };
    } catch (error) {
        console.error('Error getting restaurant info:', error);
        throw new Error('Failed to fetch restaurant information');
    }
}

export async function getRestaurantsNames() {
    try {
        const client = await getMongoClient();
        const db = client.db("data");

        const users = await db.collection('users')
            .find({}, { projection: { username: 1 } })
            .sort({ order: 1 })
            .toArray();

        const usernames = users.map(user => user.username);
        return usernames;
    } catch (error) {
        console.error('Error getting restaurant names:', error);
        throw new Error('Failed to fetch restaurant names');
    }
}