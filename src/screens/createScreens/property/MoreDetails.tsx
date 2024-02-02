import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { generalStyles } from '../../utils/generatStyles';
import { COLORS, FONTFAMILY } from '../../../theme/theme';
import { RootState } from '../../../redux/store/dev';
import { useSelector } from 'react-redux';
import { Picker } from 'react-native-ui-lib';
import Entypo from 'react-native-vector-icons/Entypo'
import TextArea from '../../../components/TextArea';
import UserLocation from '../../../components/Modals/UserLocation';



const MoreDetails = ({ property, setProperty, propertyStatus, furnishingStatus, goToNextStep, errors, setErrors, goBack }: any) => {

    const tabBarHeight = useBottomTabBarHeight();
    const { authToken } = useSelector((state: RootState) => state.user);
    const [openPicker, setOpenPicker] = useState<boolean>(false)


    const isDisabled = () => {
        if (property?.status_id == "" || property?.description == "" || property?.location == "") {
            return true
        }
        else {
            return false
        }
    }

    return (
        <View style={{ flex: 1, paddingBottom: tabBarHeight }}>
            <View>

                {/* property status */}
                {
                    propertyStatus.length > 0 && (
                        <View style={styles.formContainer}>
                            <View>
                                <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                                    Select Property Status*</Text>
                            </View>
                            <Picker
                                placeholder=" select property status"
                                placeholderTextColor={COLORS.primaryLightGreyHex}
                                value={property?.status_id}
                                style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                                enableModalBlur={false}
                                onChange={item => {
                                    return setProperty((prev: any) => {
                                        return { ...prev, status_id: item }
                                    })
                                }}
                                trailingAccessory={<View style={styles.iconStyles}>
                                    <Entypo name="chevron-down" size={20} color={COLORS.primaryWhiteHex} />
                                </View>}
                                color={COLORS.primaryWhiteHex}
                                topBarProps={{ title: 'Property Status' }}

                                showSearch
                                searchPlaceholder={'Search a property status'}
                                searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}
                            // onSearchChange={value => console.warn('value', value)}
                            >
                                {propertyStatus.map((item: any) => (
                                    <Picker.Item key={item.id}
                                        value={item.id}
                                        label={item.name}
                                    />
                                ))}
                            </Picker>
                        </View>
                    )
                }
                {/* property status */}

                {/* year built */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Year Built</Text>
                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, styles.borderStyles]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            // placeholderStyle={{ borderColor: 'red' }}
                            keyboardType="number-pad"
                            placeholder={'enter year built'}
                            onChangeText={text => setProperty((prev: any) => {
                                return { ...prev, year_built: text }
                            })
                            }
                            value={property?.year_built}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"

                        />
                    </View>

                    <View>
                        {errors.year_started && <Text style={generalStyles.errorText}>{errors.year_started}</Text>}
                    </View>

                </View>
                {/* year built */}



                {/* property description */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>Property Description</Text>
                    </View>
                    <View>
                        <TextArea
                            placeholder="describe your property"
                            text={property?.description}
                            setText={(text: any) => {
                                return setProperty((prev: any) => {
                                    return { ...prev, description: text }
                                })
                            }
                            }
                        />


                    </View>

                    <View>
                        {errors.description && <Text style={generalStyles.errorText}>{errors.description}</Text>}
                    </View>

                </View>
                {/* property description */}

                {/* location */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Property Location*</Text>
                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, styles.borderStyles]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            // placeholderStyle={{ borderColor: 'red' }}
                            keyboardType="default"
                            placeholder={'enter current property  location'}
                            onChangeText={text => setOpenPicker(true)}
                            value={property.location}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"

                        />


                    </View>

                    <View>
                        {errors.location && <Text style={generalStyles.errorText}>{errors.location}</Text>}
                    </View>

                </View>
                {/* location */}

                {/* location */}
                <UserLocation
                    openPicker={openPicker}
                    setOpenPicker={setOpenPicker}
                    property={property}
                    setProperty={setProperty}
                    title={"WHERE IS YOUR PROPERTY LOCATED?"}
                    placeholder={"enter current property location"}
                />
                {/* location */}

                {/* furnishing status */}
                {
                    furnishingStatus.length > 0 && (
                        <View style={styles.formContainer}>
                            <View>
                                <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                                    Select Property Furnishing Status</Text>
                            </View>
                            <Picker
                                placeholder=" select property furnishing status"
                                placeholderTextColor={COLORS.primaryLightGreyHex}
                                value={property?.furnishing_status}
                                style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                                enableModalBlur={false}
                                onChange={item => {
                                    return setProperty((prev: any) => {
                                        return { ...prev, furnishing_status: item }
                                    })
                                }}
                                trailingAccessory={<View style={styles.iconStyles}>
                                    <Entypo name="chevron-down" size={20} color={COLORS.primaryWhiteHex} />
                                </View>}
                                color={COLORS.primaryWhiteHex}
                                topBarProps={{ title: 'Property Furnishing Status' }}

                                showSearch
                                searchPlaceholder={'Search a property furnishing status'}
                                searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}
                            // onSearchChange={value => console.warn('value', value)}
                            >
                                {furnishingStatus.map((item: any) => (
                                    <Picker.Item key={item.name}
                                        value={item.name}
                                        label={item.name}
                                    />
                                ))}
                            </Picker>
                        </View>
                    )
                }
                {/* furnishing status */}


                {/* property size */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Property SIze</Text>
                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, styles.borderStyles]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            // placeholderStyle={{ borderColor: 'red' }}
                            keyboardType="default"
                            placeholder={'enter property size'}
                            onChangeText={text => setProperty((prev: any) => {
                                return { ...prev, property_size: text }
                            })
                            }
                            value={property?.property_size}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"

                        />
                    </View>

                    <View>
                        {errors.property_size && <Text style={generalStyles.errorText}>{errors.property_size}</Text>}
                    </View>

                </View>
                {/* property size */}




                {/* button section */}
                <View>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer,
                        styles.buttonStyles,
                        { backgroundColor: isDisabled() ? COLORS.primaryLightGreyHex : COLORS.primaryOrangeHex }
                        ]}
                        onPress={goToNextStep}
                        disabled={isDisabled()}
                    >
                        <Text style={generalStyles.loginText}>{'Next'}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer,
                        styles.buttonStyles
                        ]}
                        onPress={goBack}
                    // disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
                    >
                        <Text style={generalStyles.loginText}>{'Back'}</Text>
                    </TouchableOpacity>



                </View>
                {/* button section */}
            </View>
        </View>
    )
}

export default MoreDetails

const styles = StyleSheet.create({
    viewStyles: {
        marginHorizontal: 10, marginVertical: 5
    },
    borderStyles: {
        borderWidth: 0.5,
        borderBottomWidth: 0.5,
        height: 45,
        borderColor: COLORS.primaryLightGreyHex,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    formContainer: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    inlineTextInputStyles: {
        width: "100%"
    },
    buttonStyles: {
        width: "80%",
        marginTop: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    extraMargingRight: {
        marginRight: 30
    },
    fieldStyles: {
        borderBottomColor: COLORS.primaryWhiteHex,
        borderBottomWidth: 2,
        // height: 45
        fontSize: 15,
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex
    },
    labelStyles: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 15
    },
    iconStyles: {
        position: 'absolute',
        right: 10
    },
    fixedWidth: {
        width: 142
    }
})