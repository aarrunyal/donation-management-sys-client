import {
	CBadge,
	CCard,
	CCardBody,
	CCardTitle,
	CCol,
	CRow,
} from '@coreui/react';
import React from 'react';
import Helper from 'src/services/Helper';

const DonationHistory = ({ history }) => {
	const helper = new Helper();
	console.log(history);
	return (
		<>
			<CCard className='my-1'> 

				<CCardBody>
					<CRow>
						<CCol md={9}>
							<strong>{history.donation_name}</strong>
						</CCol>
						<CCol md={3} >
							{history.status == 'COMPLETED' ? (
								<>
									<CBadge color="info">
										#{history.invoice_no}
									</CBadge>
								</>
							) : null}
						</CCol>
					</CRow>
					<CRow>
						<hr />
						<CCol md={5}>
							<CBadge color={helper.badgeColor(history.status.toLowerCase())}>
								{history.status}
							</CBadge>
						</CCol>
						<CCol md={4} className="text-right">
							{history.status == 'COMPLETED' ? (
								<>
									<CBadge
										color={helper.badgeColor(history.status.toLowerCase())}
									>
										$ {history.donated_at}
									</CBadge>
								</>
							) : null}
						</CCol>
						<CCol md={3} className="text-right">
							{history.status == 'COMPLETED' ? (
								<>
									<strong>$ {helper.addZeroes(history.amount_donated)}</strong>
								</>
							) : null}
						</CCol>
					</CRow>
				</CCardBody>
			</CCard>
		</>
	);
};
export default DonationHistory;
