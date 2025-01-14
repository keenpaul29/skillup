# Skillup

## Overview

This website is a user-friendly platform designed to provide users with a seamless experience for signing up and accessing various features. It includes a registration system, user authentication, and a dashboard for managing user data.

## Features

- **User Registration**: New users can sign up using their email and password.
- **User Authentication**: Secure login for registered users.
- **Responsive Design**: The website is designed to be responsive and accessible on various devices.
- **Error Handling**: User-friendly error messages for failed login or signup attempts.
- **Tailwind CSS**: Utilizes Tailwind CSS for modern and customizable styling.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (or any other database used)

## Installation

To run the website locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the backend directory and add the necessary environment variables.

5. Start the development servers:
   - For the backend:
     ```bash
     npm run dev
     ```
   - For the frontend:
     ```bash
     npm --prefix frontend run dev
     ```

6. Open your browser and navigate to `http://localhost:5173` to view the website.

## Usage

- **Sign Up**: Navigate to the signup page to create a new account.
- **Login**: Use your credentials to log in and access your dashboard.
- **Dashboard**: Manage your account and view your data.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
