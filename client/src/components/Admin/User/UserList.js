import React from 'react';
import { connect } from "react-redux";
import requireAuth from '../../../services/requireAuth';
import UserItem from './UserItem';
import { getUsers } from '../../../redux/actions/userActions';
class UserList extends React.Component {   
    componentDidMount() {      
        var { users } = this.props;         
        if(!users.user.length)  
          {
            this.props.getUsers();   
          }         
    } 
    render() {
        var { users } = this.props;     
     
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                {this.showUsers(users.user)}
                </tbody>
            </table>
        );
    }

    showUsers(users) {     
        var result = null;
        if (users && users.length > 0) {
            result = users.map((user, index) => {
               
                return (
                    <UserItem
                        key={index}
                        id={user._id}
                        email={user.email}                        
                        onDelete={this.onDelete}
                    />
                );
            });
        }
        return result;
    }
    
}

const mapStateToProps = (state) => {
   
    return (
        {
            auth: state.auth.authenticated,
            users: state.user
        }
    );
}

export default connect(mapStateToProps, {getUsers})(requireAuth(UserList));
