import React from 'react';
import {
	CButton,
	CCard,
	CCardHeader,
	CCol,
	CForm,
	CFormInput,
	CFormSelect,
	CContainer,
	CRow,
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

const UserProfile = () => {
	return (
		<CContainer>
			<CRow className="justify-content-center">
				<CCol xs={8} md={8}></CCol>
				<CCard>
					<CCardHeader>
						<h5>User Profile</h5>
					</CCardHeader>
					<CForm className="g-3">
						<CRow>
							<CCol md={6}>
								<CFormInput
									type="text"
									id="validationDefault01"
									label="First name"
									required
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md={6}>
								<CFormInput
									type="text"
									id="validationDefault02"
									label="Last name"
									required
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md={6}>
								<CFormInput
									type="tel"
									id="validationDefault03"
									label="Contact Number"
									required
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md={6}>
								<CFormInput
									type="text"
									id="validationDefault04"
									label="Address"
									required
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md={6}>
								<CFormSelect
									id="validationServer04"
									label="Province"
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
							</CCol>
						</CRow>
						<CRow>
							<CCol md={6}>
								<CFormInput
									type="text"
									id="validationDefault05"
									label="Zip Code"
									required
								/>
							</CCol>
						</CRow>
						<CRow>
							<CCol md={6}>
								<CButton color="primary" type="submit">
									Submit
								</CButton>
							</CCol>
						</CRow>
					</CForm>
				</CCard>
			</CRow>
		</CContainer>
	);
};

export default UserProfile;
