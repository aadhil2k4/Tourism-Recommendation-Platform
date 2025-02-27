export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
        <div style="display: flex; align-items: center;">
            <img src="logo.svg" alt="Travelmate Logo" style="height: 40px; margin-right: 10px;">
            <h2 style="margin: 0; color: #000000;">Travelmate</h2>
        </div>
        <hr>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h2 style="color: #4A148C; text-align: center;">Verify Your Email</h2>
            <p>Hello,</p>
            <p>Thank you for signing up with Travelmate! Your verification code is:</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4A148C;">{verificationCode}</span>
            </div>
            <p>Enter this code on the verification page to complete your registration.</p>
            <p>This code will expire in 15 minutes for security reasons.</p>
            <p>If you didn't create an account with us, please ignore this email.</p>
            <p>Best regards,<br><br>Travelmate Team</p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
    </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
        <div style="display: flex; align-items: center;">
            <img src="logo.svg" alt="Travelmate Logo" style="height: 40px; margin-right: 10px;">
            <h2 style="margin: 0; color: #000000;">Travelmate</h2>
        </div>
        <hr>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h2 style="color: #4A148C; text-align: center;">Password Reset Successful</h2>
            <p>Hello,</p>
            <p>We're writing to confirm that your password has been successfully reset.</p>
            <div style="text-align: center; margin: 30px 0;">
              <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
                ✓
              </div>
            </div>
            <p>If you did not initiate this password reset, please contact our support team immediately.</p>
            <p>For security reasons, we recommend that you:</p>
            <ul>
              <li>Use a strong, unique password</li>
              <li>Enable two-factor authentication if available</li>
              <li>Avoid using the same password across multiple sites</li>
            </ul>
            <p>Thank you for helping us keep your account secure.</p>
            <p>Best regards,<br><br>Travelmate Team</p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
    </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
        <div style="display: flex; align-items: center;">
            <img src="logo.svg" alt="Your App Logo" style="height: 40px; margin-right: 10px;">
            <h2 style="margin: 0; color: #000000;">Travelmate</h2>
        </div>
        <hr>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h2 style="color: #4A148C; text-align: center;">Reset Your Password</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
            <p>To reset your password, click the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="{resetURL}" style="background-color: #4A148C; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
            </div>
            <p>This link will expire in 1 hour for security reasons.</p>
            <p>Best regards,<br><br>Travelmate Team</p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
            <p>This is an automated message, please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>

`;
