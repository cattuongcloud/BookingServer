import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';



const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className={active}>
                        <Link to={to}>
                            {label}
                        </Link>
                    </li>
                );
            }}
        />
    );
};

class Menu extends Component {
    render() {
        const menus = [
            {
                name: 'Home',
                to: '/',
                exact: true
            },
            {
                name: 'User List',
                to: '/user-list',
                exact: false
            },
            {
                name: this.props.authenticated ? 'Sign out': 'Sign in',
                to: this.props.authenticated ? '/signout': '/signin',
                exact: false
            }
        ];       
        return (
            <div className="navbar navbar-default">               
                <ul className="nav navbar-nav">
                    {this.showMenus(menus)}
                </ul>
            </div>
        );
    }

    showMenus = (menus) => {
        var result = null;
        if(menus.length > 0){
            result = menus.map((menu, index) => {
                return (
                    <MenuLink 
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                );
            });
        }
        return result;
    }

}
function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    };
  }
export default connect(mapStateToProps)(Menu);

