// import React, {useState} from 'react';
// import {
//     View,
//     TextInput,
//     StyleSheet,
//     TouchableOpacity,
//     Text,
// } from 'react-native';
// import type {StackScreenProps} from '@react-navigation/stack';
// import {AuthRootStackParamList} from './Navigator/types';

// type LoginProps = StackScreenProps<AuthRootStackParamList, 'Login'>;

// const Login = (props: LoginProps) => {
//     const credential = {email: 'Abhijit@gmail.com', password: 'abhi@123'};

//     // props.route.params.showMsg

//     const [data, setData] = useState<any>({email: '', password: ''});

//     const onPress = () => {
//         if (
//             credential.email === data.email &&
//             credential.password === data.password
//         ) {
//             console.log('Successfuly Login');
//         } else {
//             if (!data.email || !data.password) {
//                 console.log('Requred All Felds');
//             } else if (credential.email !== data.email) {
//                 console.log('Wrong Email');
//             } else if (credential.password !== data.password) {
//                 console.log('Wrong Password');
//             }
//         }
//     };
//     return (
//         <>
//             <View style={style.main}>
//                 <TextInput
//                     style={style.input}
//                     onChangeText={e => setData({...data, email: e})}
//                     value={data.email}
//                     placeholder="email"
//                     //keyboardType="numeric"
//                 />
//                 <TextInput
//                     style={style.input}
//                     onChangeText={e => setData({...data, password: e})}
//                     value={data.password}
//                     placeholder="Password"
//                     //keyboardType="numeric"
//                 />
//                 <TouchableOpacity style={style.button} onPress={onPress}>
//                     <Text>Submit</Text>
//                 </TouchableOpacity>
//             </View>
//         </>
//     );
// };
// const style = StyleSheet.create({
//     main: {
//         flex: 1,
//     },
//     input: {
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//     },
//     button: {
//         alignItems: 'center',
//         backgroundColor: '#DDDDDD',
//         padding: 10,
//     },
// });
// export default Login;
import {View, Text} from 'react-native';
import React from 'react';

export default function Login() {
    return (
        <View>
            <Text>Login</Text>
        </View>
    );
}
