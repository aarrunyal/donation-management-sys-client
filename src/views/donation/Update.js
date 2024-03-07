import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormSwitch, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ValidationHelper from "src/services/ValidationHelper";
import Toasts from "src/components/toast/Toast";
import DonationService from "src/services/DonationService";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateDonation = () => {

    const validationHelper = new ValidationHelper()
    const donationService = new DonationService()

    const params = useParams();

    const childRef = useRef()

    const [tommorrow, setTommorrow] = useState()


    const [error, setError] = useState({})

    const [description, setDescription] = useState(null)

    const [imageUri, setImageUri] = useState(null)

    const [state, setState] = useState({

    })




    const navigate = useNavigate();

    const validateForm = async (event) => {

        return new Promise((resolve, reject) => {
            let obj = {}
            let errorCount = 0;
            let form = event.currentTarget
            if (form) {
                for (let f of form) {
                    if (f.name != "" && f.name != "file" && !validationHelper.validateEmpty(f.value)) {
                        errorCount++
                        obj[f.name] = "error"
                    }
                    if (!description) {
                        obj["description"] = "error"
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

    const buildData = () => {
        let data = {}
        for (let key in state) {
            if (state[key] == "on") {
                data[key] = true
            } else {
                data[key] = state[key]
            }
        }
        if (description)
            data["description"] = description
        return data;
    }

    const onSwitchClicked = (event) => {
        setState((prevState) => ({
            ...prevState,
            ["status"]: prevState.status == "on" || prevState.status ? "" : "on",
        }));
    }

    const uploadImage = (donation) => {
        return new Promise((resolve) => {
            let fd = new FormData()
            fd.append("file", imageUri);
            donationService.uploadImage(donation.id, fd).then(response => {
                resolve(true)
            }).catch(error => {
                childRef.current.showToast("error", "Please provide valid data !!!")
            }, (reject) => {
                reject(false)
            })
        })
    }

    const displaySuccessMessageAndNavigate = () => {
        childRef.current.showToast("success");
        navigate("/donation")
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        validateForm(event).then(response => {
            donationService.update(params.id, buildData()).then(res => {
                if (imageUri) {
                    uploadImage(res.data).then(res => {
                        displaySuccessMessageAndNavigate()
                    }).catch(err => {
                        childRef.current.showToast("error")
                    })
                } else {
                    displaySuccessMessageAndNavigate()
                }
            })
            childRef.current.showToast("success", "Validation completed")
        }).catch(error => {
            childRef.current.showToast("error", "Please provide valid data !!!")
        })
    }

    const onFileUpload = (event) => {
        setImageUri(event.target.files[0])
    }

    const Editor = () => {
        return (
            <div style={{ padding: "2rem 3rem;" }}>

                <QuillEditor
                    className={{
                        marginTop: "1rem;",
                        height: "500px;"
                    }}
                    value={description}
                    onChange={(description) => setDescription(description)}
                    theme="snow"
                />
            </div>
        );
    };

    const getDate = () => {
        const dateObj = new Date();

        // get the month in this format of 04, the same for months
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        const day = ("0" + parseInt(dateObj.getDate() + 1)).slice(-2);
        const year = dateObj.getFullYear();

        const shortDate = `${year}-${month}-${day}`;
        setTommorrow(shortDate)
    }

    const getById = () => {
        donationService.get(params.id).then(response => {
            setState(response.data)
            setDescription(response.data.description)
        })
    }

    useEffect(() => {
        getById()
        getDate()
    }, [])

    return (
        <CRow>
            <CCol xs={12}>
                <CForm onSubmit={handleSubmit} encType="multipart/form-data">
                    <CCard className="mb-4">

                        <CCardHeader>
                            <strong>Create Donation</strong>
                        </CCardHeader>
                        <CCardBody>

                            <CRow>
                                <CCol md={8}>
                                    <CFormLabel htmlFor="validationCustom02">Donation / Campaign Name</CFormLabel>
                                    <CFormInput
                                        onChange={handleChange}
                                        type="text"
                                        name="name"
                                        value={state.name}
                                    />
                                    {
                                        error.name == "error" ?
                                            <span className="text-danger">Name is required</span>
                                            :
                                            null
                                    }


                                    <br />

                                    <CFormLabel htmlFor="validationCustom02">Expected Collection</CFormLabel>
                                    <CFormInput
                                        onChange={handleChange}
                                        type="number"
                                        name="expected_collection"
                                        value={state.expected_collection}
                                    />
                                    {
                                        error.expected_collection == "error" ?
                                            <span className="text-danger">Expected collection is required</span>
                                            :
                                            null
                                    }


                                    <br />

                                    <CFormLabel htmlFor="validationCustom02">Event Date</CFormLabel>
                                    <CFormInput
                                        onChange={handleChange}
                                        type="date"
                                        name="event_date"
                                        min={tommorrow}
                                        defaultValue={tommorrow}
                                        value={state.event_date}
                                    />
                                    {
                                        error.event_date == "error" ?
                                            <span className="text-danger">Event Date is required</span>
                                            :
                                            null
                                    }

                                    <br />

                                    <CFormLabel htmlFor="validationCustom02">Description</CFormLabel>
                                    {Editor()}
                                    {
                                        error.description == "error" ?
                                            <span className="text-danger">Description is required</span>
                                            :
                                            null
                                    }

                                </CCol>

                                <CCol md={4}>
                                    <CFormLabel htmlFor="validationCustom02">Image</CFormLabel>
                                    <CFormInput
                                        onChange={onFileUpload}
                                        type="file"
                                        name="file"
                                    />
                                    {
                                        error.file ?
                                            <span className="text-danger">Image is required</span>
                                            :
                                            null
                                    }
                                    <br />
                                    <CFormSwitch
                                        onChange={onSwitchClicked} label="Mark as active" defaultChecked={state.status} name="status" id="formSwitchCheckDefaultNormal" />
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

            <Toasts childRef={childRef} />
        </CRow>
    );
}

export default UpdateDonation;