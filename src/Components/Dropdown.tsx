import React, {useState} from 'react';
import {Text} from 'react-native';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface category {
    fruits: string;
    price: string;
    quantity: string;
    category: string;
    imageUrl: any;
}

const Dropdown = ({data, value = {}, onSelect = () => {}}) => {
    //console.log('Selected Value', value);
    const [showOption, setShowOption] = useState(false);

    const onSelectedItem = (val: any) => {
        setShowOption(false);
        onSelect(val);
    };
    console.log('>>Selected Value **', value);

    return (
        <View style={styles.main}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.dropdownContainer}
                onPress={() => setShowOption(!showOption)}>
                <Text style={{color: '#1b94c4'}}>
                    {!!value ? value?.name : `Choose Category`}
                </Text>
                <Icon
                    name="caretright"
                    color={'#0a3749'}
                    size={15}
                    style={{
                        transform: [{rotate: showOption ? '90deg' : '0deg'}],
                    }}
                />
            </TouchableOpacity>
            {showOption && (
                <View>
                    {data.map((val, i) => {
                        return (
                            <TouchableOpacity
                                onPress={() => onSelectedItem(val)}
                                style={{
                                    //backgroundColor  val.id == val.id ? 'pink' : 'white',
                                    paddingVertical: 8,
                                    borderRadius: 4,
                                    paddingHorizontal: 6,
                                }}>
                                <Text
                                    key={i}
                                    style={{color: '#1b94c4', marginTop: 5}}>
                                    {val.id} : {val.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 12,
    },
    dropdownContainer: {
        backgroundColor: '#eafafc',
        padding: 8,
        height: 60,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#1b94c4',
        borderRadius: 10,
        marginVertical: 10,
    },
});

export default Dropdown;
