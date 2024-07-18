import React, { createContext, useState, ReactNode } from "react";
import { User } from "../types/User";

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (removedUser: User) => void;
  clearUsers: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const removeUser = (removedUser: User) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user !== removedUser));
  };
  const clearUsers = () => {
    setUsers((_) => []);
  };

  return (
    <UserContext.Provider value={{ users, addUser, removeUser, clearUsers }}>
      {children}
    </UserContext.Provider>
  );
}
