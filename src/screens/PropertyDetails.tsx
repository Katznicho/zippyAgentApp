import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-ui-lib'
import { generalStyles } from './utils/generatStyles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { PUBLIC_STORAGE } from './utils/constants/constants'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GradientBGIcon from '../components/GradientBGIcon'
import { onMakeCall } from './utils/helpers/helpers'



const PropertyDetails: React.FC<any> = () => {

    const tabBarHeight = useBottomTabBarHeight();
    const { item } = useRoute<any>().params
    const navigation = useNavigation<any>();



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
                    style={styles.ItemBackgroundImage}
                >
                    {/* back handler */}
                    <View style={styles.ImageHeaderBarContainerWithBack}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <GradientBGIcon
                                name="left"
                                color={COLORS.primaryOrangeHex}
                                size={FONTSIZE.size_16}
                            />
                        </TouchableOpacity>


                    </View>

                    {/* back handler */}

                    {/* more details */}


                    {/* more details */}
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
                        onPress={() => navigation.navigate('PropertyImages', { item })}
                    >
                        <Text style={generalStyles.loginText}>{'View More Images'}</Text>
                    </TouchableOpacity>


                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

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
                            <Text style={styles.CardTitle} >Payment Period</Text>
                            <Text style={styles.CardSubtitle}>{item?.payment_period?.name}</Text>
                        </View>

                    </View>

                    <View>
                        <View>
                            <Text style={styles.CardTitle} >Price</Text>
                            <Text style={styles.CardSubtitle}>{item?.currency?.name} {item?.price}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Total Rooms</Text>
                            <Text style={styles.CardSubtitle}>{item?.number_of_rooms}</Text>
                        </View>

                    </View>

                    {/* actions and total bookings */}

                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]} >
                        <View>
                            <Text style={styles.CardTitle} >Total Bookings</Text>
                            <Text style={styles.CardSubtitle}>0</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Actions</Text>
                            {/* actions area */}
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
                            {/* actions area */}
                        </View>

                    </View>
                    {/* actions and total bookings */}

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
                            <Text style={styles.CardSubtitle}>{item?.status?.name}</Text>
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
                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]} >
                        <View>
                            <Text style={styles.CardTitle} >Total Likes</Text>
                            <Text style={styles.CardSubtitle}>{0}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Comments</Text>
                            <Text style={styles.CardSubtitle}>{0}</Text>
                        </View>

                    </View>
                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]} >
                        <View>
                            <Text style={styles.CardTitle} >Services</Text>
                            {/* <Text style={styles.CardSubtitle}>{item?.is_approved ? 'Yes' : "No"}</Text> */}
                            {
                                item?.services?.map((service: any, index: number) => {
                                    return (
                                        <Text style={styles.CardSubtitle} key={index}>{service?.name}</Text>
                                    )
                                })
                            }
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Amentities</Text>
                            {
                                item?.amenities?.map((amentity: any, index: number) => {
                                    return (
                                        <Text style={styles.CardSubtitle} key={index}>{amentity?.name}</Text>
                                    )
                                })
                            }
                        </View>

                    </View>
                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

                    {/* public facilties */}
                    <View >
                        <View>
                            <Text style={styles.CardTitle} >Public facilties</Text>
                            {/* <Text style={styles.CardSubtitle}>{item?.is_approved ? 'Yes' : "No"}</Text> */}
                            {
                                item?.public_facilities?.map((facility: any, index: number) => {
                                    return (
                                        <Text style={styles.CardSubtitle} key={index}>{facility}</Text>
                                    )
                                })
                            }
                        </View>


                    </View>
                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
                    {/* public facilties */}

                    {/* owner details */}

                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]} >
                        <View>
                            <Text style={styles.CardTitle} >Owner</Text>
                            <Text style={styles.CardSubtitle}>{item?.owner?.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Phone Number</Text>
                            <Text style={styles.CardSubtitle}>{item?.owner?.phone_number}</Text>
                        </View>

                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer, { marginTop: 0, padding: 10 }]}
                        onPress={() => onMakeCall(item?.owner?.phone_number)}>
                        <Text style={generalStyles.loginText}>{'Call Owner'}</Text>
                    </TouchableOpacity>
                    {/* owner details */}


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
        margin: 5,
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
    hairLineStyles: {
        width: "80%",
        // marginHorizontal: 40,
        marginVertical: 10
    },
    spacingStyles: {
        marginHorizontal: 5,
        // marginVertical: 5
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ItemBackgroundImage: {
        width: '100%',
        aspectRatio: 25 / 15,
        justifyContent: 'space-between',
    },


})