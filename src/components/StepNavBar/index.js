import React from 'react';
import * as Routes from "../../router"
import { NavLink } from 'react-router-dom';
import './step-navbar.scss'

export default function StepNavBar() {
  return (
    <>
    <div className="navbar-step">
      <nav>
        <ul>
          <li><NavLink to={Routes.SIGN_IN}>Sign in</NavLink></li>
          <li><NavLink to={Routes.SHIPPING}>Shipping</NavLink></li>
          <li><NavLink to={Routes.PAYMENT}>Payment</NavLink></li>
          <li><NavLink to={Routes.PLACE_ORDER}>Place Order</NavLink></li>
        </ul>
      </nav>
    </div>
    </>
  );
}
