import React, {useState} from 'react';
import {Text} from 'react-native';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Pressable,
} from 'react-native';
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
    const [modalVisible, setModalVisible] = useState(false);

    const onSelectedItem = (val: any) => {
        setModalVisible(!modalVisible);
        //setShowOption(false);
        onSelect(val);
    };
    console.log('>>Selected Value **', value);

    return (
        <View style={styles.main}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.dropdownContainer}
                onPress={() => setModalVisible(true)}>
                <Text style={{color: '#1b94c4'}}>
                    {!!value ? value?.name : `Choose Category`}
                </Text>
                <Icon
                    name="caretright"
                    color={'#0a3749'}
                    size={15}
                    // style={{
                    //     transform: [{rotate: showOption ? '90deg' : '0deg'}],
                    // }}
                />
            </TouchableOpacity>
            {modalVisible && (
                <View style={{}}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            //Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View
                            style={{
                                position: 'absolute',
                                top: 220,
                                left: 6,
                                width: 400,
                                backgroundColor: '#ffffff',
                                paddingVertical: 40,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                            }}>
                            {data.map((val: any, i: any) => {
                                return (
                                    <View
                                        style={{
                                            //flex: 1,
                                            alignItems: 'center',
                                            //justifyContent: 'center',
                                        }}>
                                        <Pressable
                                            onPress={() => onSelectedItem(val)}
                                            style={{
                                                //backgroundColor  val.id == val.id ? 'pink' : 'white',
                                                paddingVertical: 8,
                                                borderRadius: 4,
                                                paddingHorizontal: 6,
                                                backgroundColor: '#0a3749',
                                                marginVertical: 5,
                                                //flex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '70%',
                                            }}>
                                            <View style={{}}>
                                                <Text
                                                    key={i}
                                                    style={{
                                                        color: '#ffffff',
                                                        fontSize: 18,
                                                        fontWeight: '500',
                                                        alignSelf: 'center',
                                                    }}>
                                                    {val.id} : {val.name}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                );
                            })}
                        </View>
                    </Modal>
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
    centeredView: {
        //flex: 0.5,
        //justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: '#2d2d',
        //marginTop: 100,
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 55,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minHeight: 300,
        minWidth: 200,
    },
    modalText: {
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default Dropdown;
