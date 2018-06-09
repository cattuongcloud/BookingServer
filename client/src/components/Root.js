import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import Signout from './Signout';
import Navbar from './universal/Navbar';
import {getSigninUser} from '../redux/actions/authActions';
class Root extends Component {
  componentDidMount(){
    if(localStorage.getItem('token')){
      this.props.getSigninUser();
      debugger;
    }
  }
  render() {
    return (     
        <Router>
          <div className ="container">
            <Navbar />
            <Route exact path="/home" component={Home} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />   
            <Route path="/signout" component={Signout} />           
          </div>
        </Router>      
    );
  }
}
export default connect(null, {getSigninUser})(Root);

