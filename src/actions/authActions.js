import {
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_FAIL,
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAIL,
  AUTH_SIGN_OUT_FAIL,
  AUTH_SIGN_OUT_SUCCESS,
  GET_AUTH_USER_FAIL,
  GET_AUTH_USER_REQUEST,
  GET_AUTH_USER_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  FORGET_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  GET_USER_ORDER_FAIL,
  GET_USER_ORDER_REQUEST,
  GET_USER_ORDER_SUCCESS
} from '../constants/authConstants.js'
import {firestore, auth} from "../config/firebase"
import { GET_CART_SUCCESS } from '../constants/cartConstants.js'

export const authSignUpAction = (email, password, name) => async (dispatch, getState) =>{
  try{
    dispatch({ type: AUTH_SIGN_UP_REQUEST })

    const res= await auth.createUserWithEmailAndPassword(email, password)
    if(res){
      await res.user.updateProfile({displayName: name})
      dispatch({ type: AUTH_SIGN_UP_SUCCESS, payload: res.user })
    }

    dispatch({ type: AUTH_SIGN_IN_SUCCESS, payload: res.user })
    const data={
      id: res.user.uid,
      displayName: name,
      email,
      isAdmin:false,
      role:"user",
      createdAt: Date.now()
    }
    if(data){
      localStorage.setItem('user', JSON.stringify(data)) 
    }
    return await firestore.collection('users').doc(res.user.uid).set(data)
    
  }catch(err){
    dispatch({type:AUTH_SIGN_UP_FAIL, payload:err.message  })
  }
}

export const authSignInAction = (email, password) => async(dispatch, getState) => {
  try{
    dispatch({type: AUTH_SIGN_IN_REQUEST })
    const res= await auth.signInWithEmailAndPassword(email, password)
    if(res){
      const data={
        uid: res.user.uid,
        displayName: res.user.displayName,
        email,
        createdAt: Date.now()
      }
      dispatch({ type: AUTH_SIGN_IN_SUCCESS, payload: res.user })
      localStorage.setItem('user', JSON.stringify(data))
    }
  }catch(err){
    dispatch({ type: AUTH_SIGN_IN_FAIL, payload: err.message })
  }
}

export const authSignOutAction = () => async(dispatch, getState) =>{
  try{
    return await auth.signOut().then(() =>{
      dispatch({type: AUTH_SIGN_OUT_SUCCESS })
      dispatch({ type: AUTH_SIGN_IN_SUCCESS, payload: null })
      dispatch({ type: AUTH_SIGN_UP_SUCCESS, payload:null })
      dispatch({ type: GET_AUTH_USER_SUCCESS, payload:null })
      dispatch({ type: GET_CART_SUCCESS, payload: [] })
    }) 
  }catch(err){
    dispatch({ type: AUTH_SIGN_OUT_FAIL, payload: err.message })
  }
}

export const getAuthUserAction= (id) => async(dispatch, getState) =>{
  try{
    dispatch({ type: GET_AUTH_USER_REQUEST })
    
    return await firestore.collection('users').doc(id).get().then((doc) =>{
      dispatch({ type: GET_AUTH_USER_SUCCESS, payload: doc.data() })
    })
  }catch(err){
    dispatch({ type: GET_AUTH_USER_FAIL, payload: err.message })
  }
}

export const updateProfileAction = (id, name, email, password) => async(dispatch, getState) =>{
  try{
    dispatch({ type: UPDATE_PROFILE_REQUEST })
    const user=  auth.currentUser
    if(user){
      await user.updateProfile({displayName:name})
      await user.updateEmail(email)
      if(password){
        await user.updatePassword(password)
      }

      const value={
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        createdAt: Date.now()
      }
      localStorage.setItem('user', JSON.stringify(value))
    }
    return await firestore.collection('users').doc(id).update({email, displayName:name}).then(() =>{
      dispatch({ type: UPDATE_PROFILE_SUCCESS })
    })
  }catch(err){
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: err.message })
  }
}

export const forgetPasswordAction = (email) => async(dispatch, getState) =>{
  try{
    dispatch({ type: FORGET_PASSWORD_REQUEST })
    
    return await auth.sendPasswordResetEmail(email).then(() =>{
      dispatch({ type: FORGET_PASSWORD_SUCCESS })
    })
  }catch(err){
    dispatch({ type: FORGET_PASSWORD_FAIL, payload:err.message })
  }
}

export const getUserOrderAction = (userId) => async(dispatch, getState) =>{
  try{
    dispatch({ type: GET_USER_ORDER_REQUEST })
    firestore.collection('orders').where("user", "==", userId).orderBy("createdAt", "desc").onSnapshot(snapshot =>{
      if(!snapshot.empty){
        const data=[]
        snapshot.docs.forEach(val => {
          data.push({
            ...val.data(),
            id: val.id
          })
        })
        dispatch({ type: GET_USER_ORDER_SUCCESS, payload: data })
      }else{
        dispatch({ type: GET_USER_ORDER_FAIL, payload: `User order not found...!` })
      }
    })
  }catch(err){
    dispatch({ type: GET_USER_ORDER_FAIL, payload: err.message })
  }
}