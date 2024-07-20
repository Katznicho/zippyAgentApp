import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,

    Dimensions
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { generalStyles } from './utils/generatStyles';
import { COLORS } from '../theme/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';


const { width } = Dimensions.get('window');

const TransactionDetails = () => {
    const { item } = useRoute<any>().params;
    
    const {user} = useSelector((state: RootState) => state.user);


    return (
        <SafeAreaView style={generalStyles.ScreenContainer}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Payment Type
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {item?.type}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Payment Status
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {item?.status}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Amount
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        UGX  {item?.amount}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Description
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {/* {`${item?.owner?.firstName} ${item?.owner?.lastName}`}
                         */}
                        {item?.description}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>



                {/* paid to */}
                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Paid To
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {`${user?.fname} ${user?.lname}`}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>
                {/* paid to */}

                {/* card */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default TransactionDetails;

const styles = StyleSheet.create({
    nameStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.primaryWhiteHex,
        marginLeft: 20,
    },
    imageContainer: {
        marginHorizontal: 5,
        marginVertical: 5,
        width: width * 0.6,
        height: width * 0.6,
    },
    image: {
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: COLORS.primaryWhiteHex,
    },
    description: {
        // backgroundColor: theme.colors.preference.primaryBackground,
        // elevation: 10,
        // padding: 5,
        // borderRadius: 10,
    },
    bottom: {
        borderBottomColor: COLORS.primaryWhiteHex,
        borderBottomWidth: 0.5,
        marginVertical: 5,
    },
    cardViewStyles: {
        marginVertical: 10,
        padding: 5,
    },

    textStyle: {
        color: COLORS.primaryWhiteHex
    }
});
