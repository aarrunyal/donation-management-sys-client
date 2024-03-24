import { cilAlignCenter, cilEyedropper, cilSearch } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
	CBadge,
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CFormInput,
	CFormLabel,
	CRow,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DonationPaymentService from 'src/services/DonationPaymentService';
import Helper from 'src/services/Helper';

const History = () => {
	const donationPaymentService = new DonationPaymentService();

	const helper = new Helper();

	const [histories, setHistories] = useState([]);

	const [filter, setFilter] = useState({
		status: 'active',
		verified: 'verified',
		expired: 'not_expired',
	});
	const handleFilter = (event) => {};

	const getDonationPayment = () => {
		donationPaymentService
			.all()
			.then((response) => {
				console.log(response.data);
				setHistories(response.data);
			})
			.catch((err) => {
				toast.error('Something went wrong!!!');
			});
	};

	useEffect(() => {
		getDonationPayment();
	}, []);

	return (
		<CRow>
			<CCol xs={12} className="mb-2 ">
				<CCard>
					<CCardBody>
						<CRow>
							<CCol xs={4}>
								<CFormLabel htmlFor="validationCustom02">
									Donation / Campaign Name
								</CFormLabel>
								<CFormInput
									type="text"
									name="name"
									onChange={handleFilter}
									placeholder="Donation / Campaign Name"
								/>
							</CCol>
							<CCol xs={4}>
								<CFormLabel htmlFor="validationCustom02">
									Donated Amount
								</CFormLabel>
								<CFormInput
									type="number"
									name="donated_amount"
									onChange={handleFilter}
									placeholder="Donated Amount"
								/>
							</CCol>

							<CCol xs={4}>
								<CFormLabel htmlFor="validationCustom02">Event Date</CFormLabel>
								<CFormInput
									type="date"
									name="event_date"
									onChange={handleFilter}
								/>
							</CCol>
						</CRow>
					</CCardBody>
				</CCard>
			</CCol>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardHeader>
						<strong>Donation History</strong>
					</CCardHeader>
					<CCardBody>
						<CTable>
							<CTableHead color="dark">
								<CTableRow>
									<CTableHeaderCell scope="col">#</CTableHeaderCell>
									<CTableHeaderCell scope="col">Campaign Name</CTableHeaderCell>
									<CTableHeaderCell scope="col">Doner</CTableHeaderCell>
									<CTableHeaderCell scope="col">Event Date</CTableHeaderCell>
									<CTableHeaderCell scope="col">Donated</CTableHeaderCell>
									<CTableHeaderCell scope="col">Invoice</CTableHeaderCell>
									<CTableHeaderCell scope="col">
										Donation Status
									</CTableHeaderCell>
									<CTableHeaderCell scope="col">View Invoice</CTableHeaderCell>
								</CTableRow>
							</CTableHead>
							<CTableBody>
								{histories.length > 0 ? (
									<>
										{histories.map((history, index) => {
											return (
												<>
													<CTableRow>
														<CTableDataCell>{index + 1}</CTableDataCell>

														<CTableDataCell>
															{history.donation_name}
														</CTableDataCell>
														<CTableDataCell>
															{history.doner_name}
														</CTableDataCell>
														<CTableDataCell>
															<CBadge color="info">{history.donated_at}</CBadge>
														</CTableDataCell>
														<CTableDataCell>
															<CBadge color="info">
																$ {history.amount_donated}
															</CBadge>
														</CTableDataCell>
														<CTableDataCell>
															{history.invoice_no ? (
																<>
																	<CBadge color="success">
																		# {history.invoice_no}
																	</CBadge>
																</>
															) : (
																<>-</>
															)}
														</CTableDataCell>

														<CTableDataCell>
															{history.status ? (
																<>
																	<CBadge
																		color={helper.badgeColor(
																			history.status.toLowerCase()
																		)}
																	>
																		{history.status}
																	</CBadge>
																</>
															) : (
																<>-</>
															)}
														</CTableDataCell>
														<CTableDataCell>
															{history.invoice_no ? (
																<>
																	<a
																		href={helper.buildUrlForBackend(
																			'invoice',
																			history.invoice_no
																		)}
																		target="_blank"
																		rel="noreferrer"
																	>
																		<CIcon
																			size="lg"
																			icon={cilAlignCenter}
																			className="mx-2"
																		/>
																	</a>
																</>
															) : (
																<>-</>
															)}
														</CTableDataCell>
													</CTableRow>
												</>
											);
										})}
									</>
								) : (
									<>
										<CTableRow>
											<CTableDataCell colSpan={10} className="text-center">
												No Data found
											</CTableDataCell>
										</CTableRow>
									</>
								)}

								{/* <CTableRow>
                            <CTableHeaderCell scope="row">3</CTableHeaderCell>
                            <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>z
                            <CTableDataCell>@twitter</CTableDataCell>s
                        </CTableRow> */}
							</CTableBody>
						</CTable>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default History;
