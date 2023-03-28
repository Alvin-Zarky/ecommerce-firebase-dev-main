import {
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_FAIL,
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAIL,
  AUTH_SIGN_OUT_REQUEST,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAIL,
  GET_AUTH_USER_REQUEST,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_CLEAR,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  GET_USER_ORDER_REQUEST,
  GET_USER_ORDER_SUCCESS,
  GET_USER_ORDER_FAIL,
  FORGET_PASSWORD_CLEAR,
  
} from '../constants/authConstants'

const initialState={
  user:null,
  isLoading:false,
  isError:false,
  isSuccess:false,
  message:''
}

export const authSignUpReducer = (state={ user:null, isLoading:false }, action) =>{
  switch(action.type){
    case AUTH_SIGN_UP_REQUEST:
      return { isLoading:true, isError:false }
    case AUTH_SIGN_UP_SUCCESS:
      return { isLoading:false, isError:false, user: action.payload }
    case AUTH_SIGN_UP_FAIL:
      return { isLoading:false, isError: true, message: action.payload }
    default:
      return state
  }
}

export const authSignInReducer= (state={ user:null, isLoading:false }, action) =>{
  switch(action.type){
    case AUTH_SIGN_IN_REQUEST:
      return { isLoading:true }
    case AUTH_SIGN_IN_SUCCESS:
      return { isLoading:false, user: action.payload }
    case AUTH_SIGN_IN_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const authSignOutReducer = (state= {user: null}, action) =>{
  switch(action.type){
    case AUTH_SIGN_OUT_REQUEST:
      return { isLoading:true }
    case AUTH_SIGN_OUT_SUCCESS:
      return { isLoading:false, user: null, isSuccess:true }
    case AUTH_SIGN_OUT_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const getAuthUserReducer = (state= {user: null}, action) =>{
  switch(action.type){
    case GET_AUTH_USER_REQUEST:
      return { isLoading:true }
    case GET_AUTH_USER_SUCCESS:
      return { isLoading:false, user: action.payload, isSuccess:true }
    case GET_AUTH_USER_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const updateProfileReducer = (state= {user: null}, action) =>{
  switch(action.type){
    case UPDATE_PROFILE_REQUEST:
      return { isLoading:true }
    case UPDATE_PROFILE_SUCCESS:
      return { isLoading:false, isSuccess:true }
    case UPDATE_PROFILE_FAIL:
      return { isLoading:false, isSuccess:false, isError:true, message: action.payload }
    case UPDATE_PROFILE_CLEAR:
      return { isSuccess:false, isError:false, message: `` }
    default:
      return state
  }
}

export const forgetPasswordReducer= (state = { isLoading:false, isSuccess:false }, action) =>{
  switch(action.type){
    case FORGET_PASSWORD_REQUEST:
      return { isLoading:true }
    case FORGET_PASSWORD_SUCCESS:
      return { isLoading:false, isSuccess:true }
    case FORGET_PASSWORD_FAIL:
      return { isLoading:false, isSuccess:false, isError:true, message:action.payload }
    case FORGET_PASSWORD_CLEAR:
      return { isSuccess:false, isError:false, message: null }
    default:
      return state;
  }
}

export const getUserOrderReducer= (state = {userOrder: [], isLoading:false}, action) =>{
  switch(action.type){
    case GET_USER_ORDER_REQUEST:
      return { isLoading:true }
    case GET_USER_ORDER_SUCCESS:
      return { isLoading:false, userOrder: action.payload }
    case GET_USER_ORDER_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}
