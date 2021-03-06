/* eslint-disable */

import React, {useState} from "react";
import { HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Home from './../routes/Home';
import Auth from './../routes/Auth';
import Profile from './../routes/Profile';
import Navigation from "./Navigation";


const AppRouter = ({isLoggedIn}) =>{
  return(
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {
          isLoggedIn
          ? 
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            {/* <Redirect from="*" to="/" /> */}
          </> 
          : 
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        }
      </Switch>
    </Router>
  )
}

export default AppRouter;