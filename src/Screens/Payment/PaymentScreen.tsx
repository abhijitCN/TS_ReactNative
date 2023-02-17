import React from 'react';
import {Alert, Text, TouchableHighlight, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {STRIP_PUBLISHKEY} from '@env';
import {StripeProvider} from '@stripe/stripe-react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import Button from '../../Components/Button';

const Payment: React.FC = () => {
    const Route = useRoute();
    const routData = Route.params;
    const values: any = routData;
    console.log('payment details ** ', values);
    const {confirmPayment} = useStripe();
    const Payment = (data: any) => {
        Alert.alert(STRIP_PUBLISHKEY);
    };
    return (
        <View
            style={{
                flex: 1,
            }}>
            <StripeProvider
                publishableKey={STRIP_PUBLISHKEY}
                merchantIdentifier="merchant.identifier" // required for Apple Pay
                urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            >
                <View>
                    <CardField
                        postalCodeEnabled={false}
                        placeholders={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                            backgroundColor: '#FFFFFF',
                            textColor: '#000000',
                        }}
                        style={{
                            marginRight: 10,
                            width: '100%',
                            height: 50,
                            marginVertical: 30,
                        }}
                        onCardChange={cardDetails => {
                            console.log('cardDetails', cardDetails);
                        }}
                        onFocus={focusedField => {
                            console.log('focusField', focusedField);
                        }}
                    />
                </View>
                <Button press={Payment} btnText={'Proceed to Payment'} />
            </StripeProvider>
        </View>
    );
};

export default Payment;
