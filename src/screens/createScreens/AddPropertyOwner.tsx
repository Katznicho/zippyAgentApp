import { StyleSheet, Text, View, ScrollView, Keyboard, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { generalStyles } from '../utils/generatStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PhoneInput from "react-native-phone-number-input";
import { validateEmail } from '../utils/helpers/helpers';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/theme';
import { REGISTER_PROPERTY_OWNER } from '../utils/constants/routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { ActivityIndicator } from '../../components/ActivityIndicator';

const AddPropertyOwner = () => {

    const tabBarHeight = useBottomTabBarHeight();

    const { authToken } = useSelector((state: RootState) => state.user);

    const navigation = useNavigation<any>();

    const [email, setEmail] = React.useState<any>('');
    const [fullName, setFullName] = React.useState<any>('');
    const [password, setPassword] = React.useState<any>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>({})

    // const [formattedValue, setFormattedValue] = useState("");
    const [phoneNumber, setPhoneNumber] = React.useState<any>('');
    const [valid, setValid] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);
    //phone number details


    const onRegister = async () => {

        // Validate email format
        if (!validateEmail(email)) {

            setErrors((prevErrors: any) => ({
                ...prevErrors,
                email: 'Invalid email format',
            }));
            return;

        } else {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                email: '',
            }));
        }




        setLoading(true)
        Keyboard.dismiss()

        try {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append("Authorization", `Bearer ${authToken}`);

            const body = new FormData();
            body.append('email', email.toLowerCase());
            body.append('name', fullName);
            body.append("phone_number", phoneNumber)

            fetch(`${REGISTER_PROPERTY_OWNER}`, {
                method: 'POST',
                headers,
                body,
            })
                .then(response => response.json())
                .then(async result => {

                    if (result?.errors) {
                        setErrors(result.errors);
                        showMessage({
                            message: "Error",
                            description: "An error occured while registering property owner",
                            type: "info",
                            autoHide: true,
                            duration: 3000,
                            icon: "danger"
                        })
                        return setLoading(false);
                    }

                    if (result.response === 'failure') {
                        setErrors({
                            // email: [result?.message],
                            phoneNumber: [result?.message],
                        });
                        showMessage({
                            message: "Error",
                            description: result?.message,
                            type: "info",
                            autoHide: true,
                            duration: 3000,
                            icon: "danger"
                        })
                        return setLoading(false);
                    }

                    if (result?.response === 'success') {
                        showMessage({
                            message: "Property Owner Added",
                            description: "The property owner has been created successfully",
                            type: "success",
                            autoHide: true,
                            duration: 3000,
                            icon: "success"
                        })
                        setLoading(false);
                        return navigation.navigate("VerifyPropertyOwner", { email, phone_number: phoneNumber });


                    }

                    setLoading(false);
                })
                .catch(error => {
                    console.log('error', error);

                    setLoading(false);
                });
        }
        catch (error) {
            setLoading(false);
            showMessage({
                message: "Error",
                description: "An error occured while creating your account",
                type: "info",
                autoHide: true,
                duration: 3000,
                icon: "danger"
            })
        }

    }



    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: tabBarHeight }}
                keyboardShouldPersistTaps="always"
            >

                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
                        Add Property Owner
                    </Text>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[generalStyles.textStyle]}>
                        The property owner will be able to manage their property.
                    </Text>
                </View>

                {/* full name */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Full  Name</Text>
                    </View>

                    <TextInput
                        style={[generalStyles.formInput, styles.extraMargingRight]}
                        placeholder={'enter full name'}
                        keyboardType="default"
                        placeholderTextColor={COLORS.primaryWhiteHex}
                        onChangeText={text => setFullName(text)}
                        value={fullName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <View>
                        {errors.communityName && <Text style={generalStyles.errorText}>{errors.communityName}</Text>}
                    </View>

                </View>
                {/* full name */}

                {/* phone number */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Phone Number </Text>
                    </View>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={phoneNumber}
                        defaultCode="UG"
                        layout="second"
                        onChangeFormattedText={(text) => {
                            setPhoneNumber(text);
                        }}
                        placeholder={'enter phone number'}
                        containerStyle={[generalStyles.formInput, { backgroundColor: COLORS.primaryLightWhiteGrey, }]}
                        textContainerStyle={{ paddingVertical: 0, backgroundColor: COLORS.primaryLightWhiteGrey }}
                        textInputProps={{
                            placeholderTextColor: COLORS.primaryWhiteHex
                        }}
                    />
                    <View>
                        {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
                    </View>

                </View>
                {/* phone number */}



                {/* email */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Email</Text>
                    </View>

                    <TextInput
                        style={[generalStyles.formInput, styles.extraMargingRight]}
                        placeholder={'enter email'}
                        keyboardType="email-address"
                        placeholderTextColor={COLORS.primaryWhiteHex}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <View>
                        {errors.email && <Text style={generalStyles.errorText}>{errors.email}</Text>}
                    </View>

                </View>
                {/* email */}

                <TouchableOpacity
                    activeOpacity={1}
                    style={generalStyles.loginContainer}
                    onPress={() => onRegister()}>
                    <Text style={generalStyles.loginText}>{'Add Property Owner'}</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator />}
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default AddPropertyOwner

const styles = StyleSheet.create({
    icon: {
        marginLeft: -20,
    },
    viewStyles: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 15
    },
    extraMargingRight: {
        marginRight: 15
    }
})