import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardHeader,
    CForm,
    CFormInput,
    CFormSelect,
    CContainer,
	CRow,
	CCol
} from '@coreui/react';

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
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
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
        <CContainer>
            <CCard className="custom-card"> 
                <CCardHeader>
				<h6 style={{ color: 'darkblue', fontWeight: 'bold' ,fontSize:'40px', textAlign: 'center' }}> User Profile Form </h6> 
                </CCardHeader>
                <CForm className="g-3" onSubmit={handleSubmit}>
				<CRow>
						<CCol sm={6}>
                    <div className="mb-3">
                        <CFormInput
                            type="text"
                            name="firstName"
                            id="validationDefault01"
                            label="First name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                    </div>
					</CCol>
					<CCol sm={6}>
                    <div className="mb-3">
                        <CFormInput
                            type="text"
                            name="lastName"
                            id="validationDefault02"
                            label="Last name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                    </div>
					</CCol>
					<CCol sm={6}>
                    <div className="mb-3">
                        <CFormInput
                            type="email"
                            name="email"
                            id="validationDefault03"
                            label="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
					</CCol>
                    <div className="mb-3">
                        <CFormInput
                            type="email"
                            name="confirmEmail"
                            id="validationDefault04"
                            label="Confirm Email Address"
                            value={formData.confirmEmail}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.confirmEmail && <div className="text-danger">{errors.confirmEmail}</div>}
                    </div>
                    <div className="mb-3">
                        <CFormInput
                            type="tel"
                            name="contactNumber"
                            id="validationDefault05"
                            label="Contact Number"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.contactNumber && <div className="text-danger">{errors.contactNumber}</div>}
                    </div>
                    <div className="mb-3">
                        <CFormInput
                            type="text"
                            name="address"
                            id="validationDefault06"
                            label="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.address && <div className="text-danger">{errors.address}</div>}
                    </div>
                    <div className="mb-3">
                        <CFormSelect
                            name="province"
                            id="validationServer07"
                            label="Province"
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
                        {errors.province && <div className="text-danger">{errors.province}</div>}
                    </div>
                    <div className="mb-3">
                        <CFormInput
                            type="text"
                            name="zipCode"
                            id="validationDefault08"
                            label="Zip Code"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.zipCode && <div className="text-danger">{errors.zipCode}</div>}
                    </div>
                    <div className="mb-3">
                        <CFormInput
                            type="date"
                            name="dob"
                            id="validationDefault09"
                            label="Date of Birth"
                            value={formData.dob}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.dob && <div className="text-danger">{errors.dob}</div>}
                    </div>
                    <div className="mb-3">
                        <CFormSelect
                            name="gender"
                            id="validationServer10"
                            label="Gender"
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
                        {errors.gender && <div className="text-danger">{errors.gender}</div>}
                    </div>
                    <div className="mb-3 text-center">
                        <CButton color="primary" type="submit">
                            Submit
                        </CButton>
                    </div>
					</CRow>
                </CForm>
            </CCard>
        </CContainer>
    );
};

export default UserProfile;
