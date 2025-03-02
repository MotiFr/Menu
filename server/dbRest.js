"use server";
import { MongoClient, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";



const uri = process.env.NEXT_ATLAS_URI;

let client = null;
let isConnected = false;
let restname = null;
let restCookie = null;
let connectionTimer = null;
const IDLE_TIMEOUT = 60000;

export async function getMongoClient() {
    if (!client) {
        client = new MongoClient(uri, {
            maxPoolSize: 50,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 60000,
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

    if (connectionTimer) {
        clearTimeout(connectionTimer);
    }

    connectionTimer = setTimeout(async () => {
        if (client && isConnected) {
            try {
                await client.close();
                isConnected = false;
                client = null;
                connectionTimer = null;
            } catch (error) {
                console.error('Error closing idle connection:', error);
            }
        }
    }, IDLE_TIMEOUT);

    return client;
}


export async function translateText(text, sourceLang, targetLang) {
    if (!text) return '';

    const from = sourceLang === 'eng' ? 'en' : 'iw';
    const to = targetLang === 'eng' ? 'en' : 'iw';

    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data[0]) {
            return data[0]
                .map(segment => segment[0])
                .filter(Boolean)
                .join(' ');
        }

        throw new Error('No translation data received');
    } catch (error) {
        console.error('Translation error:', {
            message: error.message,
            status: error?.status,
            data: error?.data
        });

        return text;
    }
}




export async function storeNewItem(name, price, category, description, url, allergens, isRTL) {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");

        let name_eng, name_heb, description_eng, description_heb;

        if (isRTL) {
            name_heb = name;
            description_heb = description;
            name_eng = await translateText(name, 'heb', 'eng');
            description_eng = await translateText(description, 'heb', 'eng');
        } else {
            name_eng = name;
            description_eng = description;
            name_heb = await translateText(name, 'eng', 'heb');
            description_heb = await translateText(description, 'eng', 'heb');
        }

        const translatedAllergens = await Promise.all(
            allergens.map(async (allergen) => {
                if (typeof allergen === 'string') {
                    if (isRTL) {
                        const engText = await translateText(allergen, 'heb', 'eng');
                        return { eng: engText, heb: allergen };
                    } else {
                        const hebText = await translateText(allergen, 'eng', 'heb');
                        return { eng: allergen, heb: hebText };
                    }
                } else if (typeof allergen === 'object') {
                    return allergen;
                }
            })
        );

        const lastItem = await db.collection(restname)
            .find()
            .sort({ order: -1 })
            .limit(1)
            .toArray();

        const newOrder = lastItem.length > 0 ? lastItem[0].order + 1 : 1;

        const res = await db.collection(restname).insertOne({
            name_eng,
            name_heb,
            description_eng,
            description_heb,
            price,
            category,
            url,
            allergens: translatedAllergens,
            order: newOrder,
            seen: true
        });

        revalidatePath(`/menu/${restname}`);
        revalidatePath(`/menu/${restname}/selections`);
        return res;
    } catch (error) {
        console.error('Error storing new item:', error);
        throw error;
    }
}



export async function getRestaurant() {
    const sessionCookie = (await cookies()).get("auth_session");
    if (restCookie !== sessionCookie) {
        restname = null;
    }
    if (!restname) {
        const client = await getMongoClient();
        const db = client.db("data");
        const session = await db.collection("sessions").findOne(
            { _id: sessionCookie.value }
        )
        const user = await db.collection("users").findOne(
            { _id: session.user_id }
        )
        restname = user.username;
        restCookie = sessionCookie;
    }

    return restname;
}

export async function getRestDetails() {
    try {
        const restname = await getRestaurant();
        
        return restname;

    } catch {

    }
}

export async function getRestStatics() {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");

        const { views, categories } = await db.collection(`${restname} Data`).findOne();
        const itemCount = await db.collection(`${restname}`).countDocuments();
        const catCount = categories.length
        return {restname, catCount, itemCount, views};

    } catch {

    }
}




