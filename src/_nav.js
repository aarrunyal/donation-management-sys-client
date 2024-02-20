import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilChartPie, cilSpeedometer, cilUserX } from '@coreui/icons';
import { CNavItem } from '@coreui/react';

const _nav = [
	{
		component: CNavItem,
		name: 'Dashboard',
		to: '/dashboard',
		icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
		badge: {
			color: 'info',
			text: 'NEW',
		},
	},
	{
		component: CNavItem,
		name: 'Charts',
		to: '/charts',
		icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
	},
	{
		component: CNavItem,
		name: 'Forms',
		to: '/form',
		icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
	},
	{
		component: CNavItem,
		name: 'Table',
		to: '/table',
		icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
	},
	{
		component: CNavItem,

		name: 'User Profile',
		to: '/user-profile',
		icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
	},
	{
		component: CNavItem,
		name: 'User',
		to: '/users',
		icon: <CIcon icon={cilUserX} customClassName="nav-icon" />,
	},
];

export default _nav;
