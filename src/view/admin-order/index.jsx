import React, {useEffect, useState} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { Table } from 'reactstrap';
import {ImCross} from "react-icons/im"
import {TiTick} from "react-icons/ti"
import {Row, Col} from "reactstrap"
import { Link, useParams, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import * as Routes from "../../router";
import Loading from '../../components/Loading';
import { getOrderAdminAction } from '../../actions/adminActions';
import '../admin-user/admin-user.scss';
import './admin-order.scss'

export default function AdminOrder() {

  const [keySearch, setKeySearch] = useState('')
  const {orders, isLoading, isError, message} = useSelector(state => state.adminOrder)
  const dispatch= useDispatch()
  const history = useHistory()
  const {search, page} = useParams()

  useEffect(() =>{
    dispatch(getOrderAdminAction())
  }, [dispatch])

  const handleSearch = (e) =>{
    e.preventDefault()
  }
  
  return (
    <>
      <NavBar />
        <div className="maximum-width-page">
          <Row>
            <Col xl="6" lg="6" md="6">
              <div className="title-overview">
                <span>Orders</span>
              </div>
            </Col>
            <Col xl="6" lg="6" md="6">
              <form onSubmit={handleSearch}>
                <div className="input-search marginb20">
                  <div className="input-type">
                    <input type="text" value={keySearch} onChange={(e) => {setKeySearch(e.target.value)}} spellCheck="false" />
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
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((val, ind) =>(
                <tr key={ind}>
                  <td>{val.id}</td>
                  <td>{val.userName}</td>
                  <td>{new Date(val.createdAt).toLocaleString('en-US')}</td>
                  <td>$ {val.totalPrices}</td>
                  <td>{val.isPaid ? new Date(val.paidAt).toLocaleString('en-US') : `Not Paid`}</td>
                  <td>{!val.isDelivered ? <ImCross className="cross-icon" /> : <TiTick className="tick-icon" />}</td>
                  <td>
                    <Link to={`${Routes.ADMIN_ORDER_DETAIL}/${val.id}`}>
                      <button className="btn-detail">Details</button>
                    </Link>
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
            {isError && (
              <div className="box-message">
                <span>{message}</span>
              </div>
            )}
        </div>
      <Footer />
    </>
  );
}

