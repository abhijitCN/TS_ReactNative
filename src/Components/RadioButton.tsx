import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

// import { Container } from './styles';

const Components: React.FC = ({onPress, selected, children}) => {
    return (
        <View style={style.radioButtonContainer}>
            <TouchableOpacity onPress={onPress} style={style.radioButton}>
                {selected ? <View style={style.radioButtonIcon} /> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
                <Text style={style.radioButtonText}>{children}</Text>
            </TouchableOpacity>
        </View>
    );
};
const style = StyleSheet.create({
    button: {
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
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 45,
    },
    radioButton: {
        height: 20,
        width: 20,
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonIcon: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: '#98CFB6',
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 16,
    },
});
export default Components;
