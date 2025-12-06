import express from "express";
import { check, validationResult } from "express-validator";

import User from "../models/User.js";

import generateToken from "../utils/generateToken.js";

const router = express.Router();

router.post(
    "/register",
    [
        check("username", "Username is required and must be 3+ characters").not().isEmpty().isLength({ min: 3 }),
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password must be 8 or more characters").isLength({ min: 8 }),
    ],

    async (req, res) => {

        const errors = validationResult(req);
        
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { username, email, password, role } = req.body;

        try {
            const userExists = await User.findOne({ $or: [{ email }, { username }] });

            if (userExists)
                return res.status(400).json({ message: "User already exists" });

            const user = await User.create({
                username,
                email,
                password,
                role: role === "manager" ? "manager" : "customer",
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id, user.role),
                });
            } else {
                res.status(400).json({ message: "Invalid user data received" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: `Server error during registration: ${error.message}` });
        }
    }
);

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select("+password");

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during login" });
    }
});

export default router;
