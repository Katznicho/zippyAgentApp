import { StyleSheet, SafeAreaView, View, Text } from 'react-native'
import React, { useState } from 'react'
import useFetchInfinite from '../hooks/useFetchInfinite';
import EmptyContainer from '../components/EmptyContainer';
import { generalStyles } from './utils/generatStyles';
import ArrowBack from '../components/ArrowBack';
import { AGENTBOOKINGS } from './utils/constants/routes';
import { COLORS, FONTSIZE } from '../theme/theme';
import PropertyFlatList from '../components/PropertyFlatList';
import SearchBar from '../components/SearchBar';


const AllBooking = () => {
    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite("allProperties", AGENTBOOKINGS);


    const propertyData = data?.pages.flatMap(page => page.data);


    const loadMoreData = () => {
        if (hasNextPage && !isFetching && data?.pages[0].total !== propertyData?.length) return fetchNextPage()
    };

    const [searchText, setSearchText] = useState<any>("");
    const resetSearch = () => {
        setSearchText("");
    };


    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>

            {
                data && propertyData?.length === 0 && <EmptyContainer
                    title={'No Properties Yet'} />
            }
            <View style={styles.containerStyle}>
                <View style={[generalStyles.absoluteStyles, { left: 10, top: 25 }]}>
                    <ArrowBack />
                </View>
                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", }]}>

                    <Text style={[generalStyles.CardTitle, styles.textColor]}>Properties</Text>
                </View>
                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center" }]}>
                    <Text style={[generalStyles.CardSubtitle, styles.textColor, { fontSize: FONTSIZE.size_16 }]}>{propertyData?.length} Results</Text>
                </View>
                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    resetSearch={resetSearch}
                />
            </View>

            <PropertyFlatList
                propertyData={propertyData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
                isError={isError}
                error={error}
                searchText={searchText}
                resetSearch={resetSearch}
                setSearchText={setSearchText}
            />

        </SafeAreaView >
    )
}

export default AllBooking



const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: 20
    },
    textColor: {
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_28
    },
})