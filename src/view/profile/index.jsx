import React, {useState, useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {Row, Col, Table} from "reactstrap"
import {TiTick} from "react-icons/ti"
import {ImCross} from "react-icons/im"
import {useDispatch, useSelector} from "react-redux"
import { Link } from 'react-router-dom';
import * as Routes from "../../router"
import Loading from "../../components/Loading"
import { getAuthUserAction, getUserOrderAction, updateProfileAction } from '../../actions/authActions';
import { UPDATE_PROFILE_CLEAR } from '../../constants/authConstants';
import './profile.scss'

export default function MyProfile() {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cfPassword, setCfPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const {user} = useSelector(state => state.userLogIn)
  const {user:userInfo} = useSelector(state => state.userInfo)
  const {isLoading, isError, message, isSuccess} = useSelector(state => state.updateProfile)
  const {userOrder, isError:userOrderError, message:messageOrderError, isLoading: userOrderLoading} = useSelector(state => state.userOrder)
  const dispatch= useDispatch()

  useEffect(() =>{
    if(!userInfo || Object.keys(userInfo).length===0){
      dispatch(getAuthUserAction(user && user.uid))
    }else{
      setName(userInfo.displayName)
      setEmail(userInfo.email)
    }

    return () => dispatch({type: UPDATE_PROFILE_CLEAR})
  }, [dispatch, userInfo, user])

  useEffect(() =>{
    if(user){
      dispatch(getUserOrderAction(user.uid))
    }
  }, [dispatch, user])

  const handleUpdate = async (e) =>{
    e.preventDefault()
    if(cfPassword !== password){
      setErrMsg(`Confirm password does not match...!`)
      return
    }

    dispatch(updateProfileAction(user.uid, name, email, password))
  }

  return (
    <>
      <NavBar />
        <div className="profile-user">
          <Row>
            <Col xl="3" lg="3" md="3">
              <div className="title-profile">
                <span>User Profile</span>
              </div>
              {isError && (
                <div className="box-message">
                <span>{message}</span>
                </div>
              )}
              {errMsg && !isSuccess && (
                <div className="box-message">
                  <span>{errMsg}</span>
                </div>
              )}
              {isSuccess && (
                <div className="box-success">
                  <span>Update Successfully!</span>
                </div>
              )}
              <div className="form-user">
                <form onSubmit={handleUpdate}>
                  <div>
                    <label>Name</label>
                  </div>
                  <div>
                    <input type="text" spellCheck="false" value={name} onChange={(e) => {setName(e.target.value)}} required />
                  </div>
                  <div>
                    <label>Email Address</label>
                  </div>
                  <div>
                    <input type="email" spellCheck="false" value={email} onChange={(e) => {setEmail(e.target.value)}} required />
                  </div>
                  <div>
                    <label>Password</label>
                  </div>
                  <div>
                    <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                  </div>
                  <div>
                    <label>Confirm Password</label>
                  </div>
                  <div>
                    <input type="password" value={cfPassword} onChange={(e) => {setCfPassword(e.target.value)}} />
                  </div>
                  {isLoading && <button><span>Updating...</span></button>}
                  {!isLoading && <button><span>Update</span></button>}
                </form>
              </div>
            </Col>
            <Col xl="9" lg="9" md="9" className="order-info">
              <div className="title-profile">
                <span>My Order</span>
              </div>
              <div className="table-info">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrder && userOrder.map((val, ind) =>(
                    <tr key={ind}>
                      <td>{val.id}</td>
                      <td>{new Date(val.createdAt).toLocaleString('en-US')}</td>
                      <td>$ {val.totalPrices}</td>
                      <td>{val.isPaid ? <TiTick className="tick-svg" /> : <ImCross className="cross-icon" />}</td>
                      <td>
                        <Link to={`${Routes.ORDER_DETAIL}/${val.id}`}>
                          <button className="btn-deliver">Details</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {userOrderLoading && (
                <div className="loading" style={{marginTop:"20px"}}>
                  <Loading />
                </div>
              )}
              {userOrderError && (
                    <div className='box-message' style={{marginTop:"20px"}}>
                      <span>{messageOrderError}</span>
                    </div>
                  )}
              </div>
            </Col>
          </Row>
        </div>
      <Footer />
    </>
  );
}
