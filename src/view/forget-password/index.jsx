import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux"
import { Link } from 'react-router-dom';
import * as Routes from "../../router"
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './forget-password.scss'
import { forgetPasswordAction } from '../../actions/authActions';
import { FORGET_PASSWORD_CLEAR } from '../../constants/authConstants';

export default function ForgetPassword() {

  const [email, setEmail] = useState('')
  const {isLoading, isError, message, isSuccess} = useSelector(state => state.forgetPassword)
  const dispatch= useDispatch()

  const handleSubmit =(e) =>{
    e.preventDefault()

    dispatch(forgetPasswordAction(email)).then(() => setEmail(''))
  }

  useEffect(() =>{
    
    return () => dispatch({ type: FORGET_PASSWORD_CLEAR })
  }, [dispatch])

  return (
    <>
      <NavBar />
      <div className="maximum-width-page">
        <div className="sign-in">
          <div className="title-form">
            <span>Forget password</span>
          </div>
          <div className="detail-form">
            <p>Please fill in the email to reset your password...!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Enter the email' required />
            </div>
            {isLoading && <button>Submiting...</button>}
            {!isLoading && <button>Submit</button>}
            <div className="link-page">
              <span>Already have an account? <Link to={Routes.SIGN_IN}>Sign In</Link></span>
            </div>
            {isSuccess && (
              <div className="box-success-message">
                <span>Link has been sent to your email address</span>
              </div>
            )}
            {isError && (
              <div className="box-err-message">
                <span>{message}</span>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
