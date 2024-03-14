import {
	CBadge,
	CCol,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
	CRow,
	CTable,
	CTableDataCell,
	CTableHead,
	CTableRow,
} from '@coreui/react';
import React from 'react';
import Helper from 'src/services/Helper';
import Parser from 'html-react-parser';

const DonationDetail = ({ modal, donation, toggleModal }) => {
	const helper = new Helper();

	return (
		<>
			<CModal
				visible={modal}
				onClose={() => toggleModal()}
				size={'xl'}
                backdrop={'static'}
			>
				<CModalHeader closeButton>Donation Detail</CModalHeader>
				<CModalBody>
					<CTable>
						<CTableRow>
							<CTableHead>Name</CTableHead>
							<CTableDataCell>
								{donation && donation.name ? donation.name : null}
							</CTableDataCell>
						</CTableRow>
						<br />
						<CTableRow>
							<CTableHead>Expected Collection</CTableHead>
							<CTableDataCell>
								<CBadge color="info" size={'xl'} className="text-white">
									${' '}
									{donation && donation.expected_collection
										? donation.expected_collection
										: null}
								</CBadge>
							</CTableDataCell>
						</CTableRow>
						<br />
						<CTableRow>
							<CTableHead>Event Date</CTableHead>
							<CTableDataCell>
								<CBadge color="info" size={'xl'} className="text-white">
									{donation && donation.event_date ? donation.event_date : null}
								</CBadge>
							</CTableDataCell>
						</CTableRow>
						<br />
						{donation ? (
							<>
								<CTableRow>
									<CTableHead>Status</CTableHead>
									<CTableDataCell>
										<>
											<CBadge
												className="mx-2"
												color={helper.badgeColor(
													donation && donation.expired
														? 'expired'
														: 'not_expired'
												)}
											>
												{donation && donation.expired
													? helper.expiredText(donation.expired)
													: null}
											</CBadge>
											<CBadge
												className="mx-2"
												color={helper.badgeColor(donation.status)}
											>
												{helper.activeText(donation.status)}
											</CBadge>
											<CBadge color={helper.badgeColor(donation.verified)}>
												{helper.verifiedText(donation.verified)}
											</CBadge>
										</>
									</CTableDataCell>
								</CTableRow>
							</>
						) : null}

						<br />
						<CTableRow></CTableRow>
					</CTable>

					<hr></hr>
					<h5>Description</h5>
					<hr></hr>
					<CRow>
						<CCol md={12}>
							{donation && donation.description
								? Parser(donation.description)
								: null}
						</CCol>
					</CRow>
				</CModalBody>
				<CModalFooter></CModalFooter>
			</CModal>
		</>
	);
};
export default DonationDetail;
