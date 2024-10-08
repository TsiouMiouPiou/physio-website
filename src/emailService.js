import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.HOTMAIL_USER,
    pass: process.env.HOTMAIL_PASS
  }
});

export const sendConfirmationEmail = async (recipientEmail, appointmentType, selectedDate, selectedTime) => {
  const mailOptions = {
    from: process.env.HOTMAIL_USER,
    to: recipientEmail,
    subject: 'Appointment Confirmation',
    text: `You have a ${appointmentType} on ${selectedDate} at ${selectedTime}.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    console.log('Email sent to: ' + recipientEmail);
    return info;
  } 
  catch (error) {
    console.error('Error sending email:', error); // Log the error for debugging
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

