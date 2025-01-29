// dbRest.js
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.NEXT_ATLAS_URI;

// Make client a module-level variable that's properly exported
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

export async function storeNewItem(restname, name, price, category, description, url, allergens) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");

        const lastItem = await db.collection(restname)
            .find()
            .sort({ order: -1 })
            .limit(1)
            .toArray();

        const newOrder = lastItem.length > 0 ? lastItem[0].order + 1 : 1;

        return await db.collection(restname).insertOne({
            name,
            price,
            description,
            category,
            url,
            allergens,
            order: newOrder,
            seen: true
        });
    } catch (error) {
        console.error('Error storing new item:', error);
        throw error;
    }
}

export async function View(restname, _id, seen) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        return await db.collection(restname).updateOne(
            { _id: new ObjectId(_id) },
            {
                $set: {
                    seen: !seen
                }
            }
        );
    } catch (error) {
        console.error('Error storing new item:', error);
        throw error;
    }
}

export async function getCategories(restname) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        const result = await db.collection(`${restname} Data`).findOne({ categories: { $exists: true } }, { projection: { categories: 1, _id: 0 } });
        return result;
    } catch (error) {
        console.error('Error getting categories:', error);
        throw error;
    }
}

export async function getItems(restname) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        const items = await db.collection(restname).find({}).sort({ order: 1 }).toArray();
        return items;
    } catch (error) {
        console.error('Error getting items:', error);
        throw error;
    }
}


export async function newCategory(restname, category) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        return await db.collection(`${restname} Data`).updateOne(
            {},
            {
                $push: { categories: category }
            },
            { upsert: true }
        );
    } catch (error) {
        console.error('Error storing new item:', error);
        throw error;
    }
}


export async function deleteCategory(restname, category) {
    try {
        const client = await getMongoClient();
        const CATEGORIES = await getCategories(restname);
        const updatedCATEGORIES = CATEGORIES.categories.filter(c => c.name !== category.name);
        const db = client.db("restaurant");
        await db.collection(`${restname} Data`).updateOne({
            categories: { $exists: true }
        }, {
            $set: { categories: updatedCATEGORIES }
        });
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}

export async function categoryElevate(restname, category) {
    const swapCategories = (arr, index1, index2) => {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    }

    try {
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
            } catch (error) {
        console.error('Error elevating category:', error);
        throw error;
    }
}

export async function categoryLower(restname, category) {
    const swapCategories = (arr, index1, index2) => {
        [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    }

    try {
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
        
    } catch (error) {
        console.error('Error elevating category:', error);
        throw error;
    }
}


export async function deleteOneItem(restname, id) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        return await db.collection(restname).deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}


export async function updateCategory(restname, changedCategory, category) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        await db.collection(`${restname} Data`).updateOne(
            { "categories.name": category.name },
            {
                $set: {
                    "categories.$[elem].name": changedCategory.name,
                    "categories.$[elem].description": changedCategory.description,
                }
            },
            {
                arrayFilters: [{ "elem.name": category.name }]
            }
        );

        await db.collection(restname).updateMany(
            { category: category.name },
            { $set: { category: changedCategory.name } }
        )



    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
}


export async function updateItem(restname, id, name, price, description, url, allergens, category) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        await db.collection(restname).updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name,
                    price,
                    description,
                    url,
                    allergens,
                    category,
                }
            }
        );


    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
}


export async function handleUp(restname, item, items) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");

        // Find the item to swap with
        const currentIndex = items.findIndex(i => i._id === item._id);
        const targetItem = items[currentIndex - 1];

        // Swap order values
        await db.collection(restname).updateOne(
            { _id: new ObjectId(item._id) },
            { $set: { order: targetItem.order } }
        );
        await db.collection(restname).updateOne(
            { _id: new ObjectId(targetItem._id) },
            { $set: { order: item.order } }
        );
    } catch (error) {
        console.error('Error reordering item:', error);
        throw error;
    }
}

export async function handleDown(restname, item, items) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");

        // Find the item to swap with
        const currentIndex = items.findIndex(i => i._id === item._id);
        const targetItem = items[currentIndex + 1];

        // Swap order values
        await db.collection(restname).updateOne(
            { _id: new ObjectId(item._id) },
            { $set: { order: targetItem.order } }
        );
        await db.collection(restname).updateOne(
            { _id: new ObjectId(targetItem._id) },
            { $set: { order: item.order } }
        );
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

