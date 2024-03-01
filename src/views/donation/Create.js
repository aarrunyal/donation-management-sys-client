import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CRow } from "@coreui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateDonation = () => {

    const [error, setError] = useState({})

    const navigate = useNavigate();

    const handleChange = (event) => {

    }

    const handleSubmit = (event) => {

    }

    return (
        <CRow>
            <CCol xs={12}>
                <CForm onSubmit={handleSubmit}>
                    <CCard className="mb-4">

                        <CCardHeader>
                            <strong>Create Donation</strong>
                        </CCardHeader>
                        <CCardBody>

                            <CRow>
                                <CCol md={12}>
                                    <CFormLabel htmlFor="validationCustom02">Donation / Campaign Name</CFormLabel>
                                    <CFormInput
                                        onChange={handleChange}
                                        type="text"
                                        name="name"
                                    />
                                    {
                                        error.name == "error" ?
                                            <span className="text-danger">Name is required</span>
                                            :
                                            null
                                    }

                                </CCol>

                            </CRow>

                        </CCardBody>
                        <CCardFooter>
                            <CRow className="justify-content-center my-2">
                                <CCol md={3}    >
                                    <CButton className="text-white mx-2" color="danger" onClick={() => navigate("/donation")}>Cancle</CButton>
                                    <CButton className="text-white" color="success" type="submit">Save</CButton>
                                </CCol>
                            </CRow>

                        </CCardFooter>
                    </CCard>
                </CForm>
            </CCol>
        </CRow>
    );
}

export default CreateDonation;