# Course Management System

A full-stack Course Management System built using the MERN stack (React, Node.js, Express.js, and MySQL). The application allows administrators to manage courses and videos while enabling students to enroll in courses and access learning content.

## 🔗 Live Demo: https://course-management-system-student-appl.netlify.app/

## Features

### Admin Features

* Secure admin login using JWT authentication
* Add, update, and delete courses
* Add, update, and delete course videos
* View all courses and enrolled students
* Manage course content efficiently

### Student Features

* Register for available courses
* View enrolled courses
* Access course videos
* Update profile information
* Change account password

## Technologies Used

### Frontend

* React.js
* React Router
* Bootstrap
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* JWT Authentication
* CryptoJS (SHA256 Password Hashing)

### Database

* MySQL

### Deployment

* Frontend: Netlify
* Backend: Railway
* Database: Railway MySQL

## Authentication

Passwords are stored securely using SHA256 hashing.

### Test Credentials

#### Admin Login

Email: `prachi@gmail.com`
Password: `admin`

You may also use:

* [sanika@gmail.com](mailto:sanika@gmail.com) / admin
* [sanmati@gmail.com](mailto:sanmati@gmail.com) / admin
* [pratiksha@gmail.com](mailto:pratiksha@gmail.com) / admin

#### Student Login

Students registered through the application receive the default password:

Password: `sunbeam`

Example student accounts:

* [rahul@gmail.com](mailto:rahul@gmail.com) / sunbeam
* [rohini@gmail.com](mailto:rohini@gmail.com) / sunbeam
* [vikram@gmail.com](mailto:vikram@gmail.com) / sunbeam
* [meera@gmail.com](mailto:meera@gmail.com) / sunbeam

## Database Features

* Foreign key relationships
* Course-to-student mapping
* Course-to-video mapping
* Duplicate course registration prevention
* Mobile number validation
* Password hashing and authentication

## Validation

The system includes:

* Frontend form validation
* Backend API validation
* Duplicate registration checks
* Email validation
* Mobile number validation
* Password length validation

## Project Goal

The goal of this application is to provide a clean, secure, and user-friendly learning platform where students can easily enroll in courses and access educational content while administrators manage the entire learning ecosystem efficiently.

## Author

Prachi Yargatti
