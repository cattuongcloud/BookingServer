import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../redux/actions/authActions';
import { connect } from 'react-redux';

class Signin extends Component {
  componentDidMount(){
    if(this.props.auth){
      this.props.history.push('/');
    }
  }
  submit = (values) => {
    this.props.signinUser(values, () => this.props.history.push('/'));
  }
  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(this.submit)}>
          <div className="form-group">
            <Field name="email"
              className="form-control"
              component="input"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <Field name="password"
              className="form-control"
              component="input"
              type="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
        {this.errorMessage()}
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return { 
    errorMessage: state.auth.error,
    auth: state.auth.authenticated
    };
}


const reduxFormSignin = reduxForm({
  form: 'signin'
})(Signin);

export default connect(mapStateToProps, { signinUser })(reduxFormSignin);