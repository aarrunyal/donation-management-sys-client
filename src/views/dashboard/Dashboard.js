import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	CAvatar,
	CCard,
	CCardBody,
	CCardFooter,
	CCardHeader,
	CCol,
	CProgress,
	CRow,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import {
	cibCcAmex,
	cibCcApplePay,
	cibCcMastercard,
	cibCcPaypal,
	cibCcStripe,
	cibCcVisa,
	cibGoogle,
	cibFacebook,
	cibLinkedin,
	cifBr,
	cifEs,
	cifFr,
	cifIn,
	cifPl,
	cifUs,
	cibTwitter,
	cilCloudDownload,
	cilPeople,
	cilUser,
	cilUserFemale,
} from '@coreui/icons';

import avatar1 from 'src/assets/images/avatars/1.jpg';
import avatar2 from 'src/assets/images/avatars/2.jpg';
import avatar3 from 'src/assets/images/avatars/3.jpg';
import avatar4 from 'src/assets/images/avatars/4.jpg';
import avatar5 from 'src/assets/images/avatars/5.jpg';
import avatar6 from 'src/assets/images/avatars/6.jpg';

import WidgetsBrand from '../widgets/WidgetsBrand';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import { isLoggedIn } from 'src/helpers/IsLoggedIn';

import RequestAsOrganiser from 'src/components/dashboard/RequestAsOrganiser';
import DonationCard from 'src/components/donation/DonationCard';

import DonationService from 'src/services/DonationService';

const Dashboard = () => {
	const navigate = useNavigate();

	const donationService = new DonationService();

	const [donations, setDonations] = useState([]);

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
		return !isLoggedIn() ? navigate('/login') : null;
	};

	const getCampaigns = () => {
		donationService.all().then((response) => {
			setDonations(response.data);
		});
	};

	useEffect(() => {
		naviageIfNotLoggedIn();
	}, []);

	return (
		<>
			{donations.length > 0 ? (
				<CCard className="mb-4">
					<CCardBody>
						<CRow>
							{donations.map((dontaion, index ) => {
								return (
									<>
										<CCol md={3}>
											<DonationCard donation={dontaion} />
										</CCol>
									</>
								);
							})}
						</CRow>
					</CCardBody>
				</CCard>
			) : null}

			<WidgetsBrand withCharts />
		</>
	);
};

export default Dashboard;
