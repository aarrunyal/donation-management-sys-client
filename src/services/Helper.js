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
                console.log("bere")
                badge = "success"
                break;

            case false:
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


    activeText = (flag)=>{
        let text = null;
        switch(flag){
            case true:
                text ="ACTIVE"
                break;
            case false:
                text= "INACTIVE"
                break;
        }
        return text;
    }


    verifiedText = (flag)=>{
        let text = null;
        switch(flag){
            case true:
                text ="VERIFIED"
                break;
            case false:
                text= "NOT-VERIFIED"
                break;
        }
        return text;
    }


    expiredText = (flag)=>{
        let text = null;
        switch(flag){
            case true:
                text ="VERIFIED"
                break;
            case false:
                text= "NOT-VERIFIED"
                break;
        }
        return text;
    }
}