import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { generalStyles } from './utils/generatStyles';
import { KeyboardAwareScrollView, Avatar } from 'react-native-ui-lib'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import { formattedDate, onMakeCall } from './utils/helpers/helpers';
import { DEFAULT_USER_PROFILE, PUBLIC_STORAGE } from './utils/constants/constants';


const UserDetails: React.FC<any> = () => {
    const tabBarHeight = useBottomTabBarHeight();
    const { item } = useRoute<any>().params
    const navigation = useNavigation<any>();

    // console.log(item?.properties)
    const getImageUrl = (displayPicture: string | null) => {
        return displayPicture ? `${PUBLIC_STORAGE}profile/${displayPicture}` : DEFAULT_USER_PROFILE;
    }

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
                {/* avatar area */}
                <View style={styles.avatarContainer}>
                    <Avatar
                        size={100}
                        animate={true}
                        imageStyle={{ borderRadius: 100 }}

                        source={{ uri: getImageUrl(item?.avatar) }}
                    />
                </View>
                {/* avatar area */}

                {/* card continer */}
                <View style={styles.cardContainer}>
                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>
                        <View>
                            <Text style={styles.CardTitle} >Name</Text>
                            <Text style={styles.CardSubtitle}>{item?.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Email</Text>
                            <Text style={styles.CardSubtitle}>{item?.email}</Text>
                        </View>

                    </View>

                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>
                        <View>
                            <Text style={styles.CardTitle} >Phone Number</Text>
                            <Text style={styles.CardSubtitle}>{item?.phone_number}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={[generalStyles.loginContainer, { marginTop: 5, padding: 10, width: 100 }]}
                                onPress={() => onMakeCall(item?.phone_number)}>
                                <Text style={generalStyles.loginText}>{'Call '}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View >
                        <View>
                            <Text style={styles.CardTitle} >Registered On</Text>
                            <Text style={styles.CardSubtitle}>{formattedDate(item?.created_at)} </Text>
                        </View>


                    </View>

                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>
                        <View>
                            <Text style={styles.CardTitle} >Total Properties</Text>
                            <Text style={styles.CardSubtitle}>{item?.properties?.length}</Text>
                        </View>
                        <View>
                            <Text style={styles.CardTitle} >Total Bookings</Text>
                            <Text style={styles.CardSubtitle}>{item?.bookings?.length}</Text>
                        </View>


                    </View>

                    <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

                </View>
                {/* card container */}
                {/*  */}
            </ScrollView>

        </KeyboardAwareScrollView>
    )
}

export default UserDetails

const styles = StyleSheet.create({
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
    },
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
    hairLineStyles: {
        width: "80%",
        // marginHorizontal: 40,
        marginVertical: 10
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
})