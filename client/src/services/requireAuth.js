import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getSigninUser} from '../redux/actions/authActions';
export default ChildComponent => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
        debugger       
        if(localStorage.getItem('token')){
            if (!this.props.auth) {
              this.props.getSigninUser(); 
          }            
        }
        else{
          this.props.history.push('/signin');
        }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

//   function mapStateToProps(state) {
//     return { auth: state.auth.authenticated };
    
//   }

//   const mapStateToProps = (state) => {   
//     debugger
//     return (
//         {            
//             auth: state.auth.authenticated
//             //authenticated: state.auth.authenticated
//         }
//     );
// }
  return connect(null, {getSigninUser})(ComposedComponent);
};
