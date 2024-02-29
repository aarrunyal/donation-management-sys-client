import { CBadge, CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CRow, CTable, CTableDataCell, CTableHead, CTableRow } from "@coreui/react";
import React from "react"
import Helper from "src/services/Helper";

const CreateUser = ({ modal, user, closeModal }) => {

    const helper = new Helper();


    return (
        <>
            <CModal
                visible={modal}
                onClose={closeModal}
            >
                <CModalHeader closeButton>Create User</CModalHeader>
                <CModalBody>
                    <CRow >
                        <CCol md={12}>

                        </CCol></CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="light" onClick={closeModal}>Close</CButton>{' '}
                </CModalFooter>
            </CModal>

        </>
    );
}
export default CreateUser;