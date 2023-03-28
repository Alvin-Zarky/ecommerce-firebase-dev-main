import React, {useEffect} from 'react';
import NavBar from '../../components/Navbar';
import * as Routes from "../../router";
import {Row, Col} from "reactstrap";
import {Link,useParams} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux/es/exports';
import Footer from '../../components/Footer';
import Loading from "../../components/Loading"
import { productSearchAction } from '../../actions/productAction';
import Rating from '../../components/Rating';

export default function Search() {

  const {isError, message, products, isLoading} = useSelector(state => state.productSearch)
  const dispatch= useDispatch()
  const {keyword} = useParams()

  useEffect(() =>{
    if(keyword){
      dispatch(productSearchAction(keyword))
    } 
  }, [dispatch, keyword])
  
  
  return (
    <>
      <NavBar />
      <div className="list-products">
        <div className="title-product">
          <span>Latest products</span>
        </div>
        <div className="core-products">
          <Row>
            {isLoading && (
              <div className="loading" style={{marginTop:"20px"}}>
                <Loading />
              </div>
            )}
            {isError && (
              <div>
                <span>{message}</span>
              </div>
            )}
            {products && products.map((val, ind) =>(
              <Col xl="3" lg="3" md="4" key={val.id}>
                <Link to={`${Routes.PRODUCT}/${val.id}`}>
                  <div className="box-product">
                    <div className="image-per-product">
                      <img src={val.image} alt="product_image" />
                    </div>
                    <div className="detail-product">
                      <h5>{val.name.substring(0, 25)}{val.name.length > 25 ? `...` : ``}</h5>
                      <Rating numRating={val.numRating} review={val.numReviews} />
                      <span>$ {val.price}</span>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}
