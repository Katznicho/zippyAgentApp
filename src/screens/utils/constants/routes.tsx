export const BASE_URL = "https://zippy.risidev.com/api/v1";

export const LOGIN = `${BASE_URL}/auth/login`;
export const REGISTER = `${BASE_URL}/auth/registerCommunity`;
export const LOGOUT = `${BASE_URL}/auth/logout`;
export const FORGOT_PASSWORD = `${BASE_URL}/auth/requestPasswordReset`;
export const RESET_PASSWORD = `${BASE_URL}/auth/resetPassword`;
export const RESEND_OTP = `${BASE_URL}/auth/resendOTP`
export const VERIFY_EMAIL = `${BASE_URL}/auth/verifyEmail`
export const SAVE_DEVICE_INFO = `${BASE_URL}/auth/saveDeviceInfo`
export const SETUP_WALLET_ACCOUNT = `${BASE_URL}/auth/setUpUserWalletAccount`;
export const UPDATEWALLETBALANCE = `${BASE_URL}/auth/updateShowWalletBalance`
export const UPDATEUSERAVATAR = `${BASE_URL}/auth/updateUserAvatarUrl`
export const UPDATE_USER_LOCATION = `${BASE_URL}/auth/updateUserLocation`;
export const UPDATE_PASSWORD_FIRST_USER = `${BASE_URL}/auth/resetPasswordFirstUser`;

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
export const REGISTER_PROPERTY_OWNER = `${BASE_URL}/registerPropertyOwner`;
export const REGISTER_PROPERTY = `${BASE_URL}/registerPropertyByAgent`;
export const GET_ALL_REGISTERED_PROPERTY_OWNERS = `${BASE_URL}/getAllRegisteredPropertyOwners`







//general
export const GET_ALL_CATEGORIES = `${BASE_URL}/getAllCategories`;
export const GET_ALL_SERVICES = `${BASE_URL}/getAllServices`;
export const GET_ALL_AMENTITIES = `${BASE_URL}/getAllAmenities`


