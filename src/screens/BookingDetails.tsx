import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Linking,
    Alert,
    Platform,
    Image,
    Dimensions
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { generalStyles } from './utils/generatStyles';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
// import QRCode from 'react-native-qrcode-svg';
import {
    calculateDistance,
    formatCurrency,
    onMakeCall
} from './utils/helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';

import { showMessage } from 'react-native-flash-message';
import { ActivityIndicator } from '../components/ActivityIndicator';
import ArrowBack from '../components/ArrowBack';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useGetUserLocation from '../hooks/useGetUserLocation';
import Collapsible from 'react-native-collapsible';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DEFAULT_USER_PROFILE, PUBLIC_STORAGE } from './utils/constants/constants';

const { height, width } = Dimensions.get('window');

const BookingDetails = () => {
    const navigation = useNavigation<any>();
    const { data } = useRoute<any>().params;
    const { authToken } = useSelector((state: RootState) => state.user);
    const { position } = useGetUserLocation();
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const isFocused  = useNavigation().isFocused();

    const openMapsForDirections = () => {
        const destination = `${data?.lat},${data?.long}`;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        return Linking.openURL(url);
    };

    const [liked, setLiked] = useState<boolean>(false);

    const [servicesCollapsed, setServicesCollapsed] = useState<boolean>(true);
    const [amenitiesCollapsed, setAmenitiesCollapsed] = useState<boolean>(true);
    const [publicCollapsed, setPublicCollapsed] = useState<boolean>(true);






    



    

    const onScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / width);
        setCurrentImageIndex(index);
    };

    const getImageUrl = (displayPicture: string | null) => {
        return displayPicture ? `${PUBLIC_STORAGE}profile/${displayPicture}` : DEFAULT_USER_PROFILE;
    }



    return (
        <View style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                style={{ paddingBottom: 100 }}
            >
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                >


                    {data?.property_images?.map((image: string, index: number) => (

                        <ImageBackground
                            key={index}
                            source={{ uri: image }}
                            style={[styles.dataBackgroundImage, { width: width }]}
                        >
                            {/* positioned number */}
                            <View style={styles.imageIndicatorContainer}>
                                <Text style={styles.imageIndicatorText}>
                                    {currentImageIndex + 1}/{data?.property_images?.length}
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
                                    if (newIndex < data?.property_images?.length) {
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
                                        if (newIndex < data?.property_images?.length) {
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
                                    if (newIndex < data?.property_images?.length) {
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
                                        if (newIndex < data?.property_images?.length) {
                                            setCurrentImageIndex(newIndex);
                                        }
                                    }}
                                />

                            </TouchableOpacity>
                            {/* positioned arrow left */}
                        </ImageBackground>
                    ))}

                </ScrollView>



                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            generalStyles.loginContainer,
                            { marginTop: 5 }
                        ]}
                        onPress={() => openMapsForDirections()}
                    >
                        <Text style={generalStyles.loginText}>
                            {'Take me there'}
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={[
                            generalStyles.bottomHairline,
                            styles.hairLineStyles
                        ]}
                    />

                    <View
                        style={[
                            generalStyles.flexStyles,
                            {
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }
                        ]}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.CardTitle}>{data?.name}</Text>
                            <View style={[generalStyles.flexStyles]}>
                                <Entypo
                                    name="location-pin"
                                    size={15}
                                    color={'#ff5b6e'}
                                    style={{ marginLeft: -5 }}
                                />
                                <Text style={styles.CardSubtitle}>
                                    {data?.location}
                                </Text>
                            </View>
                            <View style={[generalStyles.flexStyles]}>
                                <Entypo
                                    name="location-pin"
                                    size={15}
                                    color={'#ff5b6e'}
                                    style={{ marginLeft: -5 }}
                                />
                                <Text
                                    style={[
                                        generalStyles.CardTitle,
                                        { fontSize: FONTSIZE.size_10 }
                                    ]}
                                >
                                    {calculateDistance(
                                        position?.latitude,
                                        position?.longitude,
                                        data.lat,
                                        data.long
                                    )}
                                    km(s) from you
                                </Text>
                            </View>

                            <Text style={styles.CardSubtitle}>
                                {data?.number_of_beds} bedroom(s)
                            </Text>
                            <Text style={styles.CardSubtitle}>
                                {data?.number_of_baths} bathroom(s)
                            </Text>
                            <Text style={styles.CardTitle}>
                                {data?.currency?.name} {formatCurrency(data?.price)}  {data.payment_period?.name}
                            </Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            {/* <QRCode value={data?.zippy_id} size={40} /> */}
                            <View
                                style={[
                                    generalStyles.flexStyles,
                                    { paddingVertical: 5 }
                                ]}
                            >
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[generalStyles.loginContainer, styles.bookNowButton]}
                                    // onPress={() => handleBookNow()}
                                    onPress={() => navigation.navigate('ConfirmAndPay', { property: data })}
                                >
                                    <Text style={generalStyles.loginText}>{'Book Now'}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                    <View
                        style={[
                            generalStyles.flexStyles,
                            {
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginVertical: 10
                            }
                        ]}
                    >
                        <TouchableOpacity
                           activeOpacity={1}
                            style={[
                                generalStyles.flexStyles,
                                { alignItems: 'center' }
                            ]}
                            onPress={() => navigation.navigate('AgentProfile', { agent: data?.agent })}
                        >
                            <Image
                                source={{ uri: getImageUrl(data?.agent?.avatar) }}
                                style={styles.imageStyles}
                            />
                            <View style={{ marginHorizontal: 5 }}>
                                <Text style={[styles.CardTitle, {}]}>
                                    {data?.agent?.name}
                                </Text>
                                <Text style={styles.CardSubtitle}>
                                    {'Property Agent'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View>

                        </View>
                    </View>

                    {/* collapsable  services*/}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            generalStyles.flexStyles,
                            {
                                //justifyContent: 'space-between',
                                paddingVertical: 5,
                                alignItems: 'center',
                                // justifyContent: 'center'
                            }
                        ]}
                        onPress={() => {
                            setServicesCollapsed(!servicesCollapsed);
                        }}
                    >
                        <View style={{ flex: 0.4 }}>
                            <Text style={[generalStyles.CardTitle]}>{'Services'}</Text>
                        </View>

                        <AntDesign
                            name={servicesCollapsed ? 'downcircleo' : 'upcircleo'}
                            size={20}
                            color={COLORS.primaryOrangeHex}
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>

                    <Collapsible collapsed={servicesCollapsed}>
                        <View>
                            <Text style={generalStyles.CardSubtitle}>
                                {data?.services.length > 0 ? data?.services.map(
                                    (service: any, index: number) => {
                                        return (
                                            <Text
                                                style={styles.CardSubtitle}
                                                key={index}
                                            >
                                                {service?.name}
                                            </Text>
                                        );
                                    }
                                ) : 'No Services Available'}

                            </Text>
                        </View>
                    </Collapsible>
                    {/* collapsable services */}

                    {/* collapsable amenties */}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            generalStyles.flexStyles,
                            {
                                //justifyContent: 'center',
                                paddingVertical: 5,
                                alignItems: 'center'

                            }
                        ]}
                        onPress={() => {
                            setAmenitiesCollapsed(!amenitiesCollapsed);
                        }}
                    >
                        <View style={{ flex: 0.4 }} >
                            <Text style={[generalStyles.CardTitle]}>{'Amenities'}</Text>
                        </View>

                        <AntDesign
                            name={amenitiesCollapsed ? 'downcircleo' : 'upcircleo'}
                            size={20}
                            color={COLORS.primaryOrangeHex}
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>

                    <Collapsible collapsed={amenitiesCollapsed}>
                        <View>
                            <Text style={[generalStyles.CardSubtitle]}>
                                {data.amenities.length > 0 ? data?.amenities?.map(
                                    (amentity: any, index: number) => {
                                        return (
                                            <Text
                                                style={styles.CardSubtitle}
                                                key={index}
                                            >
                                                {amentity?.name}
                                            </Text>
                                        );
                                    }
                                )
                                    : 'No Amenities Available'}
                            </Text>
                        </View>
                    </Collapsible>

                    {/* collapsable amenties */}

                    {/* collapsable public facilites */}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[
                            generalStyles.flexStyles,
                            {
                                //justifyContent: 'space-between',
                                paddingVertical: 5,
                                alignItems: 'center',
                                //justifyContent: 'center'
                            }
                        ]}
                        onPress={() => {
                            setPublicCollapsed(!publicCollapsed);
                        }}
                    >
                        <View style={{ flex: 0.4 }}>
                            <Text style={[generalStyles.CardTitle]}>{'Public Facilities'}</Text>
                        </View>
                        <AntDesign
                            name={publicCollapsed ? 'downcircleo' : 'upcircleo'}
                            size={20}
                            color={COLORS.primaryOrangeHex}
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>

                    <Collapsible collapsed={publicCollapsed}>
                        <View>
                            <Text style={[generalStyles.CardSubtitle]}>
                                {data?.public_facilities?.length > 0 ? data?.public_facilities?.map(
                                    (facility: any, index: number) => {
                                        return (
                                            <Text
                                                style={styles.CardSubtitle}
                                                key={index}
                                            >
                                                {facility}
                                            </Text>
                                        );
                                    }
                                ) : 'No Public Facilities Available'}
                            </Text>
                        </View>
                    </Collapsible>
                    {/* collapsable public facilites */}

                    <View>
                        <Text style={styles.CardTitle}>About Property</Text>
                        <Text style={styles.CardSubtitle}>
                            {data?.description}
                        </Text>
                    </View>

                    {/* likes sections */}
                    {/* <FourReviews
                        property_id={data?.id}
                    /> */}
                    {/* likes section */}

                </View>
                {loading && (
                    <ActivityIndicator
                        style={{ marginTop: 20 }}
                        size="large"
                        color={COLORS.primaryWhiteHex}
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default BookingDetails;

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        padding: 10
    },
    hairLineStyles: {
        width: '80%',
        marginVertical: 10
    },
    textPadding: {
        padding: 5,
        fontSize: 18
    },
    CardTitle: {
        fontFamily: FONTFAMILY.roboto_regular,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.roboto_regular,
        color: COLORS.primaryLightGreyHex,
        fontSize: FONTSIZE.size_10
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 10 : 0
    },
    dataBackgroundImage: {
        aspectRatio: 25 / 15,
        justifyContent: 'space-between'
    },
    imageStyles: {
        width: 35,
        height: 35,
        borderRadius: 20
    },
    fixedBottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    bookNowButton: {
        width: '50%',
        marginTop: 0,
        backgroundColor: COLORS.primaryDarkRedHex
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
    heartIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: COLORS.primaryBlackHex,
        //backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    heartIcon: {
        width: 30,
        height: 30
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
    }
    
});
