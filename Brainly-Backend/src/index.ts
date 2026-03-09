import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { ContentModel, UserModel, LinkModel } from "./db";
import { userMiddleware } from "./middleware";
import { JWT_PASSWORD } from "./config";
import { randomBytes } from "crypto";
mongoose.connect(process.env.MONGO_URL as string)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:5175"],
    credentials: true
}));
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {


        const user = await UserModel.create({
            username: username,
            password: password
        })

        const token = jwt.sign({
            userId: user._id
        }, JWT_PASSWORD);

        res.json({
            message: "User signed up",
            token: token
        })
    } catch (e) {
        res.status(400).json({
            message: "User already exists"
        })
    }
})
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            userId: existingUser._id
        }, JWT_PASSWORD);
        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title, tags } = req.body;

    await ContentModel.create({
        link,
        type,
        title,
        userId: (req as any).userId,
        tags: Array.isArray(tags) ? tags.map((t: string) => String(t).toLowerCase().trim()).filter(Boolean) : []
    })

    res.json({
        message: "Content added"
    })
})
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = (req as any).userId;
    const content = await ContentModel.find({ userId }).populate("userId", "username");
    res.json({
        content
    });
});
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    const userId = (req as any).userId;

    await ContentModel.deleteMany({
        _id: contentId,
        userId
    });

    res.json({
        message: "Deleted"
    });
});
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    const userId = (req as any).userId;

    if (share) {
        const existingLink = await LinkModel.findOne({ userId });

        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }

        const hash = randomBytes(10).toString("hex");
        await LinkModel.create({
            userId,
            hash
        });

        res.json({ hash });
    } else {
        await LinkModel.deleteOne({ userId });

        res.json({
            message: "Removed link"
        });
    }
});
app.get("/api/v1/brain/:sharelink", async (req, res) => {
    const hash = req.params.sharelink;

    const link = await LinkModel.findOne({ hash });

    if (!link) {
        res.status(404).json({ message: "Sorry, incorrect input" });
        return;
    }

    const content = await ContentModel.find({ userId: link.userId }).populate("userId", "username");
    const user = await UserModel.findOne({ _id: link.userId });

    if (!user) {
        res.status(404).json({ message: "User not found, this error should theoretically not happen" });
        return;
    }

    res.json({
        username: user.username,
        content: content
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
