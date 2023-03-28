import React, {useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import StepNavBar from '../../components/StepNavBar';
import {Row, Col} from "reactstrap"
import * as Routes from "../../router"
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { timestamp } from '../../config/firebase';
import './place-order.scss'
import { placeOrderAction } from '../../actions/cartActions';

export default function PlaceOrder() {

  const {shipping} = useSelector(state => state.shipping)
  const {user} = useSelector(state => state.userLogIn)
  const {payment} = useSelector(state => state.payment)
  const {carts} = useSelector(state => state.cartItems)
  const {order} = useSelector(state => state.order)

  const dispatch= useDispatch()
  const history = useHistory()

  const addDecimal= (number) =>{
    return Math.round(number * 100) / 100
  }
  const itemPrices= carts.reduce((acc, item) => 
    addDecimal((acc + Number(item.price) * Number(item.qty))
  ), 0).toFixed(2)
  const shippingPrices= Number(itemPrices) > 100 ? 0 : 100 
  const taxPrices= addDecimal(Number(itemPrices) * 0.15).toFixed(2)
  const totalPrices= addDecimal(Number(itemPrices) + Number(shippingPrices) + Number(taxPrices)).toFixed(2)

  const handleSubmitOrder = () => {
    
    const objOrder={
      user: user.uid,
      email: user.email,
      userName: user.displayName,
      orderItems: carts,
      shipping,
      paymentMethod: payment,
      paymentResult: {},
      itemPrices,
      shippingPrices,
      taxPrices,
      totalPrices,
      isPaid: false,
      paidAt: null,
      isDelivered: false,
      deliveredAt:null,
      createdAt: Date.now()
    }
    dispatch(placeOrderAction(objOrder))
  }

  useEffect(() =>{
    if(order && order.id){
      history.push(`${Routes.ORDER_DETAIL}/${order.id}`)
    }
  }, [order, history])

  return (
    <>
    <NavBar />
    <div className="contain-order-detail  ">
      <div className="place-order">
        <StepNavBar />
        <Row>
              <Col xl="9" lg="9" md="8">
                <div className="shipping">
                  <div className="title-shipping">
                    <span>Shipping</span>
                  </div>
                  <div className="detail-shipping">
                    <div className="address">
                      <p>Address: {shipping && shipping.address}</p>
                    </div>
                  </div>
                </div>
                <div className="payment-method">
                  <div className="payment-shipping mrg-top10">
                    <span>Payment Method</span>
                  </div>
                  <div className="method">
                    <span>Method: {payment && payment}</span>
                  </div>
                </div>
                <div className="order-item">
                  <div className="order-shipping mrg-top10">
                    <span>Order Items</span>
                  </div>
                  <div className="items-order">
                    {carts && carts.map((val, ind) =>(
                      <Row className="border-item" key={ind}>
                        <Col xl="2" lg="2" md="6">
                          <div className="image-order">
                            <img src={val.image} alt="" />
                          </div>
                        </Col>
                        <Col xl="6" lg="6" md="6">
                          <div className="title-order-item">
                            <span>{val.name}</span>
                          </div>
                        </Col>
                        <Col xl="4" lg="4" md="4">
                          <div className="price-order">
                            <span>{val.qty} X $ {val.price} = $ {(Number(val.qty) * Number(val.price)).toFixed(2)}</span>
                          </div>
                        </Col>
                      </Row>
                    ))}
                  </div>
                </div>
              </Col>
              <Col xl="3" lg="3" md="4">
                <div className="box-summary">
                  <div className="overview">
                    <span>Order Summary</span>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Items</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {itemPrices}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Shipping</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {shippingPrices.toFixed(2)}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Tax</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {taxPrices}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Total</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {totalPrices}</span>
                      </Col>
                    </Row>
                  </div>
                </div>
                  <button onClick={handleSubmitOrder} className="btn-delivered">Place Order</button>
              </Col>
            </Row>
      </div>
    </div>
    <Footer />
    </>
  );
}
