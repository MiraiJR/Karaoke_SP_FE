import moment from "moment"

export const calTime = (started: Date, ended: Date) => {
    const date1 = moment(started);
    const date2 = moment(ended);
    const diffHour = date2.diff(date1, 'hours');
    const diffMinute = date2.diff(date1, 'minutes') - diffHour * 60;

    return diffHour !== 0 ? `${diffHour} tiếng ${diffMinute} phút` : `${diffMinute} phút`;
}