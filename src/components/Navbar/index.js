import React, {useState} from 'react';
import { Container, Row, Col} from "reactstrap"
import { NavLink, useHistory } from 'react-router-dom';
import * as Routes from "../../router"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {MdOutlineAdminPanelSettings} from "react-icons/md"
import { useSelector, useDispatch } from 'react-redux';
import {authSignOutAction} from "../../actions/authActions"
import {MdArrowDropDown} from "react-icons/md"
import {IoMdArrowDropdown} from "react-icons/io"
import {BiUser} from "react-icons/bi"
import './navbar.scss'

export default function NavBar() {

  const [keyword, setKeyword] = useState('')
  const [isDrop, setIsDrop] = useState(false)
  const [isAdminDrop, setIsAdminDrop]= useState(false)
  const {user} = useSelector(state => state.userLogIn)
  const {user:userInfo} = useSelector(state => state.userInfo)
  const dispatch= useDispatch()
  const history= useHistory()

  const handleSignOut= () =>{
    dispatch(authSignOutAction())
    localStorage.removeItem('user')
    localStorage.removeItem('carts')
  }
  const handleDrop = (role) =>{
    if(role === "user"){
      setIsDrop(!isDrop ? true : false)
      setIsAdminDrop(false)
      return
    }
    if(role === "admin"){
      setIsAdminDrop(!isAdminDrop ? true : false)
      setIsDrop(false)
      return
    }
  }

  const handleSearch = (e) =>{
    e.preventDefault()

    if(keyword.trim()){
      history.push(`${Routes.SEARCH}/${keyword}`)
    }else{
      history.push(Routes.INDEX)
    }
  }

  return (
    <>
      <Container className='bg-navbar' fluid>
        <Container>
          <Row>
            <Col xl="8" lg="8" md="7" sm="7">
              <div className="left-navbar">
                <div className="title-navbar">
                  <NavLink exact to={Routes.INDEX}><h3>proshop</h3></NavLink>
                </div>
                <form onSubmit={handleSearch}>
                  <div className="box-search">
                    <input type="text" value={keyword} onChange={(e) => {setKeyword(e.target.value)}} placeholder='Search products...' />
                    <button className="btn-search">
                      <span>Search</span>
                    </button>
                  </div>
                </form>
              </div>
            </Col>
            <Col xl="4" lg="4" md="5" sm="5">
            <div className="right-navbar">
                <nav>
                  <ul>
                    <li><NavLink to={Routes.CART}><AiOutlineShoppingCart /> Cart</NavLink></li>
                    {user && <li><div className="username" onClick={() => {handleDrop('user')}}><BiUser /> {user && user.displayName} <IoMdArrowDropdown /> 
                      {isDrop && (
                        <ul className='sub-menu'>
                          <li><NavLink to={Routes.PROFILE}>Profile</NavLink></li>
                          <li onClick={handleSignOut}><div className='logout'>Logout</div></li>
                        </ul>
                      )}
                    </div></li>}
                    {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <li><div className="username" style={{marginLeft:0}} onClick={() => {handleDrop('admin')}}><MdOutlineAdminPanelSettings /> Admin <IoMdArrowDropdown /> 
                      {isAdminDrop && (
                        <ul className='sub-menu'>
                          <li><NavLink to={Routes.ADMIN_USER}>User</NavLink></li>
                          <li><NavLink to={Routes.ADMIN_PRODUCT}>Products</NavLink></li>
                          <li><NavLink to={Routes.ADMIN_ORDER}>Order</NavLink></li>
                        </ul>
                      )}
                    </div></li>}
                    {!user && <li><NavLink to={Routes.SIGN_IN}><BiUser /> Sign in</NavLink></li>}
                  </ul>
                </nav>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
