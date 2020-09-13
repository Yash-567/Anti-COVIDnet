export const datePrettifier = (date) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dateObj = new Date(date)
    let day = dateObj.getDate()
    let month = months[dateObj.getMonth()]
    return month + " " + day
}