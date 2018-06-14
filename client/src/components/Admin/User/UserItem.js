import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserItem extends Component {

    onDelete = (id) => {
        if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
            this.props.onDelete(id);
        }
    }

    render() {
        var { email, id } = this.props; 
        return (
            <tr> 
                <td>{id}</td>                 
                <td>{email}</td>                            
                <td>
                    <Link
                        to={`/user/${id}/edit`}
                        className="btn btn-success mr-10"
                    >
                        Sửa
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.onDelete(id)}
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default UserItem;
