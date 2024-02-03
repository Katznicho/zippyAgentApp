import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import { generalStyles } from '../screens/utils/generatStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const PropertyCard: React.FC<any> = ({ item }: any) => {



    const navigation = useNavigation<any>()
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.cardContainer]}
        >
            <View style={[generalStyles.flexStyles, { justifyContent: 'space-between' }]}>
                <View>
                    {/* location */}
                    <View>
                        <Text style={styles.CardTitle}>{item?.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.CardSubtitle}>in {item?.location}</Text>
                    </View>
                    {/* location */}
                </View>

                <View>
                    <View>
                        <Text style={styles.CardPriceCurrency}>{item?.currency?.name} {item?.price}</Text>

                    </View>
                    <View style={[generalStyles.flexStyles, { justifyContent: 'center', alignItems: "center" }]}>
                        <AntDesign name="delete"
                            size={25}
                            color={COLORS.primaryRedHex}
                            style={styles.spacingStyles}
                        />
                        <AntDesign name="edit"
                            size={25}
                            color={COLORS.primaryOrangeHex}
                            style={styles.spacingStyles}
                        />
                    </View>

                </View>

            </View>

            <TouchableOpacity
                activeOpacity={1}
                style={[generalStyles.loginContainer,
                styles.buttonStyles,
                ]}
                onPress={() => navigation.navigate('PropertyDetails', { item })}

            >
                <Text style={generalStyles.loginText}>{'View More'}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default PropertyCard

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 10,
        padding: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
        // marginHorizontal: 5
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
        // marginHorizontal: SPACING.space_10
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_12,
    },
    spacingStyles: {
        marginHorizontal: 5,
        marginVertical: 5
    },
    buttonStyles: {
        width: "80%",
        marginTop: 5,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 20,
        padding: 10
    },
    ImageInfoOuterContainer: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
        borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
    },

})