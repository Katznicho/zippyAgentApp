import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SelectCreateTab = () => {

    const tabBarHeight = useBottomTabBarHeight();

    const navgation = useNavigation<any>();

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
                <View>
                    <View style={[styles.viewStyles, generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <TouchableOpacity style={[styles.CardContainer]}
                            activeOpacity={1}
                            onPress={() => navgation.navigate('AddPropertyOwner')}
                        >
                            <View style={[{ alignItems: 'center', justifyContent: 'space-between' }]}>
                                <AntDesign name="adduser" size={20} color={COLORS.primaryOrangeHex} />
                                <Text style={[styles.CardSubtitle]}>Add Property Owner</Text>

                            </View>


                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.CardContainer]}
                            onPress={() => navgation.navigate('AddProperty')}
                        >
                            <View style={[{ alignItems: 'center', justifyContent: 'space-between' }]}>
                                <MaterialIcons name="house" size={20} color={COLORS.primaryOrangeHex} />
                                <Text style={[styles.CardSubtitle]}>Add Property </Text>

                            </View>

                        </TouchableOpacity>

                    </View>

                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default SelectCreateTab

const styles = StyleSheet.create({
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_12,
        marginHorizontal: SPACING.space_10
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    viewStyles: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    CardContainer: {
        // backgroundColor: COLORS.primaryBlackHex,
        // paddingHorizontal: SPACING.space_28,
        paddingVertical: SPACING.space_15,
        // borderRadius: SPACING.space_8,
        width: 150,
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: SPACING.space_8,
        // padding: SPACING.space_10,
        elevation: 10

    },
    overAllContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: SPACING.space_8,
        // padding: SPACING.space_10,
        elevation: 10
    },
    additionCardContainerStyles: {
        borderRightWidth: 0.5, borderRightColor: COLORS.primaryLightGreyHex
    }
})