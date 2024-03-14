import { CBadge, CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CModalFooter, CModalHeader, CRow, CTable, CTableDataCell, CTableHead, CTableRow } from "@coreui/react";
import React, { useEffect, useRef, useState } from "react"
import Helper from "src/services/Helper";
import ValidationHelper from "src/services/ValidationHelper";
import Toasts from "../toast/Toast";
import UserService  from "src/services/UserService";

const CreateUser = ({ modal, user, closeModal }) => {

    const userService = new UserService()

    const validationHelper = new ValidationHelper()

    const childRef = useRef();

    const [state, setState] = useState()

    const [error, setError] = useState({})


    const validateForm = async (event) => {

        return new Promise((resolve, reject) => {
            let obj = {}
            let errorCount = 0;
            let form = event.currentTarget
            if (form) {
                for (let f of form) {
                    if (f.name === "email" && !(validationHelper.validateEmail(f.value))) {
                        errorCount++
                        obj["email"] = "error"
                    } if (f.name === "password" && !(validationHelper.validatePassword(f.value))) {
                        errorCount++
                        obj["password"] = "error"
                    }
                    if (f.name != "" && !validationHelper.validateEmpty(f.value)) {
                        errorCount++
                        obj[f.name] = "error"
                    }
                }
            }
            setError(obj)
            if (errorCount <= 0) {
                resolve(true)
            } else {
                reject(false)
            }
        })

    };

    const handleChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const saveUser = () => {
        userService.create(state).then(response => {
            childRef.current.showToast('success');
            setState({})
            closeModal("create_modal")
        }).catch(error => {
            childRef.current.showToast('error', 'Something went wrong !!!');
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        validateForm(event).then(response => {
            saveUser();

        }).catch(error => {
            childRef.current.showToast('error', 'Please provide valid data !!!');
        })

    }

    return (
        <>
            <CModal             backdrop={'static'}
                visible={modal}
                onClose={closeModal}
            >
                <CForm onSubmit={handleSubmit}>
                    <CModalHeader closeButton>Create User</CModalHeader>
                    <CModalBody>

                        <CRow >
                            <CCol md={12}>
                                <CFormLabel htmlFor="validationCustom02">First Name</CFormLabel>
                                <CFormInput
                                    onChange={handleChange}
                                    type="text"
                                    id="validationCustom02"

                                    name="first_name"
                                />
                                {
                                    error.first_name == "error" ?
                                        <span className="text-danger">First Name is required</span>
                                        :
                                        null
                                }

                            </CCol>
                            <br />
                            <CCol md={12}>
                                <CFormLabel htmlFor="validationCustom02">Last Name</CFormLabel>
                                <CFormInput
                                    onChange={handleChange}
                                    type="text"
                                    id="validationCustom02"
                                    name="last_name"
                                />
                                {
                                    error.last_name == "error" ?
                                        <span className="text-danger">Last Name is required</span>
                                        :
                                        null
                                }
                            </CCol>
                            <br />
                            <CCol md={12}>
                                <CFormLabel htmlFor="validationCustom02">Email</CFormLabel>
                                <CFormInput
                                    onChange={handleChange}
                                    type="email"
                                    id="validationCustom02"
                                    name="email"
                                />
                                {
                                    error.email == "error" ?
                                        <span className="text-danger">Valid email required</span>
                                        :
                                        null
                                }
                            </CCol>
                            <br />
                            <CCol md={12}>
                                <CFormLabel htmlFor="validationCustom02">Password</CFormLabel>
                                <CFormInput
                                    onChange={handleChange}
                                    type="password"
                                    id="validationCustom02"
                                    name="password"

                                />
                                {
                                    error.password == "error" ?
                                        <span className="text-danger">Password is required</span>
                                        :
                                        null
                                }
                            </CCol>



                            <br />
                            <CCol md={12}>
                                <CFormLabel htmlFor="validationCustom02" >Role</CFormLabel>
                                <CFormSelect id="validationCustom04" onChange={handleChange} name="role">
                                    <option disabled>Choose User Role</option>
                                    <option value={"USER"}>User</option>
                                    <option value={"ORGANISER"}>Organiser</option>
                                </CFormSelect>
                                {
                                    error.role == "error" ?
                                        <span className="text-danger">Role is required</span>
                                        :
                                        null
                                }
                            </CCol>
                            <br />


                        </CRow>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="light" onClick={closeModal}>Close</CButton>
                        <CButton color="success" type="submit">
                            {
                                (user.id) ? "Update" : "Save"
                            }
                        </CButton>
                    </CModalFooter>
                </CForm>
            </CModal >
            <Toasts childRef={childRef} />
        </>
    );
}
export default CreateUser;