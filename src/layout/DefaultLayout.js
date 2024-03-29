import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
	AppContent,
	AppSidebar,
	AppFooter,
	AppHeader,
} from '../components/index';
import AuthService from 'src/services/AuthService';
import { useDispatch } from 'react-redux';
import { createUser } from 'src/store/actions/UserAction';

const DefaultLayout = () => {
	const dispatch = useDispatch();

	const authService = new AuthService();

	const location = useLocation();

	const getLoggedinUser = () => {
		authService
			.getLoggedInUser()
			.then((response) => {
				dispatch(createUser(response.data));
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
