import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm(): JSX.Element {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          userName: username,
          password: password,
        }
      );

      if (response.status === 200) {
        const { authorization, username, userId } = response.data;

        // Save the token and username in local storage
        localStorage.setItem("token", authorization);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId);

        // Perform any necessary actions upon successful login
        alert("Login successful");

        // Reset form fields and error message
        setUsername("");
        setPassword("");
        setErrorMessage("");

        // Redirect to the Items page
        navigate("/item");
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      error.response && error.response.status === 401
        ? setErrorMessage("Invalid username or password")
        : setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
