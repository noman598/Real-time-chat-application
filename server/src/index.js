import express from "express";
import cors from "cors";

import { StreamChat } from "stream-chat"; //Stream Chat is a popular API and service that enables developers to add real-time chat functionality to their applications easily. It's designed to handle all the complexities of building a real-time messaging system, allowing developers to focus on building their app's unique features instead of dealing with the underlying infrastructure.


import { v4 as uuidv4 } from "uuid"; //libarary
import bcrypt from "bcrypt";
const app = express();


// Stream Chat uses tokens for user authentication and authorization. When a user wants to access the chat functionality, they need a token to authenticate themselves with the Stream Chat API. Token generation typically occurs on the {server-side}.

app.use(cors());
app.use(express.json());
const api_key = "x87zgtpfjz7w";
const api_secret =
  "3j46fd4fjzf86xfxmp9rscuu6vqc6s9uvyu8rrxtqrpwjv9kg6w7nv9bxyhu3raj";
  // First, you'll need to create a Stream Chat server client instance. This is done on the server-side using your API key and secret.
const serverClient = StreamChat.getInstance(api_key, api_secret);


// this function is API ->that is created by me.
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4(); //by calling this function it generate a unique universal identifier.

    const hashedPassword = await bcrypt.hash(password, 10);

    // User Authentication and Token Generation:
// Once you have the serverclient, you can generate an authentication token for a specific user. The user must be registered with your application. The token is used to authenticate the user on the client-side


    const token = serverClient.createToken(userId);
// The createToken() method generates a token for the given {userId}, which can then be sent to the client-side.


    res.json({ token, userId, firstName, lastName, username, hashedPassword });
    // It's worth noting that user data (e.g., name, profile picture) might be stored in both your application's database and {Stream Chat's database}. This way, you can access user data from your application while using Stream Chat for chat-related functionality.
  } catch (error) {
    res.json(error);
  }
});

// this function is API ->that is created by me.
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return res.json({ message: "User not found" });

    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
