import nodemailer from "nodemailer";

const mailSender = async (userEmail, resetLink) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_SENDER_EMAIL,
            pass: process.env.MAIL_SENDER_PASS 
        }
    });

    const mailOptions = {
        from: process.env.MAIL_SENDER_EMAIL,
        to: userEmail,
        subject: "Pronia | Reset Your Password",
        html: `
        <div style="background-color: #f8f8f8; padding: 40px 0; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <div style="padding: 30px; text-align: center; background-color: #abd373;">
                    <img src="cid:proniaLogo" alt="Pronia Logo" style="max-width: 120px; margin-bottom: 10px;">
                    <h1 style="margin: 0; color: #393939;">Password Reset Request</h1>
                </div>
                <div style="padding: 30px; color: #393939; font-size: 16px;">
                    <p>Hello,</p>
                    <p>We received a request to reset your password for your Pronia account.</p>
                    <p>If you didn't make this request, you can safely ignore this email. Otherwise, click the button below to set a new password:</p>
                    <div style="margin: 30px 0; text-align: center;">
                        <a href="${resetLink}" style="background-color: #abd373; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 5px; font-weight: bold; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <p style="word-break: break-all;"><a href="${resetLink}" style="color: #abd373;">${resetLink}</a></p>
                </div>
                <div style="padding: 20px; text-align: center; background-color: #f0f0f0; color: #999999; font-size: 14px;">
                    <p>© ${new Date().getFullYear()} Pronia</p>
                    <p>All rights reserved.</p>
                </div>
            </div>
        </div>
        `,
        attachments: [
            {
                filename: 'proniaLogo.png',
                path: './assets/images/proniaLogo.png',
                cid: 'proniaLogo'
            }
        ]
    }


    await transporter.sendMail(mailOptions, (err, data) => {
        if(err) {
            console.log(err)
        }
    });
}

export default mailSender