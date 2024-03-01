import { CBadge, CModal, CModalBody, CModalFooter, CModalHeader, CRow, CTable, CTableDataCell, CTableHead, CTableRow } from "@coreui/react";
import React, { } from "react"
import Helper from "src/services/Helper";

const DonationDetail = ({ modal, donation, toggleModal }) => {

    const helper = new Helper();

    return (
        <>
            <CModal visible={modal} onClose={() => toggleModal()}>
                <CModalHeader closeButton>Donation Detail</CModalHeader>
                <CModalBody>
                    <CTable>
                        <CTableRow>
                            <CTableHead>
                                Name
                            </CTableHead>
                            <CTableDataCell>{donation.name}</CTableDataCell>
                        </CTableRow>
                        <br />
                        <CTableRow>
                            <CTableHead>
                                Expected Collection
                            </CTableHead>
                            <CTableDataCell>
                                <CBadge color="info" size='xl' className='text-white' >
                                    $ {donation.expected_collection}
                                </CBadge>
                            </CTableDataCell>
                        </CTableRow>
                        <br />
                        <CTableRow>
                            <CTableHead>
                                Event Date
                            </CTableHead>
                            <CTableDataCell>
                                <CBadge color="info" size='xl' className='text-white' >
                                    $ {donation.event_date}
                                </CBadge>
                            </CTableDataCell>
                        </CTableRow>
                        <br />
                        <CTableRow>
                            <CTableHead>
                                Status
                            </CTableHead>
                            <CTableDataCell>
                                <>
                                    <CBadge className="mx-2" color={helper.badgeColor(donation.expired ? "expired" : "not_expired")}>
                                        {helper.expiredText(donation.expired)}
                                    </CBadge>
                                    <CBadge className="mx-2" color={helper.badgeColor(donation.status)}>
                                        {helper.activeText(donation.status)}
                                    </CBadge>
                                    <CBadge color={helper.badgeColor(donation.verified)}>
                                        {helper.verifiedText(donation.verified)}
                                    </CBadge>
                                </>
                            </CTableDataCell>
                        </CTableRow>
                        <br />
                        <CTableRow>
                            <CTableHead>
                                Description
                            </CTableHead>
                        </CTableRow>

                        <CTableRow>
                            <CTableDataCell>
                                {donation.description}
                            </CTableDataCell>
                        </CTableRow>
                    </CTable>

                </CModalBody>
                <CModalFooter>
           
                </CModalFooter>
            </CModal >

        </>
    );
}
export default DonationDetail;