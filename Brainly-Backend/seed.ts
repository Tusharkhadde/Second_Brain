import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { UserModel } from "./src/db";

dotenv.config();

async function seedAdmin() {
    const mongoUrl = process.env.MONGO_URL;
    const adminPassword = process.env.ADMIN_PASSWORD || "123456789";

    if (!mongoUrl) {
        console.error("MONGO_URL not found in .env");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUrl);
        console.log("Connected to MongoDB");

        const existingAdmin = await UserModel.findOne({ username: "admin" });
        if (existingAdmin) {
            existingAdmin.password = adminPassword;
            await existingAdmin.save();
            console.log("Admin password updated in MongoDB");
        } else {
            await UserModel.create({
                username: "admin",
                password: adminPassword
            });
            console.log("Admin user created in MongoDB");
        }

        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
}

seedAdmin();
