import React, { useEffect, useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Helper from 'src/services/Helper';
import validationHelper from 'src/services/ValidationHelper';
import UserService from 'src/services/UserService';
import UserAddressService from 'src/services/UserAddressService';
import UserSettingService from 'src/services/UserSettingService';
import { useSelector } from 'react-redux';

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
	const selector = useSelector((state)=>state.user)
	const params = useParams()

	const helper = new Helper();

	const userService = new UserService();
	const userAddressService = new UserAddressService();
	const userSettingService = new UserSettingService();

	const [formData, setFormData] = useState({
		contact_number: null,
		address_line_1: null,
		city: null,
		state: null,
		postal_code: null,
		dob: null,
		country: null,
		gender: null,
	});

	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const validateForm = () => {
		let newErrors = {};
		let flag = new Set();
		let exclude = ['address_line_2', 'alternative_contact_no'];
		for (let key in formData) {
			if (exclude.includes(key)) {
				newErrors[key] = false;
			} else if (!new validationHelper().validateEmpty(formData[key])) {
				newErrors[key] = true;
				flag.add(true);
			} else if (
				key === 'contact_number' &&
				!new validationHelper().validateContactNo(formData[key])
			) {
				newErrors[key] = true;
				flag.add(true);
			} else {
				newErrors[key] = false;
				flag.add(false);
			}
		}

		if (flag.has(true)) {
			setErrors(newErrors);
			resetValidationMessage();
			return false;
		}
		return true;
	};

	const resetValidationMessage = () => {
		setTimeout(() => {
			setErrors({});
		}, 3000);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Perform validation here

		if (!validateForm()) {
			toast.error(new validationHelper().VALIDATION_ERROR);
			toast.warning(new validationHelper().VALIDATION_EMPTY_ERROR);
		} else {
			createOrUpdate();
		}
	};

	const createOrUpdate = () => {
		userService
			.createOrUpdate(formData)
			.then((response) => {
				toast.success(helper.SUCCESS_MESSAGE);
			})
			.catch((error) => {
				toast.error(helper.ERROR_MESSAGE);
			});
	};

	const userDetails = async (id)=>{
		const userAddress =  await userAddressService.getByUserId(id)
		const userSetting =  await userSettingService.getByUserId(id)
		const obj = {...userAddress.data, ...userSetting.data}
		setFormData(obj)
		
	}

	useEffect(() => {
		if(params.id){
			userDetails(params.id)
		}else{
			userDetails(selector.id)
		}
	}, []);

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
											name="contact_no"
											id="validationDefault05"
											label="Contact Number"
											placeholder="Enter contact number"
											value={formData.contact_no}
											onChange={handleInputChange}
											style={{
												border: errors.contact_no ? '1px solid red' : null,
											}}
										/>
										{errors.contact_number && (
											<div className="text-danger">
												Contact Number is required and should be valid
											</div>
										)}
									</div>
								</CCol>
								<CCol sm={4}>
									<div className="mb-3">
										<CFormInput
											type="text"
											name="address_line_1"
											label="Street"
											placeholder="Enter address"
											value={formData.address_line_1}
											onChange={handleInputChange}
											style={{
												border: errors.address_line_1 ? '1px solid red' : null,
											}}
										/>
										{errors.address_line_1 && (
											<div className="text-danger">Street is required</div>
										)}
									</div>
								</CCol>

								<CCol sm={4}>
									<div className="mb-3">
										<CFormInput
											type="text"
											name="address_line_2"
											label="Unit or Apartment Number"
											placeholder="Unit or Apartment Number"
											value={formData.address_line_2}
											onChange={handleInputChange}
										/>
									</div>
								</CCol>
								<CCol sm={4}>
									<div className="mb-3">
										<CFormInput
											type="text"
											name="city"
											label="City"
											placeholder="Enter City"
											value={formData.city}
											onChange={handleInputChange}
											style={{
												border: errors.city ? '1px solid red' : null,
											}}
										/>
										{errors.city && (
											<div className="text-danger">City is required</div>
										)}
									</div>
								</CCol>
								<CCol sm={4}>
									<div className="mb-3">
										<CFormInput
											type="text"
											name="country"
											label="Country"
											placeholder="Enter Country"
											value={formData.country}
											onChange={handleInputChange}
											style={{
												border: errors.country ? '1px solid red' : null,
											}}
										/>
										{errors.city && (
											<div className="text-danger">Country is required</div>
										)}
									</div>
								</CCol>
								<CCol sm={4}>
									<div className="mb-3">
										<CFormSelect
											name="state"
											id="validationServer07"
											label="State"
											placeholder="Select State"
											value={formData.state}
											onChange={handleInputChange}
											feedback="Please select your state."
											style={{
												border: errors.state ? '1px solid red' : null,
											}}
										>
											<option value="">Choose...</option>
											{provinces.map((province, index) => (
												<option key={index} value={province}>
													{province}
												</option>
											))}
										</CFormSelect>
										{errors.state && (
											<div className="text-danger">State is required</div>
										)}
									</div>
								</CCol>

								<CCol sm={4}>
									<div className="mb-3">
										<CFormInput
											type="text"
											name="postal_code"
											id="validationDefault08"
											label="Zip Code"
											placeholder="Enter Postal Code"
											value={formData.postal_code}
											onChange={handleInputChange}
											style={{
												border: errors.postal_code ? '1px solid red' : null,
											}}
										/>
										{errors.postal_code && (
											<div className="text-danger">Postal code is required</div>
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
											style={{
												border: errors.postal_code ? '1px solid red' : null,
											}}
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
											style={{
												border: errors.gender ? '1px solid red' : null,
											}}
										>
											<option value="">Choose...</option>
											{genders.map((gender, index) => (
												<option key={index} value={gender}>
													{gender}
												</option>
											))}
										</CFormSelect>
										{errors.gender && (
											<div className="text-danger">Gender is required</div>
										)}
									</div>
								</CCol>
							</CRow>
						</CCardBody>
						<CCardFooter>
							<CCol sm={12}>
								<div className="my-2 text-center">
									<CButton
										onClick={() => navigate('/user')}
										color="danger"
										className="text-light mx-2"
										type="submit"
									>
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
