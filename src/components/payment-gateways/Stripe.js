import React, { useState } from 'react';
import {
	ElementsConsumer,
	useStripe,
	useElements,
	PaymentElement,
} from '@stripe/react-stripe-js';
import { CCol, CRow } from '@coreui/react';
import DonationPaymentService from 'src/services/DonationPaymentService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Stripe = ({ payment }) => {
	const donationPaymentService = new DonationPaymentService();
	const naviage = useNavigate();
	const stripe = useStripe();
	const elements = useElements();

	const [errorMessage, setErrorMessage] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (elements == null) {
			return;
		}

		// Trigger form validation and wallet collection
		const { error: submitError } = await elements.submit();
		if (submitError) {
			// Show error to your customer
			setErrorMessage(submitError.message);
			return;
		}

		// Create the PaymentIntent and obtain clientSecret from your server endpoint

		const res = await donationPaymentService.createPaymentIntent(payment);

		const clientSecret = await res.data.secret;
		const checkoutToken = await res.data.checkout_token;
		localStorage.setItem("ct",checkoutToken)
		// const res = await fetch('/create-intent', {
		// 	method: 'POST',
		// });

		// const { client_secret: clientSecret } = await res.json();
		// const { client_secret: clientSecret } = null

		const { error } = await stripe.confirmPayment({
			//`Elements` instance that was used to create the Payment Element
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${process.env.REACT_APP_URL}/#/success`,
			},
		});

		if (error) {
			toast.error('Something went wrong please try again later !!!');
			setTimeout(() => {
				naviage('/error');
			}, 2000);
			setErrorMessage(error.message);
		} else {
			toast.success('Payment has been made successfully');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			<CRow className="text-center">
				<CCol md={12}>
					<button
						className="btn btn-lg btn-success text-light mt-3"
						type="submit"
						disabled={!stripe || !elements}
					>
						Pay {payment.amount_donated}$
					</button>
				</CCol>
			</CRow>
			{/* Show error message to your customers */}
			{errorMessage && <div>{errorMessage}</div>}
		</form>
	);
};

export default Stripe;
