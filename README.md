# Real-time-chat-application

## Setup and Run Instructions
### Server-Side Setup:
Clone the repository containing the server-side code.

Navigate to the server directory in your terminal.

## Install dependencies using npm:

npm install
Replace the placeholder values for api_key and api_secret in the server code with your Stream Chat API key and secret.

Run the server:

`npm start`

## Client-Side Setup:
Clone the repository containing the client-side code.

Navigate to the client directory in your terminal.

Install dependencies using npm:

`npm install`

Run the client:

`npm start`

Access the application by navigating to http://localhost:3000 in your web browser.


# API Route Descriptions
## Server-Side Routes:
POST /signup

* Input: JSON object with firstName, lastName, username, and password.

* Output: JSON object containing token, userId, firstName, lastName, username, and hashedPassword.

* Logic: Creates a new user with the provided details, generates a unique user ID, hashes the password using bcrypt, creates a token for the user, and returns necessary user information.

POST /login

* Input: JSON object with username and password.

* Output: JSON object containing token, firstName, lastName, username, and userId.

* Logic: Validates the provided username, retrieves user details, generates a token for the user, compares the hashed password with the provided password using bcrypt, and returns user information if the passwords match.

Necessary Environment Configurations

Stream Chat API Key and Secret: Replace api_key and api_secret in the server-side code with your Stream Chat API key and secret.

Port Configuration: By default, the server runs on port 3001. If necessary, you can change this port in the server-side code and ensure that the client-side code connects to the correct port.
