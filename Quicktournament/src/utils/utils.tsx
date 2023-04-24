import moment from "moment";

export function currentDate() {
    return moment().format('dddd MM yyyy')
}