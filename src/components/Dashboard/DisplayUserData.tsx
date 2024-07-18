import React from "react";
import { users } from "../../data/users_data";

import "./DisplayUserData.css";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorageKeys";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { User } from "../../types/User";

const DisplayUserData = () => {
  const { getItem, setItem } = useLocalStorage(LOCAL_STORAGE_KEYS.USER_LIST);
  let usersList = getItem();
  if (!usersList) {
    setItem(users);
  }
  usersList = getItem();

  const handleRemove = (user: any) => {
    console.log(user);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Branch ID</th>
          <th>Username</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Position</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user: User, index: number) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{user.branchId}</td>
            <td>{user.userName}</td>
            <td>{user.firstName}</td>
            <td>{user.middleName}</td>
            <td>{user.lastName}</td>
            <td>{user.position}</td>
            <td>
              <button onClick={() => handleRemove(user)}>REMOVE</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayUserData;
