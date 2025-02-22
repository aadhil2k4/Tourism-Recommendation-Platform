import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../nodemailer/email.js";
import crypto from "crypto";

export const signup = async (req, res) => {
    const {email, name,password} = req.body;
    try {
        if(!name || !email || !password){
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationToken();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24*60*60*1000
        })
        await user.save();

        generateTokenAndSetCookie(res, user._id);
        sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        res.status(400).json({success:false, message: error.message});
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()},
        })
        if(!user){
            return res.status(400).json({success: false, message: "Invalid or expired verification code"});
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            res.status(400).json({success: false, message: "Invalid credentials"});
        }
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();
        res.status(200).json({
            success: true, 
            message: "Loggedin successfully",
            user: {
                ...user._doc,
                passwod: undefined,
            }
        })
    } catch (error) {
        console.log("Error in login: ", error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const forgotPassword = async(req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({success: false, message: "User doesnt exist"});
        }

    } catch (error) {
        
    }
}

export const logout = async(req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"});
}