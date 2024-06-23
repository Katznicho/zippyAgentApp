// export const BASE_URL = "https://zippy.risidev.com/api/v1";
export const BASE_URL:string = "https://dashboard.zippyug.com/api/v1";

export const LOGIN = `${BASE_URL}/agent/auth/login`;
export const REGISTER = `${BASE_URL}/agent/auth/register`;
export const LOGOUT = `${BASE_URL}/agent/auth/logout`;
export const FORGOT_PASSWORD = `${BASE_URL}/agent/auth/requestPasswordReset`;
export const RESET_PASSWORD = `${BASE_URL}/agent/auth/resetPassword`;
export const RESEND_OTP = `${BASE_URL}/agent/auth/resendOTP`
export const VERIFY_EMAIL = `${BASE_URL}/agent/auth/verifyEmail`
export const SAVE_DEVICE_INFO = `${BASE_URL}/agent/auth/saveDeviceInfo`
export const SETUP_WALLET_ACCOUNT = `${BASE_URL}/agent/auth/setUpUserWalletAccount`;
export const UPDATEWALLETBALANCE = `${BASE_URL}/agent/auth/updateShowWalletBalance`
export const UPDATEUSERAVATAR = `${BASE_URL}/agent/auth/updateUserAvatarUrl`
export const UPDATE_USER_LOCATION = `${BASE_URL}/agent/auth/updateUserLocation`;
export const UPDATE_PASSWORD_FIRST_USER = `${BASE_URL}/agent/auth/resetPasswordFirstUser`;

//payments
export const PROCESSORDER = `${BASE_URL}/processOrder`;
export const USERPAYMENTS = `${BASE_URL}/getUserPayments`;
export const USERPRODUCTS = `${BASE_URL}/getUserProducts`

export const USERDELIVERIES = `${BASE_URL}/getUserDelivries`
export const USERNOTIFICATIONS = `${BASE_URL}/getUserNotifications`

//uploads
export const PROFILE_UPLOAD = `${BASE_URL}/profileUpload`;
export const IMAGES_UPLOAD = `${BASE_URL}/uploadIdImages`


//property owner
export const REGISTER_PROPERTY_OWNER = `${BASE_URL}/agent/registerPropertyOwner`;
export const REGISTER_PROPERTY = `${BASE_URL}/agent/registerPropertyByAgent`;
export const GET_ALL_REGISTERED_PROPERTY_OWNERS = `${BASE_URL}/agent/getAllRegisteredPropertyOwners`;
export const GET_REGISTERED_PROPETY_BY_PAGE = `${BASE_URL}/agent/getRegisterPropertyByPage`;
export const GET_REGISTERED_USERS_BY_PAGE = `${BASE_URL}/agent/getRegisterPropertyOwnersByPage`;
export const VERIFY_PROPERTY_OWNER = `${BASE_URL}/agent/verifyPropertyOwnerPhoneNumber`







//general
export const GET_ALL_CATEGORIES = `${BASE_URL}/getAllCategories`;
export const GET_ALL_SERVICES = `${BASE_URL}/getAllServices`;
export const GET_ALL_AMENTITIES = `${BASE_URL}/getAllAmenities`;
export const  GET_ALL_PROPERTY_STATUSES = `${BASE_URL}/getAllPropertyStatuses`
export const GET_ALL_CURRENCIES = `${BASE_URL}/getAllCurrencies`
export const GET_ALL_PAYMENT_PERIODS = `${BASE_URL}/getAllPaymentPeriods`


