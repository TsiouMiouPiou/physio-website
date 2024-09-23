import express from 'express';
import mysql from "mysql";
import cors from 'cors';
import bodyParser from 'body-parser';
import { sendConfirmationEmail } from './emailService.js';

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON bodies


// Get all appointments
app.get("/appointments", (req, res) => {
  const q = "SELECT * FROM appointments";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Save appointments
app.post("/appointments", (req, res) => {
  const { client_id, appointment_type, appointment_date, appointment_time, status } = req.body;

  // Validate the required fields
  if (!client_id || !appointment_type || !appointment_date || !appointment_time) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const q = "INSERT INTO appointments (`client_id`, `appointment_type`, `appointment_date`, `appointment_time`, `status`) VALUES (?)";
  const values = [client_id, appointment_type, appointment_date, appointment_time, status];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ success: false, message: 'Failed to create appointment', error: err });
    }
    return res.json({ success: true, message: "Appointment has been created successfully" });
  });
});

// Get all clients
app.get("/clients", (req, res) => {
  const q = "SELECT * FROM clients";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Save clients
app.post("/clients", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const q = "INSERT INTO clients (`name`, `email`, `phone`) VALUES (?)";
  const values = [name, email, phone];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to create client', error: err });

    // Return the clientId (insertId from MySQL)
    return res.json({ success: true, message: "Client has been created successfully", clientId: data.insertId });
  });
});


// Email Confirmation
app.post('/send-confirmation-email', async (req, res) => {
  const { email, appointmentType, selectedDate, selectedTime } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  try {
    const info = await sendConfirmationEmail(email, appointmentType, selectedDate, selectedTime);
    res.json({ success: true, info });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// START THE SERVER
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

          