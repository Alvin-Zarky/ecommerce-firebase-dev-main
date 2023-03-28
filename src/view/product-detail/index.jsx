import React, {useEffect, useState} from 'react';
import {Row, Col} from "reactstrap";
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import * as Routes from "../../router";
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import './product-detail.scss'
import { getProductDetailAction, postReviewProductAction } from '../../actions/productAction';
import RatingStar from "../../components/RatingStar"
import Rating from "../../components/Rating"
import { POST_REVIEW_CLEAR, POST_REVIEW_FAIL } from '../../constants/productConstants';
import { addToCartAction } from '../../actions/cartActions';
import { LEFT_TO_CART_CLEAR } from '../../constants/cartConstants';
  
export default function ProductDetail() {

  const [rate, setRate] = useState(1)
  const [comment, setComment] = useState('')
  const [qty, setQty] = useState(1)
  const {product} = useSelector(state => state.productDetail)
  const {user} = useSelector(state => state.userLogIn)
  const {isError, message} = useSelector(state => state.reviewProducts)
  const {carts, isSuccess} = useSelector(state => state.cartItems)
  const {id} = useParams()
  const history= useHistory()
  const dispatch= useDispatch()

  if(carts){
    localStorage.setItem('carts', JSON.stringify(carts))
  }

  useEffect(() => {
    dispatch(getProductDetailAction(id))

    if(isSuccess){
      history.push(`${Routes.CART}/${id}`)
      dispatch({ type: LEFT_TO_CART_CLEAR, payload: carts })
    }

    return () => {
      dispatch({ type: POST_REVIEW_CLEAR })
    }
  }, [dispatch, id, history, isSuccess, carts])
  
  const handleReview = (e) =>{
    e.preventDefault()
    const value={
      id: Math.random(),
      user: user.uid,
      name: user.displayName,
      message: comment,
      rating: Number(rate),
      createdAt: Date.now()
    }
    
    const data= {
      reviews: [...product.reviews, value]
    }

    const reviewExist= product.reviews.find(val => val.user === user.uid )
    if(reviewExist){
      dispatch({ type: POST_REVIEW_FAIL, payload: `Product already reviewed...!`}) 
    }else{
      setComment('')
      dispatch(postReviewProductAction(id, data))
    }
  }
  
  const handleToCart = (id) =>{
    dispatch(addToCartAction(id, qty, carts))
  }

  return (
    <>
      <NavBar />
      <div className="maximum-width-page">
        <div className="detail-page-show">
          {product && (
            <Row>
              <Col xl="5" lg="5" md="6">
            <div className='link-back' style={{marginTop: 0}}>
              <Link to={Routes.INDEX}>
                <span>Go back</span>
              </Link>
            </div>
              <div className='product-view'>
                <div>
                    <div className="image-for-product">
                      <img src={product.image} alt="image_1" />
                    </div>
                    <div className="review-product">
                      <span>Reviews</span>
                    </div>
                    {product.reviews && product.reviews.length===0 && (
                      <div className="box-show-review">
                        <span>No Reviews</span>
                      </div>
                    )}
                    {product.reviews && product.reviews.map((val, ind) =>(
                      <div className="box-list-review" key={val.id}>
                        <span>{val.name}</span>
                        <div className="rating">
                          <span><RatingStar numRating={val.rating} /></span>
                        </div>
                        <div className="date">
                          <span>{new Date(val.createdAt).toLocaleString('en-US')}</span>
                        </div>
                        <div className="detail">
                          <p>Feedback: {val.message}</p>
                        </div>
                      </div>
                    ))}
                    <div className="message-review-product">
                      <div className="title-review">
                        <span>Write a customer review</span>
                      </div>
                      {isError && user && (
                        <div className="box-err-msg">
                          <div className="message">
                            <span>{message}</span>
                          </div>
                        </div>
                      )}
                      {!user && (
                        <div className="permission-review">
                          <span>Please sign in to write a review</span>
                        </div>
                      )}
                      {user && (
                        <>
                          <form onSubmit={handleReview}>
                            <div>
                              <label>Rating</label>
                            </div>
                            <div>
                              <select onChange={(e) => {setRate(e.target.value)}}>
                                <option value="1">1- Poor</option>
                                <option value="2">2- Fair</option>
                                <option value="3">3- Good</option>
                                <option value="4">4- Very good</option>
                                <option value="5">5- Excellent</option>
                              </select>
                            </div>
                            <div>
                              <label>Comment</label>
                            </div>
                            <div>
                              <textarea value={comment} onChange={(e) => {setComment(e.target.value)}} required></textarea>
                            </div>
                            <button>Submit</button>
                          </form>
                        </>
                      )}
                    </div>
                  </div>
              </div>
            </Col>
              <Col xl="4" lg="4" md="3">
                <div className="show-text-detail">
                  <div className="title-text-detail">
                    <span>{product.name}</span>
                  </div>
                  <div className="rating">
                    <span><Rating numRating={product.numRating} review={product.numReviews} /></span>
                  </div>
                  <div className="price-detail">
                    <span>Price: ${product.price}</span>
                  </div>
                  <div className='detail-text'>
                    <p>{product.description}</p>
                  </div>
                </div>
              </Col>
              <Col xl="3" lg="3" md="3">
                <div className={`box-add-to-cart ${product.stock > 0 ? ``: `disabled-box`}`}>
                  <div className="amount-price">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Price</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {product.price}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="status">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Status</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        {Number(product.stock) > 1 ? <span>In Stock</span> : <span>Out of stock</span>}
                      </Col>
                    </Row>
                  </div>
                  <div className={`quantity`}>
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Quantity</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <select onChange={(e) => {setQty(e.target.value)}}>
                          {product.stock > 0 ? [...Array(product.stock).keys()].map((val, ind) =>(
                            <option value={val + 1} key={ind}>{val + 1}</option>
                          )) : <option value="1">1</option>}
                        </select>
                      </Col>
                    </Row>
                  </div>
                  <div className={`btn-add-to-cart`} onClick={() => {handleToCart(product.id)}}>
                    <button>Add to cart</button>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
