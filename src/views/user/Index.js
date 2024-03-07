import React, { useEffect, useRef, useState } from 'react';
import {
	CBadge,
	CButton,
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CDropdown,
	CDropdownItem,
	CDropdownMenu,
	CDropdownToggle,
	CRow,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react';
import UserService from 'src/services/UserService';

import CIcon from '@coreui/icons-react';
import { cibCircle, cibSamsung, cilAlignCenter, cilCheckAlt, cilCheckCircle, cilCircle, cilPencil, cilPlus, cilTrash, cilUser, cilUserX, cilVerticalAlignCenter } from '@coreui/icons';
import UserDetails from 'src/components/user/UserDetails';
import Helper from 'src/services/Helper';
import CreateUser from 'src/components/user/CreateUser';
import Toasts from 'src/components/toast/Toast';
import UpdateUser from 'src/components/user/UpdateUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Users = () => {
	const helper = new Helper();
	const userService = new UserService();

	const childRef = useRef();

	const [users, setUsers] = useState([]);

	const [userDetailmodal, setUserDetailModal] = useState(false);

	const [createUserModal, setCreateUserModal] = useState(false);

	const [updateUserModal, setUpdateUserModal] = useState(false);

	const [userDetail, setUserDetail] = useState({})

	const openModal = (modalName, user = {}) => {
		if (modalName === "user_detail") {
			setUserDetail(user)
			setUserDetailModal(true);
		} else if (modalName === "update_user") {
			setUserDetail(user)
			setUpdateUserModal(true);
		}
		else {
			setUserDetail({})
			setCreateUserModal(true);
		}
	}

	const closeModal = (modalName) => {
		setUserDetailModal(false);
		setCreateUserModal(false);
		setUpdateUserModal(false)
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
		confirmAlert({
			title: 'Deleting users detail',
			message: 'Are you sure?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						userService.delete(id).then(res => {
							childRef.current.showToast('success', res.data.data);
							getUsers()
						}).catch(err => {
							childRef.current.showToast('error', err.response.data.message);
						})
					}
				},
				{
					label: 'No',
					onClick: () => getUsers()
				}
			]
		});

	})

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<CRow>
			<CCol xs={12} className='mb-2 ' >
				<CButton color="success" onClick={() => openModal("create_user", {})}>
					<CIcon size='sm' className='mx-2' icon={cilPlus} />
					Add User
				</CButton>
			</CCol>
			<CCol xs={12}>
				<CCard className="mb-4">

					<CCardHeader>
						<strong>User</strong>
					</CCardHeader>
					<CCardBody>
						<CRow>

						</CRow>
						<CTable>
							<CTableHead color="dark">
								<CTableRow>
									<CTableHeaderCell scope="col">#</CTableHeaderCell>
									<CTableHeaderCell scope="col">Name</CTableHeaderCell>
									<CTableHeaderCell scope="col">Email</CTableHeaderCell>
									<CTableHeaderCell scope="col">Role</CTableHeaderCell>
									<CTableHeaderCell scope="col">Status</CTableHeaderCell>
									<CTableHeaderCell scope="col">View</CTableHeaderCell>
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
											<CTableDataCell>
												{`${user.first_name} ${user.last_name}`}</CTableDataCell>
											<CTableDataCell>{user.email}</CTableDataCell>
											<CTableDataCell>
												<CBadge color={helper.badgeColor(user.role)} >
													{user.role}
												</CBadge>
											</CTableDataCell>
											<CTableDataCell>
												{
													user.role != "ADMIN" ?
														<>
															<CBadge color={helper.badgeColor(user.status)}>
																{helper.activeText(user.status)}
															</CBadge>
															<br />
															<CBadge color={helper.badgeColor(user.verified)}>
																{helper.verifiedText(user.verified)}
															</CBadge>
														</>
														: null
												}
											</CTableDataCell>
											<CTableDataCell>
												<CIcon onClick={() => openModal("user_detail", user)} size='lg' icon={cilAlignCenter} className='m-2' />
											</CTableDataCell>
											<CTableDataCell>
												<CDropdown>
													<CDropdownToggle color="light"></CDropdownToggle>
													<CDropdownMenu>
														{
															user.role != "ADMIN"
																?
																<>
																	<CDropdownItem onClick={() => openModal("update_user", user)}>
																		<CIcon size='lg' icon={cilPencil} className='mx-2' />Edit
																	</CDropdownItem>
																	<CDropdownItem onClick={() => deleteUser(user.id)}>
																		<CIcon size='lg' icon={cilTrash} className='mx-2' /> Delete
																	</CDropdownItem>

																</>
																: null
														}
													</CDropdownMenu>
												</CDropdown>


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
			<CreateUser modal={createUserModal} user={userDetail} closeModal={closeModal} />
			<UpdateUser modal={updateUserModal} user={userDetail} closeModal={closeModal} />
		</CRow>
	);
};

export default Users;
