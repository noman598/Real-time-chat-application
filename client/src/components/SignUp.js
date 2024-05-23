import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  // Let's understand about Axious and how it work - 
  // when we click on sign up button then it calls a API. it is nothing but-{http://localhost:3001/signup}. so afater calling API. we have written code on server side (that means Index.js in server file) that particular code run on server side.
  // based on the scenario after clicking on the signUp  button(As it is POST reuqest) so the data that we have put on the page, will store on the database based on the code that is written server side. 
  // similary if the API is for Get. so by clicking the button we can fetch the particular data from the server side based on the code that written on the server side(Means index.js in server folder)


  const signUp = () => {
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;

        // store the detail of user on cookies of that user web application.
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };
  return (
    <div className="signUp">
      <label> Sign Up</label>
      <input
        placeholder="First Name"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <input
        placeholder="Last Name"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <input
        placeholder="Username"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button onClick={signUp}> Sign Up</button>
    </div>
  );
}

export default SignUp;
