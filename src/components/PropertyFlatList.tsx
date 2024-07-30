import { FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import PropertyCard from './PropertyCard';
import { ActivityIndicator } from './ActivityIndicator';
import EmptyContainer from './EmptyContainer';



const PropertyFlatList: React.FC<any> = ({ propertyData, loadMoreData, isFetching, isNested=false }: any) => {
    const navigation = useNavigation<any>();

    if (propertyData == undefined || propertyData == null) {
        return <ActivityIndicator />
    }
    

    if(propertyData?.length ==0) {
        return <EmptyContainer />
    }



    return (
        <FlatList
            data={propertyData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item, index }) => (
                <PropertyCard property={isNested ? item?.property: item} index={index} />
            )}
            onEndReached={() => {
                loadMoreData()
            }}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={isFetching && <ActivityIndicator />}
            // refreshControl={isFetching && <ActivityIndicator />}
            onRefresh={loadMoreData}
            refreshing={isFetching}
            contentContainerStyle={{ paddingBottom: 50 }}
        />


    )
}

export default PropertyFlatList

