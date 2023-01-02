import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

interface BtnText {
    press?(): void;
    btnStyle?: {};
    btnText: string;
}

const Button: React.FC<BtnText> = ({press, btnStyle, btnText}) => {
    return (
        <TouchableOpacity
            onPress={press}
            style={{...styles.btnStyle, ...btnStyle}}>
            <Text style={styles.buttonText}>{btnText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        alignItems: 'center',
        backgroundColor: '#95d6f0',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 25,
        marginVertical: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0a3749',
    },
});

export default Button;
