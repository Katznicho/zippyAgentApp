import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
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
import PropertyDetails from './property/PropertyDetails';
import { GET_ALL_AMENTITIES, GET_ALL_CATEGORIES, GET_ALL_CURRENCIES, GET_ALL_PAYMENT_PERIODS, GET_ALL_PROPERTY_STATUSES, GET_ALL_REGISTERED_PROPERTY_OWNERS, GET_ALL_SERVICES, IMAGES_UPLOAD, REGISTER_PROPERTY } from '../utils/constants/routes';
import MoreDetails from './property/MoreDetails';
import ServicesAndAmentities from './property/ServicesAndAmentities';
import RNFetchBlob from 'rn-fetch-blob';
import { showMessage } from 'react-native-flash-message';
import ProgressBar from 'react-native-progress/Bar';



interface State {
    activeIndex: number;
    completedStepIndex?: number;
    allTypesIndex: number;
    toastMessage?: string;
}
const screenWidth = Dimensions.get('window').width


const AddProperty = () => {


    const [imagePath, setImagePath] = useState<any>(null);

    const navigation = useNavigation<any>();
    const tabBarHeight = useBottomTabBarHeight();
    const { authToken } = useSelector((state: RootState) => state.user);

    const [progress, setProgress] = useState<number>(0)

    const [uploadingImages, setUploadingImages] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

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
        "status_id": "",
        "price": "",
        "year_built": "",
        "location": "",
        "currency_id": "",
        "property_size": "",
        "category_id": "",
        "owner_id": "",
        "services": [],
        "amenities": [],
        "payment_period_id": "",
        "public_facilities": ""
    });



    const isFocused = useIsFocused();
    const [propertyOwners, setPropertyOwners] = useState<any>([])
    const [categories, setCategories] = useState<any>([])
    const [services, setServices] = useState<any>([])
    const [amenities, setAmenities] = useState<any>([])
    const [currencies, setCurrencies] = useState<any>([])
    const [propertyStatus, setPropertyStatus] = useState<any>([])
    const [paymentPeriods, setPaymentPeriods] = useState<any>([])

    const [furnishingStatus, setFurnishingStatus] = useState<any>([
        {
            id: 1,
            name: "Furnished",
        }, {
            id: 2,
            name: "Unfurnished",
        }
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

        fetch(GET_ALL_PROPERTY_STATUSES, {
            method: 'GET',
            headers
        }).then((res) => res.json()).then((data) => {


            setPropertyStatus(data?.data)
        }).catch((err) => {

        })

        fetch(GET_ALL_CURRENCIES, {
            method: 'GET',
            headers
        }).then((res) => res.json()).then((data) => {


            setCurrencies(data?.data)
        })

        fetch(GET_ALL_PAYMENT_PERIODS, {
            method: 'GET',
            headers
        }).then((res) => res.json()).then((data) => {


            setPaymentPeriods(data?.data)
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
        const reset = prevActiveIndex === 3;

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
            rnImagePath: null

        },
        {
            id: 2,
            showModal: false,
            imagePath: null,
            rnImagePath: null
        },
        {
            id: 3,
            showModal: false,
            imagePath: null,
            rnImagePath: null
        },
        {
            id: 4,
            showModal: false,
            imagePath: null,
            rnImagePath: null
        },
    ])


    const uploadImagesAutomatically = async () => {
        try {
            setIsSubmitting(true)
            setUploadingImages(true);
            const coverImageFilePath = imagePath?.imagePath?.replace(/^file:\/\//, '');

            const formData = new FormData();

            formData.append('cover_image', {
                name: 'cover_image',
                filename: 'cover_image.png',
                type: 'image/png',
                data: RNFetchBlob.wrap(coverImageFilePath),
            });
            const imageOne = count[0].imagePath?.imagePath?.replace(/^file:\/\//, '');
            const imageTwo = count[1].imagePath?.imagePath?.replace(/^file:\/\//, '');
            const imageThree = count[2].imagePath?.imagePath?.replace(/^file:\/\//, '');
            const imageFour = count[3].imagePath?.imagePath?.replace(/^file:\/\//, '');

            RNFetchBlob.fetch(
                'POST',
                IMAGES_UPLOAD,
                {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                },
                [
                    {
                        name: 'cover_image',
                        filename: 'cover_image.png',
                        type: 'image/png',
                        // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
                        // Or simply wrap the file path with RNFetchBlob.wrap().
                        data: RNFetchBlob.wrap(coverImageFilePath)
                    },
                    {
                        name: 'images[]',
                        filename: 'images_one.png',
                        type: 'image/png',
                        data: RNFetchBlob.wrap(imageOne)
                    },
                    {
                        name: 'images[]',
                        filename: 'images_two.png',
                        type: 'image/png',
                        data: RNFetchBlob.wrap(imageTwo)
                    },
                    {
                        name: 'images[]',
                        filename: 'images_three.png',
                        type: 'image/png',
                        data: RNFetchBlob.wrap(imageThree)
                    },
                    {
                        name: 'images[]',
                        filename: 'images_four.png',
                        type: 'image/png',
                        data: RNFetchBlob.wrap(imageFour)
                    },

                ]
            )
                .uploadProgress((written, total) => {
                    // console.log(`Upload progress: ${Math.floor((written / total) * 100)}%`);
                    setProgress(written / total)
                })
                .then(response => response.json())
                .then(async (res) => {


                    const { cover_image, one, two, three, four } = res.data;

                    console.log(cover_image, one, two, three, four)

                    // Update the property state with the received URLs
                    setProperty((prevProperty: any) => ({
                        ...prevProperty,
                        cover_image,
                        images: [one, two, three, four],
                    }));
                    // Call the submit function after successful image upload
                    await submitProperty(cover_image, one, two, three, four);
                    return true;


                })
                .catch((err) => {
                    setUploadingImages(false);
                    // setIsSubmitting(false)
                    return false;
                });

        } catch (error) {
            setUploadingImages(false);
            return false;
        }

    }



    const submitProperty = async (cover_image: string, one: string, two: string, three: string, four: string) => {



        // if (submitImages) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);


        const body = new FormData();
        body.append('name', property?.name);
        body.append('description', property?.description);
        body.append('cover_image', property?.cover_image || cover_image);
        body.append('location', property?.location);
        body.append("lat", property?.lat);
        body.append("long", property?.long);
        body.append('price', property?.price);
        body.append('room_type', property?.room_type);
        body.append("owner_id", property?.owner_id);
        body.append("property_size", property?.property_size);
        body.append("category_id", property?.category_id);
        body.append("number_of_beds", property?.number_of_beds);
        body.append("number_of_baths", property?.number_of_baths);
        body.append("number_of_rooms", property?.number_of_rooms);
        body.append("furnishing_status", property?.furnishing_status);
        body.append("year_built", property?.year_built);
        body.append("status_id", property?.status_id);
        body.append("currency_id", property?.currency_id);
        body.append("payment_period_id", property?.payment_period_id);
        body.append("images[]", property?.images[0] || one);
        body.append("images[]", property?.images[1] || two);
        body.append("images[]", property?.images[2] || three);
        body.append("images[]", property?.images[3] || four);
        body.append("is_available", property?.status_id == 1 ? 1 : 0);

        let formattedFacilities = property?.public_facilities.split(",").map((facility: string) => {
            return facility.trim()
        })

        formattedFacilities?.forEach((facility: string) => {
            body.append("public_facilities[]", facility)
        })

        //services loop through and also append them as an array
        property?.services?.forEach((service: any) => {
            body.append("services[]", service)
        })

        //amenities loop through and also append them as an array
        property?.amenities?.forEach((amenity: any) => {
            body.append("amenities[]", amenity)
        })


        try {
            fetch(REGISTER_PROPERTY, {
                method: 'POST',
                headers,
                body: body

            }).then(response => response.json())
                .then(result => {
                    console.log(result)
                    setLoading(false)
                    setIsSubmitting(false)
                    if (result?.response === 'success') {
                        showMessage({
                            message: "Success",
                            description: "Property created successfully",
                            type: "success",
                            autoHide: true,
                            duration: 3000,
                        })
                        setProperty({
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
                        })
                        setImagePath(null)
                        setCount([
                            {
                                id: 1,
                                showModal: false,
                                imagePath: null,
                                rnImagePath: null

                            },
                            {
                                id: 2,
                                showModal: false,
                                imagePath: null,
                                rnImagePath: null
                            },
                            {
                                id: 3,
                                showModal: false,
                                imagePath: null,
                                rnImagePath: null
                            },
                            {
                                id: 4,
                                showModal: false,
                                imagePath: null,
                                rnImagePath: null
                            },
                        ])
                        return navigation.navigate('HomeTab')
                    }
                    else {
                        setLoading(false);
                        setIsSubmitting(false)
                        return showMessage({
                            message: "Property Creation Failed",
                            description: "Please try again",
                            type: "danger",
                            autoHide: true,
                            duration: 3000,
                        })
                    }
                })
        } catch (error) {
            setLoading(false);
            setIsSubmitting(false)
            return showMessage({
                message: "Property Creation Failed",
                description: "Something went wrong",
                type: "danger",
                autoHide: true,
                duration: 3000,
            })

        }
        // }

        // else {
        //     setIsSubmitting(false);
        //     setUploadingImages(false);
        //     return showMessage({
        //         message: "Property Creation Failed",
        //         description: "Something went wrong",
        //         type: "danger",
        //         autoHide: true,
        //         duration: 3000,
        //     })

        // }

    }


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
                    paymentPeriods={paymentPeriods}
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
                    paymentPeriods={paymentPeriods}
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
                    paymentPeriods={paymentPeriods}
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
                    count={count}
                    setCount={setCount}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    submitProperty={submitProperty}
                    isSubmitting={isSubmitting}
                    uploadingImages={uploadingImages}

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



    return loading ? (<KeyboardAwareScrollView
        style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
        keyboardShouldPersistTaps="always"
    >
        <ActivityIndicator />
    </KeyboardAwareScrollView>) : (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: tabBarHeight, marginHorizontal: 5 }}
                keyboardShouldPersistTaps="always"
            >
                {/* Wizard for your main steps */}
                <Wizard testID={'uilib.wizard'}
                    activeIndex={state.activeIndex} onActiveIndexChanged={onActiveIndexChanged}
                    containerStyle={{
                        // marginRight: 20,
                        // marginLeft: 5,
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

                </Wizard>
                {/* progress bar */}
                {
                    isSubmitting && (<ProgressBar
                        progress={progress}
                        width={screenWidth - 30}
                        style={generalStyles.progress}
                        color="#34D399"
                        borderWidth={0}
                        unfilledColor="grey"

                    />)
                }

                {/* progress bar */}

                {/* Render the current step */}
                {renderCurrentStep()}
                {/* Render the current step */}

                {isSubmitting && <ActivityIndicator />}
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default AddProperty

