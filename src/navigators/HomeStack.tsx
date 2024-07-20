import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CreatePin from '../screens/CreatePin';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';
import AllTransactions from '../screens/AllTransactions';
import TransactionDetails from '../screens/TransactionDetails';
import ArrowBack from '../components/ArrowBack';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import ChangePassword from '../screens/ChangePassword';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AllProperties from '../screens/AllProperties';
import PropertyDetails from '../screens/PropertyDetails';
import UserDetails from '../screens/UserDetails';
import AllUsers from '../screens/AllUsers';
import PropertyImages from '../screens/PropertyImages';
import AllBooking from '../screens/AllBookings';
import BookingDetails from '../screens/BookingDetails';

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

            {/* all bookings */}
            <Stack.Screen
                name="AllBookings"
                component={AllBooking}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown:false
                }}>
            </Stack.Screen>
            {/* all bookings */}

            {/* booking details */}
            <Stack.Screen
                name="BookingDetails"
                component={BookingDetails}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown:false
                }}>
            </Stack.Screen>
            {/* booking details */}

            {/* all users */}
            <Stack.Screen
                name="AllUsers"
                component={AllUsers}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Property Owners',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />
                }}>
            </Stack.Screen>
            {/* all users */}

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
                    headerLeft: () => <ArrowBack />,

                }}>
            </Stack.Screen>
            {/* transaction details */}

            {/* property details */}
            <Stack.Screen
                name="PropertyDetails"
                component={PropertyDetails}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown: false
                }}>
            </Stack.Screen>
            {/* property details */}


            {/* property images */}
            <Stack.Screen
                name="PropertyImages"
                component={PropertyImages}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown: false
                }}>
            </Stack.Screen>
            {/* property images */}

            {/* user details */}
            <Stack.Screen
                name="UserDetails"
                component={UserDetails}
                options={{
                    title: 'User Details',
                    animation: 'slide_from_bottom',
                    // headerShown: false
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => <ArrowBack />
                }}>
            </Stack.Screen>
            {/* user details */}

        </Stack.Navigator>
    )
}

export default HomeStack

