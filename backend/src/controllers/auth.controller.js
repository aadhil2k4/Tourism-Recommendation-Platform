import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../nodemailer/email.js";
import crypto from "crypto";
import dotenv from "dotenv";
import cloudinary from "../utils/cloudinary.js"

dotenv.config();

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
        console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
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
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();
        res.status(200).json({
            success: true, 
            message: "Loggedin successfully",
            user: {
                ...user._doc,
                password: undefined,
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
            return res.status(400).json({success: false, message: "User doesnt exist"});
        }
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1*60*60*1000;
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/resetPassword/${resetToken}`);
        res.status(200).json({
            success: true,
            message: "Reset Link sent successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
        console.log(user.email);
        console.log(`/${process.env.CLIENT_URL}/resetPassword/${resetToken}`)
    } catch (error) {
        console.log("Error in forgot Password: ", error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const resetPassword = async(req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token, 
            resetPasswordExpiresAt: {$gt: Date.now()},
        })
        if(!user){
            return res.status(400).json({success:false, message:"Invalid/Expired token"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        await sendResetSuccessEmail(user.email);
        await user.save();
        res.status(200).json({success: true, message: "Password reset successful"});
    } catch (error) {
        console.log("Error in reset Password: ", error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const logout = async(req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"});
}

export const checkAuth = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(400).json({success: false, message: "User not found"});
        }
        res.status(200).json({success: true, message: user});
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.staus(400).json({success: false, message: error.message});
    }
}

export const updateProfile = async (req, res) => {
    try{
        const { profilePic } = req.body;
        const userId = req.userId;
        console.log("UserId: ", userId);
        if(!profilePic){
            return res.status(400).json({message: "Profile pic is required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, {new:true});
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in updating user profile", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}