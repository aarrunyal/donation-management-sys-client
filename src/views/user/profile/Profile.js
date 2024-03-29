import React, { useState } from 'react';
import {
	CButton,
	CCard,
	CCardHeader,
	CForm,
	CFormInput,
	CFormSelect,
	CRow,
	CCol,
	CCardBody,
	CCardFooter,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';


const provinces = [
	'Alberta',
	'British Columbia',
	'Manitoba',
	'New Brunswick',
	'Newfoundland and Labrador',
	'Nova Scotia',
	'Ontario',
	'Prince Edward Island',
	'Quebec',
	'Saskatchewan',
];

const genders = ['Male', 'Female', 'Other'];

const UserProfile = () => {

    const navigate = useNavigate();
    
	const [formData, setFormData] = useState({
		contactNumber: '',
		address: '',
		province: '',
		zipCode: '',
		dob: '',
		gender: '',
	});

	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Perform validation here
		const newErrors = {};
		// Validation rules...

		if (Object.keys(newErrors).length === 0) {
			// Form is valid, submit data or perform further actions
			console.log('Form submitted:', formData);
		} else {
			// Form is invalid, set errors
			setErrors(newErrors);
		}
	};

	return (
		<CRow>
			<CCol xs={12}>
				<CForm className="g-3" onSubmit={handleSubmit}>
					<CCard className="mb-4">
						<CCardHeader>
							<strong>User Profile</strong>
						</CCardHeader>
						<CCardBody>
							<CRow>
								<CCol sm={4}>
									<div className="mb-3">
										<CFormInput
											type="tel"
											name="contactNumber"
											id="validationDefault05"
											label="Contact Number"
											placeholder="Enter contact number"
											value={formData.contactNumber}
											onChange={handleInputChange}
											required
										/>
										{errors.contactNumber && (
											<div className="text-danger">{errors.contactNumber}</div>
										)}
									</div>
								</CCol>
								<CCol sm={4}>
									<div className="mb-3">
										<CFormInput
											type="text"
											name="address"
											id="validationDefault06"
											label="Address"
											placeholder="Enter address"
											value={formData.address}
											onChange={handleInputChange}
											required
										/>
										{errors.address && (
											<div className="text-danger">{errors.address}</div>
										)}
									</div>
								</CCol>
								<CCol sm={4}>
									<div className="mb-3">
										<CFormSelect
											name="province"
											id="validationServer07"
											label="Province"
											placeholder="Select province"
											value={formData.province}
											onChange={handleInputChange}
											feedback="Please select your province."
											required
										>
											<option value="">Choose...</option>
											{provinces.map((province, index) => (
												<option key={index} value={province}>
													{province}
												</option>
											))}
										</CFormSelect>
										{errors.province && (
											<div className="text-danger">{errors.province}</div>
										)}
									</div>
								</CCol>
							</CRow>
							<CRow>
								<CCol sm={4}>
									<div className="mb-3">
										<CFormInput
											type="text"
											name="zipCode"
											id="validationDefault08"
											label="Zip Code"
											placeholder="Enter zip code"
											value={formData.zipCode}
											onChange={handleInputChange}
											required
										/>
										{errors.zipCode && (
											<div className="text-danger">{errors.zipCode}</div>
										)}
									</div>
								</CCol>
								<CCol sm={4}>
									<div className="mb-3">
										<CFormInput
											type="date"
											name="dob"
											id="validationDefault09"
											label="Date of Birth"
											placeholder="Select date of birth"
											value={formData.dob}
											onChange={handleInputChange}
											required
										/>
										{errors.dob && (
											<div className="text-danger">{errors.dob}</div>
										)}
									</div>
								</CCol>
								<CCol sm={4}>
									<div className="mb-3">
										<CFormSelect
											name="gender"
											id="validationServer10"
											label="Gender"
											placeholder="Select gender"
											value={formData.gender}
											onChange={handleInputChange}
											feedback="Please select your gender."
											required
										>
											<option value="">Choose...</option>
											{genders.map((gender, index) => (
												<option key={index} value={gender}>
													{gender}
												</option>
											))}
										</CFormSelect>
										{errors.gender && (
											<div className="text-danger">{errors.gender}</div>
										)}
									</div>
								</CCol>
							</CRow>
						</CCardBody>
						<CCardFooter>
							<CCol sm={12}>
								<div className="my-2 text-center">
									<CButton
                                    onClick={()=>navigate("/user")}
                                    color="danger" className="text-light mx-2" type="submit">
										Cancel
									</CButton>
									<CButton
										color="success "
										className="text-light"
										type="submit"
									>
										Update
									</CButton>
								</div>
							</CCol>
						</CCardFooter>
					</CCard>
				</CForm>
			</CCol>
		</CRow>
	);
};

export default UserProfile;
