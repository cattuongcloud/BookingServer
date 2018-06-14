import React from 'react';
import Home from './Home';
import Signin from './Signin';
import AdminContainer from './Admin/AdminContainer';
//import PageNotFound from './PageNotFound'; 
import UserList from './Admin/User/UserList';
// import UserActionPage from './Admin/UserActionPage/UserActionPage';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/admin',
        exact: false,
        main: () => <AdminContainer />
    },
    {
        path: '/signin',
        exact: false,
        main: () => <Signin />
    },
    {
        path: '/user-list',
        exact: false,
        main: () => <UserList />
    }
];

export default routes;