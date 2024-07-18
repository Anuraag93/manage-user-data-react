import React, { useContext } from "react";

import "./DisplayUserData.css";
import { User } from "../../types/User";
import { UserContext } from "../../context/UserContext";

const DisplayUserData = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  const handleRemove = (user: User) => {
    userContext.removeUser(user);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Branch ID</th>
          <th>Username</th>
          <th>Name</th>
          <th>Position</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {userContext.users.map((user: User, index: number) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{user.branchId}</td>
            <td>{user.userName}</td>
            <td>
              {user.firstName} {user.middleName} {user.lastName}
            </td>
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
