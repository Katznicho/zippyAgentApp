import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from './ActivityIndicator';
import PropertyCard from './PropertyCard';



const PropertyFlatList: React.FC<any> = ({ propertyData, loadMoreData, isFetching }: any) => {
    const navigation = useNavigation<any>();

    if (propertyData == undefined || propertyData == null) {
        return <ActivityIndicator />
    }
    return (
        <FlatList
            data={propertyData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item, index }) => (
                <PropertyCard item={item} index={index} />
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

const styles = StyleSheet.create({})