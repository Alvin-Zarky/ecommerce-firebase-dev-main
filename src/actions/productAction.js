import {firestore} from "../config/firebase"
import { GET_PRODUCT_DETAIL_FAIL, GET_PRODUCT_DETAIL_REQUEST, GET_PRODUCT_DETAIL_SUCCESS, GET_PRODUCT_LIST_FAIL, GET_PRODUCT_LIST_REQUEST, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_SLIDE_FAIL, GET_PRODUCT_SLIDE_REQUEST, GET_PRODUCT_SLIDE_SUCCESS, POST_REVIEW_FAIL, POST_REVIEW_REQUEST, POST_REVIEW_SUCCESS, SEARCH_PRODUCT_FAIL, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS } from "../constants/productConstants"

export const getProductListAction = () => async(dispatch, getState) =>{
  try{
    dispatch({ type: GET_PRODUCT_LIST_REQUEST })

    return firestore.collection('products').orderBy("createdAt", "desc").onSnapshot(snapshot =>{
      if(!snapshot.empty){
        const data=[]
        snapshot.docs.forEach(value =>{
          data.push({
            ...value.data(),
            id: value.id
          })
        })
        
        dispatch({ type: GET_PRODUCT_LIST_SUCCESS, payload: data })
      }else{
        dispatch({ type: GET_PRODUCT_LIST_FAIL, payload: `No product data found...!` })
      }
    })
  }catch(err){
    dispatch({ type: GET_PRODUCT_LIST_FAIL, payload: err.message })
  }
}

export const getProductSlideAction = () => async(dispatch, getState) =>{
  try{
    dispatch({ type: GET_PRODUCT_SLIDE_REQUEST })
    
    return firestore.collection('products').orderBy("numRating", "desc").limit(3).onSnapshot(snapshot =>{
      if(!snapshot.empty){
        const data=[]
        snapshot.docs.forEach(value =>{
          data.push({
            ...value.data(),
            id: value.id
          })
        })
        dispatch({ type: GET_PRODUCT_SLIDE_SUCCESS, payload: data })
      }
    })
  }catch(err){
    dispatch({ type: GET_PRODUCT_SLIDE_FAIL, payload: err.message })
  }
}

export const getProductDetailAction = (id) => async(dispatch, getState) =>{
  try{
    dispatch({ type: GET_PRODUCT_DETAIL_REQUEST })
    
    firestore.collection('products').doc(id).onSnapshot(snapshot =>{
      if(snapshot.exists){
        const data={
          ...snapshot.data(),
          id
        }
        dispatch({ type: GET_PRODUCT_DETAIL_SUCCESS, payload: data })
      }else{
        dispatch({ type: GET_PRODUCT_DETAIL_FAIL, payload: `No product detail found...!` })
      }
    })
  }catch(err){
    dispatch({ type: GET_PRODUCT_DETAIL_FAIL, payload: err.message })
  }
}

export const postReviewProductAction = (id, data) => async(dispatch, getState) =>{
  try{
    dispatch({ type: POST_REVIEW_REQUEST })
    
    data.numReviews= data.reviews.length
    data.numRating= data.reviews.reduce((acc, item) => item.rating + acc , 0) / data.reviews.length
    return await firestore.collection('products').doc(id).update(data).then(() =>dispatch({ type: POST_REVIEW_SUCCESS }))
    
  }catch(err){
    dispatch({ type: POST_REVIEW_FAIL, payload:err.message })
  }
}

export const productSearchAction = (keyword) => async(dispatch, getState) =>{
  try{
    dispatch({ type: SEARCH_PRODUCT_REQUEST })
    firestore
      .collection('products')
      .orderBy('name')
      .where(`name`, ">=", keyword.charAt(0).toUpperCase() + keyword.slice(1))
      .where("name", "<=", keyword.charAt(0).toUpperCase() + keyword.slice(1) + "\uf8ff")
      .onSnapshot(snapshot =>{
        if(!snapshot.empty){
          const data=[]
          snapshot.docs.forEach(val =>{
            data.push({
              ...val.data(),
              id: val.id
            })
          })
          dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: data })
        }else{
          dispatch({ type: SEARCH_PRODUCT_FAIL, payload:`No products found...!` })
        }
      })
  }catch(err){
    dispatch({ type: SEARCH_PRODUCT_FAIL, payload: err.message })
  }
}