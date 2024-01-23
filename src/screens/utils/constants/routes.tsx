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


//community 
export const GET_COMMUNITY_DETAILS = `${BASE_URL}/getCommunityDetails`
export const GET_COMMUNITY_TOTALS = `${BASE_URL}/getCommunityTotals`
export const GET_COMMUNITIES = `${BASE_URL}/getCommunitysByPage`
export const COMMUNITY_DELIVERIES = `${BASE_URL}/getCommunityDeliveries`
export const VERIFY_COMMUNITY = `${BASE_URL}/communityUploadVerificationDocument`
export const CHECK_COMMUNITY_DOCUMENTS = `${BASE_URL}/checkCommunityDocuments`;
export const CHECK_STORED_COMMUNITY_DETAILS = `${BASE_URL}/getStoredCommunityDetails`
export const STORE_COMMUNITY_DETAILS = `${BASE_URL}/storeCommunityDetails`;
export const ALL_COMMUNITY_CATEGORIES = `${BASE_URL}/getAllCommunityCatgeories`


//donor
export const GET_DONORS = `${BASE_URL}/getDonorsByPage`
export const GET_DONOR_DETAILS = `${BASE_URL}/getDonorDetails`
export const GET_DONOR_TOTALS = `${BASE_URL}/getDonorTotals`



//produucts 
export const CREATE_PRODUCT = `${BASE_URL}/createProduct`
export const AVAILABLE_PRODUCTS = `${BASE_URL}/getAVailableProductsByPage`
export const AVAILABLE_PRODUCTS_WITH_CATEGORY = `${BASE_URL}/getAvailableProductsByCategoryWithPag`


//categories
export const GET_ALL_CATEGORIES = `${BASE_URL}/getAllProductCategories`


//delivery
export const CONFIRM_DELIVERY = `${BASE_URL}/confirmDelivery`