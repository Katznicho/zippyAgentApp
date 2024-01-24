import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { generalStyles } from '../../utils/generatStyles';
import { COLORS } from '../../../theme/theme';

const PropertyLocation = ({ property, setProperty, goToNextStep, errors, setErrors, goBack }: any) => {

    const tabBarHeight = useBottomTabBarHeight();

    return (
        <View style={{ flex: 1, paddingBottom: tabBarHeight }}>
            <View>
                {/* button section */}
                <View>
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
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer,
                        styles.buttonStyles,
                            // { backgroundColor: isDisabled() ? COLORS.primaryLightGreyHex : COLORS.primaryOrangeHex }
                        ]}
                        onPress={goToNextStep}
                    // disabled={isDisabled()}
                    // disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
                    >
                        <Text style={generalStyles.loginText}>{'Next'}</Text>
                    </TouchableOpacity>

                </View>
                {/* button section */}
            </View>
        </View>
    )
}

export default PropertyLocation

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
    }
})