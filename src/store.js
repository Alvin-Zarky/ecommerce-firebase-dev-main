import {legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { authSignUpReducer, authSignInReducer, getAuthUserReducer, updateProfileReducer, forgetPasswordReducer, getUserOrderReducer } from "./reducers/authReducers"
import { adminAddProductReducer, adminEditProductReducer, adminEditUser, adminGetOrderReducer, adminGetProductDetail, adminGetProductReducer, adminGetUserDetails, adminMarkDeliverReducer, adminSearchReducer, adminUserReducers } from "./reducers/adminReducers"
import { getProductDetailReducer, getProductListReducer, getProductSlideReducer, postReviewProductReducer, searchProductReducer } from "./reducers/productReducers"
import { addPaymentReducer, addShippingReducer, addToCartReducer, deleteToCartReducer, editToCartReducer, getOrderDetailReducer, placeOrderReducer } from "./reducers/cartReducers"

const reducers = combineReducers({
  userSignUp: authSignUpReducer,
  userLogIn: authSignInReducer,
  userInfo: getAuthUserReducer,
  adminUsers: adminUserReducers,
  adminUserDetail: adminGetUserDetails,
  adminEditUser: adminEditUser,
  adminGetProduct: adminGetProductReducer,
  adminGetProductDetail: adminGetProductDetail,
  adminAddProduct: adminAddProductReducer,
  adminEditProduct: adminEditProductReducer,
  products: getProductListReducer,
  productSlides: getProductSlideReducer,
  productDetail: getProductDetailReducer,
  updateProfile: updateProfileReducer,
  forgetPassword: forgetPasswordReducer,
  reviewProducts: postReviewProductReducer,
  cartItems: addToCartReducer,
  editItems: editToCartReducer,
  deleteItems: deleteToCartReducer,
  shipping: addShippingReducer,
  payment: addPaymentReducer,
  order: placeOrderReducer,
  orderDetail: getOrderDetailReducer,
  userOrder: getUserOrderReducer,
  adminOrder: adminGetOrderReducer,
  adminMarkAsOrder: adminMarkDeliverReducer,
  productSearch: searchProductReducer,
  adminSearch: adminSearchReducer
})

const userFromStorage= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
const cartFromStorage= localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : []
const shippingFromStorage= localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : {} 
const paymentFromStorage= localStorage.getItem('payment') ? JSON.parse(localStorage.getItem('payment')) : null 

const initialState= {
  userLogIn: { user: userFromStorage },
  cartItems: { carts: cartFromStorage },
  shipping: { shipping: shippingFromStorage },
  payment: { payment: paymentFromStorage }
}
const middleware= [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store