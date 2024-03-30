import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
	AppContent,
	AppSidebar,
	AppFooter,
	AppHeader,
} from '../components/index';
import AuthService from 'src/services/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from 'src/store/actions/UserAction';
import RoleService from 'src/services/RoleService';
import { toast } from 'react-toastify';
import { createPermission } from 'src/store/actions/PermissionAction';

const DefaultLayout = () => {
	const dispatch = useDispatch();

	const permission = useSelector((state) => state.permission);

	const authService = new AuthService();
	const roleService = new RoleService();

	const location = useLocation();

	const getPermission = () => {
		roleService
			.getPermissionsByRole()
			.then((response) => {
				dispatch(createPermission(response.data));
			})
			.catch((error) => {
				toast.error('Something went wrong please try again !!!');
			});
	};

	const getLoggedinUser = () => {
		authService
			.getLoggedInUser()
			.then((response) => {
				dispatch(createUser(response.data));
				if (permission.length <= 0) {
					getPermission();
				}
			})
			.catch((error) => {
				authService.logout();
				localStorage.removeItem('token');
				window.location.href = '/';
			});
	};

	useEffect(() => {
		// Google Tag Manager
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: 'pageview',
			page_location: window.location.href,
		});
		if (localStorage.getItem('token')) getLoggedinUser();
	}, [location]);

	return (
		<div>
			<AppSidebar />
			<div className="wrapper d-flex flex-column min-vh-100 bg-light">
				<AppHeader />
				<div className="body flex-grow-1 px-3">
					<AppContent />
				</div>
				<AppFooter />
			</div>
		</div>
	);
};

export default DefaultLayout;
