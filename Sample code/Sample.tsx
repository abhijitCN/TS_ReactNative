import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    Alert,
    Button,
    TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {db} from '../../Constant/Firebase';
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';

function Sample({navigation}) {
    // const {user, signOut} = useContext<any>(UserContext);
    const [animate, setAnimate] = useState<boolean>(true);
    const [posts, setPosts] = useState<any>([]);
    const user = useSelector(state => state.user);
    // const onPress = () => {
    //   signOut();
    // };
    useEffect(() => {
        setTimeout(() => {
            setAnimate(false);
        }, 2000);
    });
    const getProfileData = async () => {
        const productList: any[] = [];
        console.log('called');
        await firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot);
                // querySnapshot.forEach(documentSnapshot => {
                //     const {name, phoneNo, email} = documentSnapshot.data();
                //     productList.push({
                //         name: name,
                //         phoneNo: phoneNo,
                //         email: email,
                //     });
                //     console.log(
                //         'User ID: ',
                //         name,
                //         phoneNo,
                //         email,
                //         //documentSnapshot.id,
                //         //documentSnapshot.data(),
                //     );
                // });
            });
        setPosts(productList);
        console.log('GetValue', posts);
    };
    // useEffect(() => {
    //     console.log('user data');
    //     getProfileData();
    // }, []);
    const lapsList = () => {
        return posts.map((data: any) => {
            return (
                <View>
                    <Text style={style.text}>{data.name}</Text>
                    <Text style={style.text}>{data.email}</Text>
                    <Text style={style.text}>{data.phoneNo}</Text>
                </View>
            );
        });
    };
    // Storing User Data
    const [userDoc, setUserDoc] = useState(null);
    // Update Text
    const [text, setText] = useState('');

    // MARK: CRUD Functions
    const CreateDoc = () => {
        // MARK: Creating New Doc in Firebase
        // Before that enable Firebase in Firebase Console
        const myDoc = doc(db, 'MyCollection', 'MyDocument');

        // Your Document Goes Here
        const docData = {
            name: 'iJustine',
            bio: 'YouTuber',
        };

        setDoc(myDoc, docData)
            // Handling Promises
            .then(() => {
                // MARK: Success
                Alert.alert('Document Created!');
            })
            .catch(error => {
                // MARK: Failure
                Alert.alert(error.message);
            });
    };
    //Mark: READ FUNCTION
    const Read = () => {
        // MARK: Reading Doc
        // You can read what ever document by changing the collection and document path here
        const myDoc = doc(db, 'MyCollection', 'MyDocument');
        getDoc(myDoc)
            // Handling Promises
            .then(snapshot => {
                // MARK: Success
                if (snapshot.exists) {
                    setUserDoc(snapshot.data());
                    Alert.alert('Doc Found', snapshot.data());
                } else {
                    Alert.alert('No Doc Found');
                }
            })
            .catch(error => {
                // MARK: Failure
                Alert.alert(error.message);
            });
    };
    //Mark: UPDATE FUNCTION
    const Update = (value, merge) => {
        // MARK: Updating Doc
        const myDoc = doc(db, 'MyCollection', 'MyDocument');
        // If you set merge true then it will merge with existing doc otherwise it will be a fresh one
        setDoc(myDoc, value, {merge: merge})
            // Handling Promises
            .then(() => {
                // MARK: Success
                Alert.alert('Updated Successfully!');
                setText('');
            })
            .catch(error => {
                // MARK: Failure
                Alert.alert(error.message);
            });
    };
    //Mark: DELETE FUNCTION

    const Delete = () => {
        // MARK: Deleting Doc
        const myDoc = doc(db, 'MyCollection', 'MyDocument');

        deleteDoc(myDoc)
            // Handling Promises
            .then(() => {
                // MARK: Success
                Alert.alert('Deleted Successfully!');
            })
            .catch(error => {
                // MARK: Failure
                Alert.alert(error.message);
            });
    };

    const App = () => {
        const verifi = useSelector((state: rootState) => state.verification);
        const isValid = AsyncStorage.getItem('userToken');
        //console.log('isValid?????????????', isValid);
        useEffect(() => {
            console.log('print', verifi.logUser);
        }, [verifi]);
        useEffect(() => getUser(), []);

        const getUser = async () => {
            try {
                const value = await AsyncStorage.getItem('userToken');
                console.log('#######', value);
                if (value != null) {
                    //setUser(JSON.parse(value));
                    console.log('?????', value);
                }
                console.log('=====', value);
            } catch (error) {
                console.log(error);
            }
        };
        const isAuthenticate = !!verifi.logUser;
        console.log('NOT NOT isAuthenticate', isAuthenticate);

        return (
            <>{isAuthenticate ? <AuthNavigator /> : <MainStackNavigation />}</>
        );
    };
    const pickImageAndUpload = (path, imageName) => {
        console.log('pick Image And Upload');
        launchImageLibrary({quality: 0.5}, fileobj => {
            let reference = storage().ref().child(`/userprofile/${Date.now()}`);
            let task = reference.putFile(path);
            //const storage = getStorage();
            //const mountainsRef = ref(storage, fileobj.assets[0].uri);
            console.log('click on image ?? ', fileobj.assets[0].uri);
            //let selectedImage = fileobj.assets[0].uri
            //setEditValue({Image:selectedImage})
            task.then(() => {
                console.log('Image uploaded to the bucket!');
                //console.log("selectedImage ?? >> ",editValue.Image)
            }).catch(e => console.log('uploading image error => ', e));
            // const uploadTask = storage
            //     .ref()
            //     .child(`/userprofile/${Date.now()}`)
            //     .putFile(mountainsRef);
            // uploadTask.on(
            //     'state_changed',
            //     snapshot => {
            //         var progress =
            //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //         if (progress == 100) console.log('image uploaded');
            //     },
            //     error => {
            //         console.log('error uploading image');
            //     },
            //     // () => {
            //     //     uploadTask.snapshot.ref
            //     //         .getDownloadURL()
            //     //         .then(downloadURL => {
            //     //             Image(downloadURL);
            //     //         });
            //     // },
            // );
        });
    };
    pickImageAndUpload(
        'data/user/0/com.tsreactnative/cache/rn_image_picker_lib_temp_0a9c0e6f-dcf9-4890-afd7-3c0345c25610.jpg',
        'ab',
    );

    // Import: Packages
    import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
    import axios from 'axios';

    // AsyncThunk: getUserDetails
    export const getUserDetails = createAsyncThunk(
        'userDetails/getUserDetails',
        async () => {
            try {
                const apiUrl = process.env.REACT_APP_URL;

                var config = {
                    method: 'get',
                    url: `${apiUrl}/claimSet?UserName=${state.loginDetails.username}&Password=${state.loginDetails.password}`,
                    headers: {
                        accept: 'application/json',
                    },
                };

                const response = await axios(config);
                const data = await response.data;
                return data;
            } catch (error) {
                console.log(error);
            }
        },
    );

    // Slice: userDetailsSlice
    export const userDetailsSlice = createSlice({
        name: 'userDetails',
        initialState: {
            loginDetails: {
                username: '',
                password: '',
            },
            details: [],
            status: null,
        },
        reducers: {
            addUsername: (state, {payload}) => {
                state.loginDetails.username = payload;
            },
            addPassword: (state, {payload}) => {
                state.loginDetails.password = payload;
            },
        },
        extraReducers: {
            [getUserDetails.pending]: (state, action) => {
                state.status = 'loading';
            },
            [getUserDetails.fulfilled]: (state, {payload}) => {
                state.details = payload;
                state.status = 'success';
            },
            [getUserDetails.rejected]: (state, action) => {
                state.status = 'failed';
            },
        },
    });

    // Actions: addUsername, addPassword
    export const {addUsername, addPassword} = userDetailsSlice.actions;

    // Reducer: userDetailsSlice.reducer
    export default userDetailsSlice.reducer;
    return (
        <View style={style.main}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 25}}>
                    Home
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 0,
                        padding: 5,
                    }}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={require('../../Assets/avatar.jpeg')}
                    />
                </TouchableOpacity>
            </View>
            {/* {animate === true ? (
                <>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                        }}>
                        <ActivityIndicator color="red" size="large" />
                    </View>
                </>
            ) : ( */}
            <View
                style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Hello,{user.email}
                </Text>
                <Button title="Create New Doc" onPress={CreateDoc}></Button>
            </View>
            <Button title="Read Doc" onPress={Read}></Button>
            {userDoc != null && <Text>Bio: {userDoc.bio}</Text>}
            <TextInput
                style={{
                    width: '95%',
                    fontSize: 18,
                    padding: 12,
                    borderColor: 'gray',
                    borderWidth: 0.2,
                    borderRadius: 10,
                    marginVertical: 20,
                }}
                placeholder="Type Here"
                onChangeText={text => {
                    setText(text);
                }}
                value={text}></TextInput>

            <Button
                title="Update Doc"
                onPress={() => {
                    Update(
                        {
                            bio: text,
                        },
                        true,
                    );
                }}
                disabled={text == ''}></Button>
            <Button title="Delete Doc" onPress={Delete}></Button>
            {/* )} */}
        </View>
    );
}
const style = StyleSheet.create({
    main: {
        //alignItems: 'center',
        flex: 1,
        //justifyContent: 'center',
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
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        marginHorizontal: 10,
    },
});
export default Sample;
