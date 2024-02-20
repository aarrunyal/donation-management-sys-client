import React, { useEffect, useRef } from 'react';
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
import { UserService } from 'src/services/UserService';
import Toasts from 'src/components/toast/Toast';

const Users = () => {
	const userService = new UserService();

	const childRef = useRef();

	const getUsers = () => {
		userService
			.all()
			.then((response) => {})
			.catch((error) => {
				childRef.current.showToast('Something went wrong !', 'error');
			});
	};

	useEffect(() => {}, []);

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
			<Toasts childRef="childRef" />
		</CRow>
	);
};

export default Users;
