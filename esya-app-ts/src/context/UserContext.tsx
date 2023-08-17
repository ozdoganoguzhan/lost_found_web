import React from 'react';
import { createContext } from 'react';
import { IUser } from '../api/Interfaces';
import usePersistState from './usePersistState';

interface UserContextProps {
  user: IUser,
  setUser: any
}

export const DefaultUser: IUser = {
  userId: 0,
  username: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  profilePicture: "",
  emailVerified: false,
  phoneNumber: ""
}

export const UserContext = createContext<UserContextProps>({user: DefaultUser, setUser: null});

export const UserContextProvider = ({children}: any) => {
  const [user, setUser] = usePersistState("userData", DefaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
