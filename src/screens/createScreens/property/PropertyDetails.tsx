import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { generalStyles } from '../../utils/generatStyles';
import { COLORS, FONTFAMILY } from '../../../theme/theme';
import { RootState } from '../../../redux/store/dev';
import { useSelector } from 'react-redux';
import { Picker } from 'react-native-ui-lib';
import Entypo from 'react-native-vector-icons/Entypo';




const PropertyDetails = ({ property, setProperty, propertyOwners, currencies, categories, paymentPeriods, goToNextStep, errors }: any) => {

    const tabBarHeight = useBottomTabBarHeight();
    const { authToken } = useSelector((state: RootState) => state.user);

    const isDisabled = () => {
        if (property?.owner_id == "" || property?.category_id == "" || property?.currency_id == ""|| property?.payment_period_id == "" || property?.name == "" || property?.number_of_beds == "" ||
            property?.number_of_baths == "" || property?.price == "") {
            return true
        }
        else {
            return false
        }
    }


    return (
        <View style={{ flex: 1, paddingBottom: tabBarHeight }}>
            <View>

                {/* property owner */}
                {
                    propertyOwners.length > 0 && (
                        <View style={styles.formContainer}>
                            <View>
                                <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                                    Select Property Owner*</Text>
                            </View>
                            <Picker
                                placeholder=" select property owner"
                                placeholderTextColor={COLORS.primaryLightGreyHex}
                                value={property?.owner_id}
                                style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                                enableModalBlur={false}
                                onChange={item => {
                                    return setProperty((prev: any) => {
                                        return { ...prev, owner_id: item }
                                    })
                                }}
                                trailingAccessory={<View style={styles.iconStyles}>
                                    <Entypo name="chevron-down" size={20} color={COLORS.primaryWhiteHex} />
                                </View>}
                                color={COLORS.primaryWhiteHex}
                                topBarProps={{ title: 'Property Owners' }}

                                showSearch
                                searchPlaceholder={'Search a property owners'}
                                searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}
                            // onSearchChange={value => console.warn('value', value)}
                            >
                                {propertyOwners.map((item: any) => (
                                    <Picker.Item key={item.id}
                                        value={item.id}
                                        label={item.name}
                                    />
                                ))}
                            </Picker>
                        </View>
                    )
                }

                {/* property owner */}


                {/* property name */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Property Name*</Text>
                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, styles.borderStyles]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            // placeholderStyle={{ borderColor: 'red' }}
                            keyboardType="default"
                            placeholder={'enter property name'}
                            onChangeText={text => setProperty((prev: any) => {
                                return { ...prev, name: text }
                            })
                            }
                            value={property?.name}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"

                        />
                    </View>

                    <View>
                        {errors.year_started && <Text style={generalStyles.errorText}>{errors.year_started}</Text>}
                    </View>

                </View>
                {/* property name */}


                {/* property category */}
                {
                    categories.length > 0 && (
                        <View style={styles.formContainer}>
                            <View>
                                <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                                    Select Property Type*</Text>
                            </View>
                            <Picker
                                placeholder=" select property type"
                                placeholderTextColor={COLORS.primaryLightGreyHex}
                                value={property?.category_id}
                                style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                                enableModalBlur={false}
                                onChange={item => {
                                    return setProperty((prev: any) => {
                                        return { ...prev, category_id: item }
                                    })
                                }}
                                trailingAccessory={<View style={styles.iconStyles}>
                                    <Entypo name="chevron-down" size={20} color={COLORS.primaryWhiteHex} />
                                </View>}
                                color={COLORS.primaryWhiteHex}
                                topBarProps={{ title: 'Property Types' }}

                                showSearch
                                searchPlaceholder={'Search a property types'}
                                searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}
                            // onSearchChange={value => console.warn('value', value)}
                            >
                                {categories.map((item: any) => (
                                    <Picker.Item key={item.id}
                                        value={item.id}
                                        label={item.name}
                                    />
                                ))}
                            </Picker>
                        </View>
                    )
                }
                {/* property category */}

                {/* room details area*/}


                <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'center' }]}>

                    <View style={styles.formContainer}>
                        <View>
                            <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                                Total BedRooms*</Text>
                        </View>
                        <View>
                            <TextInput
                                style={[generalStyles.formInput, styles.borderStyles, styles.fixedWidth]}
                                placeholderTextColor={COLORS.primaryWhiteHex}
                                // placeholderStyle={{ borderColor: 'red' }}
                                keyboardType="number-pad"
                                placeholder={'enter total bedrooms'}
                                onChangeText={text => setProperty((prev: any) => {
                                    return { ...prev, number_of_beds: text }
                                })
                                }
                                value={property?.number_of_beds}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"

                            />
                        </View>

                        <View>
                            {errors.year_started && <Text style={generalStyles.errorText}>{errors.year_started}</Text>}
                        </View>

                    </View>


                    <View style={styles.formContainer}>
                        <View>
                            <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                                Total Bathrooms*</Text>
                        </View>
                        <View>
                            <TextInput
                                style={[generalStyles.formInput, styles.borderStyles, styles.fixedWidth]}
                                placeholderTextColor={COLORS.primaryWhiteHex}
                                // placeholderStyle={{ borderColor: 'red' }}
                                keyboardType="number-pad"
                                placeholder={'total bathrooms'}
                                onChangeText={text => setProperty((prev: any) => {
                                    return { ...prev, number_of_baths: text }
                                })
                                }
                                value={property?.number_of_baths}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"

                            />
                        </View>

                        <View>
                            {errors.year_started && <Text style={generalStyles.errorText}>{errors.year_started}</Text>}
                        </View>

                    </View>

                </View>
                {/* room details area */}

                {/* currency area*/}
                {
                    currencies.length > 0 && (
                        <View style={styles.formContainer}>
                            <View>
                                <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                                    Select Property Currency*</Text>
                            </View>
                            <Picker
                                placeholder=" select property currency"
                                placeholderTextColor={COLORS.primaryLightGreyHex}
                                value={property?.currency_id}
                                style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                                enableModalBlur={false}
                                onChange={item => {
                                    return setProperty((prev: any) => {
                                        return { ...prev, currency_id: item }
                                    })
                                }}
                                trailingAccessory={<View style={styles.iconStyles}>
                                    <Entypo name="chevron-down" size={20} color={COLORS.primaryWhiteHex} />
                                </View>}
                                color={COLORS.primaryWhiteHex}
                                topBarProps={{ title: 'Property Currency' }}

                                showSearch
                                searchPlaceholder={'Search  property currencies'}
                                searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}
                            // onSearchChange={value => console.warn('value', value)}
                            >
                                {currencies.map((item: any) => (
                                    <Picker.Item key={item.id}
                                        value={item.id}
                                        label={item.name}
                                    />
                                ))}
                            </Picker>
                        </View>
                    )
                }
                {/* currency area */}


                {/* payment period */}
                {
                    paymentPeriods.length > 0 && (
                        <View style={styles.formContainer}>
                            <View>
                                <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                                    Select Payment Period*</Text>
                            </View>
                            <Picker
                                placeholder=" select  payment period"
                                placeholderTextColor={COLORS.primaryLightGreyHex}
                                value={property?.payment_period_id}
                                style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                                enableModalBlur={false}
                                onChange={item => {
                                    return setProperty((prev: any) => {
                                        return { ...prev, payment_period_id: item }
                                    })
                                }}
                                trailingAccessory={<View style={styles.iconStyles}>
                                    <Entypo name="chevron-down" size={20} color={COLORS.primaryWhiteHex} />
                                </View>}
                                color={COLORS.primaryWhiteHex}
                                topBarProps={{ title: 'Property Payment Period' }}

                                showSearch
                                searchPlaceholder={'Search  payment periods'}
                                searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}
                            // onSearchChange={value => console.warn('value', value)}
                            >
                                {paymentPeriods.map((item: any) => (
                                    <Picker.Item key={item.id}
                                        value={item.id}
                                        label={item.name}
                                    />
                                ))}
                            </Picker>
                        </View>
                    )
                }
                {/* payment period */}

                {/* property price */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Property Price*</Text>
                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, styles.borderStyles]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            // placeholderStyle={{ borderColor: 'red' }}
                            keyboardType="number-pad"
                            placeholder={'enter property price'}
                            onChangeText={text => setProperty((prev: any) => {
                                return { ...prev, price: text }
                            })
                            }
                            value={property?.price}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"

                        />
                    </View>

                    <View>
                        {errors.year_started && <Text style={generalStyles.errorText}>{errors.year_started}</Text>}
                    </View>

                </View>
                {/* property price */}

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

                </View>
                {/* button section */}
            </View>
        </View>
    )
}

export default PropertyDetails

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