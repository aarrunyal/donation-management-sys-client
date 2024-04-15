import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	CButton,
	CCard,
	CCardBody,
	CCardTitle,
	CCol,
	CRow,
} from '@coreui/react';

import WidgetsBrand from '../widgets/WidgetsBrand';

import { isLoggedIn } from 'src/helpers/IsLoggedIn';

import RequestAsOrganiser from 'src/components/dashboard/RequestAsOrganiser';
import DonationCard from 'src/components/donation/DonationCard';

import DonationService from 'src/services/DonationService';
import DonationPaymentService from 'src/services/DonationPaymentService';
import DonationHistory from 'src/components/dashboard/DonationHistory';
import { toast } from 'react-toastify';

const Dashboard = () => {
	const navigate = useNavigate();

	const donationService = new DonationService();

	const donationPaymentService = new DonationPaymentService();

	const [donations, setDonations] = useState([]);

	const [donationHistories, setDonationHistories] = useState([]);

	const [organiserModal, setOrganiserModal] = useState(false);

	const openOrganiserModal = (event) => {
		event.preventDefault();
		setOrganiserModal(true);
	};

	const closeOrganiserModal = (event) => {
		event.preventDefault();
		setOrganiserModal(false);
	};

	const naviageIfNotLoggedIn = () => {
		getCampaigns();
		getDonationHistories();
		return !isLoggedIn() ? navigate('/login') : null;
	};

	const getCampaigns = () => {
		donationService.all().then((response) => {
			setDonations(response.data);
		});
	};

	const getDonationHistories = () => {
		donationPaymentService
			.byUser(5)
			.then((response) => {
				setDonationHistories(response.data);
			})
			.catch((error) => {
				toast.error('Something went wrong !!!');
			});
	};

	useEffect(() => {
		naviageIfNotLoggedIn();
	}, []);

	return (
		<>
			<CCard className="mb-2">
				<CCardBody>
					<div className="d-flex flex-column flex-lg-row justify-content-between align-items-center     alert alert-info">
						<div>
							<span className="flex-item">
								If you wish to become an organiser and raise fund for others.
							</span>
						</div>
						<div>
							<CButton
								onClick={openOrganiserModal}
								className="flex-item btn btn-info text-light"
							>
								Become a Organiser
							</CButton>
						</div>
					</div>
				</CCardBody>
			</CCard>

			{donations.length > 0 ? (
				<div className="d-flex">
					<CCard>
						<CCardBody>
							<div className="d-flex flex-column flex-md-row justify-content-evenly">
								{donations.map((dontaion, i) => {
									return (
										<>
											<DonationCard donation={dontaion} />
										</>
									);
								})}
							</div>
						</CCardBody>
					</CCard>
				</div>
			) : null}

			{}

			{donationHistories.length > 0 ? (
				<div className="d-flex mt-2">
					<CCard className="mb-4">
						<CCardTitle className="m-2">Donation History</CCardTitle>
						<CCardBody>
							<div className="d-flex  justify-content-evenly">
								{donationHistories.map((history, index) => {
									return (
										<div key={history.id}>
											<DonationHistory history={history} />
										</div>
									);
								})}
							</div>
						</CCardBody>
					</CCard>
				</div>
			) : null}

			<WidgetsBrand withCharts />
			<RequestAsOrganiser
				modal={organiserModal}
				closeModal={closeOrganiserModal}
			/>
		</>
	);
};

export default Dashboard;
