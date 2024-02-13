import React, { useState } from 'react';
import {
	CButton,
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CForm,
	CFormCheck,
	CFormInput,
	CFormFeedback,
	CFormLabel,
	CFormSelect,
	CFormTextarea,
	CInputGroup,
	CInputGroupText,
	CRow,
} from '@coreui/react';
import { DocsExample } from 'src/components';

const CustomStyles = () => {
	const [validated, setValidated] = useState(false);
	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		setValidated(true);
	};
	return (
		<CForm
			className="row g-3 needs-validation"
			noValidate
			validated={validated}
			onSubmit={handleSubmit}
		>
			<CCol md={4}>
				<CFormLabel htmlFor="validationCustom01">Email</CFormLabel>
				<CFormInput
					type="text"
					id="validationCustom01"
					defaultValue="Mark"
					required
				/>
				<CFormFeedback valid>Looks good!</CFormFeedback>
			</CCol>
			<CCol md={4}>
				<CFormLabel htmlFor="validationCustom02">Email</CFormLabel>
				<CFormInput
					type="text"
					id="validationCustom02"
					defaultValue="Otto"
					required
				/>
				<CFormFeedback valid>Looks good!</CFormFeedback>
			</CCol>
			<CCol md={4}>
				<CFormLabel htmlFor="validationCustomUsername">Username</CFormLabel>
				<CInputGroup className="has-validation">
					<CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
					<CFormInput
						type="text"
						id="validationCustomUsername"
						defaultValue=""
						aria-describedby="inputGroupPrepend"
						required
					/>
					<CFormFeedback invalid>Please choose a username.</CFormFeedback>
				</CInputGroup>
			</CCol>
			<CCol md={6}>
				<CFormLabel htmlFor="validationCustom03">City</CFormLabel>
				<CFormInput type="text" id="validationCustom03" required />
				<CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
			</CCol>
			<CCol md={3}>
				<CFormLabel htmlFor="validationCustom04">City</CFormLabel>
				<CFormSelect id="validationCustom04">
					<option disabled>Choose...</option>
					<option>...</option>
				</CFormSelect>
				<CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
			</CCol>
			<CCol md={3}>
				<CFormLabel htmlFor="validationCustom05">City</CFormLabel>
				<CFormInput type="text" id="validationCustom05" required />
				<CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
			</CCol>
			<CCol xs={12}>
				<CFormCheck
					type="checkbox"
					id="invalidCheck"
					label="Agree to terms and conditions"
					required
				/>
				<CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
			</CCol>
			<CCol xs={12}>
				<CButton color="primary" type="submit">
					Submit form
				</CButton>
			</CCol>
		</CForm>
	);
};


const Validation = () => {
	return (
		<CRow>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardHeader>
						<strong>Validation</strong> <small>Custom styles</small>
					</CCardHeader>
					<CCardBody>
						<p className="text-medium-emphasis small">
							For custom CoreUI form validation messages, you&#39;ll need to add
							the <code>noValidate</code> boolean property to your{' '}
							<code>&lt;CForm&gt;</code>. This disables the browser default
							feedback tooltips, but still provides access to the form
							validation APIs in JavaScript. Try to submit the form below; our
							JavaScript will intercept the submit button and relay feedback to
							you. When attempting to submit, you&#39;ll see the{' '}
							<code>:invalid</code> and <code>:valid</code> styles applied to
							your form controls.
						</p>
						<p className="text-medium-emphasis small">
							Custom feedback styles apply custom colors, borders, focus styles,
							and background icons to better communicate feedback.{' '}
						</p>
						<DocsExample href="forms/validation">{CustomStyles()}</DocsExample>
					</CCardBody>
				</CCard>
			</CCol>
			
		</CRow>
	);
};

export default Validation;
