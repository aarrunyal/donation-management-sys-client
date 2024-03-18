import { CBadge, CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CRow, CTable, CTableDataCell, CTableHead, CTableRow } from "@coreui/react";
import React from "react"
import Helper from "src/services/Helper";

const UserDetails = ({ modal, user, closeModal }) => {

    const helper = new Helper();


    return (
        <>
            <CModal
                visible={modal}
                onClose={closeModal}
            >
                <CModalHeader closeButton>User Details</CModalHeader>
                <CModalBody>
                    <CRow >
                        <CCol md={12}>
                            <CTable>
                                <CTableRow>
                                    <CTableHead>First Name</CTableHead>
                                    <CTableDataCell>{user.first_name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHead>Last Name</CTableHead>
                                    <CTableDataCell>{user.last_name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHead>Email</CTableHead>
                                    <CTableDataCell>{user.email}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHead>Role</CTableHead>
                                    <CTableDataCell>
                                        <CBadge color={helper.badgeColor(user.role)} href="https://coreui.io/">
                                            {user.role}
                                        </CBadge>
                                        </CTableDataCell>
                                </CTableRow>
                            </CTable>
                        </CCol></CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="light" onClick={closeModal}>Close</CButton>{' '}
                </CModalFooter>
            </CModal>

        </>
    );
}
export default UserDetails;