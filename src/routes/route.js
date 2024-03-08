import React from 'react';

const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));

const Form = React.lazy(() => import('../views/form/Form'));
const Table = React.lazy(() => import('../views/table/Table'));
const UserProfile = React.lazy(() => import('../views/user/profile/Profile'));
const User = React.lazy(() => import('../views/user/Index'));
const Donation = React.lazy(() => import("../views/donation/Index"))
const CreateDonation = React.lazy(() => import("../views/donation/Create"))
const UpdateDonation = React.lazy(() => import("../views/donation/Update"))
const Donate = React.lazy(() => import("../views/donate/Index"))

const routes = [
	{ path: '/', exact: true, name: 'Home' },
	{ path: '/dashboard', name: 'Dashboard', element: Dashboard },
	{ path: '/form', name: 'Form', element: Form },
	{ path: '/table', name: 'Table', element: Table },
	{ path: '/user-profile', name: 'User Profile', element: UserProfile },
	{ path: '/user', name: 'User', element: User },
	{ path: '/donation', name: 'Donation', element: Donation },
	{ path: '/donation-create', name: 'Create Donation', element: CreateDonation },
	{ path: '/donation/:id/update', name: 'Update Donation', element: UpdateDonation },
	{ path: '/donate/:id', name: 'Donate', element: Donate },

];

export default routes;
