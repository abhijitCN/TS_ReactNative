import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
interface ISignIn {
  email: string;
  password: string;
}
export const UserContext = React.createContext({});
export default function AuthContext({children}: any) {
  const [user, setUser] = React.useState<any>({});
  const signIn = (data: ISignIn) => {
    AsyncStorage.setItem('userToken', JSON.stringify(data));
    // console.log(data);
    setUser(data);
  };

  return (
    <UserContext.Provider value={{user, setUser, signIn}}>
      {children}
    </UserContext.Provider>
  );
}
