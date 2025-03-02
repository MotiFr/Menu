"use server";
import { getMongoClient, getRestaurant } from "./dbRest";
import { revalidatePath } from "next/cache";


export async function changeMenu(theme, header, description) {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");

        await db.collection(`${restname} Data`).updateOne(
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
        revalidatePath(`/menu/${restname}/selections`)

    } catch (error) {
        console.error('Error storing new item:', error);
        throw error;
    }
}


export async function updateViewCount(restname) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        await db.collection(`${restname} Data`).updateOne(
            { },
            { $inc: { views: 1 } }
        );

        return true;
    } catch (error) {
        console.error('Error updating view count:', error);
        throw error;
    }
}


export async function changeFooter(footerText, socialLinks) {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");

        await db.collection(`${restname} Data`).updateOne(
            {},
            {
                $set: {
                    footerText,
                    socialLinks,
                }
            }
        );

        revalidatePath(`/menu/${restname}`)
        revalidatePath(`/menu/${restname}/selections`)

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
        const footerText = details.footerText
        const socialLinks = details.socialLinks

        return { items, categories, theme, header, description, footerText, socialLinks };
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