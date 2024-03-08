import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DonationService from "src/services/DonationService";
import Helper from "src/services/Helper";
import Parser from 'html-react-parser';
import Toasts from "src/components/toast/Toast";

const Donate = () => {

    const donationService = new DonationService();

    const helper = new Helper();

    const params = useParams();

    const navigate = useNavigate()

    const [, forceUpdate] = useState()

    const [state, setState] = useState({})

    const [donations, setDonations] = useState([])


    const getById = (id) => {
        donationService.get(id).then(response => {
            setState(response.data)
            getOtherCampaign(id)
            forceUpdate(1)
        })
    }

    const getOtherCampaign = (id) => {
        donationService.getOtherCampaignRandomly(id, 4).then(response => {
            setDonations(response.data)
        })
    }

    const navigateToDetailPage = (event, id) => {
        event.preventDefault()
        navigate(`/donate/${id}`)
    }

    useEffect(() => {
        getById(params.id)
    }, [])


    return (
        <>
            <div className="container-fluid">

                <div className="row my-2">
                    <div className="col-md-8 col-12">
                        <div className="card">
                            <div className="card-body">
                                <a className="rounded-4" target="_blank" data-type="image" rel="noreferrer">
                                    <img className="rounded-4 fit" width={"100%"} style={{ maxHeight: "500px" }}
                                        src={helper.buildImagePath(state.image_path, state.image)} />
                                </a>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-body">
                                <div className="row mb-2  border-bottom pb-2">
                                    <div className="col-12 text-center">
                                        <div className="progress " style={{ height: "25px" }}>
                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: "35%" }}
                                                aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
                                                <strong>25%</strong>
                                            </div>
                                            <div className="progress-bar bg-info" role="progressbar" style={{ width: "65%" }}
                                                aria-valuenow="35" aria-valuemin="0" aria-valuemax="100">
                                                <strong>25%</strong>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-8  col-12">
                                        <h4 className="title text-dark">
                                            {state.name}

                                        </h4>
                                    </div>
                                    <div className="col-md-4 col-12 text-end">
                                        <span className="h5">Target:
                                            <span className="text-success"> $ {helper.addZeroes(state.expected_collection, 2)}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-4 col-12">
                        <div className="card ">
                            <div className="card-body " style={{ backgroundColor: "#3C4B64" }}>
                                <div className="d-flex  justify-content-around">
                                    <h5 className="card-title text-light">Target :</h5>
                                    <span className="text-success h4">
                                        <strong>
                                            $ {helper.addZeroes(state.expected_collection, 2)}
                                        </strong>
                                    </span>

                                </div>
                            </div>
                        </div>

                        <div className="card my-2">
                            <div className="card-body">
                                <div className="d-grid gap-2 col-12 ">
                                    <a href="#" className="btn  text-light btn-info shadow-0">  Donate </a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body text-light" style={{ backgroundColor: "#3C4B64" }}>
                                <h5 className="card-title" >Other Campaign</h5>
                            </div>

                            <div className="card-body" >

                                {
                                    donations.map((donation) => {
                                        return (
                                            <>
                                                <div className="d-flex mb-3">
                                                    <img src={helper.buildImagePath(donation.image_path, donation.image, "thumb")}
                                                        style={{ maxWidth: "70px", height: "50px" }} className="img-md img-thumbnail" />
                                                    <div className="info 1 mx-2">
                                                        <a className="nav-link mb-1 " onClick={() => getById(donation.id)}>
                                                            {donation.name}
                                                        </a>
                                                        <strong className="text-dark"> $ {helper.addZeroes(donation.expected_collection)}</strong>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row border-top py-2">
                    <div className="col-12 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="tab-content" id="ex1-content">
                                    <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel"
                                        aria-labelledby="ex1-tab-1">
                                        <p>
                                            {
                                                state.description ?
                                                    Parser(state.description)
                                                    : null
                                            }

                                        </p>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <Toasts childRef={childRef} /> */}
            </div>






        </>
    );
}

export default Donate;