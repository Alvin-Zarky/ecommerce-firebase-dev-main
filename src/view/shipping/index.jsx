import React, {useState, useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import StepNavBar from '../../components/StepNavBar';
import { useHistory } from 'react-router-dom';
import * as Routes from "../../router"
import { useDispatch, useSelector } from 'react-redux';
import '../sign-in/sign-in.scss'
import './shipping.scss'
import { addShippingAction } from '../../actions/cartActions';

export default function Shipping() {

  const {carts} = useSelector(state => state.cartItems)
  const {shipping} = useSelector(state => state.shipping)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState('')
  const [country, setCountry] = useState('')

  const dispatch= useDispatch()
  const history= useHistory()

  const handleSubmit = (e) =>{
    const data={
      address,
      city,
      postalCode: postal,
      country
    }
    
    dispatch(addShippingAction(data))
    history.push(Routes.PAYMENT)
    e.preventDefault()
  }

  useEffect(() =>{
    if(carts && carts.length===0){
      history.push(Routes.INDEX)
    }
    
    if(Object.keys(shipping).length===0){
      setAddress('')
      setCity('')
      setPostal('')
      setCountry('')
    }else{
      setAddress(shipping.address)
      setCity(shipping.city)
      setPostal(shipping.postalCode)
      setCountry(shipping.country)
    }
  }, [shipping, carts, history])

  return (
    <>
      <NavBar />
      <div className="maximum-width-page">
        <div className="sign-in" style={{marginBottom:"20px"}}>
          <div>
            <StepNavBar />
          </div>
          <div className="title-form">
            <span>Shipping</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <div>
                <label>Address</label>
              </div>
              <div>
                <input type="text" value={address} onChange={(e) => {setAddress(e.target.value)}} required  placeholder='Please enter address' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>City</label>
              </div>
              <div>
                <input type="text" value={city} onChange={(e) => {setCity(e.target.value)}} required placeholder='Please enter city' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Postal code</label>
              </div>
              <div>
                <input type="number" value={postal} onChange={(e) => {setPostal(e.target.value)}
              } required placeholder='Enter postal code' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Country</label>
              </div>
              <div>
                <input type="text" value={country} onChange={(e) => {setCountry(e.target.value)}} required placeholder='Enter country' />
              </div>
            </div>
            <button>Continue</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
