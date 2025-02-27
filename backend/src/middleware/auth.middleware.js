import jwt from "jsonwebtoken";

export const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({success:false, message: "Unauthorized - No token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(400).json({success: false, message: "Unauthorized: Invalid token"});
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in auth middleware: ", error.message);
        return res.status(500).json({success: false, message:"Internal Server Error"});
    }
}