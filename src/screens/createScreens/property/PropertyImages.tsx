import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { generalStyles } from '../../utils/generatStyles';
import { COLORS, FONTFAMILY } from '../../../theme/theme';
import UploadComponent from '../../../components/UploadComponent';

const PropertyImages = ({
    imagePath,
    setImagePath,
    count,
    setShowModal,
    setCount,
    showModal,
    goBack,
    uploadingImages,
    isSubmitting,
    uploadImagesAutomatically
}:any) => {

    return (
        <View>
            <View style={[styles.formContainer]}>
                <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                    Property Cover Image
                </Text>
            </View>
            {imagePath ? (
                <View>
                    <TouchableOpacity
                      activeOpacity={1}
                        onPress={() => setShowModal(!showModal)}
                        style={[generalStyles.centerContent]}
                    >
                        <Image
                            source={{ uri: imagePath.imagePath }}
                            style={[styles.coverStyles, generalStyles.centerContent]}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    onPress={() => setShowModal(!showModal)}
                    style={[styles.coverStyles, generalStyles.centerContent]}
                >
                    <AntDesign
                        name={'plus'}
                        color={COLORS.primaryWhiteHex}
                        size={20}
                        style={{
                            borderRadius: 10,
                            padding: 10,
                            borderStyle: "dotted",
                        }}
                    />
                    <View>
                        <Text>Add cover photos</Text>
                    </View>
                </TouchableOpacity>
            )}
            <View style={[styles.formContainer]}>
                <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                    Property Images
                </Text>
                <Text style={{ color: COLORS.primaryWhiteHex, marginHorizontal: 10, fontFamily: FONTFAMILY.roboto_regular}}>
                    Add at least 4 images to proceed. Please upload images in high quality. then click finish.
                </Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {count.map((item:any, index:number) => (
                    <View key={item.id}>
                        <TouchableOpacity
                           activeOpacity={1}
                            key={item.id}
                            style={[styles.imageStyles, generalStyles.centerContent]}
                            onPress={() => {
                                const updatedCount = [...count];
                                updatedCount[index] = {
                                    ...updatedCount[index],
                                    showModal: true,
                                };
                                setCount(updatedCount);
                            }}
                        >
                            {item.imagePath ? (
                                <Image
                                    source={{ uri: item?.imagePath?.imagePath }}
                                    style={[styles.imageStyles, generalStyles.centerContent]}
                                    resizeMode="cover"
                                />
                            ) : (
                                <AntDesign
                                    name={'plus'}
                                    color={COLORS.primaryWhiteHex}
                                    size={20}
                                    style={{
                                        borderRadius: 10,
                                        padding: 10,
                                        borderStyle: "dotted",
                                    }}
                                />
                            )}
                        </TouchableOpacity>

                        {item.showModal && (
                            <UploadComponent
                                image={item.imagePath}
                                setImage={(newImage: any) => {
                                    const updatedCount = [...count];
                                    updatedCount[index] = {
                                        ...updatedCount[index],
                                        imagePath: newImage,
                                        showModal: !updatedCount[index].showModal,
                                    };
                                    setCount(updatedCount);
                                }}
                                setModal={(newModalState: any) => {
                                    const updatedCount = [...count];
                                    updatedCount[index] = {
                                        ...updatedCount[index],
                                        showModal: newModalState,
                                    };
                                    setCount(updatedCount);
                                }}
                                showModal={item.showModal}
                                selectDocument={false}
                            />
                        )}
                    </View>
                ))}
            </ScrollView>

            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[
                        generalStyles.loginContainer,
                        styles.buttonStyles,
                        {
                            backgroundColor:
                                count.some((item: { imagePath: null; }) => item.imagePath === null) || uploadingImages || isSubmitting
                                    ? COLORS.primaryLightGreyHex
                                    : COLORS.primaryOrangeHex,
                        },
                    ]}
                    onPress={uploadImagesAutomatically}
                    disabled={count.some((item: { imagePath: null; }) => item.imagePath === null) || uploadingImages || isSubmitting}
                >
                    <Text style={generalStyles.loginText}>{'Finish'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={[generalStyles.loginContainer, styles.buttonStyles]}
                    onPress={goBack}
                >
                    <Text style={generalStyles.loginText}>{'Back'}</Text>
                </TouchableOpacity>
            </View>

            {showModal && (
                <UploadComponent
                    image={imagePath}
                    setImage={setImagePath}
                    setModal={setShowModal}
                    showModal={showModal}
                    selectDocument={false}
                />
            )}
        </View>
    );
};

export default PropertyImages;

const styles = StyleSheet.create({
    coverStyles: {
        borderWidth: 1,
        borderColor: COLORS.primaryGreyHex,
        width: "95%",
        marginHorizontal: 10,
        marginVertical: 10,
        height: 250,
        borderRadius: 10
    },
    imageStyles: {
        borderWidth: 1,
        borderColor: COLORS.primaryGreyHex,
        width: 75,
        marginHorizontal: 5,
        marginVertical: 15,
        height: 75,
        borderRadius: 10,
    },
    buttonStyles: {
        width: "80%",
        marginTop: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 20
    },
    buttonSpaceStyles: {
        marginHorizontal: 10
    },
    formContainer: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    labelStyles: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.roboto_regular,
        fontSize: 15
    },
});
