import React, {useEffect} from 'react';
import {useParams} from "react-router-dom"
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {Row, Col} from "reactstrap"
import {useSelector, useDispatch} from "react-redux"
import { getOrderDetailAction } from '../../actions/cartActions';
import './admin-order-detail.scss'
import { markOrderAdminAction } from '../../actions/adminActions';

export default function AdminOrderDetail() {

  const {user} = useSelector(state => state.userLogIn)
  const {order} = useSelector(state => state.orderDetail)
  const dispatch= useDispatch()
  const {id} = useParams()

  useEffect(() =>{
    if(id){
      dispatch(getOrderDetailAction(id))
    }
  }, [dispatch, id])

  const handleMarkDeliver= () =>{
    dispatch(markOrderAdminAction(id))
  }

  return (
    <>
      <NavBar />
      {order && (
        <div className="contain-order-detail">
          <div className="title-order">
            <span>Order {order && order.id}</span>
          </div>
            <Row>
              <Col xl="9" lg="9" md="8">
                <div className="shipping">
                  <div className="title-shipping">
                    <span>Shipping</span>
                  </div>
                  <div className="detail-shipping">
                    <div className="username">
                      <span>Name: {order.userName}</span>
                    </div>
                    <div className="useremail">
                      <span>Email: <span className="class-bold">{order.email && order.email}</span></span>
                    </div>
                    <div className="address">
                      {order.shipping && (
                        <p>Address: {order.shipping.address}</p>
                      )}
                    </div>
                    {order.deliveredAt && (
                      <div className="box-delivered">
                        <span>Delivered on {new Date(order.deliveredAt).toLocaleString('en-US')} </span>
                      </div>
                    )}
                    {!order.isDelivered && (
                      <div className="box-delivered box-not-paid">
                        <span>Not Delivered</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="payment-method">
                  <div className="payment-shipping mrg-top10">
                    <span>Payment Method</span>
                  </div>
                  <div className="method">
                    <span>Method: {order.paymentMethod}</span>
                  </div>
                  <div className={`paid-delivered ${!order.isPaid && `box-not-paid`}`}>
                    {order.isPaid ? <span>Paid on {new Date(order.paidAt).toLocaleString('en-US')}</span>: <span>Not paid</span>}
                  </div>
                </div>
                <div className="order-item">
                  <div className="order-shipping mrg-top10">
                    <span>Order Items</span>
                  </div>
                  <div className="items-order">
                    {order.orderItems && order.orderItems.map((val, ind) =>(
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
                            <span>{val.qty} X {val.price} = $ {(Number(val.qty) * Number(val.price)).toFixed(2)}</span>
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
                        <span>$ {Number(order.itemPrices)}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Shipping</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {Number(order.shippingPrices).toFixed(2)}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Tax</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {Number(order.taxPrices)}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Total</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {Number(order.totalPrices).toFixed(2)}</span>
                      </Col>
                    </Row>
                  </div>
                </div>
                {!order.isDelivered && (
                  <button className="btn-delivered" onClick={handleMarkDeliver}>
                    Mark as delivered
                  </button>
                )}
              </Col>
            </Row>
        </div>
        )}
      <Footer />
    </>
  );
}
