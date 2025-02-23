import { transporter, sender } from "./nodemailer.config.js"
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const mail = {
            from: sender,
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        }
        const response = await transporter.sendMail(mail);
        console.log("Email sent successfully", response);
    } catch (error) {
        console.log("Error sending Verification Email: ", error);
        throw new Error(`Error sending Verification Email: ${error}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const mail = {
            from: sender,
            to: email, 
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        }
        const response = await transporter.sendMail(mail);
        console.log("Password reset mail sent successfully: ", response);
        //res.status(200).json({success: true, message:"Password reset link sent to the email"});
    } catch (error) {
        console.log("Error in forgot password: ", error);
        throw new Error(`Error sending password reset Email: ${error}`)
    }
}

export const sendResetSuccessEmail = async (email) => {
    try {
        const mail = {
            from: sender,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        }
        const response = await transporter.sendMail(mail);
        console.log("Password reset success mail sent successfully", response);
    } catch (error) {
        console.log("Error in reset password: ", error);
        throw new Error(`Error sending password reset success Email: ${error}`)
    }
}