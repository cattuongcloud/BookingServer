import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../redux/actions/authActions';

class Signout extends Component {
  constructor(props){
    super(props)
    debugger
    this.props.signoutUser(()=>{
      debugger;
      this.props.history.push('/');
    });
  }
  render() {
    return <div>Sorry to see you go</div>;
  }
}

export default connect(null, {signoutUser})(Signout);
