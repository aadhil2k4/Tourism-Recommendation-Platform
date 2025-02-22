import { transporter, sender } from "./nodemailer.config.js"
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"

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