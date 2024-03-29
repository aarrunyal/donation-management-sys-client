import React, { Component, Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import './scss/style.scss';
import { isLoggedIn } from './helpers/IsLoggedIn';
import { Provider } from 'react-redux';
import {store} from './store/Store';



const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
);


// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/auth/login/Login'));
const Register = React.lazy(() => import('./views/auth/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
	render() {
		return (
			<HashRouter>
				<Suspense fallback={loading}>
					<Provider store={store()}>
						<Routes>
							<Route
								exact
								path="/login"
								name="Login Page"
								element={isLoggedIn() ? <Navigate to="/" /> : <Login />}
							/>
							<Route
								exact
								path="/register"
								name="Register Page"
								element={<Register />}
							/>
							<Route exact path="/404" name="Page 404" element={<Page404 />} />
							<Route exact path="/500" name="Page 500" element={<Page500 />} />
							<Route path="*" name="Home" element={<DefaultLayout />} />
						</Routes>
					</Provider>
				</Suspense>
			</HashRouter>
		);
	}
}

export default App;
