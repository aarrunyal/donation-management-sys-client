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
		<div className="p-3 mb-2 bg-blue text-dark bg-opacity-20 min-vh-100 d-flex flex-row align-items-center"
		style={{ backgroundColor: 'rgba(255,153,157,0.5)' }}>	
			<CContainer>
			<CRow>
				<CCol md={6}>
				</CCol>
			</CRow>
			<CCard className="p-4 mb-0 shadow" style={{ height: '600px' ,width: "1200px" }}>
			<CRow className="justify-content-center">
					<CCol md={6}>
						<img
							src='https://www.wikiimpact.com/wp-content/uploads/2021/05/donate_getty-1024x818.jpeg'
							style={{ width: '100%', height: '100%' }}
							alt="Image"
						/>
					</CCol>
				
					<CCol md={6}>
						<CCardGroup>
						<CCard className="p-4" style={{ height: '555px', width:'900px'}}>
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
													style={{ backgroundColor: 'rgba(251,112,113,255)' ,border: 'none'  }}
													className="w-100"
													type="submit"
													
												>
													Login
												</CButton>
											</CCol>
										</CRow>

										<div className="mt-5 d-flex flex-column align-items-center">
 										 <p className="font-italic fw-bold custom-font text-center"/> 
   										<p> <strong><i>Not a member?</i> </strong></p>
										<p>Create an account for free and Start Donating!</p>
  										<Link to="/register">
										
    									<CButton
      									style={{ backgroundColor: 'rgba(251,112,113,255)', border: 'none'  }}
      									className="mt-1 custom-button text-white ,w-100"
      									active
      									tabIndex={-1}
    									>
      									Register
    									</CButton>
  										</Link>
										</div>

									</CForm>
								</CCardBody>
							</CCard>
						</CCardGroup>
					</CCol>
				</CRow>
				</CCard>
				<Toasts childRef={childRef} />
			</CContainer>
		</div>
	);
};

export default Login;
