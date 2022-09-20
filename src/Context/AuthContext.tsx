import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Dispatch, SetStateAction} from 'react';
interface ISignIn {
    email: string;
    password: string;
}

interface IAuthContextProps {
    children: JSX.Element;
}

interface IUserContext {
    user: ISignIn;
    setUser: Dispatch<SetStateAction<ISignIn>>;
    signIn: (data: ISignIn) => void;
    signOut: () => void;
}

export const UserContext = React.createContext<IUserContext>({});

export default function AuthContext(props: IAuthContextProps) {
    const {children} = props;

    const [user, setUser] = React.useState<ISignIn>(null);
    const signIn = (data: ISignIn) => {
        //AsyncStorage.setItem('userToken', JSON.stringify(data));
        // console.log(data);
        setUser(data);
    };
    const signOut = () => {
        AsyncStorage.removeItem('userToken');
        // console.log(data);
        setUser(null);
    };

    return (
        <UserContext.Provider value={{user, setUser, signIn, signOut}}>
            {children}
        </UserContext.Provider>
    );
}
