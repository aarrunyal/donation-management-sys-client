import {
	CButton,
	CCol,
	CForm,
	CFormInput,
	CFormLabel,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
	CRow,
} from '@coreui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import Stripe from '../payment-gateways/Stripe';
import { loadStripe } from '@stripe/stripe-js';
import ValidationHelper from 'src/services/ValidationHelper';
import { toast } from 'react-toastify';

const Payment = ({ modal, donation, closeModal }) => {
	const validationHelper = new ValidationHelper();

	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

	const [state, setState] = useState();
	const [options, setOptions] = useState({
		country: 'CA',
		mode: 'payment',
		currency: 'cad',
		amount: 0,
		appearance: {
			theme: 'stripe',
		},
	});
	const [, forceUpdate] = useState();

	const [error, setError] = useState({});

	const [displayPayment, setDisplayPayment] = useState(false);

	const handleChange = (event) => {
		setState((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const validateForm = (event) => {
		let obj = {};
		let err = 0;
		for (let f of event.target) {
			if (f.type != 'submit' && !validationHelper.validateEmpty(f.value)) {
				obj[f.name] = 'error';
				err++;
			}
		}
		setError(obj);
		return err > 0 ? false : true;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!validateForm(event)) {
			toast.error('Please input valid amount');
			return;
		} else {
			options.amount = parseFloat(state.amount_donated) * 100;
			setDisplayPayment(true);
			forceUpdate();
		}
	};

	const closeDonateModal = () => {
		setDisplayPayment(false);
		closeModal();
	};
	useEffect(() => {
		setState({
			payment_method: 'stripe',
			donation_id: donation.id,
			doner_id: 1,
			status: 'PENDING',
			amount_donated: 0,
			currency : "cad"
		});
	}, []);

	return (
		<>
			<CModal visible={modal} backdrop={'static'}>
				<CModalHeader closeButton>Create User</CModalHeader>
				<CModalBody>
					{!displayPayment ? (
						<>
							<CForm onSubmit={handleSubmit}>
								<CRow>
									<CCol md={12}>
										<CFormLabel htmlFor="validationCustom02">
											Amount willing to donate
										</CFormLabel>
										<CFormInput
											onChange={handleChange}
											type="number"
											name="amount_donated"
											min={1}
											max={donation.expected_collection}
										/>
										{error.amount_donated == 'error' ? (
											<span className="text-danger">
												Donation Amount is required
											</span>
										) : null}

										<br />
									</CCol>
								</CRow>

								<CRow className="justify-content-center my-2">
									<CCol md={3}>
										<CButton
											className="text-white"
											color="info"
											size="lg"
											type="submit"
										>
											Donate
										</CButton>
									</CCol>
								</CRow>
							</CForm>
						</>
					) : (
						<>
							<CRow className="justify-content-center my-2">
								<pre>{JSON.stringify(options)}</pre>
								{options.amount > 0 ? (
									<>
										<CCol md={12}>
											<Elements stripe={stripePromise} options={options}>
												<Stripe payment={state} />
											</Elements>
										</CCol>
									</>
								) : null}
							</CRow>
						</>
					)}
				</CModalBody>
				<CModalFooter>
					<CButton color="light" onClick={closeDonateModal}>
						Close
					</CButton>
				</CModalFooter>
			</CModal>
			{/* <Toasts childRef={childRef} /> */}
		</>
	);
};
export default Payment;
