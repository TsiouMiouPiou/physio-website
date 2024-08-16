import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const hotmailTransporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.HOTMAIL_USER,
    pass: process.env.HOTMAIL_PASS
  }
});

const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

export const sendConfirmationEmail = async (recipientEmail, appointmentType, selectedDate, selectedTime, useGmail = false) => {
  const transporter = useGmail ? gmailTransporter : hotmailTransporter;

  const mailOptions = {
    from: useGmail ? process.env.GMAIL_USER : process.env.HOTMAIL_USER,
    to: recipientEmail,
    subject: 'Appointment Confirmation',
    text: `You have a ${appointmentType}  on ${selectedDate} at ${selectedTime}.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } 
  catch (error) {
    console.error('Error sending email:', error); // Log the error for debugging
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
