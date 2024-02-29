export default class Helper {
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
}