import { GET_PRODUCT_DETAIL_FAIL, GET_PRODUCT_DETAIL_REQUEST, GET_PRODUCT_DETAIL_SUCCESS, GET_PRODUCT_LIST_FAIL, GET_PRODUCT_LIST_REQUEST, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_SLIDE_FAIL, GET_PRODUCT_SLIDE_REQUEST, GET_PRODUCT_SLIDE_SUCCESS, POST_REVIEW_CLEAR, POST_REVIEW_FAIL, POST_REVIEW_REQUEST, POST_REVIEW_SUCCESS, SEARCH_PRODUCT_FAIL, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS } from "../constants/productConstants";

export const getProductListReducer= (state= { products:[], isLoading:false }, action) =>{
  switch(action.type){
    case GET_PRODUCT_LIST_REQUEST:
      return { isLoading:true }
    case GET_PRODUCT_LIST_SUCCESS:
      return { isLoading:false, products: action.payload }
    case GET_PRODUCT_LIST_FAIL:
      return { isLoading:false, message: action.payload, isError:true }
    default:
      return state
  }
}

export const getProductSlideReducer= (state= { products:[], isLoading:false }, action) =>{
  switch(action.type){
    case GET_PRODUCT_SLIDE_REQUEST:
      return { isLoading:true }
    case GET_PRODUCT_SLIDE_SUCCESS:
      return { isLoading:false, products: action.payload }
    case GET_PRODUCT_SLIDE_FAIL:
      return { isLoading:false, message: action.payload, isError:true }
    default:
      return state
  }
}

export const getProductDetailReducer= (state= { product:{}, isLoading:false }, action) =>{
  switch(action.type){
    case GET_PRODUCT_DETAIL_REQUEST:
      return { isLoading:true }
    case GET_PRODUCT_DETAIL_SUCCESS:
      return { isLoading:false, product: action.payload }
    case GET_PRODUCT_DETAIL_FAIL:
      return { isLoading:false, message: action.payload, isError:true }
    default:
      return state
  }
}

export const postReviewProductReducer= (state = { reviews:[], isLoading:false, isSuccess:false }, action ) =>{
  switch(action.type){
    case POST_REVIEW_REQUEST:
      return { isLoading:true, isSuccess:false }
    case POST_REVIEW_SUCCESS:
      return { isLoading:false, isSuccess:true, reviews: action.payload }
    case POST_REVIEW_FAIL:
      return { isLoading:false , isError:true, message: action.payload }
    case POST_REVIEW_CLEAR:
      return { isLoading:false, isSuccess:false, isError:false, message:null }
    default:
      return state
  }
}

export const searchProductReducer = (state = { products:[], isLoading:false }, action) =>{
  switch(action.type){
    case SEARCH_PRODUCT_REQUEST:
      return { isLoading:true }
    case SEARCH_PRODUCT_SUCCESS:
      return { isLoading:false, products: action.payload }
    case SEARCH_PRODUCT_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}
