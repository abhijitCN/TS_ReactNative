import React, {FC} from 'react';
import {Dimensions, StyleSheet, View, TextInput} from 'react-native';
const {height, width} = Dimensions.get('screen');
interface Props {
    placeholder: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    btnStyle?: {};
    placeholderTextColor: string;
}
const TextInputs: FC<Props> = props => {
    return (
        <View style={{}}>
            <TextInput
                style={{...style.input, ...props.btnStyle}}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry || false}
                placeholderTextColor={props.placeholderTextColor}
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
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#eafafc',
        borderColor: '#1b94c4',
        borderRadius: 10,
    },
});
export default TextInputs;
