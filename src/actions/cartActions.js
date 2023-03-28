import { firestore } from "../config/firebase"
import { ADD_PAYMENT_FAIL, ADD_PAYMENT_REQUEST, ADD_PAYMENT_SUCCESS, ADD_SHIPPING_FAIL, ADD_SHIPPING_REQUEST, ADD_SHIPPING_SUCCESS, ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, DELETE_TO_CART_FAIL, DELETE_TO_CART_REQUEST, DELETE_TO_CART_SUCCESS, EDIT_TO_CART_FAIL, EDIT_TO_CART_REQUEST, EDIT_TO_CART_SUCCESS, GET_CART_SUCCESS, GET_ORDER_DETAIL_FAIL, GET_ORDER_DETAIL_REQUEST, GET_ORDER_DETAIL_SUCCESS, PAID_ORDER_FAIL, PAID_ORDER_REQUEST, PAID_ORDER_SUCCESS, PLACE_ORDER_FAIL, PlACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../constants/cartConstants"

export const addToCartAction = (id, qty, carts) => async(dispatch, getState) =>{
  try{
    dispatch({ type: ADD_TO_CART_REQUEST })
    
    const dataItems=[]
    firestore.collection('products').doc(id).onSnapshot(snapshot =>{
      if(snapshot.exists){
        const {name, image, price, stock} = snapshot.data()
        const data={
          id,
          qty: Number(qty),
          name,
          image,
          price,
          stock
        }
        const existItem = carts.find(val => val.id === id)
        if(!existItem){
          dataItems.push(...carts, data)
          dispatch({ type: ADD_TO_CART_SUCCESS, payload: dataItems })
        }else{
          const value= carts.map(val => val.id=== id ? data : val )
          dispatch({ type: ADD_TO_CART_SUCCESS, payload: value })
        }
      }else{
        dispatch({type: ADD_TO_CART_FAIL, payload: `No product detail found...!`})
      }
    })
  }catch(err){
    dispatch({type: ADD_TO_CART_FAIL, payload: err.message})
  }
}

export const editToCartAction = (qty, id) => async(dispatch, getState) =>{
  try{
    dispatch({ type: EDIT_TO_CART_REQUEST })
    const {carts} = getState().cartItems
    carts.map(val => val.id === id ? val.qty= qty : val )

    dispatch({ type: GET_CART_SUCCESS, payload: carts })
    dispatch({ type: EDIT_TO_CART_SUCCESS, payload: carts })
    localStorage.setItem('carts', JSON.stringify(carts))

  }catch(err){
    dispatch({ type: EDIT_TO_CART_FAIL })
  }
}

export const deleteToCartAction = (id) => async(dispatch, getState) =>{
  try{
    dispatch({ type: DELETE_TO_CART_REQUEST })
    const {carts} = getState().cartItems

    const cartItems = carts.filter(val => {
      return val.id !== id
    })

    dispatch({ type: GET_CART_SUCCESS, payload: cartItems })
    dispatch({ type: DELETE_TO_CART_SUCCESS, payload: cartItems  })
    localStorage.setItem('carts', JSON.stringify(cartItems))

  }catch(err){
    dispatch({type: DELETE_TO_CART_FAIL, payload: err.message})
  }
}

export const addShippingAction = (data) => async(dispatch, getState) =>{
  try{
    dispatch({ type: ADD_SHIPPING_REQUEST })
    
    localStorage.setItem('shipping', JSON.stringify(data))
    dispatch({ type: ADD_SHIPPING_SUCCESS, payload:data })
  }catch(err){
    dispatch({ type: ADD_SHIPPING_FAIL, payload: err.message })
  }
}

export const addPaymentAction = (data) => async(dispatch, getState) =>{
  try{
    dispatch({ type: ADD_PAYMENT_REQUEST })
    
    localStorage.setItem('payment', JSON.stringify(data))
    dispatch({ type: ADD_PAYMENT_SUCCESS , payload:data })
  }catch(err){
    dispatch({ type: ADD_PAYMENT_FAIL , payload: err.message })
  }
}

export const placeOrderAction = (data) => async(dispatch, getState) =>{
  try{
    dispatch({ type: PlACE_ORDER_REQUEST })
    const res=  await firestore.collection('orders').add(data)
    
    const order={ ...data, id: res.id }
    dispatch({ type: PLACE_ORDER_SUCCESS, payload:order })

  }catch(err){
    dispatch({ type: PLACE_ORDER_FAIL , payload: err.message })
  }
}

export const getOrderDetailAction = (id) => async(dispatch, getState) =>{
  try{
    dispatch({ type: GET_ORDER_DETAIL_REQUEST })
    firestore.collection('orders').doc(id).onSnapshot(snapshot => {
      if(snapshot.exists){
        const data={
          ...snapshot.data(),
          id
        }
        dispatch({ type: GET_ORDER_DETAIL_SUCCESS, payload: data })
      }else{
        dispatch({ type: GET_ORDER_DETAIL_FAIL, payload: `No order detail found...!` })
      }
    })
  }catch(err){
    dispatch({ type: GET_ORDER_DETAIL_FAIL, payload: err.message })
  }
}

export const paidOrderAction = (id, paymentResult) => async(dispatch, getState) =>{
  try{
    dispatch({ type: PAID_ORDER_REQUEST })
    
    const dataPaymentResult={
      id: paymentResult.id,
      status: paymentResult.status,
      email_address: paymentResult.payer.email_address,
      update_time: paymentResult.update_time
    }
    return await firestore.collection('orders').doc(id).update({
      paymentResult: dataPaymentResult,
      isPaid:true,
      paidAt: Date.now()
    }).then(() => dispatch({ type: PAID_ORDER_SUCCESS }))
    
  }catch(err){
    dispatch({ type: PAID_ORDER_FAIL, payload: err.message })
  }
}