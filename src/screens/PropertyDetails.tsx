import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-ui-lib'
import { generalStyles } from './utils/generatStyles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { formatCurrency, onMakeCall } from './utils/helpers/helpers'
import ArrowBack from '../components/ArrowBack'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const { width } = Dimensions.get('window');

const PropertyDetails: React.FC<any> = () => {

    const tabBarHeight = useBottomTabBarHeight();
    const { item } = useRoute<any>().params
    const navigation = useNavigation<any>();

    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const onScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / width);
        setCurrentImageIndex(index);
    };



    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: tabBarHeight }}
                keyboardShouldPersistTaps="always"
                showsHorizontalScrollIndicator={false}
            >
                {/* show background image */}
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                >


                    {item?.property_images?.map((image: string, index: number) => (

                        <ImageBackground
                            key={index}
                            source={{ uri: image }}
                            style={[styles.dataBackgroundImage, { width: width }]}
                        >
                            {/* positioned number */}
                            <View style={styles.imageIndicatorContainer}>
                                <Text style={styles.imageIndicatorText}>
                                    {currentImageIndex + 1}/{item?.property_images?.length}
                                </Text>
                            </View>
                            {/* positioned number */}

                            <View style={styles.ImageHeaderBarContainerWithBack}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        navigation.goBack();
                                    }}
                                >
                                    {/* <ArrowBack /> */}
                                    <ArrowBack
                                        size={20}
                                        color
                                        styles={{
                                            backgroundColor: COLORS.primaryBlackHex,
                                            padding: 5,
                                            borderRadius: 25,
                                            width: 30,
                                            height: 30,
                                            marginTop: -10,
                                            marginLeft: 10
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>


                            {/* positited arrow right */}
                            <TouchableOpacity
                                style={[styles.rightArrow]}
                                activeOpacity={1}
                                onPress={() => {
                                    const newIndex = currentImageIndex + 1;
                                    if (newIndex < item?.property_images?.length) {
                                        setCurrentImageIndex(newIndex);
                                    }
                                }}
                            >
                                <MaterialIcons
                                    name="arrow-forward-ios"
                                    size={30}
                                    color={COLORS.primaryBlackHex}
                                    onPress={() => {
                                        const newIndex = currentImageIndex + 1;
                                        if (newIndex < item?.property_images?.length) {
                                            setCurrentImageIndex(newIndex);
                                        }
                                    }}
                                />

                            </TouchableOpacity>
                            {/* positioned arrow right */}

                            {/* positioned arrow left */}
                            <TouchableOpacity
                                style={[styles.leftArrow]}
                                activeOpacity={1}
                                onPress={() => {
                                    const newIndex = currentImageIndex + 1;
                                    if (newIndex < item?.property_images?.length) {
                                        setCurrentImageIndex(newIndex);
                                    }
                                }}
                            >
                                <MaterialIcons
                                    name="arrow-back-ios"
                                    size={30}
                                    color={COLORS.primaryBlackHex}
                                    onPress={() => {
                                        const newIndex = currentImageIndex + 1;
                                        if (newIndex < item?.property_images?.length) {
                                            setCurrentImageIndex(newIndex);
                                        }
                                    }}
                                />

                            </TouchableOpacity>
                            {/* positioned arrow left */}
                        </ImageBackground>
                    ))}

                </ScrollView>
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
                            <Text style={styles.CardSubtitle}>{item?.currency?.name} {formatCurrency(parseInt(item?.price))}</Text>
                        </View>
                         <View>
                            <Text style={styles.CardTitle} > Room Type</Text>
                            <Text style={styles.CardSubtitle}>{item?.room_type}</Text>
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
        fontFamily: FONTFAMILY.roboto_regular,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.roboto_regular,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
        // marginHorizontal: SPACING.space_10
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.roboto_regular,
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
    
    leftArrow: {
        position: 'absolute',
        top: 100,
        left: 10,
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    rightArrow: {
        position: 'absolute',
        top: 100,
        right: 10,
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    dataBackgroundImage: {
        aspectRatio: 25 / 15,
        justifyContent: 'space-between'
    },
    imageIndicatorContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    imageIndicatorText: {
        color: 'white',
        fontSize: 14
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 10 : 0
    },


})