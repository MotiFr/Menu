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
        await createDummyItems(username);
        await createDummyCategories(username, restaurantName);
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
        if (isValid) {
            return user;
        }
        return isValid;
    } catch (error) {
        console.error('Error storing new user:', error);
        throw error;
    }
}

const menuItems = [
    // Starters
    {
      name: "Tuna Tartare",
      price: "16.50",
      description: "Fresh tuna with avocado, sesame seeds, and wasabi aioli",
      category: "Starters",
      url: "https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&w=800&q=80",
      allergens: ["fish", "sesame"],
      order: 1,
      seen: true
    },
    {
      name: "Wild Mushroom Soup",
      price: "12.99",
      description: "Creamy blend of forest mushrooms with truffle oil",
      category: "Starters",
      url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
      allergens: ["dairy"],
      order: 2,
      seen: true
    },
    {
      name: "Grilled Octopus",
      price: "18.75",
      description: "Tender octopus with chorizo, potatoes, and paprika",
      category: "Starters",
      url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
      allergens: ["seafood"],
      order: 3,
      seen: true
    },
  
    // Main Courses
    {
      name: "Duck Breast",
      price: "32.50",
      description: "Pan-seared duck with cherry sauce and wild rice",
      category: "Main Courses",
      url: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=800&q=80",
      allergens: [],
      order: 4,
      seen: true
    },
    {
      name: "Sea Bass",
      price: "34.99",
      description: "Mediterranean sea bass with fennel and citrus",
      category: "Main Courses",
      url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      allergens: ["fish"],
      order: 5,
      seen: true
    },
    {
      name: "Wagyu Burger",
      price: "26.75",
      description: "Premium wagyu beef with truffle mayo and aged cheddar",
      category: "Main Courses",
      url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
      allergens: ["dairy", "wheat", "eggs"],
      order: 6,
      seen: true
    },
    {
      name: "Truffle Pasta",
      price: "28.50",
      description: "Fresh tagliatelle with black truffle and parmesan",
      category: "Main Courses",
      url: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=800&q=80",
      allergens: ["wheat", "dairy", "eggs"],
      order: 7,
      seen: true
    },
  
    // Desserts
    {
      name: "Tiramisu",
      price: "11.50",
      description: "Classic Italian dessert with mascarpone and coffee",
      category: "Desserts",
      url: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
      allergens: ["dairy", "eggs", "wheat"],
      order: 8,
      seen: true
    },
    {
      name: "Lemon Tart",
      price: "9.99",
      description: "Tangy lemon curd in a buttery pastry shell",
      category: "Desserts",
      url: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80",
      allergens: ["dairy", "eggs", "wheat"],
      order: 9,
      seen: true
    },
    {
      name: "Molten Chocolate Cake",
      price: "12.25",
      description: "Warm chocolate cake with vanilla ice cream",
      category: "Desserts",
      url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      allergens: ["dairy", "eggs", "wheat"],
      order: 10,
      seen: true
    },
  
    // Cocktails
    {
      name: "Smoky Old Fashioned",
      price: "14.50",
      description: "Bourbon, smoked maple syrup, bitters",
      category: "Cocktails",
      url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
      allergens: [],
      order: 11,
      seen: true
    },
    {
      name: "Passion Fruit Mojito",
      price: "13.75",
      description: "Rum, passion fruit, mint, lime, soda",
      category: "Cocktails",
      url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      allergens: [],
      order: 12,
      seen: true
    },
    {
      name: "French 75",
      price: "15.25",
      description: "Gin, champagne, lemon juice, simple syrup",
      category: "Cocktails",
      url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
      allergens: [],
      order: 13,
      seen: true
    }
  ];
async function createDummyItems(username) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        await Promise.all(menuItems.map(item =>
            db.collection(username).insertOne(item)
        ));
        console.log("Successfully inserted all dummy food items");
    } catch (error) {
        console.error("Error inserting dummy items:", error);
    }
}


const restaurantCategories = [
    {
        name: "Starters",
        description: "Light appetizers to begin your culinary journey, perfect for sharing or enjoying before the main course."
    },
    {
        name: "Main Courses",
        description: "Hearty and satisfying dishes that showcase our chef's signature cooking styles and premium ingredients."
    },
    {
        name: "Desserts",
        description: "Indulgent sweet creations to perfectly conclude your dining experience, crafted with precision and passion."
    },
    {
        name: "Cocktails",
        description: "Expertly mixed drinks featuring premium spirits, fresh ingredients, and creative flavor combinations."
    }
];

async function createDummyCategories(username, restaurantName) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        const header = `Welcome to ${restaurantName}`;
        db.collection(`${username} Data`).insertMany([
            {
                categories: restaurantCategories,
                theme: "default",
                description: "Welcome to our menu",
                header: header
            }
        ]);
        
        console.log("Successfully inserted menu categories");
    } catch (error) {
        console.error("Error inserting categories:", error);
    }
}
