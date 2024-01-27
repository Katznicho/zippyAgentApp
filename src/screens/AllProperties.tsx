import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import useFetchInfinite from '../hooks/useFetchInfinite';
import { generalStyles } from './utils/generatStyles';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PropertyFlatList from '../components/PropertyFlatList';
import { GET_REGISTERED_PROPETY_BY_PAGE } from './utils/constants/routes';

const AllProperties: React.FC = () => {

    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite("allProperties", GET_REGISTERED_PROPETY_BY_PAGE);
    console.log("=========== data=========================")
    console.log(data?.pages[0].total)
    console.log("==========data=====================")


    //flat the data
    // const flattenedData = data?.pages.flatMap(page => page.results) || [];
    const propertyData = data?.pages.flatMap(page => page.data);

    console.log("=============property data length==========================")
    console.log(propertyData);
    console.log("=============property data length==========================")

    console.log("=============data=======================")
    console.log(data)



    const loadMoreData = () => {
        if (hasNextPage && !isFetching && data?.pages[0].total !== propertyData?.length) return fetchNextPage()
    };
    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>
            {
                data && propertyData?.length === 0 && <EmptyListAnimation
                    title={'No Registered Property Yet'} />
            }
            <PropertyFlatList
                propertyData={propertyData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
            />

        </SafeAreaView >
    )
}

export default AllProperties

const styles = StyleSheet.create({})