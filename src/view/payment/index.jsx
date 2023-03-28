import React, {useEffect, useState} from 'react';
import Footer from '../../components/Footer';
import NavBar from '../../components/Navbar';
import StepNavBar from '../../components/StepNavBar';
import {useSelector, useDispatch} from "react-redux"
import { useHistory, Redirect } from 'react-router-dom';
import * as Routes from "../../router"
import './payment.scss'
import { addPaymentAction } from '../../actions/cartActions';

export default function Payment() {

  const [check, setCheck] = useState(false)
  const dispatch= useDispatch()
  const history= useHistory()

  useEffect(() =>{
    setCheck(true)
  }, [])

  const handlePayment = (e) =>{
    if(check){
      dispatch(addPaymentAction('Paypal')).then(() => history.push(Routes.PLACE_ORDER))
    }

    e.preventDefault()
  }

  return (
    <>
    <NavBar />
      <div className="maximum-width-page">
        <div className="sign-in">
          <StepNavBar />
          <div className="title-form">
            <span>Payment Method</span>
          </div>
          <div className="detail-payment">
            <div className="select-payment">
              <span>Select Method</span>
            </div>
            <form onSubmit={handlePayment}>
              <div className="credit">
                <input type="checkbox" onChange={(e) => {setCheck(true)}} defaultChecked required /> <span>Paypal or credit card</span>
              </div>
              <button>Continue</button>
            </form>
          </div>
        </div>
      </div>
    <Footer />
    </>
  );
}
