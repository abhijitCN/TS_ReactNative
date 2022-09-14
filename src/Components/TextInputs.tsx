import React, {FC} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
const {height, width} = Dimensions.get('screen');
interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}
const TextInputs: FC<Props> = props => {
  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry || false}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    width: width / 1.1,
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  input: {
    padding: 15,
  },
});
export default TextInputs;
