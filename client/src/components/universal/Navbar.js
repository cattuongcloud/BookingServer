import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  navbarLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-link" key="home"><Link to="/home">Home</Link></li>,
        <li className="nav-link" key="secret"><Link to="/secret">Secret</Link></li>,
        <li className="nav-link" key="signout"><Link to="/signout">Sign out</Link></li>
      ];
    }
    return [
      <li className="nav-link" key="home"><Link to="/home">Home</Link></li>,
      <li className="nav-link" key="signin"><Link to="/signin">Sign in</Link></li>,
      <li className="nav-link" key="signup"><Link to="/signup">Sign up</Link></li>
    ];
  }

  render() {
    return (
      <nav className="navbar">
        <div className="container">     
          <ul className="nav">            
            {this.navbarLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Navbar);