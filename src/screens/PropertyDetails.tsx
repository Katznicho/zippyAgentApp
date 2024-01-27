import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-ui-lib'
import { generalStyles } from './utils/generatStyles'
import { useRoute } from '@react-navigation/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { PUBLIC_STORAGE } from './utils/constants/constants'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import EvilIcons from 'react-native-vector-icons/EvilIcons'


const PropertyDetails: React.FC<any> = () => {
    const tabBarHeight = useBottomTabBarHeight();
    const { item } = useRoute<any>().params
    console.log(`${PUBLIC_STORAGE}/properties/${item?.cover_image}`)
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
                {/* show background image */}
                <ImageBackground
                    source={{ uri: `${PUBLIC_STORAGE}/properties/${item?.cover_image}` }}
                    style={{ width: '100%', height: 200 }}
                >
                </ImageBackground>
                {/* show background */}

                {/* view more images */}
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer, {
                            marginTop: 5,
                            // backgroundColor: COLORS.primaryBlackHex,
                            // color: COLORS.primaryOrangeHex
                        }]}
                    // onPress={() => onPressLogin()}
                    >
                        <Text style={generalStyles.loginText}>{'View More Images'}</Text>
                    </TouchableOpacity>

                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>
                        <View>
                            <Text style={styles.CardTitle} >Name</Text>
                            <Text style={styles.CardSubtitle}>{item?.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Category</Text>
                            <Text style={styles.CardSubtitle}>{item?.category?.name}</Text>
                        </View>

                    </View>
                    <View>
                        <View>
                            <Text style={styles.CardTitle} >Location</Text>
                            <Text style={styles.CardSubtitle}>{item?.location}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Room Type</Text>
                            <Text style={styles.CardSubtitle}>{item?.room_type}</Text>
                        </View>

                    </View>

                    <View>
                        <View>
                            <Text style={styles.CardTitle} >Price</Text>
                            <Text style={styles.CardSubtitle}>{item.currency} {item?.price}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Total Rooms</Text>
                            <Text style={styles.CardSubtitle}>{item?.number_of_rooms}</Text>
                        </View>

                    </View>

                    <View >
                        <View>
                            <Text style={styles.CardTitle} >Total Bedrooms</Text>
                            <Text style={styles.CardSubtitle}>{item?.number_of_beds}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Total Bathrooms</Text>
                            <Text style={styles.CardSubtitle}>{item?.number_of_baths}</Text>
                        </View>

                    </View>
                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>
                        <View>
                            <Text style={styles.CardTitle} >Status</Text>
                            <Text style={styles.CardSubtitle}>{item?.status}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Zippy ID</Text>
                            <Text style={styles.CardSubtitle}>{item?.zippy_id}</Text>
                        </View>

                    </View>

                    <View >
                        <View>
                            <Text style={styles.CardTitle} >Description</Text>
                            <Text style={styles.CardSubtitle}>{item?.description}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Year Built</Text>
                            <Text style={styles.CardSubtitle}>{item?.year_built}</Text>
                        </View>

                    </View>

                    <View >
                        <View>
                            <Text style={styles.CardTitle} >Furnishing Status</Text>
                            <Text style={styles.CardSubtitle}>{item?.furnishing_status}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Property Size</Text>
                            <Text style={styles.CardSubtitle}>{item?.property_size}</Text>
                        </View>

                    </View>

                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]} >
                        <View>
                            <Text style={styles.CardTitle} >Approved</Text>
                            <Text style={styles.CardSubtitle}>{item?.is_approved ? 'Yes' : "No"}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Availability</Text>
                            <Text style={styles.CardSubtitle}>{item?.is_available ? "Yes" : "No"}</Text>
                        </View>

                    </View>

                </View>

                {/* view more images */}
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default PropertyDetails

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
})