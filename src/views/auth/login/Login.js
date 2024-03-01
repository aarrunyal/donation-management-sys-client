import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
	CButton,
	CCard,
	CCardBody,
	CCardGroup,
	CCol,
	CContainer,
	CForm,
	CFormFeedback,
	CFormInput,
	CInputGroup,
	CInputGroupText,
	CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import AuthService from 'src/services/AuthService';
import Toasts from 'src/components/toast/Toast';
import { isLoggedIn } from 'src/helpers/IsLoggedIn';
import AppFooter from 'src/components/AppFooter';

const Login = () => {
	const authService = new AuthService();
	const [validated, setValidated] = useState(false);
	const navigate = useNavigate();
	const childRef = useRef();

	const [state, setState] = useState({
		email: 'admin@dms.com',
		password: 'admin@123',
	});

	const naviageIfNotLoggedIn = () => {
		return isLoggedIn() ? navigate('/dashboard') : null;
	};

	const validateForm = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
			childRef.current.showToast('warning', 'Please provide valid data');
			childRef.current.showToast('error', 'Fields cannot be empty');
		}
		setValidated(true);
		return true;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (validateForm(event) && state.email && state.password) {
			childRef.current.showToast('loading', 'Logging in...');
			authService
				.login(state)
				.then((response) => {
					childRef.current.showToast(
						'no_loading',
						'User logged in successfully!'
					);
					localStorage.setItem('token', response.data.token);
					setTimeout(() => {
						navigate('/dashboard');
					}, 2000);
				})
				.catch((error) => {
					console.log(error);
					const { message } = error.response.data;
					childRef.current.showToast('no_loading', message);
				});
		}
	};

	const handleChange = (event) => {
		setState((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<div className="p-3 mb-2 bg-warning text-dark bg-opacity-10 min-vh-100 d-flex flex-row align-items-center">
			<CContainer>
				<CRow>
					<CCol md={12}>
						<CCard className="p-3 mb-2 .bg-primary text-dark  text-blue ">
							<CCardBody className="text-center">
								<div>
									<h2>Sign up for free</h2>
                                    <p className="font-italic fw-bold custom-font">Create an account and start donating!</p>
									<Link to="/register">
										<CButton
											color="bg-custom-light-white"
											className="mt-3"
											active
											tabIndex={-1}
										>
											Register Now!
										</CButton>
									</Link>
								</div>
							</CCardBody>
						</CCard>
					</CCol>
				</CRow>
				<CRow className="justify-content-center">
					<CCol md={6}>
						<img
							src="https://www.501c3.org/wp-content/uploads/2021/05/jar-of-money-cash-donations-appreciated-sign-message-board-contributions-tips-collection.jpg"
							style={{ width: '95%', height: '84%' }}
							alt="Image"
						/>
					</CCol>
					<CCol md={6}>
						<CCardGroup>
							<CCard className="p-4">
								<CCardBody>
									<CForm
										noValidate
										validated={validated}
										onSubmit={handleSubmit}
									>
										<h1>Login</h1>
										<p className="text-medium-emphasis">
											Donation Management System
										</p>
										<CInputGroup className="mb-3">
											<CInputGroupText>
												<CIcon icon={cilUser} />
											</CInputGroupText>
											<CFormInput
												id="validationTextarea"
												placeholder="Email"
												autoComplete="email"
												value={state.email}
												onChange={handleChange}
												name="email"
												required
											/>
											<CFormFeedback invalid>Email is required</CFormFeedback>
										</CInputGroup>

										<CInputGroup className="mb-4">
											<CInputGroupText>
												<CIcon icon={cilLockLocked} />
											</CInputGroupText>
											<CFormInput
												id="validationTextarea"
												type="password"
												placeholder="Password"
												autoComplete="current-password"
												value={state.password}
												onChange={handleChange}
												name="password"
												required
											/>
											<CFormFeedback invalid>
												Password is required
											</CFormFeedback>
										</CInputGroup>

										<CRow>
											<CCol xs={6}>
												<CButton
													color="primary"
													className="w-100"
													type="submit"
												>
													Login
												</CButton>
											</CCol>
										</CRow>
									</CForm>
								</CCardBody>
							</CCard>
						</CCardGroup>
					</CCol>
				</CRow>
				<Toasts childRef={childRef} />
			</CContainer>
		</div>
	);
};

export default Login;
