import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { Link, useParams, useHistory } from 'react-router-dom';
import * as Routes from "../../router"
import {getUsersDetailAction, editUsersAdminAction} from "../../actions/adminActions"
import './edit-user.scss'
import { ADMIN_EDIT_USER_CLEAR } from '../../constants/adminConstants';

export default function EditUserInfo() {
  
  const {user} = useSelector(state => state.adminUserDetail)
  const {isLoading, isSuccess} = useSelector(state => state.adminEditUser)
  const [userName, setName]= useState('')
  const [userEmail, setEmail]= useState('')
  const [isAdmin, setAdmin]= useState(null)
  const dispatch= useDispatch()
  const history= useHistory()
  const {id}= useParams()

  useEffect(() =>{
    if(!user || Object.keys(user).length === 0){
      dispatch(getUsersDetailAction(id))
    }else{
      setName(user.displayName)
      setEmail(user.email)
      setAdmin(user.isAdmin)
    }

    if(isSuccess){
      history.push(Routes.ADMIN_USER)
      dispatch({type: ADMIN_EDIT_USER_CLEAR})
    }
    
  }, [dispatch, id, user, isSuccess, history])
  
  const handleSubmit= async (e) =>{
    e.preventDefault()
    
    const role= isAdmin ? "admin" : "user"
    dispatch(editUsersAdminAction({id, displayName:userName, email: userEmail, role, isAdmin }))
  }

  return (
    <>
      <NavBar /> 
        <div className="maximum-width-page">
          <div className='link-back'>
            <Link to={Routes.ADMIN_USER}>
              <span>Go back</span>
            </Link>
          </div>
          <div className="form-update-info">
            <div className="title-overview">
              <span>Edit User</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
              </div>
              <div>
                <input type="text" className="input100" value={userName} onChange={(e) => {setName(e.target.value)}} required />
              </div>
              <div>
                <label>Email</label>
              </div>
              <div>
                <input type="email" className="input100" value={userEmail} onChange={(e) =>{setEmail(e.target.value)}} required />
              </div>
              <div className="checkbox">
                {isAdmin && (
                  <>
                    <input type="checkbox" onChange={(e) => {setAdmin(e.target.checked)}} defaultChecked /> <span>is Admin</span>
                  </>
                )} 
                {!isAdmin && (
                  <>
                    <input type="checkbox" onChange={(e) => {setAdmin(e.target.checked)}} /> <span>is Admin</span>
                  </>
                )} 
              </div>
              {isLoading && <button>Updating...</button>}
              {!isLoading && <button>Update</button>}
            </form>
          </div>
        </div>
      <Footer /> 
    </>
  );
}
