import React, { useEffect, useRef, useState } from 'react';
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

	const [users, setUsers] = useState([]);

	const getUsers = () => {
		userService
			.all()
			.then((response) => {
				setUsers(response.data);
				console.log(users);
			})
			.catch((error) => {
				childRef.current.showToast('error');
			});
	};

	useEffect(() => {
		getUsers();
	}, []);

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
								{users.map((user, index) => {
									return (
										// <span key={index}>
										//     <pre>{user}</pre>
										// </span>
										<CTableRow key={user.id}>
											<CTableHeaderCell scope="row">
												{index + 1}
											</CTableHeaderCell>
											<CTableDataCell>{`${user.first_name} ${user.last_name}`}</CTableDataCell>
											<CTableDataCell>{user.email}</CTableDataCell>
											<CTableDataCell>
												<span className="badge">{user.role}</span>
											</CTableDataCell>
										</CTableRow>
									);
								})}

								{/* <CTableRow>
                                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                                    <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
                                    <CTableDataCell>@twitter</CTableDataCell>
                                </CTableRow> */}
							</CTableBody>
						</CTable>
					</CCardBody>
				</CCard>
			</CCol>
			<Toasts childRef={childRef} />
		</CRow>
	);
};

export default Users;
