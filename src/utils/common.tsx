import moment from "moment";
const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm";

export function dateToString(date: any): string{
    return date.format(dateFormat)
}

export function stringToDate(stringDate: string): moment.MomentInput{
    return moment(stringDate,dateFormat)
}
export function timeToString(time: any): string{
    return time.format(timeFormat)
}

export function stringToTime(stringTime: string): moment.MomentInput{
    return moment(stringTime,timeFormat)
}