import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CreatePin from '../screens/CreatePin';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';
import AllTransactions from '../screens/AllTransactions';
import TransactionDetails from '../screens/TransactionDetails';
import PaymentScreen from '../screens/PaymentScreen';
import ArrowBack from '../components/ArrowBack';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import ChangePassword from '../screens/ChangePassword';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AllProperties from '../screens/AllProperties';
import PropertyDetails from '../screens/createScreens/property/PropertyDetails';

const Stack = createNativeStackNavigator();

const HomeStack = () => {

    const { user } = useSelector((state: RootState) => state.user);
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName={!user?.is_new_user ? "HomeScreen" : "ChangePassword"} >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'Zippy Agent',
                    animation: 'slide_from_bottom',
                    headerShown: true,
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <AntDesign
                        name="menu-fold"
                        color={COLORS.primaryBlackHex}
                        size={25}
                        onPress={() => {
                            // navigation.goBack();
                            navigation.toggleDrawer()
                        }}
                    />
                }}>

            </Stack.Screen>


            <Stack.Screen
                name="CreateWallet"
                component={CreatePin}
                // options={{ animation: 'slide_from_bottom' }}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Add Wallet',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />

                }}
            >
            </Stack.Screen>

            {/* chnage password */}
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                // options={{ animation: 'slide_from_bottom' }}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Change Password',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />

                }}
            >
            </Stack.Screen>
            {/* change password */}


            {/* all transactions */}
            <Stack.Screen
                name="AllTransactions"
                component={AllTransactions}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Transactions',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />
                }}>
            </Stack.Screen>
            {/* all transactions */}

            {/* all properties */}
            {/* all transactions */}
            <Stack.Screen
                name="AllProperties"
                component={AllProperties}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Properties',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />
                }}>
            </Stack.Screen>
            {/* all transactions */}
            {/* all propertes */}

            {/* transaction details */}
            <Stack.Screen
                name="TransactionDetails"
                component={TransactionDetails}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Transaction Details',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />
                }}>
            </Stack.Screen>
            {/* transaction details */}

            {/* property details */}
            <Stack.Screen
                name="PropertyDetails"
                component={PropertyDetails}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Property Details',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />
                }}>
            </Stack.Screen>
            {/* property details */}


            {/* payments screen  */}
            <Stack.Screen
                name="Payment"
                component={PaymentScreen}

                options={{
                    animation: 'slide_from_bottom',
                    title: 'Payment',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                }}
            >
            </Stack.Screen>
            {/* payments screen */}
        </Stack.Navigator>
    )
}

export default HomeStack

