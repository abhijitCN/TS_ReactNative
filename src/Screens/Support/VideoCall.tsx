// import React, {useState} from 'react';
// import AgoraUIKit, {PropsInterface} from 'agora-rn-uikit';
// import {Text, View} from 'react-native';

// // import { Container } from './styles';

// const VideoCall = () => {
//     const [videoCall, setVideoCall] = useState(true);
//     const connectionData = {
//         appId: '<app-id>',
//         channel: '<channel-name>',
//         token: '<token>',
//     };
//     const props: PropsInterface = {
//         rtcProps: {
//             appId: 'a22539bebe8b4312bc60a8bd34c202bc',
//             channel: 'Testing',
//         },
//         callbacks: {
//             EndCall: () => setVideoCall(false),
//         },
//     };
//     const callbacks = {
//         EndCall: () => setVideoCall(false),
//     };
//     return (
//         <View>
//             {videoCall ? (
//                 <AgoraUIKit
//                     //connectionData={connectionData}
//                     rtcProps={props.rtcProps}
//                     callbacks={props.callbacks}
//                 />
//             ) : (
//                 <Text onPress={() => setVideoCall(true)}>Start Call</Text>
//             )}
//         </View>
//     );
// };

//export default VideoCall;

// import React, {useState} from 'react';
// import AgoraUIKit from 'agora-rn-uikit';
// import {Text, View} from 'react-native';
// const VideoCall = () => {
//     const [videoCall, setVideoCall] = useState(true);
//     const connectionData = {
//         appId: '<Agora App ID>',
//         channel: 'test',
//     };
//     const rtcCallbacks = {
//         EndCall: () => setVideoCall(false),
//     };
//     return (
//         <View>
//             {videoCall ? (
//                 <AgoraUIKit
//                     connectionData={connectionData}
//                     rtcCallbacks={rtcCallbacks}
//                 />
//             ) : (
//                 <Text onPress={() => setVideoCall(true)}>Start Call</Text>
//             )}
//         </View>
//     );
// };
// export default VideoCall;

import React, {useState} from 'react';
import {Text, View} from 'react-native';

const VideoCall = () => {
    return (
        <View>
            <Text>Video call</Text>
        </View>
    );
};

export default VideoCall;
