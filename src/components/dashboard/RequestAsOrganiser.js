import { CButton, CForm, CFormFeedback, CFormInput, CFormLabel, CModal, CModalBody, CModalFooter, CRow, CCol, CFormSwitch } from "@coreui/react";
import React, { useState } from "react";

const RequestAsOrganiser = ({ modal, closeModal, submitRequest }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);
    const [status, setStatus] = useState(false); 
    const [description, setDescription] = useState('');

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
        if (!uploadedFile) {
            setError(true);
        } else {
            setError(false);
        }
    };

    const handleSwitchChange = (event) => {
        setStatus(event.target.checked);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = () => {
        if (!file) {
            setError(true);
            return; 
        }
        submitRequest(file, status, description);
        closeModal(); 
    };

    return (
        <>
            <CModal backdrop={'static'} visible={modal}>
                <CForm onSubmit={(e) => { e.preventDefault(); }}>
                    <CModalBody>
                        <h5>Request As Organiser</h5>
                        <hr />
                        <CRow>
                            <CCol md={12}>
                                <CFormLabel htmlFor="fileUpload">Document 1</CFormLabel>
                                <CFormInput onChange={handleFileUpload} type="file" name="file" />
                                {error && <CFormFeedback className="text-danger">Image is required</CFormFeedback>}
                            </CCol>
</CRow>
<br/>
                           <CRow>
                            <CCol md={12}>
                                <CFormLabel htmlFor="fileUpload">Document 2 </CFormLabel>
                                <CFormInput onChange={handleFileUpload} type="file" name="file" />
                                {error && <CFormFeedback className="text-danger">Image is required</CFormFeedback>}
                            </CCol>
                            </CRow>
                            <br/>
                            <CRow>
                            <CCol md={12}>
                                <CFormLabel htmlFor="description">Message for Admin</CFormLabel>
                                <textarea id="description" className="form-control" value={description} onChange={handleDescriptionChange}></textarea>
                            </CCol>
                            
                        </CRow>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="light" onClick={closeModal}>Close</CButton>
                        <CButton color="success" onClick={handleSubmit}>Submit</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </>
    );
};

export default RequestAsOrganiser;
