import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Menu from './Menu';
import routes from '../routes';

class Navbar extends Component {
  // navbarLinks() {
  //   if (this.props.authenticated) {
  //     return [
  //       <li className="nav-link" key="home"><Link to="/home">Home</Link></li>,
  //       <li className="nav-link" key="admin"><Link to="/admin">Admin</Link></li>,
  //       <li className="nav-link" key="secret"><Link to="/secret">Secret</Link></li>,
  //       <li className="nav-link" key="signout"><Link to="/signout">Sign out</Link></li>
  //     ];
  //   }
  //   return [
  //     <li className="nav-link" key="home"><Link to="/home">Home</Link></li>,
  //     <li className="nav-link" key="signin"><Link to="/signin">Sign in</Link></li>,
  //     <li className="nav-link" key="signup"><Link to="/signup">Sign up</Link></li>

  //   ];
  // }

  render() {
    return (
      <Router>
        <div>
          <Menu />
          <div className="container">
            <div className="row">
              {this.showContentMenus(routes)}
            </div>
          </div>
        </div>
      </Router>
    );
  }

  showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Navbar);