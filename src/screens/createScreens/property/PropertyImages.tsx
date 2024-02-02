import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { generalStyles } from '../../utils/generatStyles';
import { COLORS, FONTFAMILY } from '../../../theme/theme';
import UploadComponent from '../../../components/UploadComponent';


/**
 * Renders a component for displaying and uploading product images.
 *
 * @param {Object} props - The component props.
 * @param {string} props.imagePath - The path of the image.
 * @param {function} props.setImagePath - The function to set the image path.
 * @param {any[]} props.count - The array of count items.
 * @param {function} props.setShowModal - The function to set the show modal state.
 * @param {function} props.setCount - The function to set the count state.
 * @param {boolean} props.showModal - The flag to show or hide the modal.
 * @param {function} props.uploadImagesAutomatically - The function to upload images automatically.
 * @param {boolean} props.uploadingImages - The flag to indicate if images are currently being uploaded.
 * @param {function} props.goToNextStep - The function to go to the next step.
 * @return {JSX.Element} The rendered component.
 */
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


}: any) => {



    return (
        <View>

            <View style={[styles.formContainer]}>
                <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                    Property Cover Image
                </Text>
            </View>
            {
                imagePath ? (<View>
                    <TouchableOpacity
                        onPress={() => {

                            setShowModal(!showModal);

                        }}
                        style={[generalStyles.centerContent]}>
                        <Image
                            source={{ uri: imagePath.imagePath }}
                            style={[styles.coverStyles, generalStyles.centerContent]}
                        />

                    </TouchableOpacity>



                </View>) : (<TouchableOpacity
                    onPress={() => {

                        setShowModal(!showModal);


                    }}
                    style={[styles.coverStyles, generalStyles.centerContent]}>

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

                </TouchableOpacity>)
            }
            <View style={[styles.formContainer]}>
                <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                    Property Images
                </Text>
                <Text style={{ color: COLORS.primaryWhiteHex, marginHorizontal: 10, fontFamily: FONTFAMILY.poppins_thin }}>
                    Add at least 4 images to proceed. Please upload images in high quality. then click finish.

                </Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                {
                    count.map((item: any, index: number) => (
                        <View key={item.id}>
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.imageStyles, generalStyles.centerContent]}
                                onPress={() => {
                                    // Create a copy of the count array to modify the specific item
                                    const updatedCount = [...count];
                                    updatedCount[index] = {
                                        ...updatedCount[index],
                                        showModal: true, // Set showModal to true for the clicked item
                                    };
                                    setCount(updatedCount);
                                }}
                            >
                                {
                                    item.imagePath ? (<Image
                                        source={{ uri: item?.imagePath?.imagePath }}
                                        style={[styles.imageStyles, generalStyles.centerContent]}
                                    />) : (<AntDesign
                                        name={'plus'}
                                        color={COLORS.primaryWhiteHex}
                                        size={20}
                                        style={{
                                            borderRadius: 10,
                                            padding: 10,
                                            borderStyle: "dotted",
                                        }}
                                    />)
                                }


                            </TouchableOpacity>


                            {item.showModal && (
                                <UploadComponent
                                    image={item.imagePath}
                                    setImage={(newImage: any) => {
                                        // Update the image path for the specific item
                                        const updatedCount = [...count];
                                        updatedCount[index] = {
                                            ...updatedCount[index],
                                            imagePath: newImage,
                                            showModal: !updatedCount[index].showModal,
                                        };
                                        setCount(updatedCount);
                                    }}
                                    setModal={(newModalState: any) => {
                                        // Update the showModal property for the specific item
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



                    ))
                }

            </ScrollView>

            {/* button section */}
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[generalStyles.loginContainer,
                    styles.buttonStyles,
                    {
                        backgroundColor: count.some((item: any) => item.imagePath === null) || uploadingImages || isSubmitting ? COLORS.primaryLightGreyHex : COLORS.primaryOrangeHex,

                    }
                    ]}
                    onPress={uploadImagesAutomatically}
                    disabled={count.some((item: any) => item.imagePath === null) || uploadingImages || isSubmitting}

                >
                    <Text style={generalStyles.loginText}>{'Finish'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={[generalStyles.loginContainer,
                    styles.buttonStyles
                    ]}
                    onPress={goBack}
                // disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
                >
                    <Text style={generalStyles.loginText}>{'Back'}</Text>
                </TouchableOpacity>

            </View>
            {/* button section */}


            {/* modal section */}
            {showModal && (
                <UploadComponent
                    image={imagePath}
                    setImage={setImagePath}
                    setModal={setShowModal}
                    showModal={showModal}
                    selectDocument={false}
                />
            )}

            {/* modal section */}

        </View>
    );
}

export default PropertyImages

const styles = StyleSheet.create({
    coverStyles: {
        borderWidth: 1,
        borderColor: COLORS.primaryGreyHex,
        width: "95%",
        marginHorizontal: 10,
        marginVertical: 10,
        height: 150,
        // borderStyle: "dotted",
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
        // marginRight: 20
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
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 15
    },

})