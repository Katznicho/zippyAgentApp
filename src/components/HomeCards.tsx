import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { usePostQuery } from '../hooks/usePostQuery';
import { useNavigation } from '@react-navigation/native';

const HomeCards: React.FC<any> = () => {

    const { data, error, isLoading } = usePostQuery<any>({
        endpoint: '/getAgentTotals',
        params: {
            "total": "userTotals"
        },
        queryOptions: {
            enabled: true,
            refetchInterval: 4000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    })

    const navigation = useNavigation<any>()




    return (
        <View>
            <View style={[styles.viewStyles, generalStyles.flexStyles, styles.overAllContainer, { alignItems: 'center', justifyContent: 'space-between' }]}>
                <TouchableOpacity style={[styles.CardContainer, styles.additionCardContainerStyles]}
                    activeOpacity={1}
                    // onPress={() => setOpenPicker(true)}
                    onPress={() => navigation.navigate('AllUsers')}
                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <View>
                            <Text style={[styles.CardTitle]}>{data?.data?.total_referrals ?? 0}</Text>
                        </View>
                        <Text style={[styles.CardSubtitle]}>Property Owners</Text>

                    </View>


                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navigation.navigate('AllProperties')}
                    style={[styles.CardContainer]}
                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <View>
                            <Text style={[styles.CardTitle]}>{data?.data?.total_properties ?? 0}</Text>
                        </View>
                        <Text style={[styles.CardSubtitle]}>Properties </Text>

                    </View>

                </TouchableOpacity>

            </View>

        </View>
    )
}

export default HomeCards

const styles = StyleSheet.create({
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
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
        paddingHorizontal: SPACING.space_28,
        paddingVertical: SPACING.space_15,
        // borderRadius: SPACING.space_8,
        width: 150
    },
    overAllContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: SPACING.space_8,
        padding: SPACING.space_10,
        elevation: 10
    },
    additionCardContainerStyles: {
        borderRightWidth: 0.5, borderRightColor: COLORS.primaryLightGreyHex
    }
})