import React from 'react';

const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));

const Form = React.lazy(() => import('../views/form/Form'));
const Table = React.lazy(() => import('../views/table/Table'));
const UserProfile = React.lazy(() => import('../views/user/profile/Profile'));
const routes = [
	{ path: '/', exact: true, name: 'Home' },
	{ path: '/dashboard', name: 'Dashboard', element: Dashboard },
	{ path: '/form', name: 'Form', element: Form },
	{ path: '/table', name: 'Table', element: Table },
	{ path: '/user-profile', name: 'User Profile', element: UserProfile },
];

export default routes;
