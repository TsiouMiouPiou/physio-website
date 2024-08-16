# My Physio App

My Physio App is a full-stack application that allows users to book physiotherapy appointments online. It features a React-based front-end and an Express.js server as the back-end, with MySQL as the database to store client and appointment details. The project also includes an email confirmation feature using Nodemailer, supporting both Gmail and Hotmail email services.

# Features
- Appointment Booking: Users can select a date and time for their physiotherapy appointment.
- Email Confirmation: Upon booking, users receive a confirmation email with their appointment details.
- Database Integration: All bookings and client details are stored in a MySQL database.

# Prerequisites
Before you begin, ensure you have the following installed on your local machine:

- VS Code
- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL Server
- MySQL Workbench (for easier database management)

# Getting Started

1. **Clone the Repository**

```bash 
git clone https://github.com/TsiouMiouPiou/physio-website.git 
cd my-physio-app 
```

2. **Install Dependencies**
Install the required dependencies using npm:
```bash
npm install
```

3. **Open and edit the .env file to include your specific environment variables.**

-Hotmail credentials are working perfectly as gmail needs 2 step verification and is not working at this current project.
-The receiver can be either hotmail or gmail user.
-The sender must be a hotmail user. 
 EXAMPLE:
 ```bash
HOTMAIL_USER=yourhotmail@example.com
HOTMAIL_PASS=your-hotmail-password

DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-passwordDB_NAME=your-database-name
```

4. **Setup the MySQL Database**
- Using MySQL Workbench
- Open MySQL Workbench and connect to your MySQL server.
- Create a new schema (database) named physio_app:
- Click on the "Create a new schema in the connected server" icon (under Query tab).
- Name the schema physio_app.
- Open the physio_app.sql file from your VS CODE.
- Copy the SQL script from physio_app.sql file.
- Paste & Run the SQL script to create the necessary tables:
- Execute the script by pressing the "lightning bolt" icon to create the tables.

5. **Run the Application**
- Start the server using npm:
```bash 
npm start 
```
6. **Access the Frontend**
- Run the frontend using:
```bash 
npm run dev 
```

7. **Booking an Appointment**
- Choose an appointment type, date, and time.
- Enter your name, email, and phone number.
- Click on the "Confirm" button to book the appointment.
- You will receive an email confirmation shortly.

# Troubleshooting
- Common Errors
- Database Connection Issues: Ensure your MySQL server is running and the credentials in your .env file are correct.
- Email Sending Errors: Verify that you've set up the correct email credentials and enabled "Less secure app access" in your Gmail account or generated an app-specific password.

# License
- This project is licensed under the MIT License.

- This README file provides a comprehensive guide to setting up and using the My Physio App project, making it easier for other developers or users to understand and work with your code.