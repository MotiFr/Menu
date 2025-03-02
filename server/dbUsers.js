"use server";
import { hashPassword, verifyPassword } from "@/components/DB/Hash";
import { createAuthSession } from "@/lib/auth";
import { getMongoClient } from "./dbRest";
import { Resend } from "resend";
import EmailContent from "@/components/Mail/EmailContent";


const resend = new Resend(process.env.RESEND_API_KEY)

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
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: email,
            subject: 'MenuCraft',
            react: <EmailContent />,
        });
        return response;
    } catch (error) {
        console.error('Error storing new user:', error);
        console.log('Error storing new user:', error)
        throw error;
    }
}


export async function signIn(usernameOrEmail, password) {
    try {
        const client = await getMongoClient();
        const db = client.db("data");
        
        const user = await db.collection("users").findOne(
            {
                $or: [
                    { username: usernameOrEmail },
                    { email: usernameOrEmail }
                ]
            }
        );
        
        if (!user) {
            return null;
        }
        
        const isValid = await verifyPassword(password, user.password);
        
        if (isValid) {
            await createAuthSession(user._id);
            return user;
        }
        
        return false;
    } catch (error) {
        console.error('Error during sign in:', error);
        throw error;
    }
}

async function createDummyItems(username) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        await Promise.all(menuItems.map(item =>
            db.collection(username).insertOne(item)
        ));
    } catch (error) {
        console.error("Error inserting dummy items:", error);
    }
}


async function createDummyCategories(username) {
    try {
        const client = await getMongoClient();
        const db = client.db("restaurant");
        db.collection(`${username} Data`).insertMany([
            {
                categories: restaurantCategories,
                theme: "default",
                description: {
                    eng: "Our menu is here for you",
                    heb: "התפריט שלנו מוצג כאן בשבילכם"
                },
                header: {
                    eng: "Welcome To Our Restaurant",
                    heb: "שלום וברוכים הבאים"
                }
            }
        ]);

    } catch (error) {
        console.error("Error inserting categories:", error);
    }
}


const restaurantCategories = [
    {
        name: "Starters",
        name_eng: "Starters",
        name_heb: "ראשונות",
        description_eng: "Light appetizers to begin your culinary journey, perfect for sharing or enjoying before the main course.",
        description_heb: "מנות פתיחה קלות לתחילת המסע הקולינרי שלכם, מושלמות לשיתוף או להנאה לפני המנה העיקרית."
    },
    {
        name: "Main Courses",
        name_eng: "Main Courses",
        name_heb: "מנות עיקריות",
        description_eng: "Hearty and satisfying dishes that showcase our chef's signature cooking styles and premium ingredients.",
        description_heb: "מנות מזינות ומספקות המציגות את סגנונות הבישול הייחודיים של השף שלנו ומרכיבים איכותיים."
    },
    {
        name: "Desserts",
        name_eng: "Desserts",
        name_heb: "קינוחים",
        description_eng: "Indulgent sweet creations to perfectly conclude your dining experience, crafted with precision and passion.",
        description_heb: "יצירות מתוקות מפנקות לסיום מושלם של חווית הארוחה שלכם, מעוצבות בדייקנות ותשוקה."
    },
    {
        name: "Cocktails",
        name_eng: "Cocktails",
        name_heb: "קוקטיילים",
        description_eng: "Expertly mixed drinks featuring premium spirits, fresh ingredients, and creative flavor combinations.",
        description_heb: "משקאות מעורבבים במומחיות המציגים אלכוהול איכותי, רכיבים טריים ושילובי טעמים יצירתיים."
    }
];

const menuItems = [
    // Starters
    {
        name_eng: "Tuna Tartare",
        name_heb: "טרטר טונה",
        description_eng: "Fresh tuna with avocado, sesame seeds, and wasabi aioli",
        description_heb: "טונה טרייה עם אבוקדו, שומשום ואיולי וואסבי",
        price: "16.50",
        category: "Starters",
        url: "https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&w=800&q=80",
        allergens: [
            { eng: "fish", heb: "דגים" },
            { eng: "sesame", heb: "שומשום" }
        ],
        order: 1,
        seen: true
    },
    {
        name_eng: "Wild Mushroom Soup",
        name_heb: "מרק פטריות בר",
        description_eng: "Creamy blend of forest mushrooms with truffle oil",
        description_heb: "תערובת קרמית של פטריות יער עם שמן כמהין",
        price: "12.99",
        category: "Starters",
        url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
        allergens: [],
        order: 2,
        seen: true
    },
    {
        name_eng: "Grilled Octopus",
        name_heb: "תמנון בגריל",
        description_eng: "Tender octopus with chorizo, potatoes, and paprika",
        description_heb: "תמנון רך עם צ'וריסו, תפוחי אדמה ופפריקה",
        price: "18.75",
        category: "Starters",
        url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        allergens: [
            { eng: "fish", heb: "דגים" },
        ],
        order: 3,
        seen: true
    },

    // Main Courses
    {
        name_eng: "Duck Breast",
        name_heb: "חזה ברווז",
        description_eng: "Pan-seared duck with cherry sauce and wild rice",
        description_heb: "חזה ברווז צרוב עם רוטב דובדבנים ואורז בר",
        price: "32.50",
        category: "Main Courses",
        url: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=800&q=80",
        allergens: [],
        order: 4,
        seen: true
    },
    {
        name_eng: "Sea Bass",
        name_heb: "לברק",
        description_eng: "Mediterranean sea bass with fennel and citrus",
        description_heb: "לברק ים תיכוני עם שומר והדרים",
        price: "34.99",
        category: "Main Courses",
        url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
        allergens: [],
        order: 5,
        seen: true
    },
    {
        name_eng: "Wagyu Burger",
        name_heb: "המבורגר וואגיו",
        description_eng: "Premium wagyu beef with truffle mayo and aged cheddar",
        description_heb: "בשר וואגיו משובח עם מיונז כמהין וצ'דר מיושן",
        price: "26.75",
        category: "Main Courses",
        url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
        allergens: [],
        order: 6,
        seen: true
    },

    // Desserts
    {
        name_eng: "Tiramisu",
        name_heb: "טירמיסו",
        description_eng: "Classic Italian dessert with mascarpone and coffee",
        description_heb: "קינוח איטלקי קלאסי עם מסקרפונה וקפה",
        price: "11.50",
        category: "Desserts",
        url: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
        allergens: [],
        order: 8,
        seen: true
    },

    // Cocktails
    {
        name_eng: "Smoky Old Fashioned",
        name_heb: "אולד פאשנד מעושן",
        description_eng: "Bourbon, smoked maple syrup, bitters",
        description_heb: "בורבון, סירופ מייפל מעושן, ביטרס",
        price: "14.50",
        category: "Cocktails",
        url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
        allergens: [],
        order: 11,
        seen: true
    }
];

