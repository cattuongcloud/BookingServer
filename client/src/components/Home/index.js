import React from 'react';
import { connect } from "react-redux";
import { getText } from '../../redux/actions/homeActions';
class Home extends React.Component {     
    componentDidMount() {        
        this.props.getText('text');
        console.log(this);
    }  
    render() {
        return (
            <div>
                <h2>{this.props.text} </h2>
            </div>
        );
    }
}
const mapStateToProps = (state) => {   
    return (
        {
            text: state.home.text,
            auth: state.auth.authenticated, 
            //authenticated: state.auth.authenticated
        }
    );
}

export default connect(mapStateToProps,{getText})(Home);
