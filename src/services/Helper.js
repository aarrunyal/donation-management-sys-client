export default class Helper {

    passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,14}$/;

    emailRegex = /\S+@\S+\.\S+/;


    badgeColor = ((color) => {

        let badge = "info"
        switch (color) {
            case "ADMIN":
                badge = "info"
                break;
            case "ORGANISER":
                badge = "warning"
                break;
            case "USER":
                badge = "success"
                break;
            case true:
                badge = "success"
                break;

            case "not_expired":
                badge = "success"
                break;

            case false:
                badge = "danger"
                break;
            case "expired":
                badge = "danger"
                break;
            default:
                badge = "info"
                break;
        }
        return badge;
    })


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
                text = "ACTIVE"
                break;
            case false:
                text = "INACTIVE"
                break;
        }
        return text;
    }


    verifiedText = (flag) => {
        let text = null;
        switch (flag) {
            case true:
                text = "VERIFIED"
                break;
            case false:
                text = "NOT-VERIFIED"
                break;
        }
        return text;
    }


    expiredText = (flag) => {
        let text = null;
        switch (flag) {
            case true:
                text = "EXPIRED"
                break;
            case false:
                text = "NOT-EXPIRED"
                break;
        }
        return text;
    }

    generateStatusText = (status, flag) => {
        switch (status) {
            case true:
                if (flag == "expire") {
                    flag = "not-expired"
                } else if (flag == "verify") {
                    flag = "not-verified"
                } else {
                    flag = "in-active"
                }
                break;
            case false:
                if (flag == "expire") {
                    flag = "expired"
                } else if (flag == "verify") {
                    flag = "verified"
                } else {
                    flag = "active"
                }
                break;

            default:
                flag = flag
                break;
        }
        return flag;
    }
}