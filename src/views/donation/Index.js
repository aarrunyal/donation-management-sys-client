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
	CFormInput,
	CFormLabel,
	CFormSelect,
	CRow,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import {
	cilAlignCenter,
	cilCheck,
	cilPencil,
	cilPlus,
	cilSearch,
	cilTrash,
	cilUser,
	cilUserX,
	cilVerticalAlignCenter,
} from '@coreui/icons';
import Helper from 'src/services/Helper';
import Toasts from 'src/components/toast/Toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import DonationService from 'src/services/DonationService';
import DonationDetail from 'src/components/donation/DonationDetail';
import { useNavigate } from 'react-router-dom';

const Donation = () => {
	const helper = new Helper();
	const donationService = new DonationService();

	const childRef = useRef();

	const [donations, setDonations] = useState([]);

	const [modal, setModal] = useState(false);

	const [donation, setDonation] = useState({});

	const [filter, setFilter] = useState({
		status: 'active',
		verified: 'verified',
		expired: 'not_expired',
	});

	const navigate = useNavigate();

	const getDonations = () => {
		donationService
			.all(filter)
			.then((response) => {
				setDonations(response.data);
			})
			.catch((error) => {
				childRef.current.showToast('error');
			});
	};

	const deleteDonation = (id) => {
		confirmAlert({
			title: 'Deleting donation campaign',
			message: 'Are you sure?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						donationService
							.delete(id)
							.then((res) => {
								childRef.current.showToast('success', res.data.data);
								getDonations();
							})
							.catch((err) => {
								childRef.current.showToast('error', err.response.data.message);
							});
					},
				},
				{
					label: 'No',
					onClick: () => getDonations(),
				},
			],
		});
	};

	const toggleStatus = (donation, flag) => {
		if (flag == 'active')
			flag = helper.generateStatusText(donation.status, flag);
		else if (flag == 'verify')
			flag = helper.generateStatusText(donation.verified, flag);
		else flag = helper.generateStatusText(donation.expired, flag);

		confirmAlert({
			title: `Changing status of campaign to ${flag}`,
			message: 'Are you sure?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						donationService
							.toggleStatus(donation.id, flag)
							.then((res) => {
								childRef.current.showToast('success', res.data.data);
								getDonations();
							})
							.catch((err) => {
								childRef.current.showToast('error', err.response.data.message);
							});
					},
				},
				{
					label: 'No',
					onClick: () => getDonations(),
				},
			],
		});
	};

	const toggleModal = (donation) => {
		if (modal) {
			setModal(false);
			setDonation({});
		} else {
			setModal(true);
			setDonation(donation);
		}
	};

	const openUpdatePage = (donation) => {
		navigate(`/donation/${donation.id}/update`);
	};

	const handleFilter = (event) => {
		setFilter((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	useEffect(() => {
		getDonations();
	}, []);

	return (
		<CRow>
			<CCol xs={12} className="mb-2 text-end">
				<CButton
					color="info"
					className="text-light"
					onClick={() => navigate('/donation-create')}
				>
					<CIcon size="sm" className="mx-2" icon={cilPlus} />
					Add Donation
				</CButton>
			</CCol>
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
									Expected Collection
								</CFormLabel>
								<CFormInput
									type="number"
									name="expected_collection"
									onChange={handleFilter}
									placeholder="Expected Collection"
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
						<br />
						<CRow>
							<CCol xs={4}>
								<CFormLabel htmlFor="validationCustom02">Status</CFormLabel>
								<CFormSelect
									type="date"
									name="status"
									onChange={handleFilter}
									value={filter.status}
								>
									<option value="active">Active</option>
									<option value="not_active">In-active</option>
								</CFormSelect>
							</CCol>

							<CCol xs={4}>
								<CFormLabel htmlFor="validationCustom02">
									Verification Status
								</CFormLabel>
								<CFormSelect
									type="date"
									name="verified"
									onChange={handleFilter}
									value={filter.verified}
								>
									<option value="verified">Verified</option>
									<option value="not_verified">Not Verified</option>
								</CFormSelect>
							</CCol>

							<CCol xs={4}>
								<CFormLabel htmlFor="validationCustom02">
									Expiration Status
								</CFormLabel>
								<CFormSelect
									type="date"
									name="expired"
									onChange={handleFilter}
									value={filter.expired}
								>
									<option value="expired">Expired</option>
									<option value="not_expired">Not Expired</option>
								</CFormSelect>
							</CCol>
						</CRow>
						<br />
						<CRow>
							<CCol xs={4}>
								<CButton color="info" className="text-light">
									<CIcon icon={cilSearch} className="mx-2"></CIcon>
									Search
								</CButton>
							</CCol>
						</CRow>
					</CCardBody>
				</CCard>
			</CCol>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardHeader>
						<strong>Donation</strong>
					</CCardHeader>
					<CCardBody>
						<CTable>
							<CTableHead color="dark">
								<CTableRow>
									<CTableHeaderCell scope="col">#</CTableHeaderCell>
									<CTableHeaderCell scope="col">Image</CTableHeaderCell>
									<CTableHeaderCell scope="col">Campaign Name</CTableHeaderCell>
									<CTableHeaderCell scope="col">Event Date</CTableHeaderCell>
									<CTableHeaderCell scope="col">
										Expected Collection($)
									</CTableHeaderCell>
									<CTableHeaderCell scope="col">Status</CTableHeaderCell>
									<CTableHeaderCell scope="col">View</CTableHeaderCell>
									<CTableHeaderCell scope="col">Actions</CTableHeaderCell>
								</CTableRow>
							</CTableHead>
							<CTableBody>
								{donations.map((donation, index) => {
									return (
										<CTableRow key={donation.id}>
											<CTableHeaderCell scope="row">
												{index + 1}
											</CTableHeaderCell>
											<CTableDataCell>
												{donation.image ? (
													<img
														src={helper.buildImagePath(
															donation.image_path,
															donation.image,
															'thumb'
														)}
														height={'50px'}
														width={'50px'}
													/>
												) : null}
											</CTableDataCell>
											<CTableDataCell>
												<a
													className="nav-link text-dark"
													onClick={() => {
														toggleModal(donation);
													}}
												>{`${donation.name ? donation.name : null}`}</a>
											</CTableDataCell>
											<CTableDataCell>
												<CBadge size="lg" color="info">
													{donation.event_date}
												</CBadge>
											</CTableDataCell>
											<CTableDataCell>
												<CButton color="info" size="xl" className="text-white">
													{`$ ${donation.expected_collection}`}
												</CButton>
											</CTableDataCell>
											<CTableDataCell>
												<>
													<CBadge
														color={helper.badgeColor(
															donation.expired ? 'expired' : 'not_expired'
														)}
													>
														{helper.expiredText(donation.expired)}
													</CBadge>
													<br />
													<CBadge color={helper.badgeColor(donation.status)}>
														{helper.activeText(donation.status)}
													</CBadge>
													<br />
													<CBadge color={helper.badgeColor(donation.verified)}>
														{helper.verifiedText(donation.verified)}
													</CBadge>
												</>
											</CTableDataCell>
											<CTableDataCell>
												<CIcon
													onClick={() => toggleModal(donation)}
													size="lg"
													icon={cilAlignCenter}
													className="m-2"
												/>
											</CTableDataCell>
											<CTableDataCell>
												<CDropdown>
													<CDropdownToggle color="light"></CDropdownToggle>
													<CDropdownMenu>
														<CDropdownItem
															onClick={() => toggleStatus(donation, 'active')}
														>
															<CIcon
																size="lg"
																icon={cilCheck}
																className="mx-2"
															/>
															Mark as Active
														</CDropdownItem>
														<CDropdownItem
															onClick={() => toggleStatus(donation, 'verify')}
														>
															<CIcon
																size="lg"
																icon={cilCheck}
																className="mx-2"
															/>
															Mark as Verified
														</CDropdownItem>
														<CDropdownItem
															onClick={() => toggleStatus(donation, 'expire')}
														>
															<CIcon
																size="lg"
																icon={cilCheck}
																className="mx-2"
															/>
															Mark as Expired
														</CDropdownItem>

														<CDropdownItem
															onClick={() => openUpdatePage(donation)}
														>
															<CIcon
																size="lg"
																icon={cilPencil}
																className="mx-2"
															/>
															Edit
														</CDropdownItem>
														<CDropdownItem
															onClick={() => deleteDonation(donation.id)}
														>
															<CIcon
																size="lg"
																icon={cilTrash}
																className="mx-2"
															/>{' '}
															Delete
														</CDropdownItem>
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
			<DonationDetail
				modal={modal}
				donation={donation}
				toggleModal={toggleModal}
			/>
			<Toasts childRef={childRef} />
		</CRow>
	);
};

export default Donation;
