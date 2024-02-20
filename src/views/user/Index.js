import React from 'react';
import {
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CRow,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react';

const Users = () => {
	return (
		<CRow>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardHeader>
						<strong>React Table</strong> <small>Table head</small>
					</CCardHeader>
					<CCardBody>
						<CTable>
							<CTableHead color="dark">
								<CTableRow>
									<CTableHeaderCell scope="col">#</CTableHeaderCell>
									<CTableHeaderCell scope="col">Name</CTableHeaderCell>
									<CTableHeaderCell scope="col">Email</CTableHeaderCell>
									<CTableHeaderCell scope="col">Role</CTableHeaderCell>
								</CTableRow>
							</CTableHead>
							<CTableBody>
								<CTableRow>
									<CTableHeaderCell scope="row">1</CTableHeaderCell>
									<CTableDataCell>Mark</CTableDataCell>
									<CTableDataCell>Otto</CTableDataCell>
									<CTableDataCell>@mdo</CTableDataCell>
								</CTableRow>
								<CTableRow>
									<CTableHeaderCell scope="row">2</CTableHeaderCell>
									<CTableDataCell>Jacob</CTableDataCell>
									<CTableDataCell>Thornton</CTableDataCell>
									<CTableDataCell>@fat</CTableDataCell>
								</CTableRow>
								<CTableRow>
									<CTableHeaderCell scope="row">3</CTableHeaderCell>
									<CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
									<CTableDataCell>@twitter</CTableDataCell>
								</CTableRow>
							</CTableBody>
						</CTable>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Users;
