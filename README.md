Student Name and Number as per student card: Joncy George(20047365)

Programme: Msc InformationSystem with computing

Lecturer Name: Paul Laird

Module/Subject Title: Programming for Information Systems

Assignment Title: Train tracking system



# TRAIN TRACKING SYSTEM

# Introduction

Train Tracking System is a comprehensive solution designed to manage and track trains efficiently.It gives administrators the ability to manage train data while giving users access to real-time information about trains, their types, and their statuses. This online application guarantees effective train data processing with an easy-to-use interface for both administrators and users. The main objective of the train tracking system is to offer a structured platform that makes it easier for users to find the status of trains and manage them.

# Overview

The Train Tracking System allows users to view and track the status of various trains, while administrators can add, update, delete, and manage train data. The system features a backend API for managing train details and real-time tracking, and a frontend interface that provides users with an easy way to interact with the system.

# Key Features
# Admin Functionalities

Create New Train: Administrators can add new train records by providing necessary details such as train name, type, and status.
Process: Admins can fill out a form to add a new train. When the form is submitted, a POST request is sent to the backend to add the train data to the database.

Update Train Details: Admins can update details of an existing train, including trainname,train type, and statuses.
Process: The admin selects a train to edit, updates the form data, and submits it. A PUT request is sent to the backend to update the existing train record.

Delete Train Record: Admins can remove a train record that is no longer in use.
Process: Admins can delete a train by clicking the "Delete" button associated with the record. A DELETE request is sent to the backend to remove the train data from the database.

View All Trains: Admins can view a list of all trains in the system, with details such as train name, train_type, and status.
Process: The admin can view the complete list by accessing the appropriate page. A GET request is made to fetch all the train data from the backend.


# User Functionalities
View Train Schedules: Users can view a list of all available trains, including their train_type, and statuses (on-time, delayed, etc.).

Process: Upon visiting the train tracking page, users can see a list of all trains with their respective details. A GET request is made to the backend to fetch the list of trains, which is then displayed to the user.

Search for Trains: Users can search for trains based on the name of train.

Process: A search input allows users to filter trains by entering train name. The backend processes the search request and filters the trains accordingly.

# Project Repository
created HTML file
created base javascript file
installed all the packages required json
installed packages for node, mysql2
created a server.js file and express server is correctly set up and listens on port 3000
port:3000 

Backend API
/trains (GET): Fetches all trains from the trains table 
 /trains (POST): Validates input and inserts a new train into the trains table in postman
GET /search: Given the particular train based on search filters.
/trains(DELETE) : Deletes a particular train.
/trains(PUT) : Updates the existing train details.


# Technologies Stack
# Frontend
HTML: Used to create the basic structure and content of the web application.
CSS: It is used to improve the application's visual attractiveness through layout, font, and color styling.
JavaScript: Makes the interface dynamic and interactive, handling real-time data updates and user interactions.



# Backend
Node.js: A server-side runtime used to handle requests, manage data flow, and perform asynchronous operations.
Express.js: A web framework built on Node.js that simplifies routing and handling HTTP requests.


# Database
MySQL: A relational database management system (RDBMS) used to store and manage all train-related data, such as train name, train type and operational statuses.
Database name: Train tracking system, Table name: trains

# Tool
-Visual Studio Code (IDE)
-Postman (API testing)
-GitHub
-MYSQL Workbench

# Testing
Jest: A JavaScript testing framework used for unit testing and integration testing to ensure the functionality of the backend and API endpoints.
Supertest: A library for testing HTTP requests and responses, useful for validating the Express.js routes and API behavior.
# Run the Project
Node js installed.
Set up a MySQL  server to store train data.
API testing tool: Installed Postman to test backend APIs.
Clone the repository https://github.com/Joncygeorge/Project.git
Installed required dependencies.
created env file and db.js to connect with the database.
Database Initialized
Start the Backend - node script.js
Navigate to the front end
Test APIs

# Conclusion
By offering crucial functions like train tracking and real-time status updates, the Train Tracking System streamlines train administration. High scalability, performance, and dependability are guaranteed by this application's use of a contemporary tech stack (HTML, CSS, JavaScript, Node.js, MySQL).

The study demonstrates how an all-inclusive train tracking system may facilitate better train management, streamline administrative duties, and improve user satisfaction. Additionally, it offers a strong basis for upcoming improvements, such as more thorough real-time tracking, sophisticated search capabilities, and interaction with other transit systems.

# References
W3Schools. (2024). HTML Forms. Available at: https://www.w3schools.com/html/html_forms.asp
Ahmed,J.,2023. CRUD REST API with Node.js, Express.js, and PostgressSQL. DEV Community.https://dev.to/justahmed99/crud-rest-api-with-nodejs-expressjs-and-postgresql-57b2
Chinedu Orie, 2024. Jest and Supertest - DEV Community: https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
CRUD Tutorial : https://youtu.be/HCDAXBsTpHg?si=BviiO1fa-Roltbcc




