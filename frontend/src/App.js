import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import NavBar from './nav-bar/index'
import About from './about/index'
import ShoppingCart from './shopping-cart/index'
import Cart from './shopping-cart/cart/index'
import Checkout from './shopping-cart/checkout/index'

function App() {
  return (
    <>
      <Router>
        <NavBar />
        {/* <div>
          <ul>
            <li>
              <Link to="/test">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul> */}

        <Switch>
          <Route exact path="/">
            <Redirect to="/about" />
          </Route>
          <Route path="/about">
              <About />
          </Route>
          <Route exact path="/assignment3">
            <ShoppingCart />
          </Route>
          <Route path="/assignment3/cart">
            <Cart />
          </Route>
          <Route path="/assignment3/checkout">
            <Checkout />
          </Route>
          </Switch>
        </Router>
      </>
  );
}

export default App;
