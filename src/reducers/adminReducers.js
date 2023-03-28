import { 
  ADMIN_ADD_PRODUCT_CLEAR,
  ADMIN_ADD_PRODUCT_FAIL,
  ADMIN_ADD_PRODUCT_REQUEST,
  ADMIN_ADD_PRODUCT_SUCCESS,
  ADMIN_EDIT_PRODUCT_CLEAR,
  ADMIN_EDIT_PRODUCT_FAIL,
  ADMIN_EDIT_PRODUCT_REQUEST,
  ADMIN_EDIT_PRODUCT_SUCCESS,
  ADMIN_EDIT_USER_CLEAR,
  ADMIN_EDIT_USER_FAIL,
  ADMIN_EDIT_USER_REQUEST,
  ADMIN_EDIT_USER_SUCCESS,
  ADMIN_GET_PRODUCT_DETAIL_CLEAR,
  ADMIN_GET_PRODUCT_DETAIL_FAIL,
  ADMIN_GET_PRODUCT_DETAIL_REQUEST,
  ADMIN_GET_PRODUCT_DETAIL_SUCCESS,
  ADMIN_GET_PRODUCT_FAIL,
  ADMIN_GET_PRODUCT_REQUEST,
  ADMIN_GET_PRODUCT_SUCCESS,
  ADMIN_GET_USER_CLEAR,
  ADMIN_GET_USER_DETAIL_FAIL,
  ADMIN_GET_USER_DETAIL_REQUEST,
  ADMIN_GET_USER_DETAIL_SUCCESS,
  ADMIN_MARK_DELIVERED_FAIL,
  ADMIN_MARK_DELIVERED_REQUEST,
  ADMIN_MARK_DELIVERED_SUCCESS,
  ADMIN_ORDER_FAIL,
  ADMIN_ORDER_REQUEST,
  ADMIN_ORDER_SUCCESS,
  ADMIN_SEARCH_USER_FAIL,
  ADMIN_SEARCH_USER_REQUEST,
  ADMIN_SEARCH_USER_SUCCESS,
  ADMIN_USER_CLEAR,
  ADMIN_USER_FAIL, 
  ADMIN_USER_REQUEST, 
  ADMIN_USER_SUCCESS 
} from "../constants/adminConstants";

export const adminUserReducers= (state={users: [], isLoading:false}, action) =>{
  switch(action.type){
    case ADMIN_USER_REQUEST:
      return { isLoading:true }
    case ADMIN_USER_SUCCESS:
      return { isLoading:false, users: action.payload }
    case ADMIN_USER_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    case ADMIN_USER_CLEAR:
      return { users:[] }
    default:
      return state
  }
}

export const adminGetUserDetails= (state= { user:{}, isLoading:false }, action) =>{
  switch(action.type){
    case ADMIN_GET_USER_DETAIL_REQUEST:
      return { isLoading:true }
    case ADMIN_GET_USER_DETAIL_SUCCESS:
      return { isLoading:false, user: action.payload }
    case ADMIN_GET_USER_DETAIL_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    case ADMIN_GET_USER_CLEAR:
      return { user:{} }
    default:
      return state
  }
}

export const adminEditUser= (state= { isLoading:false, isSuccess:false }, action) =>{
  switch(action.type){
    case ADMIN_EDIT_USER_REQUEST:
      return { isLoading:true, isSuccess:false }
    case ADMIN_EDIT_USER_SUCCESS:
      return { isLoading:false, isSuccess:true }
    case ADMIN_EDIT_USER_FAIL:
      return { isLoading:false, isError:true, isSuccess:false, message: action.payload }
    case ADMIN_EDIT_USER_CLEAR: 
      return { isSuccess:false, isError:false }
    default:
      return state
  }
}

export const adminGetProductReducer= (state= { products:[], isLoading:false, isSuccess:false }, action) =>{
  switch(action.type){
    case ADMIN_GET_PRODUCT_REQUEST:
      return { isLoading:true, isSuccess:false }
    case ADMIN_GET_PRODUCT_SUCCESS:
      return { isLoading:false, products: action.payload, isSuccess:true }
    case ADMIN_GET_PRODUCT_FAIL:
      return { isLoading:false, isError:true, isSuccess:false, message: action.payload }
    default:
      return state
  }
}

export const adminGetProductDetail = (state ={ product: {} }, action) =>{
  switch(action.type){
    case ADMIN_GET_PRODUCT_DETAIL_REQUEST:
      return { isLoading:true, isSuccess:false }
    case ADMIN_GET_PRODUCT_DETAIL_SUCCESS:
      return { isLoading:false, product: action.payload, isSuccess:true }
    case ADMIN_GET_PRODUCT_DETAIL_FAIL:
      return { isLoading:false, isError:true, isSuccess:false, message: action.payload }
    case ADMIN_GET_PRODUCT_DETAIL_CLEAR:
      return { product: {} }
      default:
      return state
  }
}

export const adminAddProductReducer= (state= { isLoading:false, isSuccess:false }, action) =>{
  switch(action.type){
    case ADMIN_ADD_PRODUCT_REQUEST:
      return { isLoading:true, isSuccess:false }
    case ADMIN_ADD_PRODUCT_SUCCESS:
      return { isLoading:false, isSuccess:true }
    case ADMIN_ADD_PRODUCT_FAIL:
      return { isLoading:false, isError:true, isSuccess:false, message: action.payload }
    case ADMIN_ADD_PRODUCT_CLEAR:
      return { isLoading:false, isSuccess:false }
    default:
      return state
  }
}

export const adminEditProductReducer= (state = { isLoading:false, isSuccess:false }, action) =>{
  switch(action.type){
    case ADMIN_EDIT_PRODUCT_REQUEST:
      return { isLoading:true, isSuccess:false }
    case ADMIN_EDIT_PRODUCT_SUCCESS:
      return { isLoading:false, isSuccess:true }
    case ADMIN_EDIT_PRODUCT_FAIL:
      return { isLoading:false, isError:true, isSuccess:false, message: action.payload }
    case ADMIN_EDIT_PRODUCT_CLEAR:
      return { isLoading:false, isSuccess:false }
    default:
      return state
  }
}

export const adminGetOrderReducer = (state = {orders:[], isLoading:false}, action) =>{
  switch(action.type){
    case ADMIN_ORDER_REQUEST:
      return { isLoading:true }
    case ADMIN_ORDER_SUCCESS:
      return { isLoading:false, orders: action.payload }
    case ADMIN_ORDER_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const adminMarkDeliverReducer = (state ={ isLoading:false, isSuccess:false }, action) =>{
  switch(action.type){
    case ADMIN_MARK_DELIVERED_REQUEST:
      return { isLoading:true }
    case ADMIN_MARK_DELIVERED_SUCCESS:
      return { isLoading:false, isSuccess:true }
    case ADMIN_MARK_DELIVERED_FAIL:
      return { isLoading:false, isSuccess:false }
    default:
      return state
  }
}

export const adminSearchReducer= (state = { users:[], products:[], orders:[], isLoading:false }, action) =>{
  switch(action.type){
    case ADMIN_SEARCH_USER_REQUEST:
      return { isLoading:true }
    case ADMIN_SEARCH_USER_SUCCESS:
      return  { isLoading:false, users: action.payload }
    case ADMIN_SEARCH_USER_FAIL:
      return  { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}