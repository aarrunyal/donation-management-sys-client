export default class validationHelper {

    passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,14}$/;

    emailRegex = /\S+@\S+\.\S+/;


    badgeColor = ((color) => {
        if (!color)
            return
        color = color.toLowerCase();
        let badge = "info"
        switch (color) {
            case "admin":
                badge = "info"
                break;
            case "organiser":
                badge = "warning"
                break;
            case "user":
                badge = "success"
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

    validateEmpty = (value) => {
        if (value == undefined || value == null || value == "")
            return false;
        return true
    }
}