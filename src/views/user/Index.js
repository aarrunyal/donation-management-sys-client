import React, { useEffect, useRef, useState } from 'react';
import {
	CBadge,
	CButton,
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

import CIcon from '@coreui/icons-react';
import { cilAlignCenter, cilPencil, cilTrash, cilUser, cilUserX, cilVerticalAlignCenter } from '@coreui/icons';
import UserDetails from 'src/components/user/UserDetails';
import Helper from 'src/services/Helper';
import CreateUser from 'src/components/user/CreateUser';
import Toasts from 'src/components/toast/Toast';

const Users = () => {
	const helper = new Helper();
	const userService = new UserService();

	const childRef = useRef();

	const [users, setUsers] = useState([]);

	const [userDetailmodal, setUserDetailModal] = useState(false);

	const [createUserModal, setCreateUserModal] = useState(false);

	const [userDetail, setUserDetail] = useState({})

	const openModal = (modalName, user = {}) => {
		if (modalName === "user_detail") {
			setUserDetail(user)
			setUserDetailModal(true);
		}
		else {
			setUserDetail({})
			setCreateUserModal(true);
		}


	}

	const closeModal = (modalName) => {
		setUserDetailModal(false);
		setCreateUserModal(false);
		setUserDetail({})
		getUsers()
	}

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


	const deleteUser = ((id) => {
		userService.delete(id).then(res => {
			console.log(res)
			childRef.current.showToast('success', res.data.data);
			getUsers()
		}).catch(err => {
			childRef.current.showToast('error', err.response.data.message);
		})
	})

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
							<CCol xs={12} >
								<CButton color="success" onClick={() => openModal("create_user", {})}>
									<CIcon size='sm' icon={cilUser} />
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
												<CBadge color={helper.badgeColor(user.role)} href="https://coreui.io/">
													{user.role}
												</CBadge>
											</CTableDataCell>
											<CTableDataCell>

												{
													user.role != "ADMIN"
														?
														<>
															<CIcon onClick={() => openModal("create_user", user)} size='lg' icon={cilPencil} className='m-2' />
															<CIcon onClick={() => deleteUser(user.id)} size='lg' icon={cilTrash} className='m-2' />
														</>

														: null
												}
												<CIcon onClick={() => openModal("user_detail", user)} size='lg' icon={cilAlignCenter} className='m-2' />

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

			</CCol>
			<Toasts childRef={childRef} />
			<UserDetails modal={userDetailmodal} user={userDetail} closeModal={closeModal} />
			<CreateUser modal={createUserModal} user={userDetail} closeModal={closeModal}></CreateUser>
		</CRow>
	);
};

export default Users;
