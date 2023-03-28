import React, {useEffect, useState} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {TiTick} from "react-icons/ti"
import {FiEdit} from "react-icons/fi"
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Routes from "../../router"
import {MdDeleteOutline} from "react-icons/md"
import { Table } from 'reactstrap';
import {ImCross} from "react-icons/im"
import {Row, Col} from "reactstrap"
import Loading from "../../components/Loading"
import {getUsersAdminAction, deleteUsersAdminAction, adminSearchAction} from "../../actions/adminActions"
import { ADMIN_GET_USER_CLEAR } from '../../constants/adminConstants';
import './admin-search-user.scss'

export default function AdminUserSearch() {

  const [search, setSearch] = useState('')
  const { users, isLoading } = useSelector(state => state.adminSearch)
  const {keyword} = useParams()
  const dispatch= useDispatch()
  const history= useHistory()

  useEffect(() =>{
    dispatch(getUsersAdminAction())

    return () => {
      dispatch({ type: ADMIN_GET_USER_CLEAR })
    }
  }, [dispatch])

  useEffect(() =>{
    if(keyword){
      dispatch(adminSearchAction(keyword))
    } 
  }, [dispatch, keyword])

  const handleDelete = (id) =>{
    if(window.confirm('Are you sure to delete this user')){
      dispatch(deleteUsersAdminAction(id))
    }
  }

  const handleSearch = (e) =>{
    e.preventDefault()

    if(keyword.trim()){
      history.push(`${Routes.ADMIN_USER_SEARCH}/${search}`)
    }else{
      history.push(Routes.ADMIN_USER)
    }
  }

  return (
    <>
      <NavBar />
        <div className="admin-user-page">
          <Row>
            <Col xl="6" lg="6" md="6">
              <div className="title-user">
                <span>User</span>
              </div>
            </Col>
            <Col xl="6" lg="6" md="6">
              <form onSubmit={handleSearch}>
                <div className="input-search">
                  <div className="input-type">
                    <input type="text" onChange={(e) => {setSearch(e.target.value)}} value={search} spellCheck="false" />
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
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((val, ind) =>(
                <tr key={ind}>
                  <td>{val.id}</td>
                  <td>{val.displayName}</td>
                  <td>{val.email}</td>
                  <td>{val.isAdmin ? <TiTick className="tick-icon" /> : <ImCross className="cross-icon" />}</td>
                  <td>
                    <div className="button-function">
                      <Link to={`${Routes.ADMIN_EDIT_USER}/${val.id}`}>
                        <button className="edit"><FiEdit /></button>
                      </Link>
                      <button className="delete" onClick={() => {handleDelete(val.id)}}><MdDeleteOutline /></button>
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
