import React, { useEffect, useRef, useState } from 'react';
import {
	CBadge,
	CButton,
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CModal,
	CModalBody,
	CModalHeader,
	CRow,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
	CModalFooter,
} from '@coreui/react';
import { UserService } from 'src/services/UserService';
import Toasts from 'src/components/toast/Toast';
import CIcon from '@coreui/icons-react';
import {
	cilAlignCenter,
	cilPencil,
	cilTrash,
	cilUser,
	cilUserX,
	cilVerticalAlignCenter,
} from '@coreui/icons';

const Users = () => {
	const userService = new UserService();

	const childRef = useRef();

	const [users, setUsers] = useState([]);

	const [modal, setModal] = useState(false);

	const [, forceUpdate] = useState();

	const openModal = () => setModal(true);

	const closeModal = () => setModal(false);

	const getUsers = () => {
		userService
			.all()
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				childRef.current.showToast('error');
			});
	};

	const badgeColor = (color) => {
		color = color.toLowerCase();
		let badge = 'info';
		switch (color) {
			case 'admin':
				badge = 'info';
				break;
			case 'organiser':
				badge = 'warning';
				break;
			case 'user':
				badge = 'success';
				break;
			default:
				badge = 'info';
				break;
		}
		return badge;
	};

	const deleteUser = (id) => {
		userService
			.delete(id)
			.then((res) => {
				childRef.current.showToast('successs');
			})
			.catch((err) => {
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
						<strong>User</strong>
					</CCardHeader>
					<CCardBody>
						<CRow>
							<CCol xs={12}>
								<CButton color="success">
									<CIcon size="sm" icon={cilUser} />
									Add User
								</CButton>
							</CCol>
						</CRow>
						<CTable>
							<CTableHead color="dark">
								<CTableRow>
									<CTableHeaderCell scope="col">#</CTableHeaderCell>
									<CTableHeaderCell scope="col">Name</CTableHeaderCell>
									<CTableHeaderCell scope="col">Email</CTableHeaderCell>
									<CTableHeaderCell scope="col">Role</CTableHeaderCell>
									<CTableHeaderCell scope="col">Actions</CTableHeaderCell>
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
												<CBadge
													color={badgeColor(user.role)}
													href="https://coreui.io/"
												>
													{user.role}
												</CBadge>
											</CTableDataCell>
											<CTableDataCell>
												<CIcon size="lg" icon={cilPencil} className="m-2" />
												<CIcon
													onClick={deleteUser(user.id)}
													size="lg"
													icon={cilTrash}
													className="m-2"
												/>
												<CIcon
													onClick={() => openModal()}
													size="lg"
													icon={cilAlignCenter}
													className="m-2"
												/>
											</CTableDataCell>
										</CTableRow>
									);
								})}

								{/* <CTableRow>
                                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                                    <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>z
                                    <CTableDataCell>@twitter</CTableDataCell>s
                                </CTableRow> */}
							</CTableBody>
						</CTable>
					</CCardBody>
				</CCard>
				<CModal visible={modal} onClose={closeModal}>
					<CModalHeader closeButton>Modal title</CModalHeader>
					<CModalBody>Lorem ipsum dolor...</CModalBody>
					<CModalFooter>
						<CButton color="primary">Do Something</CButton>{' '}
					</CModalFooter>
				</CModal>
			</CCol>
			<Toasts childRef={childRef} />
		</CRow>
	);
};

export default Users;
