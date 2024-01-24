import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import SelectCreateTab from '../screens/createScreens/SelectCreateTab';
import AddProperty from '../screens/createScreens/AddProperty';
import AddPropertyOwner from '../screens/createScreens/AddPropertyOwner';



const Stack = createNativeStackNavigator();

const CreateStack = () => {

    return (
        <Stack.Navigator initialRouteName="SelectCreateTab">
            <Stack.Screen

                name="SelectCreateTab"
                component={SelectCreateTab}
                options={{
                    title: 'On BOard',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',

                }}
            />

            <Stack.Screen

                name="AddProperty"
                component={AddProperty}
                options={{
                    title: 'Add Property',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',

                }}
            />

            <Stack.Screen

                name="AddPropertyOwner"
                component={AddPropertyOwner}
                options={{
                    title: 'Add Property Owner',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',

                }}
            />



        </Stack.Navigator>
    );
};

export default CreateStack;