export async function View(_id, seen) {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");
        const res = await db.collection(restname).updateOne(
            { _id: new ObjectId(_id) },
            {
                $set: {
                    seen: !seen
                }
            }
        );
        revalidatePath(`/menu/${restname}`)
        revalidatePath(`/menu/${restname}/selections`)
        return res
    } catch (error) {
        console.error('Error storing new item:', error);
        throw error;
    }
}

export async function getCategories() {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");
        const result = await db.collection(`${restname} Data`).findOne({ categories: { $exists: true } }, { projection: { categories: 1, _id: 0 } });
        return result;
    } catch (error) {
        console.error('Error getting categories:', error);
        throw error;
    }
}

export async function getItems() {

    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");
        const items = await db.collection(restname).find({}).sort({ order: 1 }).toArray();
        return items;
    } catch (error) {
        console.error('Error getting items:', error);
        throw error;
    }
}

export async function getItemsThemeText() {

    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");
        const items = await db.collection(restname).find({}).sort({ order: 1 }).toArray();
        const object = await db.collection(`${restname} Data`)
            .findOne(
                { theme: { $exists: true } },
            );
        const footer = await db.collection(`${restname} Data`)
            .findOne(
                { footerText: { $exists: true } },
            ) || [];
        const theme = object.theme
        const header = object.header
        const description = object.description

        return { theme, items, header, description, footer };
    } catch (error) {
        console.error('Error getting items:', error);
        throw error;
    }
}


export async function newCategory(category, isRTL) {

    let name_eng, name_heb, description_eng, description_heb;

    if (isRTL) {
        name_heb = category.name;
        description_heb = category.description;
        name_eng = await translateText(category.name, 'heb', 'eng');
        description_eng = await translateText(category.description, 'heb', 'eng');
    } else {
        name_eng = category.name;
        description_eng = category.description;
        name_heb = await translateText(category.name, 'eng', 'heb');
        description_heb = await translateText(category.description, 'eng', 'heb');
    }

    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");
        const res = await db.collection(`${restname} Data`).updateOne(
            {},
            {
                $push: {
                    categories: {
                        name: name_eng,
                        name_eng,
                        name_heb,
                        description_eng,
                        description_heb,
                    }
                }
            },
            { upsert: true }
        );
        revalidatePath(`/menu/${restname}`)
        revalidatePath(`/menu/${restname}/selections`)
        return res;
    } catch (error) {
        console.error('Error storing new item:', error);
        throw error;
    }
}


export async function deleteCategory(category) {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const CATEGORIES = await getCategories(restname);
        const updatedCATEGORIES = CATEGORIES.categories.filter(c => c.name !== category.name);
        const db = client.db("restaurant");
        await db.collection(`${restname} Data`).updateOne({
            categories: { $exists: true }
        }, {
            $set: { categories: updatedCATEGORIES }
        });
        await db.collection(`${restname}`).deleteMany({ category: category.name });
        revalidatePath(`/menu/${restname}`)
        revalidatePath(`/menu/${restname}/selections`)
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}

export async function categoryElevate(category) {
    const swapCategories = (arr, index1, index2) => {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    }

    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const result = await getCategories(restname);
        const categories = result.categories;

        const index = categories.findIndex(c => c.name === category.name);
        if (index <= 0) {
            return;
        }

        swapCategories(categories, index, index - 1);

        const db = client.db("restaurant");
        await db.collection(`${restname} Data`).updateOne(
            { categories: { $exists: true } },
            { $set: { categories: categories } }
        );
        revalidatePath(`/menu/${restname}`)
        revalidatePath(`/menu/${restname}/selections`)
    } catch (error) {
        console.error('Error elevating category:', error);
        throw error;
    }
}

