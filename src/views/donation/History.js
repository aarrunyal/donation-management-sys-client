import { cilSearch } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
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
import React, { useState } from 'react';

const History = () => {
	const [histories, setHistories] = useState([]);
	const [filter, setFilter] = useState({
		status: 'active',
		verified: 'verified',
		expired: 'not_expired',
	});
	const handleFilter = (event) => {};

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
								</CTableRow>
							</CTableHead>
							<CTableBody>
								{histories.length > 0 ? (
									<>
										{histories.map((history) => {
											return <></>;
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
