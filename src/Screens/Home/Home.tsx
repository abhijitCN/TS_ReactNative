import React, {useContext} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {UserContext} from '../../Context/AuthContext';
function Home() {
  const {user} = useContext(UserContext);
  const onPress = () => {
    console.log('Logout');
  };
  return (
    <View style={style.main}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Hello, {user.email}
      </Text>
      <View style={style.buttonContainer}>
        <TouchableOpacity style={style.button} onPress={onPress}>
          <Text style={style.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#95d6f0',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 25,
    width: 100,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0a3749',
  },
  buttonContainer: {
    marginTop: 10,
  },
});
export default Home;
