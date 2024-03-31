import noImage from '../assets/images/no_image.jpeg';
// import { useSelector } from 'react-redux';
export default class Helper {
	passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,14}$/;

	emailRegex = /\S+@\S+\.\S+/;

	ERROR_MESSAGE = 'Something went wrong !!!';
	LOADING_MESSAGE = 'Request in progress !!!';
	SUCCESS_MESSAGE = 'Request has been processed successfully !!!';
	WARNING_MESSAGE = 'Issue with request !!!';

	badgeColor = (color) => {
		let badge = 'info';
		switch (color) {
			case 'ADMIN':
				badge = 'info';
				break;
			case 'ORGANISER':
				badge = 'warning';
				break;
			case 'USER':
				badge = 'success';
				break;
			case true:
				badge = 'success';
				break;

			case 'completed':
				badge = 'success';
				break;
			case 'pending':
				badge = 'warning';
				break;

			case 'cancelled':
				badge = 'danger';
				break;

			case 'not_expired':
				badge = 'success';
				break;

			case false:
				badge = 'danger';
				break;
			case 'expired':
				badge = 'danger';
				break;
			default:
				badge = 'info';
				break;
		}
		return badge;
	};

	validatePassword = (password) => {
		if (password === '') return false;
		return this.passwordRegex.test(password);
	};

	validateEmail = (email) => {
		if (email === '') return false;
		return this.emailRegex.test(email);
	};

	activeText = (flag) => {
		let text = null;
		switch (flag) {
			case true:
				text = 'ACTIVE';
				break;
			case false:
				text = 'INACTIVE';
				break;
		}
		return text;
	};

	verifiedText = (flag) => {
		let text = null;
		switch (flag) {
			case true:
				text = 'VERIFIED';
				break;
			case false:
				text = 'NOT-VERIFIED';
				break;
		}
		return text;
	};

	expiredText = (flag) => {
		let text = null;
		switch (flag) {
			case true:
				text = 'EXPIRED';
				break;
			case false:
				text = 'NOT-EXPIRED';
				break;
		}
		return text;
	};

	generateStatusText = (status, flag) => {
		switch (status) {
			case true:
				if (flag == 'expire') {
					flag = 'not-expired';
				} else if (flag == 'verify') {
					flag = 'not-verified';
				} else {
					flag = 'in-active';
				}
				break;
			case false:
				if (flag == 'expire') {
					flag = 'expired';
				} else if (flag == 'verify') {
					flag = 'verified';
				} else {
					flag = 'active';
				}
				break;

			default:
				flag = flag;
				break;
		}
		return flag;
	};

	createBolb = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				resolve(event.target.result);
			};
			reader.readAsDataURL(file);
		});

	buildImagePath = (imagePath = null, imageName = null, imageType = null) => {
		if (!imagePath || !imageName) return noImage;
		if (imageType == 'thumb')
			return `${process.env.REACT_APP_API_ENDPOINT}/${imagePath}/thumb/${imageName}`;
		return `${process.env.REACT_APP_API_ENDPOINT}/${imagePath}/${imageName}`;
	};

	addZeroes = (value = null, noOfZeros = 2) => {
		if (!value) return '0.00';
		return value.toFixed(
			Math.max(((value + '').split('.')[noOfZeros] || '').length, 2)
		);
	};

	generateQueryString = (object = {}) => {
		if (Object.values(object).length <= 0) {
			return null;
		} else {
			return new URLSearchParams(object).toString();
		}
	};

	navigateFromSuccessAndErrorPage = (type) => {
		let updatedUrl = null;
		if (type == 'dashboard') {
			updatedUrl =
				window.location.protocol + '//' + window.location.host + '/#/dashboard';
		} else {
			updatedUrl =
				window.location.protocol + '//' + window.location.host + '/#/success';
		}
		window.history.pushState({ path: updatedUrl }, '', updatedUrl);
	};

	buildUrlForBackend = (route, parameter) => {
		let url = `${process.env.REACT_APP_API_ENDPOINT}/${route}`;
		if (parameter) url = `${url}/${parameter}`;
		return url;
	};

	calculateCollected = (collected, expectedCollection) => {
		if (!collected) return 0;
		let percentage = (collected / expectedCollection) * 100;
		if (percentage > 100) {
			return 100;
		}
		return Math.round((collected / expectedCollection) * 100).toFixed(2);
	};

	calculateToBeCollected = (collected, expectedCollection) => {
		if (!collected) return 100;
		let percentage = (collected / expectedCollection) * 100;
		if (percentage > 100) {
			return 0;
		}
		return Math.round(100 - percentage).toFixed(2);
	};

	ucfirst = (value) => {
		if (!value) return;
		return value[0].toUpperCase() + value.slice(1);
	};

	controlAccess() {}
}
