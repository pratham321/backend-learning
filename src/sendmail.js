const nodemailer = require("nodemailer");

async function sendEmail() {

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "prathameshwarekar21@gmail.com",
            pass: "jgkmrurjirooikxj", // Use App Password
        },
    });

    // Email options
    const mailOptions = {
        from: "prathameshwarekar21@gmail.com",
        to: "shirshivkarsarthak@gmail.com",
        subject: "Hello from Node.js 🚀",
        text: "This is my first email using Nodemailer!",
    };

    // Send email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    } catch (error) {
        console.log("Error:", error);
    }
}

sendEmail();
