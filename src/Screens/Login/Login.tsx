import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {TextInput, ActivityIndicator, MD2Colors} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {UserContext} from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const {signIn} = useContext<any>(UserContext);
  //console.log(signIn);
  interface cred {
    email: string;
    password: string;
  }
  const credential = {email: '123', password: '123'};
  const [data, setData] = useState({email: '', password: ''});
  const onPress = () => {
    if (
      credential.email === data.email &&
      credential.password === data.password
    ) {
      signIn(data);
      /*      setTimeout(() => {
        <ActivityIndicator animating={true} color={MD2Colors.red800} />;
      }, 3000); */
    } else {
      if (!data.email || !data.password) {
        console.log('Required All Felds');
      } else if (credential.email !== data.email) {
        console.log('Wrong Email');
      } else if (credential.password !== data.password) {
        console.log('Wrong Password');
      }
    }
  };
  // const loginContext = () => {
  //   signin;
  //   //navigation.navigate('Home', {data: data});
  // };
  return (
    <>
      <View style={style.main}>
        {/* <View style={{}}> */}
        <Text style={style.loginText}>Log In</Text>
        <Text style={style.sentence}>Enter your email and password</Text>
        <TextInput
          style={style.input}
          onChangeText={e => setData({...data, email: e})}
          value={data.email}
          label="Email"
          mode="outlined"
          outlineColor="#95d6f0"
          activeOutlineColor="#1b94c4"
          //keyboardType="numeric"
        />
        <TextInput
          style={style.input}
          onChangeText={e => setData({...data, password: e})}
          value={data.password}
          label="Password"
          mode="outlined"
          outlineColor="#95d6f0"
          activeOutlineColor="#1b94c4"
          //keyboardType="numeric"
        />
        <TouchableOpacity style={style.button} onPress={onPress}>
          <Text style={style.buttonText}>Submit</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </>
  );
};
const style = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    // alignItems: 'center',
  },
  input: {
    height: 60,
    margin: 12,
    //borderWidth: 1,
    //backgroundColor: '#95d6f0',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#95d6f0',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 25,
    //width: '90%',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0a3749',
  },
  loginText: {
    marginLeft: 12,
    fontSize: 40,
    fontWeight: '500',
    color: '#1b94c4',
  },
  sentence: {
    marginLeft: 12,
    fontSize: 20,
    color: '#1b94c4',
  },
});
export default Login;
