import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilChartPie, cilHealing, cilSpeedometer, cilUserX } from '@coreui/icons';
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
		access:["all"]
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
		access:["all"]
	},
	{
		component: CNavItem,
		name: 'User',
		to: '/user',
		icon: <CIcon icon={cilUserX} customClassName="nav-icon" />,
		access:["admin"]
	},
	{
		component: CNavItem,
		name: 'Donation Campaign',
		to: '/donation',
		icon: <CIcon icon={cilHealing} customClassName="nav-icon" />,
		access:["admin", "organiser"]
	},
	{
		component: CNavItem,
		name: 'Donation History',
		to: '/history',
		icon: <CIcon icon={cilHealing} customClassName="nav-icon" />,
		access:["admin", "organiser"]
	},
];

export default _nav;
