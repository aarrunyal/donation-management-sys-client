import { CCard, CCardBody } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DonationPaymentService from 'src/services/DonationPaymentService';
import Helper from 'src/services/Helper';

const Success = () => {

    const helper = new Helper()

	const navigate = useNavigate();

	const donationPaymentService = new DonationPaymentService();

	

	const markPaymentAsCompleted = () => {
		const ct = localStorage.getItem('ct');
		if (!ct) {
			helper.navigateFromSuccessAndErrorPage("dashboard")
		}
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get('redirect_status') !== 'succeeded') {
			navigate('/error');
			return;
		}

		const obj = {
			transaction_id: urlParams.get('payment_intent'),
			status: 'COMPLETED',
		};

		donationPaymentService.update(ct, obj).then((response) => {
			localStorage.removeItem('ct');
			helper.navigateFromSuccessAndErrorPage("success")
		});
	};

	useEffect(() => {
		markPaymentAsCompleted();
	}, []);

	return (
		<>
			<CCard>
				<CCardBody>
					<div className="row justify-content-center">
						<div className="col-md-8">
							<div className="message-box _success">
								<h2> Your payment was successful </h2>
								<p>
									{' '}
									Thank you for your payment. we will <br />
									be in contact with more details shortly{' '}
								</p>
							</div>
						</div>
					</div>
				</CCardBody>
			</CCard>
		</>
	);
};

export default Success;
