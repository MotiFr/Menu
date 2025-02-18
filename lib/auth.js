"use server"
import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";

const uri = process.env.NEXT_ATLAS_URI;
const client = new MongoClient(uri);
await client.connect();

const db = client.db("data");
const User = db.collection("users");
const Session = db.collection("sessions");
const adapter = new MongodbAdapter(Session, User);


const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    }
});


export async function createAuthSession(userId) {
    const session = await lucia.createSession(userId);
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
}


export async function verifyAuthSession() {
    const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
    if (!sessionCookie?.value) {
        return {
            user: null,
            session: null
        };
    }

    const result = await lucia.validateSession(sessionCookie.value);
    try {
        if (result.session?.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            (await cookies()).set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }

        if (!result.session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            (await cookies()).set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }
    } catch (error) {
        console.error('Error setting session cookie:', error);
    }

    return result;
}

export async function destroyAuthSession() {
    const { session } = await verifyAuthSession();
    if (!session) {
        return {
            message: "No session to destroy"
        }
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
            (await cookies()).set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );

}