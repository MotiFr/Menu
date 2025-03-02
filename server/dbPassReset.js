import crypto from 'crypto';
import { getMongoClient } from "./dbRest";
import { hashPassword } from "@/components/DB/Hash";



export async function getUserByEmail(email) {
    const client = await getMongoClient();
    const db = client.db("data");
    return db.collection('users').findOne({ email });
}

export async function createResetToken(userId) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 1);

    const client = await getMongoClient();
    const db = client.db("data");

    await db.collection('users').updateOne(
        { _id: userId },
        {
            $set: {
                resetPasswordToken: resetTokenHash,
                resetPasswordExpires: tokenExpiry,
            },
        }
    );

    return resetToken;
}

export async function verifyResetToken(token) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const client = await getMongoClient();
    const db = client.db("data");

    return db.collection('users').findOne({
        resetPasswordToken: tokenHash,
        resetPasswordExpires: { $gt: new Date() },
    });
}


export async function updatePassword(userId, password) {
    const hashedPassword = await hashPassword(password);

    const client = await getMongoClient();
    const db = client.db("data");

    return db.collection('users').updateOne(
        { _id: userId },
        {
            $set: { password: hashedPassword },
            $unset: { resetPasswordToken: "", resetPasswordExpires: "" },
        }
    );
}