export async function categoryLower(category) {
    const swapCategories = (arr, index1, index2) => {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    }

    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const result = await getCategories(restname);
        const categories = result.categories;

        const index = categories.findIndex(c => c.name === category.name);
        if (index >= categories.length - 1) {
            return;
        }

        swapCategories(categories, index, index + 1);

        const db = client.db("restaurant");
        await db.collection(`${restname} Data`).updateOne(
            { categories: { $exists: true } },
            { $set: { categories: categories } }
        );
        revalidatePath(`/menu/${restname}`)
        revalidatePath(`/menu/${restname}/selections`)

    } catch (error) {
        console.error('Error elevating category:', error);
        throw error;
    }
}


export async function deleteOneItem(id) {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");
        const res = await db.collection(restname).deleteOne({ _id: new ObjectId(id) });
        revalidatePath(`/menu/${restname}`)
        revalidatePath(`/menu/${restname}/selections`)

        return res;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}


export async function updateCategory(changedCategory, categoryName, isRTL) {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");

        if (isRTL) {
            await db.collection(`${restname} Data`).updateOne(
                { "categories.name": categoryName },
                {
                    $set: {
                        "categories.$[elem].name_heb": changedCategory.name,
                        "categories.$[elem].description_heb": changedCategory.description,
                    }
                },
                {
                    arrayFilters: [{ "elem.name": categoryName }]
                }
            );
        } else {
            await db.collection(`${restname} Data`).updateOne(
                { "categories.name": categoryName },
                {
                    $set: {
                        "categories.$[elem].name_eng": changedCategory.name,
                        "categories.$[elem].description_eng": changedCategory.description,
                    }
                },
                {
                    arrayFilters: [{ "elem.name": categoryName }]
                }
            );
        }

        revalidatePath(`/menu/${restname}`)
        revalidatePath(`/menu/${restname}/selections`)



    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
}


export async function updateItem(id, name, price, description, url, allergens, category, isRTL) {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");
        if (isRTL) {
            await db.collection(restname).updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        name_heb: name,
                        price,
                        description_heb: description,
                        url,
                        allergens,
                        category,
                    }
                }
            );
        } else {
            await db.collection(restname).updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        name_eng: name,
                        price,
                        description_eng: description,
                        url,
                        allergens,
                        category,
                    }
                }
            );
        }
        revalidatePath(`/menu/${restname}`)
        revalidatePath(`/menu/${restname}/selections`)


    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
}


export async function handleUp(item, items) {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");

        const currentIndex = items.findIndex(i => i._id === item._id);
        const targetItem = items[currentIndex - 1];

        await db.collection(restname).updateOne(
            { _id: new ObjectId(item._id) },
            { $set: { order: targetItem.order } }
        );
        await db.collection(restname).updateOne(
            { _id: new ObjectId(targetItem._id) },
            { $set: { order: item.order } }
        );
        revalidatePath(`/menu/${restname}`)
        revalidatePath(`/menu/${restname}/selections`)

    } catch (error) {
        console.error('Error reordering item:', error);
        throw error;
    }
}

export async function handleDown(item, items) {
    try {
        const restname = await getRestaurant();
        const client = await getMongoClient();
        const db = client.db("restaurant");

        const currentIndex = items.findIndex(i => i._id === item._id);
        const targetItem = items[currentIndex + 1];

        await db.collection(restname).updateOne(
            { _id: new ObjectId(item._id) },
            { $set: { order: targetItem.order } }
        );
        await db.collection(restname).updateOne(
            { _id: new ObjectId(targetItem._id) },
            { $set: { order: item.order } }
        );
        revalidatePath(`/menu/${restname}`)
        revalidatePath(`/menu/${restname}/selections`)

    } catch (error) {
        console.error('Error reordering item:', error);
        throw error;
    }
}


export async function closeConnection() {
    try {
        if (isConnected && client) {
            await client.close();
            isConnected = false;
            client = null;
        }
    } catch (error) {
        console.error('Error closing connection:', error);
        throw error;
    }
}

