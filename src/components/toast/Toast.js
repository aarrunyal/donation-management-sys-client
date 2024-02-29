import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toasts = (props) => {
	const ERROR_MESSAGE = 'Something went wrong !!!';
	const LOADING_MESSAGE = 'Request in progress !!!';
	const SUCCESS_MESSAGE = 'Request has been processed !!!';
	const WARNING_MESSAGE = 'Issue with request !!!';

	const showToast = (type, message = null) => {
		let emitter = {
			position: 'bottom-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		};
		let toastId = null;
		switch (type) {
			case 'error':
				message = message ? message : ERROR_MESSAGE;
				toastId = toast.error(message, emitter);
				break;
			case 'loading':
				message = message ? message : LOADING_MESSAGE;
				toastId = toast.loading(message, emitter);
				localStorage.setItem('loading', toastId);
				break;
			case 'warning':
				message = message ? message : WARNING_MESSAGE;
				toastId = toast.warning(message, emitter);
				break;
			case 'success':
				message = message ? message : SUCCESS_MESSAGE;
				toastId = toast.success(message, emitter);
				break;
			case 'no_loading':
				toastId = toast.update(localStorage.getItem('loading'), {
					render: message,
					type: type,
					isLoading: false,
					progress: undefined,
					autoClose: 5000,
				});
				setTimeout(() => {
					localStorage.removeItem('loading');
				}, 5000);
				break;
			default:
				toastId = toast.info(message, emitter);
				break;
		}
	};

	props.childRef.current = {
		showToast: showToast,
	};

	return <ToastContainer />;
};

export default Toasts;
