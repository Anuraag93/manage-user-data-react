import React from "react";
import { useState } from "react";
import "./AddUserData.css";
import { User } from "../../types/User";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageKeys";

const AddUserData = () => {
  const [branchId, setBranchId] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const { getItem, setItem } = useLocalStorage(LOCAL_STORAGE_KEYS.USER_LIST);

  const handleReset = () => {
    setBranchId("");
    setUsername("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setPosition("");
    setPassword("");
    setErrorMessage("");
  };

  const handleAdd = () => {
    if (
      branchId === "" ||
      username === "" ||
      firstName === "" ||
      middleName === "" ||
      lastName === "" ||
      position === "" ||
      password === ""
    ) {
      setErrorMessage("All fields are required");
      return;
    }
    const newUser: User = {
      branchId,
      userName: username,
      firstName,
      middleName,
      lastName,
      position,
      password,
    };

    const userList = getItem();
    setItem([...userList, newUser]);

    handleReset();
  };

  return (
    <div className="add-user-main">
      <input
        type="text"
        placeholder="Branch ID"
        value={branchId}
        onChange={(e) => setBranchId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Middle Name"
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="add-user-footer">
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>

        <button className="add-button" onClick={handleAdd}>
          Add
        </button>
      </div>
      {errorMessage && <div className="add-user-error">{errorMessage}</div>}
    </div>
  );
};

export default AddUserData;
