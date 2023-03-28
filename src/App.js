import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as Routes from "./router"
import Overview from './view/overview';
import NotFound from "./view/not-found"
import ShoppingCart from './view/shopping-carts';
import SignIn from './view/sign-in';
import ProductDetail from './view/product-detail';
import SignUp from './view/sign-up';
import { ToastContainer } from 'react-toastify';
import {useSelector, useDispatch} from "react-redux"
import {getAuthUserAction} from "./actions/authActions"
import {Redirect} from "react-router-dom"
import AdminUser from './view/admin-user';
import EditUserInfo from './view/edit-user';
import AdminProduct from './view/admin-product';
import AddProduct from './view/add-product';
import EditProduct from './view/edit-product';
import AdminOrder from './view/admin-order';
import MyProfile from './view/profile';
import ForgetPassword from './view/forget-password';
import Shipping from './view/shipping';
import Payment from './view/payment';
import PlaceOrder from './view/place-order';
import OrderDetail from './view/order-detail';
import AdminOrderDetail from './view/admin-order-detail';
import Search from './view/search';
import AdminUserSearch from './view/admin-search-user';

function App() {
  
  const {carts} = useSelector(state => state.cartItems)
  const {user} = useSelector(state => state.userLogIn)
  const {user: userInfo} = useSelector(state => state.userInfo)
  const {shipping} = useSelector(state => state.shipping)
  const {payment} = useSelector(state => state.payment)
  const dispatch= useDispatch()

  useEffect(() =>{
    if(user && user.uid){
      dispatch(getAuthUserAction(user.uid))
    }
  }, [dispatch, user])
  
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={Routes.INDEX}>
            <Overview />
          </Route>
          <Route path={`${Routes.SEARCH}/:keyword`}>
            <Search />
          </Route>
          <Route path={`${Routes.CART}/:id?`}>
            <ShoppingCart />
          </Route>
          <Route path={Routes.SIGN_IN}>
            <SignIn />
            {user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.PRODUCT}/:id`}>
            <ProductDetail />
          </Route>
          <Route path={Routes.SIGN_UP}>
            {!user && <SignUp />}
            {user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={Routes.FORGET_PASSWORD}>
            {!user && <ForgetPassword />}
            {user && <Redirect to={Routes.FORGET_PASSWORD} />}
          </Route>
          <Route path={Routes.PROFILE}>
            {user && <MyProfile />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={Routes.SHIPPING}>
            {user && <Shipping />}
            {carts && carts.length===0 && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={Routes.PAYMENT}>
            {user && carts && <Payment />}
            {carts && carts.length===0 && <Redirect to={Routes.INDEX} />}
            {shipping && Object.keys(shipping).length===0 && <Redirect to={Routes.SHIPPING} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={Routes.PLACE_ORDER}>
            {user && carts && <PlaceOrder />}
            {carts && carts.length===0 && <Redirect to={Routes.INDEX} />}
            {!payment && <Redirect to={Routes.PAYMENT} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.ORDER_DETAIL}/:id`}>
              {user && <OrderDetail />}
              {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={Routes.ADMIN_USER}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <AdminUser />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={`${Routes.ADMIN_USER_SEARCH}/:keyword`}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <AdminUserSearch />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.ADMIN_EDIT_USER}/:id`}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <EditUserInfo />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={Routes.ADMIN_PRODUCT}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <AdminProduct />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={`${Routes.ADMIN_PRODUCT}/add`}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <AddProduct />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={`${Routes.ADMIN_PRODUCT}/edit/:id`}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <EditProduct />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={Routes.ADMIN_ORDER}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <AdminOrder />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={`${Routes.ADMIN_ORDER_DETAIL}/:id`}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" &&  <AdminOrderDetail />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={Routes.NOT_FOUND}>
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
