import { 
  ADMIN_ADD_PRODUCT_FAIL,
  ADMIN_ADD_PRODUCT_REQUEST,
  ADMIN_ADD_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_EDIT_PRODUCT_FAIL,
  ADMIN_EDIT_PRODUCT_REQUEST,
  ADMIN_EDIT_PRODUCT_SUCCESS,
  ADMIN_EDIT_USER_FAIL,
  ADMIN_EDIT_USER_REQUEST,
  ADMIN_EDIT_USER_SUCCESS,
  ADMIN_GET_PRODUCT_DETAIL_FAIL,
  ADMIN_GET_PRODUCT_DETAIL_REQUEST,
  ADMIN_GET_PRODUCT_DETAIL_SUCCESS,
  ADMIN_GET_PRODUCT_FAIL,
  ADMIN_GET_PRODUCT_REQUEST,
  ADMIN_GET_PRODUCT_SUCCESS,
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
  ADMIN_USER_FAIL,
  ADMIN_USER_REQUEST, 
  ADMIN_USER_SUCCESS 
} from "../constants/adminConstants"
import {firestore, timestamp} from "../config/firebase"

export const getUsersAdminAction= () => async (dispatch, getState) =>{
  try{
    dispatch({ type: ADMIN_USER_REQUEST })
    
    return firestore.collection('users').orderBy("createdAt", "desc").onSnapshot(snapshot =>{
      if(!snapshot.empty){
        const data=[]
        snapshot.docs.forEach(val =>{
          data.push(val.data())
        })
        dispatch({ type: ADMIN_USER_SUCCESS, payload: data })
      }else{
        dispatch({ type: ADMIN_USER_FAIL, payload: `No user data found...!` })
      }
    })
  }catch(err){
    dispatch({ type: ADMIN_USER_FAIL, payload: err.message })
  }
}

export const getUsersDetailAction = (id) => async(dispatch, getState) =>{
  try{
    dispatch({ type: ADMIN_GET_USER_DETAIL_REQUEST })
    
    return firestore.collection('users').doc(id).onSnapshot(snapshot =>{
      if(snapshot.exists){
        dispatch({ type: ADMIN_GET_USER_DETAIL_SUCCESS, payload: snapshot.data() })
      }
    })
  }catch(err){
    dispatch({ type: ADMIN_GET_USER_DETAIL_FAIL, paylaod: err.message })
  }
}

export const editUsersAdminAction = ({id, displayName, email, role, isAdmin}) => async (dispatch, getState) =>{
  try{
    dispatch({ type: ADMIN_EDIT_USER_REQUEST })
    
    return await firestore.collection('users').doc(id).update({ displayName, email, role, isAdmin }).then(() =>{
      dispatch({ type: ADMIN_EDIT_USER_SUCCESS })
    })
  }catch(err){
    dispatch({ type: ADMIN_EDIT_USER_FAIL, payload: err.message })
  }
}

export const deleteUsersAdminAction = (id) => async (dispatch, getState) =>{
  try{
    dispatch({ type: ADMIN_DELETE_USER_REQUEST })

    return await firestore.collection('users').doc(id).delete().then(() =>{
      dispatch({ type: ADMIN_DELETE_USER_SUCCESS })
    })
  }catch(err){
    dispatch({ type: ADMIN_DELETE_USER_FAIL, paylaod: err.message })
  }
}

export const addProductAdminAction = (data) => async(dispatch, getState) =>{
  try{
    dispatch({ type: ADMIN_ADD_PRODUCT_REQUEST })
    
    const objData={
      ...data,
      reviews:[],
      numReviews:Number(0),
      numRating:Number(0),
      createdAt: timestamp
    }
    
    await firestore.collection('products').add(objData)
    return dispatch({ type: ADMIN_ADD_PRODUCT_SUCCESS, payload: objData })
  }catch(err){
    dispatch({ type: ADMIN_ADD_PRODUCT_FAIL, payload: err.message })
  }
}

