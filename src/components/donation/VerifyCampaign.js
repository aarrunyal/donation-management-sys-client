import { CButton, CForm, CFormFeedback, CFormInput, CFormLabel, CModal, CModalBody, CModalFooter, CRow, CCol, CFormSwitch } from "@coreui/react";
import React, { useState } from "react";

const VerifyCampaign = ({ modal, closeModal }) => {



    const handleSubmit = () => {
       
        closeModal(); 
    };

    return (
        <>
            <CModal backdrop={'static'} visible={modal}>
                <CForm onSubmit={(e) => { e.preventDefault(); }}>
                    <CModalBody>
                        <h5>Verify Campaign</h5>
                        <hr />
                        <CRow>
                        
</CRow>
<br/>
                           <CRow>
                           
                            </CRow>
                            <br/>
                            <CRow>
                           
                            
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

export default VerifyCampaign;
