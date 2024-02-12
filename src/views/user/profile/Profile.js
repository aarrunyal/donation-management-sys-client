import React from 'react';

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
	CRow,
} from '@coreui/react';

import { DocsExample } from 'src/components';

const UserProfile = () => {
	return (
		<CRow>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardHeader>
						<strong>User Profile</strong>
					</CCardHeader>
					<CCardBody>
						<p className="text-medium-emphasis small">
							Validation styles are available for the following form controls
							and components:
						</p>
						<ul>
							<li>
								<code>&lt;CFormInput&gt;</code>s
							</li>
							<li>
								<code>&lt;CFormSelect&gt;</code>s
							</li>
							<li>
								<code>&lt;CFormCheck&gt;</code>s
							</li>
						</ul>
						<DocsExample href="forms/validation#supported-elements">
							<CForm validated={true}>
								<div className="mb-3">
									<CFormLabel
										htmlFor="validationTextarea"
										className="form-label"
									>
										Textarea
									</CFormLabel>
									<CFormTextarea
										id="validationTextarea"
										placeholder="Required example textarea"
										invalid
										required
									></CFormTextarea>
									<CFormFeedback invalid>
										Please enter a message in the textarea.
									</CFormFeedback>
								</div>
								<CFormCheck
									className="mb-3"
									id="validationFormCheck1"
									label="Check this checkbox"
									required
								/>
								<CFormFeedback invalid>
									Example invalid feedback text
								</CFormFeedback>

								<CFormCheck
									type="radio"
									name="radio-stacked"
									id="validationFormCheck2"
									label="Check this checkbox"
									required
								/>

								<CFormCheck
									className="mb-3"
									type="radio"
									name="radio-stacked"
									id="validationFormCheck3"
									label="Or toggle this other radio"
									required
								/>
								<CFormFeedback invalid>
									More example invalid feedback text
								</CFormFeedback>

								<div className="mb-3">
									<CFormSelect required aria-label="select example">
										<option>Open this select menu</option>
										<option value="1">One</option>
										<option value="2">Two</option>
										<option value="3">Three</option>
									</CFormSelect>
									<CFormFeedback invalid>
										Example invalid select feedback
									</CFormFeedback>
								</div>

								<div className="mb-3">
									<CFormInput
										type="file"
										id="validationTextarea"
										aria-label="file example"
										required
									/>
									<CFormFeedback invalid>
										Example invalid form file feedback
									</CFormFeedback>
								</div>

								<div className="mb-3">
									<CButton type="submit" color="primary" disabled>
										Submit form
									</CButton>
								</div>
							</CForm>
						</DocsExample>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default UserProfile;
