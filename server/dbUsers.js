"use server";
import { hashPassword, verifyPassword } from "@/components/DB/Hash";
import { createAuthSession } from "@/lib/auth";
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

export async function getUserNEmail() {
    try {
        const client = await getMongoClient();
        const db = client.db("data");
        const users = await db.collection("users").find({}, {
            projection: {
                username: 1,
                email: 1
            }
        }).toArray();
        return users;

    } catch (error) {
        console.error('Error getting users and emails', error);
        throw error;
    }
}

export async function signUp(username, password, email, restaurantName, phone, languages) {
    try {
        const hashedPassword = await hashPassword(password);
        const client = await getMongoClient();
        const db = client.db("data");
        const user = await db.collection("users").findOne({ username });
        if (user) {
            return null;
        }
        const emailUser = await db.collection("users").findOne({ email });
        if (emailUser) {
            return null;
        }
        const response = await db.collection("users").insertOne({
            username,
            password: hashedPassword,
            email,
            restaurantName,
            phone,
            languages,
            createdAt: new Date()
        });
        const updatedUser = await db.collection("users").findOne({ username: username });
        await createAuthSession(updatedUser._id);
        return response;
    } catch (error) {
        console.error('Error storing new user:', error);
        throw error;
    }
}


export async function signIn(username, password) {
    try {
        const client = await getMongoClient();
        const db = client.db("data");
        const user = await db.collection("users").findOne(
            {
                username: username,
            }
        );
        if (!user) {
            return null;
        }
        const isValid = await verifyPassword(password, user.password);
        await createAuthSession(user._id);
        return isValid;
    } catch (error) {
        console.error('Error storing new user:', error);
        throw error;
    }
}
