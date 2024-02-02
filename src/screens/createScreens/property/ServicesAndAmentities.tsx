import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RootState } from '../../../redux/store/dev';
import { useSelector } from 'react-redux';
import { COLORS, FONTFAMILY } from '../../../theme/theme';
import { generalStyles } from '../../utils/generatStyles';
import { Checkbox } from 'react-native-ui-lib'
import TextArea from '../../../components/TextArea';
const ServicesAndAmentities = ({ property, setProperty, amenities, services, goToNextStep, errors, setErrors, goBack }: any) => {
    const tabBarHeight = useBottomTabBarHeight();
    const { authToken } = useSelector((state: RootState) => state.user);


    const isDisabled = () => {
        if (property?.services?.length == 0 || property?.amenities?.length == 0 || property?.public_facilities == "") {
            return true
        }
        else {
            return false
        }
    }

    return (
        <View style={{ flex: 1, paddingBottom: tabBarHeight }}>

            <View>
                {/* services */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Select Property Services*</Text>
                    </View>
                    <View>
                        {
                            services.map((item: any) => {
                                return (
                                    <Checkbox
                                        key={item.id}
                                        label={item.name}
                                        value={property.services?.includes(item.id)}
                                        color={COLORS.primaryOrangeHex}
                                        containerStyle={styles.viewStyles}
                                        onValueChange={(isChecked: boolean) => {
                                            // Check if the service ID is already in the array
                                            const isServiceInArray = property.services?.includes(item.id);

                                            // Create a new array based on the checkbox state
                                            let updatedServices: any[];

                                            if (isChecked && !isServiceInArray) {
                                                // Add the service ID to the array if the checkbox is checked and the ID is not present
                                                updatedServices = [...(property.services || []), item.id];
                                            } else if (!isChecked && isServiceInArray) {
                                                // Remove the service ID from the array if the checkbox is unchecked and the ID is present
                                                updatedServices = (property.services || []).filter((id: string) => id !== item.id);
                                            } else {
                                                // No change needed if the checkbox state and array state are consistent
                                                updatedServices = property.services;
                                            }

                                            // Update the state
                                            setProperty((prev: any) => {
                                                return { ...prev, services: updatedServices };
                                            });
                                        }}
                                    />
                                );
                            })

                        }
                    </View>

                    <View>
                        {errors.services && <Text style={generalStyles.errorText}>{errors.services}</Text>}
                    </View>

                </View>
                {/* services */}

                {/* amentities */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Select Property Amenties*</Text>
                    </View>
                    <View>
                        {
                            amenities.map((item: any) => {
                                return (
                                    <Checkbox
                                        key={item.id}
                                        label={item.name}
                                        value={property.amenities?.includes(item.id)}
                                        color={COLORS.primaryOrangeHex}
                                        containerStyle={styles.viewStyles}
                                        onValueChange={(isChecked: boolean) => {
                                            // Check if the amenity ID is already in the array
                                            const isAmenityInArray = property.amenities?.includes(item.id);

                                            // Create a new array based on the checkbox state
                                            let updatedAmenities: any[];

                                            if (isChecked && !isAmenityInArray) {
                                                // Add the amenity ID to the array if the checkbox is checked and the ID is not present
                                                updatedAmenities = [...(property.amenities || []), item.id];
                                            } else if (!isChecked && isAmenityInArray) {
                                                // Remove the amenity ID from the array if the checkbox is unchecked and the ID is present
                                                updatedAmenities = (property.amenities || []).filter((id: string) => id !== item.id);
                                            } else {
                                                // No change needed if the checkbox state and array state are consistent
                                                updatedAmenities = property.amenities;
                                            }

                                            // Update the state
                                            setProperty((prev: any) => {
                                                return { ...prev, amenities: updatedAmenities };
                                            });
                                        }}
                                    />
                                );
                            })


                        }
                    </View>

                    <View>
                        {errors.amenities && <Text style={generalStyles.errorText}>{errors.amenities}</Text>}
                    </View>

                </View>
                {/* amentities */}

                {/* property description */}
                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>Public Facilities*</Text>
                    </View>
                    <View>
                        <TextArea
                            placeholder="please enter public facilities near the property for example near mulago, opposite wandegeya market etc"
                            text={property?.public_facilities}
                            setText={(text: any) => {
                                return setProperty((prev: any) => {
                                    return { ...prev, public_facilities: text }
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
                {/* button section */}

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
                <View>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer,
                        styles.buttonStyles
                        ]}
                        onPress={goBack}
                    >
                        <Text style={generalStyles.loginText}>{'Back'}</Text>
                    </TouchableOpacity>





                </View>
                {/* button section */}

            </View>

        </View>
    )
}

export default ServicesAndAmentities

const styles = StyleSheet.create({
    viewStyles: {
        marginHorizontal: 10, marginVertical: 5
    },

    formContainer: {
        marginVertical: 10,
        marginHorizontal: 15
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

})