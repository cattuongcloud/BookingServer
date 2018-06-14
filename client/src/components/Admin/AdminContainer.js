import React from 'react';
import { connect } from "react-redux";
import requireAuth from '../../services/requireAuth';
class AdminContainer extends React.Component {     
    componentDidMount() {  
        console.log(this);
    }  
    render() {
        return (
            <div>
                <h2>This is Admin AdminContainer</h2>
            </div>
        );
    }
}
const mapStateToProps = (state) => {   
    return (
        {           
            auth: state.auth.authenticated           
        }
    );
}

export default connect(mapStateToProps)(requireAuth(AdminContainer));
