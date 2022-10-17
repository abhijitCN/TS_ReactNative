// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import React from 'react';

// interface BtnText {
//     btnText: string;
// }

// const Button = ({onPress = () => {}, btnStyle = {}, btnText}) => {
//     return (
//         <TouchableOpacity
//             onPress={onPress}
//             style={{...styles.btnStyle, ...btnStyle}}>
//             <Text>{btnText}</Text>
//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     btnStyle: {
//         alignItems: 'center',
//         backgroundColor: '#95d6f0',
//         padding: 10,
//         marginHorizontal: 10,
//         borderRadius: 25,
//     },
// });

// export default Button;

import React from 'react';
import {View} from 'react-native';

interface Props {}

const Button: React.FC = () => {
    return <View></View>;
};

export default Button;
