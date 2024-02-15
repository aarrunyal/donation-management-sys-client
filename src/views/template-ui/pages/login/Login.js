import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	CButton,
	CCard,
	CCardBody,
	CCardGroup,
	CCol,
	CContainer,
	CForm,
	CFormInput,
	CInputGroup,
	CInputGroupText,
	CRow,
	CFormFeedback
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

import AuthService from 'src/services/AuthService';

import Toasts from 'src/components/toast/Toast';






const Login = () => {

	const authService = new AuthService();

	const [validated, setValidated] = useState(false)

	const [validationMessage, setValidationMessage] = useState(null)

	const childRef = useRef()

	const [state, setState] = useState({
		email: null,
		password: null
	})



	const validateForm = ((event) => {
		const form = event.currentTarget
		if (form.checkValidity() === false) {
			event.stopPropagation();
			childRef.current.showToast("Please provide the valid data", "warning");
			childRef.current.showToast("Fields cannot be empty", "warning");
		} 
		setValidated(true);
		return true
	})

	const handleSubmit = (event) => {
		event.preventDefault();
		if (validateForm(event) && state.email && state.password) {
			childRef.current.showToast("Login in progress", "loading");
			authService.login(state).then(response=>{
				childRef.current.showToast("User logged in successfull !!!", "no_loading")
			}).catch(error=>{
				console.log(error)
				const {message} =error.response.data
				childRef.current.showToast(message,"no_loading")
			})
		}
	}

	const handleChange = (event) => {
		setState((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value
		}))
	}

	useEffect(() => console.log("State changed :", validated), [validated])


	return (
		<div className="bg-light min-vh-100 d-flex flex-row align-items-center">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md={8}>
						<pre>
							{JSON.stringify(state)}
						</pre>
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
											<CFormFeedback invalid>
												Email is required
											</CFormFeedback>
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
												<CButton color="primary" className="px-4" type='submit'>
													Login
												</CButton>
											</CCol>
											{/* <CCol xs={6} className="text-right">
												<CButton color="link" className="px-0">
													Forgot password?
												</CButton>
											</CCol> */}
										</CRow>
									</CForm>
								</CCardBody>
							</CCard>
							<CCard
								className="text-white bg-primary py-5"
								style={{ width: '44%' }}
							>
								<CCardBody className="text-center">
									<div>
										<h2>Sign up</h2>
										<p>

										</p>
										<Link to="/register">
											<CButton
												color="primary"
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
						</CCardGroup>
					</CCol>
				</CRow>
				<Toasts childRef={childRef}/>
			</CContainer>
		</div>
	);
};

export default Login;
