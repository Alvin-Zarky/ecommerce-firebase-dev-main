import React from 'react';
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import {Row, Col} from "reactstrap";
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {AiFillDelete} from "react-icons/ai";
import * as Routes from "../../router"
import { deleteToCartAction, editToCartAction } from '../../actions/cartActions';
import './shop-cart.scss'

export default function ShoppingCart() {

  const {user} = useSelector(state => state.userLogIn)
  const {carts} = useSelector(state => state.cartItems)
  const dispatch = useDispatch()

  const totalItems= carts.reduce((acc, item) => Number(item.qty) + acc, 0)
  const totalPrices= carts.reduce((acc, item) => (acc + Number(item.price) * Number(item.qty)), 0).toFixed(2)
  const history= useHistory()

  const handleDeleteCart = (id) =>{
    dispatch(deleteToCartAction(id))
  }
  const handleEditCart = (qty, id) => {
    dispatch(editToCartAction(qty, id))
  }
  
  const handleProceed = () =>{
    history.push(`${Routes.SIGN_IN}?redirect=shipping`)
  }

  return (
    <>
      <NavBar />
      <div className="maximum-width-page">
        <div className="shopping-page">
          <Row>
            <Col xl="8" lg="8" md="9">
              <div className="title-page">
                <span>Shopping cart</span>
              </div>
              <div className="box-procceed">
                {carts && carts.map((val, ind) =>(
                  <div className="box-cart-each" key={val.id}>
                    <Row>
                      <Col xl="3" lg="3" md="3">
                        <div className="image-box">
                          <img src={val.image} alt="image_1" />
                        </div>
                      </Col>
                      <Col xl="3" lg="3" md="3">
                        <div className="title-box">
                          <span>{val.name.substr(0, 25)}{val.name.length > 25 ? `...` : ``}</span>
                        </div>
                      </Col>
                      <Col xl="3" lg="3" md="3">
                        <div className="box-price">
                          <span>$ {val.price}</span>
                        </div>
                      </Col>
                      <Col xl="3" lg="3" md="3">
                        <div className="box-function">
                          <div className="quantity">
                            <select value={val.qty} onChange={(e) => {handleEditCart(e.target.value, val.id)}}>
                              {[...Array(val.stock).keys()].map((val, ind) =>(
                                <option key={ind} value={val + 1}>{val + 1}</option>
                              ))}
                            </select>
                          </div>
                          <div className="btn-remove" onClick={() => {handleDeleteCart(val.id)}}>
                            <AiFillDelete />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
                {carts && carts.length===0 && (
                  <div>
                    <span>No cart items...!</span>
                  </div>
                )}
              </div>
            </Col>
            <Col xl="4" lg="4" md="3">
              <div className="sub-total-item">
                <div className="title-item">
                  <span>Subtotal ({totalItems}) items</span>
                </div>
                <div className="price-item">
                  <span>$ {totalPrices}</span>
                </div>
                {!user && (
                  <div className={`btn-procceed ${carts && carts.length===0 && `disabled`}`} onClick={handleProceed}>
                    <span>Proceed to checkout</span>
                  </div>
                )}
                {user && (
                  <Link to={Routes.SHIPPING} className={`${carts && carts.length===0 && `disabled`}`}>
                    <div className={`btn-procceed`}>
                      <span>Proceed to checkout</span>
                    </div>
                  </Link>
                )}
              </div>
            </Col>  
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}
