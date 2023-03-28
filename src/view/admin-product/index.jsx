import React, {useState, useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { Table } from 'reactstrap';
import {FiEdit} from "react-icons/fi";
import {MdDeleteOutline} from "react-icons/md";
import {Link} from "react-router-dom"
import {Row, Col} from "reactstrap"
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../../components/Loading"
import * as Routes from "../../router";
import '../admin-user/admin-user.scss';
import './admin-product.scss';
import { deleteProductAdminAction, getProductAdminAction } from '../../actions/adminActions';
import { ADMIN_GET_PRODUCT_DETAIL_CLEAR } from '../../constants/adminConstants';

export default function AdminProduct() {

  const {isLoading, products} = useSelector(state => state.adminGetProduct)
  const [search, setSearch] = useState('')
  const dispatch= useDispatch()

  const handleDelete= async (id) =>{
    if(window.confirm("Are u sure to delete this product?")){
      dispatch(deleteProductAdminAction(id))
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
  }

  useEffect(() =>{
    if(!products || products.length===0){
      dispatch(getProductAdminAction())
    }

    return () => {
      dispatch({ type: ADMIN_GET_PRODUCT_DETAIL_CLEAR })
    }
  }, [products, dispatch])

  return (
    <>
      <NavBar />
        <div className="maximum-width-page">
          <Row>
            <Col xl="6" lg="6" md="6">
              <div className="title-overview">
                <span>Products</span>
              </div>
            </Col>
            <Col xl="6" lg="6" md="6">
              <Link to={`${Routes.ADMIN_PRODUCT}/add`}>
                <div className="btn-create">
                  <span>Create Product</span>
                </div>
              </Link>
              <form onSubmit={handleSubmit}>
                <div className="input-search marginb20">
                  <div className="input-type">
                    <input type="text" value={search} onChange={(e) => {setSearch(e.target.value)}} spellCheck="false" />
                  </div>
                  <div className="btn-search">
                    <button>Search</button>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
          <Table className="table-content" striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
              </tr>
            </thead>
            <tbody>
                {products && products.map((val, ind) =>(
                  <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>$ {val.price}</td>
                    <td>{val.category}</td>
                    <td>{val.brand}</td>
                    <td>
                      <div className="button-function">
                        <Link to={`${Routes.ADMIN_PRODUCT}/edit/${val.id}`}>
                          <button className="edit"><FiEdit /></button>
                        </Link>
                        <button className="delete" onClick={(e) => {handleDelete(val.id)}}><MdDeleteOutline /></button>
                      </div>
                    </td>
                  </tr>
                ))}  
            </tbody>
          </Table>
          {isLoading && (
            <div className="loading" style={{marginTop:"20px"}}>
              <Loading />
            </div>
          )}
        </div>
      <Footer />
    </>
  );
}
