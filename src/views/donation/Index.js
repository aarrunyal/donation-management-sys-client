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

import CIcon from '@coreui/icons-react';
import { cilAlignCenter, cilPencil, cilPlus, cilTrash, cilUser, cilUserX, cilVerticalAlignCenter } from '@coreui/icons';
import Helper from 'src/services/Helper';
import Toasts from 'src/components/toast/Toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { DonationService } from 'src/services/DonationService';

const Donation = () => {
	const helper = new Helper();
	const donationService = new DonationService();

	const childRef = useRef();

	const [donations, setDonations] = useState([]);



	const getDonations = () => {
		donationService
			.all()
			.then((response) => {
				setDonations(response.data);
			})
			.catch((error) => {
				childRef.current.showToast('error');
			});
	};


	const deleteDonation = ((id) => {
		confirmAlert({
			title: 'Deleting donation campaign',
			message: 'Are you sure?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						donationService.delete(id).then(res => {
							childRef.current.showToast('success', res.data.data);
							getDonations()
						}).catch(err => {
							childRef.current.showToast('error', err.response.data.message);
						})
					}
				},
				{
					label: 'No',
					onClick: () => getDonations()
				}
			]
		});

	})

	useEffect(() => {
		getDonations();
	}, []);

	return (
		<CRow>
			<CCol xs={12} className='mb-2 ' >
				<CButton color="success" >
					<CIcon size='sm' className='mx-2' icon={cilPlus} />
					Add Donation
				</CButton>
			</CCol>
			<CCol xs={12}>
				<CCard className="mb-4">

					<CCardHeader>
						<strong>Donation</strong>
					</CCardHeader>
					<CCardBody>
						<CRow>

						</CRow>
						<CTable>
							<CTableHead color="dark">
								<CTableRow>
									<CTableHeaderCell scope="col">#</CTableHeaderCell>
									<CTableHeaderCell scope="col">Campaign Name</CTableHeaderCell>
									<CTableHeaderCell scope="col">Event Date</CTableHeaderCell>
									<CTableHeaderCell scope="col">Expected Collection($)</CTableHeaderCell>
									<CTableHeaderCell scope="col">Status</CTableHeaderCell>
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
											<CTableDataCell>{`${donation.name}`}</CTableDataCell>
											<CTableDataCell>
												<CBadge size='lg' color='info'>
													{donation.event_date}
												</CBadge>
											</CTableDataCell>
											<CTableDataCell>
												<CButton color="info" size='xl' className='text-white' >
													{`$ ${donation.expected_collection}`}
												</CButton>
											</CTableDataCell>
											<CTableDataCell>

												<>
												<CBadge color={helper.badgeColor(donation.expired)}>
														{helper.expiredText(donation.expired)}
													</CBadge>
													<br/>
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


												<>
													<CIcon size='lg' icon={cilPencil} className='m-2' />
													<CIcon onClick={() => deleteDonation(donation.id)} size='lg' icon={cilTrash} className='m-2' />
												</>


												<CIcon size='lg' icon={cilAlignCenter} className='m-2' />

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

		</CRow>
	);
};

export default Donation;
