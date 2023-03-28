import { ADD_PAYMENT_FAIL, ADD_PAYMENT_REQUEST, ADD_PAYMENT_SUCCESS, ADD_SHIPPING_FAIL, ADD_SHIPPING_REQUEST, ADD_SHIPPING_SUCCESS, ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, DELETE_TO_CART_FAIL, DELETE_TO_CART_REQUEST, DELETE_TO_CART_SUCCESS, EDIT_TO_CART_FAIL, EDIT_TO_CART_REQUEST, EDIT_TO_CART_SUCCESS, GET_CART_SUCCESS, GET_ORDER_DETAIL_CLEAR, GET_ORDER_DETAIL_FAIL, GET_ORDER_DETAIL_REQUEST, GET_ORDER_DETAIL_SUCCESS, LEFT_TO_CART_CLEAR, PLACE_ORDER_FAIL, PlACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../constants/cartConstants";

const initialState={
  carts:[],
  isLoading:false,
  isError:false,
  isSuccess:false,
  message: null
}

export const addToCartReducer = (state = initialState, action) =>{
  switch(action.type){
    case ADD_TO_CART_REQUEST:
      return { isLoading:true, isSuccess:false }
    case ADD_TO_CART_SUCCESS:
      return { isLoading:false, carts: action.payload, isSuccess:true }
    case GET_CART_SUCCESS:
      return { carts: action.payload }
    case ADD_TO_CART_FAIL:
      return { isLoading:false, isError:true, isSuccess:false, message: action.payload }
    case LEFT_TO_CART_CLEAR:
      return { isSuccess: false, carts: action.payload }
    default:
      return state
  }
}

export const editToCartReducer = (state = initialState, action) =>{
  switch(action.type){
    case EDIT_TO_CART_REQUEST:
      return { isLoading:true }
    case EDIT_TO_CART_SUCCESS:
      return { isLoading:false, carts: action.payload }
    case EDIT_TO_CART_FAIL:
      return { isLoading:false, isError:true, message:action.payload }
    default:
      return state
  }
}

export const deleteToCartReducer= (state = initialState, action) =>{
  switch(action.type){
    case DELETE_TO_CART_REQUEST:
      return { isLoading: true }
    case DELETE_TO_CART_SUCCESS:
      return { isLoading:false, carts: action.payload }
    case DELETE_TO_CART_FAIL:
      return { isLoading:false, isError:true, isSuccess:false, message: action.payload } 
    default:
      return state
  }
}

export const addShippingReducer = (state = {shipping:{}}, action) =>{
  switch(action.type){
    case ADD_SHIPPING_REQUEST:
      return { isLoading:true }
    case ADD_SHIPPING_SUCCESS:
      return { isLoading:false, shipping: action.payload }
    case ADD_SHIPPING_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const addPaymentReducer = (state = {payment:null}, action) =>{
  switch(action.type){
    case ADD_PAYMENT_REQUEST:
      return { isLoading:true }
    case ADD_PAYMENT_SUCCESS:
      return { isLoading:false, payment: action.payload }
    case ADD_PAYMENT_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const placeOrderReducer = (state = { order:{} }, action) =>{
  switch(action.type){
    case PlACE_ORDER_REQUEST:
      return { isLoading:true }
    case PLACE_ORDER_SUCCESS:
      return { isLoading:false, order: action.payload }
    case PLACE_ORDER_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const getOrderDetailReducer= (state = {order:{}}, action) =>{
  switch(action.type){
    case GET_ORDER_DETAIL_REQUEST:
      return { isLoading:true }
    case GET_ORDER_DETAIL_SUCCESS:
      return { isLoading:false, order: action.payload }
    case GET_ORDER_DETAIL_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    case GET_ORDER_DETAIL_CLEAR:
      return { order: {} }
    default:
      return state
  }
}