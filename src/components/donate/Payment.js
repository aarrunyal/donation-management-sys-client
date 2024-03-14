import {
	CButton,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
} from '@coreui/react';
import React, { useRef } from 'react';
import Toasts from '../toast/Toast';
import { Elements } from '@stripe/react-stripe-js';
import Stripe from '../payment-gateways/Stripe';
import { loadStripe } from '@stripe/stripe-js';

const Payment = ({ modal, donation, closeModal }) => {
	const childRef = useRef();
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

	const options = {
		country: 'CA',
		mode: 'payment',
		amount: 1099,
		currency: 'cad',
		// Fully customizable with appearance API.
		appearance: {
			theme: 'stripe',

		}
	};

	return (
		<>
			<CModal visible={modal} onClose={closeModal} backdrop={'static'}>
				<CModalHeader closeButton>Create User</CModalHeader>
				<CModalBody>
					{/* <pre>{JSON.stringify(donation)}</pre> */}
					<Elements stripe={stripePromise} options={options}>
						<Stripe />
					</Elements>
				</CModalBody>
				<CModalFooter>
					<CButton color="light" onClick={closeModal}>
						Close
					</CButton>
				</CModalFooter>
			</CModal>
			<Toasts childRef={childRef} />
		</>
	);
};
export default Payment;
