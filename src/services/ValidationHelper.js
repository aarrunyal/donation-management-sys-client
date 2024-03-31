export default class validationHelper {

    VALIDATION_ERROR = "Please provide valid data !!!"
    VALIDATION_EMPTY_ERROR = "Field cannot be empty"
    
    
    passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,14}$/;

	emailRegex = /\S+@\S+\.\S+/;

	mobileRegex =
		/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

	badgeColor = (color) => {
		if (!color) return;
		color = color.toLowerCase();
		let badge = 'info';
		switch (color) {
			case 'admin':
				badge = 'info';
				break;
			case 'organiser':
				badge = 'warning';
				break;
			case 'user':
				badge = 'success';
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

	validateEmpty = (value) => {
		if (value == undefined || value == null || value == '') return false;
		return true;
	};

	validateContactNo(value) {
		if (value === '') return false;
		return this.mobileRegex.test(value);
	}
}
