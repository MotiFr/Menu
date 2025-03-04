import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";

async function connectToMongoDB() {
    const uri = process.env.NEXT_ATLAS_URI;
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 10000, 
        retryWrites: true,
        retryReads: true
    });

    try {
        await client.connect();
        return client;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

let globalClient = null;

export async function getMongoClient() {
    if (!globalClient) {
        globalClient = await connectToMongoDB();
    }
    return globalClient;
}

export async function initializeLuciaAuth() {
    try {
        const client = await getMongoClient();
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
            },
            getUserAttributes: (databaseUserAttributes) => {
                return {
                    username: databaseUserAttributes.username
                };
            }
        });

        return lucia;
    } catch (error) {
        console.error("Error initializing Lucia authentication:", error);
        throw error;
    }
}

export async function createAuthSession(userId) {
    try {
        const lucia = await initializeLuciaAuth();
        const session = await lucia.createSession(userId);
        const sessionCookie = lucia.createSessionCookie(session.id);
        
        (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
    } catch (error) {
        console.error("Failed to create auth session:", error);
        throw error;
    }
}

export async function verifyAuthSession() {
    try {
        const lucia = await initializeLuciaAuth();
        const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
        
        if (!sessionCookie?.value) {
            return {
                user: null,
                session: null
            };
        }

        const result = await lucia.validateSession(sessionCookie.value);
        
        if (result.session?.fresh) {
            const freshSessionCookie = lucia.createSessionCookie(result.session.id);
            (await cookies()).set(
                freshSessionCookie.name,
                freshSessionCookie.value,
                freshSessionCookie.attributes
            );
        }

        if (!result.session) {
            const blankSessionCookie = lucia.createBlankSessionCookie();
            (await cookies()).set(
                blankSessionCookie.name,
                blankSessionCookie.value,
                blankSessionCookie.attributes
            );
        }

        return result;
    } catch (error) {
        console.error('Error verifying auth session:', error);
        return {
            user: null,
            session: null,
            error: error.message
        };
    }
}

export async function destroyAuthSession() {
    try {
        const lucia = await initializeLuciaAuth();
        const { session } = await verifyAuthSession();
        
        if (!session) {
            return {
                message: "No session to destroy"
            };
        }

        await lucia.invalidateSession(session.id);

        const blankSessionCookie = lucia.createBlankSessionCookie();
        (await cookies()).set(
            blankSessionCookie.name,
            blankSessionCookie.value,
            blankSessionCookie.attributes
        );
    } catch (error) {
        console.error("Error destroying auth session:", error);
        throw error;
    }
}