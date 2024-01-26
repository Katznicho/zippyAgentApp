import { StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { generalStyles } from '../utils/generatStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RootState } from '../../redux/store/dev';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { COLORS } from '../../theme/theme';
import { Wizard, WizardStepStates, } from 'react-native-ui-lib';
import PropertyImages from './property/PropertyImages';
import PropertyLocation from './property/PropertyLocation';
import PropertyDetails from './property/PropertyDetails';
import { UploadImage } from '../../hooks/UploadImage';
import { GET_ALL_AMENTITIES, GET_ALL_CATEGORIES, GET_ALL_REGISTERED_PROPERTY_OWNERS, GET_ALL_SERVICES } from '../utils/constants/routes';
import MoreDetails from './property/MoreDetails';
import ServicesAndAmentities from './property/ServicesAndAmentities';



interface State {
    activeIndex: number;
    completedStepIndex?: number;
    allTypesIndex: number;
    toastMessage?: string;
}


const AddProperty = () => {


    const [imagePath, setImagePath] = useState<any>(null);

    const navigation = useNavigation<any>();
    const tabBarHeight = useBottomTabBarHeight();
    const { user, authToken } = useSelector((state: RootState) => state.user);

    const [uploadingImages, setUploadingImages] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false)

    const [errors, setErrors] = useState<any>({})

    const [property, setProperty] = useState<any>({
        "name": "",
        "cover_image": "",
        "images": [],
        "lat": "",
        "long": "",
        "number_of_beds": "",
        "number_of_baths": "",
        "number_of_rooms": "",
        "room_type": "",
        "furnishing_status": "",
        "description": "",
        "status": "",
        "price": "",
        "year_built": "",
        "location": "",
        "currency": "",
        "property_size": "",
        "category_id": "",
        "owner_id": "",
        "services": [],
        "amenities": [],
    });

    useEffect(() => {
        console.log(property)
    }, [property])

    const isFocused = useIsFocused();
    const [propertyOwners, setPropertyOwners] = useState<any>([])
    const [categories, setCategories] = useState<any>([])
    const [services, setServices] = useState<any>([])
    const [amenities, setAmenities] = useState<any>([])

    const [roomTypes, setRoomTypes] = useState<any>([
        {
            id: 1,
            name: "Single",
        },
        {
            id: 2,
            name: "Double",
        }
    ]);

    const [currencies, setCurrencies] = useState<any>([
        {
            id: 1,
            name: "USD",
        }, {
            id: 2,
            name: "UGX",
        }
    ])

    const [furnishingStatus, setFurnishingStatus] = useState<any>([
        {
            id: 1,
            name: "Furnished",
        }, {
            id: 2,
            name: "Unfurnished",
        }
    ])

    const [propertyStatus, setPropertyStatus] = useState<any>([
        {
            id: 1,
            name: "Vacant",
        }, {
            id: 2,
            name: "Occupied",
        },
    ])

    useEffect(() => {
        setLoading(true)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }

        fetch(GET_ALL_REGISTERED_PROPERTY_OWNERS, {
            method: 'GET',
            headers
        }).then((res) => res.json()).then((data) => {
            setPropertyOwners(data?.data)
        })

        fetch(GET_ALL_CATEGORIES, {
            method: 'GET',
            headers
        }).then((res) => res.json()).then((data) => {

            setCategories(data?.data)
        }).catch((err) => {

        })

        fetch(GET_ALL_SERVICES, {
            method: 'GET',
            headers
        }).then((res) => res.json()).then((data) => {
            // console.log(data)
            setServices(data?.data)
        }).catch((err) => {

        })

        fetch(GET_ALL_AMENTITIES, {
            method: 'GET',
            headers
        }).then((res) => res.json()).then((data) => {
            // console.log(data)
            setAmenities(data?.data)
        })

        setLoading(false)

    }, [isFocused])

    const [state, setState] = useState<State>({
        activeIndex: 0,
        completedStepIndex: undefined,
        allTypesIndex: 0,

    })


    const onActiveIndexChanged = (activeIndex: number) => {
        // Update the activeIndex in the state
        setState((prevState) => ({
            ...prevState,
            activeIndex,
        }));
    };



    const goToNextStep = () => {
        const { activeIndex: prevActiveIndex, completedStepIndex: prevCompletedStepIndex } = state;
        const reset = prevActiveIndex === 2;

        if (reset) {
        } else {
            const activeIndex = prevActiveIndex + 1;
            let completedStepIndex: number | undefined = prevCompletedStepIndex;

            if (!prevCompletedStepIndex || prevCompletedStepIndex < prevActiveIndex) {
                completedStepIndex = prevActiveIndex;
            }

            // Check if the activeIndex or completedStepIndex needs updating
            if (activeIndex !== prevActiveIndex || completedStepIndex !== prevCompletedStepIndex) {
                // Update the state to move to the next step
                setState((prevState: any) => ({
                    ...prevState,
                    activeIndex,
                    completedStepIndex,
                }));
            }
        }
    };


    const [count, setCount] = useState<any>([
        {
            id: 1,
            showModal: false,
            imagePath: null,

        },
        {
            id: 2,
            showModal: false,
            imagePath: null
        },
        {
            id: 3,
            showModal: false,
            imagePath: null
        },
        {
            id: 4,
            showModal: false,
            imagePath: null
        },
    ])


    const uploadImagesAutomatically = useCallback(async () => {
        try {
            setUploadingImages(true);
            //first upload the cover image
            if (imagePath) {
                const { image, error } = await UploadImage(
                    user?.UID,
                    imagePath.imagePath,
                    "PROPERTY_STORAGE"
                );
                if (error) {
                    Alert.alert(`Error uploading image for cover image. Please try again.`);
                }
                if (image) {

                    setProperty((prev: { cover_image: any; }) => {
                        return { ...prev, cover_image: image };
                    })
                }
            }
            //firs upload cover image
            const updatedCount = [...count];
            for (let index = 0; index < updatedCount.length; index++) {
                const item = updatedCount[index];
                if (item.imagePath) {
                    const { image, error } = await UploadImage(
                        user?.UID,
                        item.imagePath?.imagePath,
                        "PROPERTY_STORAGE"
                    );
                    if (error) {
                        Alert.alert(`Error uploading image for item ${item.id}. Please try again.`);
                    }
                    if (image) {

                        // setProductDetails((prev: { images: any; }) => {
                        //     const updatedImages = [...prev.images];
                        //     updatedImages[index] = image; // Update image at the specific index
                        //     return { ...prev, images: updatedImages };
                        // });

                        setProperty((prev: { images: any; }) => {
                            return { ...prev, images: [...prev.images, image] };

                        })



                    }
                }
            }
            setCount(updatedCount); // Update the state with the uploaded images

            setUploadingImages(false);
        } catch (error) {
            setUploadingImages(false);
        }
    }, [count, setCount]);

    const goBack = () => {
        const { activeIndex: prevActiveIndex } = state;
        const activeIndex = prevActiveIndex === 0 ? 0 : prevActiveIndex - 1;

        setState((prevState: any) => ({
            ...prevState,
            activeIndex,
        }));
    };


    const renderCurrentStep = () => {
        switch (state.activeIndex) {
            case 0:
                return <PropertyDetails
                    goToNextStep={goToNextStep}
                    errors={errors}
                    setErrors={setErrors}
                    property={property}
                    setProperty={setProperty}
                    goBack={goBack}
                    propertyOwners={propertyOwners}
                    categories={categories}
                    services={services}
                    amenities={amenities}
                    roomTypes={roomTypes}
                    currencies={currencies}


                />

            case 1:
                return <MoreDetails
                    goToNextStep={goToNextStep}
                    errors={errors}
                    setErrors={setErrors}
                    property={property}
                    setProperty={setProperty}
                    goBack={goBack}
                    furnishingStatus={furnishingStatus}
                    propertyOwners={propertyOwners}
                    categories={categories}
                    services={services}
                    amenities={amenities}
                    roomTypes={roomTypes}
                    currencies={currencies}
                    propertyStatus={propertyStatus}
                />
            case 2:
                return <ServicesAndAmentities
                    goToNextStep={goToNextStep}
                    errors={errors}
                    setErrors={setErrors}
                    property={property}
                    setProperty={setProperty}
                    goBack={goBack}
                    furnishingStatus={furnishingStatus}
                    propertyOwners={propertyOwners}
                    categories={categories}
                    services={services}
                    amenities={amenities}
                    roomTypes={roomTypes}
                    currencies={currencies}
                    propertyStatus={propertyStatus}
                />
            case 3:
                return <PropertyImages
                    goToNextStep={goToNextStep}
                    errors={errors}
                    setErrors={setErrors}
                    property={property}
                    setProperty={setProperty}
                    imagePath={imagePath}
                    uploadImagesAutomatically={uploadImagesAutomatically}
                    setImagePath={setImagePath}
                    goBack={goBack}

                />

            default:
                return null;
        }
    };

    const getStepState = (index: number) => {
        const { activeIndex, completedStepIndex } = state;
        let stepState = Wizard.States.DISABLED;

        if (completedStepIndex && completedStepIndex > index - 1) {
            stepState = Wizard.States.COMPLETED;
        } else if (activeIndex === index || completedStepIndex === index - 1) {
            stepState = Wizard.States.ENABLED;
        }

        return stepState;
    };

    if (loading) {

        return <ActivityIndicator />
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
                {/* Wizard for your main steps */}
                <Wizard testID={'uilib.wizard'}
                    activeIndex={state.activeIndex} onActiveIndexChanged={onActiveIndexChanged}
                    containerStyle={{
                        marginRight: 20,
                        marginLeft: 5,
                        marginVertical: 10,
                        borderRadius: 20,
                        backgroundColor: COLORS.primaryWhiteHex
                    }}
                    activeConfig={
                        {
                            color: COLORS.primaryWhiteHex,
                            state: WizardStepStates.ENABLED,
                            circleSize: 30,
                            circleBackgroundColor: COLORS.primaryBlackHex,
                            circleColor: COLORS.primaryBlackHex,


                        }

                    }

                >
                    <Wizard.Step
                        state={getStepState(0)}
                        label={'Property Info'}
                        enabled={true}

                    />
                    <Wizard.Step state={getStepState(1)} label={'More Details'} />
                    <Wizard.Step state={getStepState(2)} label={'Services'} />
                    <Wizard.Step state={getStepState(2)} label={'Images'} />
                    <Wizard.Step state={getStepState(2)} label={'Summary'} />
                </Wizard>

                {/* Render the current step */}
                {renderCurrentStep()}
                {loading && <ActivityIndicator />}
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default AddProperty

const styles = StyleSheet.create({})