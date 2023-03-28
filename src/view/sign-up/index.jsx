import React, {useState, useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {authSignUpAction} from "../../actions/authActions"
import { toast } from 'react-toastify';
import * as Routes from "../../router";
import '../sign-in/sign-in.scss'
import './sign-up.scss'

export default function SignUp() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cfPassword, setCfPassword] = useState('')
  const [error, setError]= useState(null)
  
  const {isLoading, isError, message} = useSelector(state => state.userSignUp)
  const dispatch= useDispatch()
  
  const handleSignUp = (e) =>{
    e.preventDefault()
    
    if(password.length <6){
      setError(`Password should be atleast 6 characters...!`)
      return
    }
    if(cfPassword !== password){
      setError(`Confirm password does not match...!`)
      return
    }
    dispatch(authSignUpAction(email, password, name))
    setError('')
  }

  return (
    <>
      <NavBar />
      <div className="maximum-width-page">
        <div className="sign-in">
          <div className="title-form">
            <span>Sign up</span>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="input-field">
              <div>
                <label>Name</label>
              </div>
              <div>
                <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder='Please input the name' required />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Email Address</label>
              </div>
              <div>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Please input the email' required />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Password</label>
              </div>
              <div>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Please input the password' required />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Confirm Password</label>
              </div>
              <div>
                <input type="password" value={cfPassword} onChange={(e) => {setCfPassword(e.target.value)}} placeholder='Please input the confirm password' required />
              </div>
            </div>
            {isLoading ? <button>Signing up...</button> : <button>Sign up</button>}
            <div className="link-page">
              <span>New Customer? <Link to={Routes.SIGN_IN}>Sign In</Link></span>
            </div>
            <div className="forget-password">
              <Link to={Routes.FORGET_PASSWORD}>
                <span>Forget password</span>
              </Link>
            </div>
            {isError && (
              <div className='box-err-message'><span>{message}</span></div>
            )}
            {error && (
              <div className="box-err-message">
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
