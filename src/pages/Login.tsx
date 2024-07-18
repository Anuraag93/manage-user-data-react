import React, { useContext } from "react";
import { useState } from "react";
import { users } from "../data/users_data";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../constants/localStorageKeys";
import { UserContext } from "../context/UserContext";
import { User } from "../types/User";

const Login = () => {
  const [branchId, setBranchId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEYS.LOGGEDIN_USER);

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  const handleLogin = () => {
    //check if branchId is empty
    if (branchId === "") {
      setErrorMessage("Branch ID is required");
      return;
    }

    //check if branchId is not a number
    if (isNaN(Number(branchId))) {
      setErrorMessage("Branch ID must be a number");
      return;
    }

    //check if branchId is not in the users and store the users array in the usersByBranchId
    const usersByBranchId = users.find(
      (user) => user.branchId === Number(branchId)
    );
    if (!usersByBranchId) {
      setErrorMessage("Branch ID not found");
      return;
    }

    //check if username is empty
    if (username === "") {
      setErrorMessage("Username is required");
      return;
    }
    //check if username is not in the users
    const filterUsername = users.find((user) => user.userName === username);
    if (!filterUsername) {
      setErrorMessage("Username not found");
      return;
    }

    //check if password is empty
    if (password === "") {
      setErrorMessage("Password is required");
      return;
    }
    //check if password is less than 8 characters
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }

    //check if username and password do not match
    const user = users.find(
      (user) => user.userName === username && user.password === password
    );
    if (!user) {
      setErrorMessage("Username and password do not match");
      return;
    }

    setErrorMessage("");
    //set username in the local storage as loggedinUser
    setItem(user.userName);

    //add the users to the context
    users.forEach((user) => {
      const newUser: User = {
        branchId: String(user.branchId),
        userName: user.userName,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        position: user.position,
        password: user.password,
      };
      userContext.addUser(newUser);
    });
    // move to the dashboard page
    navigate("/dashboard");
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="container-title">Login</div>
        <div>
          <input
            type="text"
            placeholder="Branch ID"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Login;
