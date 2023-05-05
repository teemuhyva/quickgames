import moment from "moment";

export function currentDate() {
    return moment().format('dddd MM yyyy')
}

export function serializeObject(object: any) {
    const p = JSON.stringify(object)
    return JSON.parse(p);
}