export const getProductAdminAction = () => async(dispatch, getState) =>{
  try{
    dispatch({ type: ADMIN_GET_PRODUCT_REQUEST })

    firestore.collection('products').orderBy("createdAt", "desc").onSnapshot(snapshot =>{
      if(!snapshot.empty){
        const data=[]
        snapshot.docs.forEach(val =>{
          data.push({
            ...val.data(),
            id: val.id
          })
        })
        dispatch({ type: ADMIN_GET_PRODUCT_SUCCESS, payload: data })
      }else{
        dispatch({ type: ADMIN_GET_PRODUCT_FAIL, payload: `No product data found...!` })
      }
    })
  }catch(err){
    dispatch({ type: ADMIN_GET_PRODUCT_FAIL, payload: err.message })
  }
}

export const getProductDetailAdmin = (id) => async(dispatch, getState) =>{
  try{
    dispatch({ type: ADMIN_GET_PRODUCT_DETAIL_REQUEST })
    firestore.collection('products').doc(id).onSnapshot(snapshot =>{
      if(snapshot.exists){
        dispatch({ type: ADMIN_GET_PRODUCT_DETAIL_SUCCESS, payload: snapshot.data() })
      }
    })
  }catch(err){
    dispatch({ type: ADMIN_GET_PRODUCT_DETAIL_FAIL, payload: err.message })
  }
}

export const editProductAdminAction = (id, data) => async(dispatch, getState) =>{
  try{
    dispatch({ type: ADMIN_EDIT_PRODUCT_REQUEST })
    const value={
      name: data.name,
      image: data.image,
      brand: data.brand,
      category: data.category,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock)
    }
    return await firestore.collection('products').doc(id).update(value).then(() =>{
      dispatch({ type: ADMIN_EDIT_PRODUCT_SUCCESS })
    })
  }catch(err){
    dispatch({ type: ADMIN_EDIT_PRODUCT_FAIL, payload: err.message })
  }
}

export const deleteProductAdminAction = (id) => async(dispatch, getState) =>{
  try{
    dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST })
    
    return await firestore.collection('products').doc(id).delete().then(() =>{
      dispatch({ type: ADMIN_DELETE_PRODUCT_SUCCESS })
    })
  }catch(err){
    dispatch({ type: ADMIN_DELETE_PRODUCT_FAIL, payload: err.message })
  }
}

export const getOrderAdminAction = () => async(dispatch, getState) =>{
  try{
    dispatch({ type: ADMIN_ORDER_REQUEST })
    
    firestore.collection('orders').orderBy("createdAt", "desc").onSnapshot(snapshot =>{
      if(!snapshot.empty){
        const data=[]
        snapshot.docs.forEach(val =>{
          data.push({
            ...val.data(),
            id: val.id
          })
        })
        dispatch({ type: ADMIN_ORDER_SUCCESS, payload: data })
      }else{
        dispatch({ type: ADMIN_ORDER_FAIL, payload: `Data order not found...!` })
      }
    })
  }catch(err){
    dispatch({ type: ADMIN_ORDER_FAIL, payload: err.message })
  }
}

export const markOrderAdminAction = (id) => async(dispatch, getState) =>{
  try{
    dispatch({ type: ADMIN_MARK_DELIVERED_REQUEST })
    const data={
      isDelivered:true,
      deliveredAt: Date.now()
    }
    return await firestore.collection('orders').doc(id).update(data).then(() =>{
      dispatch({ type: ADMIN_MARK_DELIVERED_SUCCESS })
    })
  }catch(err){
    dispatch({ type: ADMIN_MARK_DELIVERED_FAIL, payload: err.message })
  }
}

export const adminSearchAction = (keyword) => async(dispatch, getState) =>{
  try{
    dispatch({ type: ADMIN_SEARCH_USER_REQUEST })
    firestore
      .collection('users')
      .orderBy('displayName')
      .where(`displayName`, ">=", keyword.charAt(0).toUpperCase() + keyword.slice(1))
      .where("displayName", "<=", keyword.charAt(0).toUpperCase() + keyword.slice(1) + "\uf8ff")
      .onSnapshot(snapshot =>{
        if(!snapshot.empty){
          const data=[]
          snapshot.docs.forEach(val =>{
            data.push({
              ...val.data(),
              id: val.id
            })
          })
          dispatch({ type: ADMIN_SEARCH_USER_SUCCESS, payload: data })
        }else{
          dispatch({ type: ADMIN_SEARCH_USER_FAIL, payload:`No users found...!` })
        }
      })
  }catch(err){
    dispatch({ type: ADMIN_SEARCH_USER_FAIL, payload: err.message })
  }
}