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

	const displayStatus = (status) => {
		if (status == 'COMPLETED') {
			return (
				<>
					<button
						className="btn btn-xs ">
						<storng>Donated on : </storng>
						{history.donated_at}
					</button>
				</>
			);
		} else {
			return (
				<>
					<button
						className="btn btn-xs btn-danger text-light"
					>
						<storng>Attempted on : </storng>
						{history.attempted_at}
					</button>
				</>
			);
		}
	};
	return (
		<>
			<CCard className="mx-2">
				<CCardBody>
					<div className="d-flex flex-column">
						<div className="d-flex justify-content-between align-items-center">
							<div className="flex-grow-1">
								<strong className="">{history.donation_name}</strong>
							</div>
							<div>
								{history.status == 'COMPLETED' ? (
									<>
										<CBadge color="info">#{history.invoice_no}</CBadge>
									</>
								) : null}
							</div>
						</div>
						<hr className="flex-item" />
						<div className="d-flex  flex-column">
							<div className="d-flex  justify-content-between align-items-center">
								<div className="mb-2">
									<CBadge
										color={helper.badgeColor(history.status.toLowerCase())}
									>
										{history.status}
									</CBadge>
								</div>
								<div>
									{history.status == 'COMPLETED' ? (
										<>
											<strong>
												$ {helper.addZeroes(history.amount_donated)}
											</strong>
										</>
									) : null}
								</div>
							</div>
                            {displayStatus(history.status)}
						</div>
                    
					</div>
				</CCardBody>
			</CCard>
		</>
	);
};
export default DonationHistory;
