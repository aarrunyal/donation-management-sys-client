import React, { useRef, useState } from 'react';
import {
	CButton,
	CCard,
	CCardBody,
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
import Toasts from 'src/components/toast/Toast';
import AuthService from 'src/services/AuthService';
import { useNavigate } from 'react-router-dom';

const Register = () => {

	const authService = new AuthService();

	const childRef = useRef()

	const [validation, setValidation] = useState({})

	const navigate = useNavigate()

	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,14}$/

	const emailRegex = /\S+@\S+\.\S+/

	const [errorCount, setErrorCount] = useState(0)


	const validatePassword = (password) => {
		if (password == "")
			return false
		return passwordRegex.test(password);
	}

	const validateEmail = (email) => {
		if (email == "")
			return false
		return emailRegex.test(email)
	}

	const showValiationMessage = (event) => {
		childRef.current.showToast("Please provide thes valid data", "warning");
		childRef.current.showToast("Fields cannot be empty", "error");
	}


	const validateForm = ((event) => {
		event.preventDefault()
		const form = event.currentTarget
		let obj = {}
		if (form) {
			setErrorCount(0);
			for (let f of form) {
				if (f.name)
					obj[f.name] = (f.value == "") ? "error" : ""
				if (f.name === "email")
					obj[f.name] = !validateEmail(f.value) ? "error" : ""
				if (f.name === "password")
					obj[f.name] = !validatePassword(f.value) ? "error" : ""
				if (f.name === "confirm_password")
					obj[f.name] = (state.password === state.confirm_password) ? "" : "error"
				if (obj[f.name] == "error")
					setErrorCount(errorCount + 1);
			}
		}
		setValidation(obj)
	})

	const displayValidationMessage = (field) => {
		if (validation[field] && validation[field] == "error") {
			return true
		} else {
			return false
		}
	}




	const [state, setState] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		confirm_password: ""
	})


	const handleChange = (event) => {
		setState((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value
		}))
	}

	const handleSubmit = (event) => {
		validateForm(event)
		if (errorCount === 0) {
			childRef.current.showToast("Login in progress", "loading");
			authService.register(state).then(response => {
				childRef.current.showToast(null, "no_loading")
				childRef.current.showToast("User created successfully !!!", "no_loading")
				setTimeout(() => {
					navigate("/")
				}, 2000);
			}).catch(error => {
				const { message } = error.response.data
				childRef.current.showToast(null, "no_loading")
				childRef.current.showToast(message, "error")
			})
		} else {
			showValiationMessage()
		}
	}

	return (
		<div className="bg-light min-vh-100 d-flex flex-row align-items-center">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md={9} lg={7} xl={6}>
						<CCard className="mx-4">
							<CCardBody className="p-4">
								<pre>
									{JSON.stringify(state)}
								</pre>
								<CForm

									onSubmit={handleSubmit}
								>
									<h1>Register</h1>
									<p className="text-medium-emphasis">Create your account</p>
									{
										displayValidationMessage("first_name") ?
											<span style={{ "color": "red", "font-size": "12px" }}>
												First Name is required
											</span> : null
									}
									<CInputGroup className="mb-3">
										<CInputGroupText>
											<CIcon icon={cilUser} />
										</CInputGroupText>
										<CFormInput
											placeholder="First Name"
											autocomplete="off"
											onChange={handleChange}
											name="first_name"
										/>

									</CInputGroup>
									{
										displayValidationMessage("last_name") ?
											<span style={{ "color": "red", "font-size": "12px" }}>
												Last Name is required
											</span> : null
									}
									<CInputGroup className="mb-3">
										<CInputGroupText>
											<CIcon icon={cilUser} />
										</CInputGroupText>
										<CFormInput
											placeholder="Last Name"
											autocomplete="off"
											onChange={handleChange}
											name="last_name"
										/>
										<CFormFeedback invalid>
											Last name is required
										</CFormFeedback>
									</CInputGroup>
									{
										displayValidationMessage("email") ?
											<span style={{ "color": "red", "font-size": "12px" }}>
												Email is required
											</span> : null
									}
									<CInputGroup className="mb-3">
										<CInputGroupText>@</CInputGroupText>
										<CFormInput
											placeholder="Email"
											onChange={handleChange}
											autoComplete="email"
											type="text"
											name="email" />
										<CFormFeedback invalid>
											Email is required
										</CFormFeedback>
									</CInputGroup>

									{
										displayValidationMessage("password") ?
											<span>
												Password Requirement
												<ul style={{ "color": "red", "font-size": "12px" }}>
													<li> An alphabetic character</li>
													<li> A lowercase character</li>
													<li> An uppercase character</li>
													<li> A numeric character</li>
													<li> A minimum of 8 characters</li>
													<li> A special character</li>
												</ul>
											</span>


											: null
									}
									<CInputGroup className="mb-3">
										<CInputGroupText>
											<CIcon icon={cilLockLocked} />
										</CInputGroupText>
										<CFormInput
											type="password"
											placeholder="Password"
											autocomplete="off"
											onChange={handleChange}
											name="password"
										/>
										<CFormFeedback invalid>


										</CFormFeedback>
									</CInputGroup>

									{
										displayValidationMessage("confirm_password") ?
											<span style={{ "color": "red", "font-size": "12px" }}>
												Confirm password did not match with password field
											</span>


											: null
									}
									<CInputGroup className="mb-4">
										<CInputGroupText>
											<CIcon icon={cilLockLocked} />
										</CInputGroupText>
										<CFormInput
											type="password"
											placeholder="Repeat password"
											autocomplete="off"
											onChange={handleChange}
											name="confirm_password"
										/>
										<CFormFeedback invalid>
											Email is required
										</CFormFeedback>
									</CInputGroup>
									<div className="d-grid">
										<CButton color="success" type="submit">Create Account</CButton>
									</div>
								</CForm>
							</CCardBody>
						</CCard>
					</CCol>
				</CRow>
				<Toasts childRef={childRef} />
			</CContainer>
		</div >
	);
};

export default Register;
