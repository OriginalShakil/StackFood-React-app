import moment from 'moment'
import {t} from "i18next";
// let today = moment(currentDate).format('dddd')
let currentDate = moment().format('yyyy-MM-DD HH:mm')
let nextday = moment(currentDate).add(1, 'days').format('yyyy-MM-DD')
let today = moment(currentDate).format('dddd')
let currentTime = moment(currentDate).format('HH:mm')

export const getDayNumber = (day) => {
    switch (day) {
        case 'Sunday': {
            return 0
        }
        case 'Monday': {
            return 1
        }
        case 'Tuesday': {
            return 2
        }
        case 'Wednesday': {
            return 3
        }
        case 'Thursday': {
            return 4
        }
        case 'Friday': {
            return 5
        }
        case 'Saturday': {
            return 6
        }
    }
}
function recursive(start, end, close, list, schedule_order_slot_duration, day) {
    const checkedEnd = moment(end, 'HH:mm').subtract(1, 'minutes')
    const date =
        getDayNumber(today) === day
            ? moment(currentDate).format('yyyy-MM-DD')
            : nextday
    if (
        end.isBefore(close) ||
        moment(end).format('HH:mm') === moment(close).format('HH:mm') ||
        moment(checkedEnd).format('HH:mm') === moment(close).format('HH:mm')
    ) {
        let label = ''
        if (
            currentTime > moment(start).format('HH:mm') &&
            currentTime < moment(end).format('HH:mm')
        ) {
            label = t('Now')
        } else {
            label = `${moment(start).format('HH:mm')} - ${moment(
                checkedEnd
            ).format('HH:mm')}`
        }

        // // `${moment(start).format('HH:mm')} - ${moment(checkedEnd).format('HH:mm') === moment(close).format('HH:mm')
        // //         ? moment(checkedEnd).format('HH:mm')
        // //         : moment(end).format('HH:mm')}`
        if (
            (currentTime < moment(end).format('HH:mm') &&
                getDayNumber(today) === day) ||
            (currentTime > moment(end).format('HH:mm') &&
                getDayNumber(today) !== day)
        ) {
            list.push({
                label: label,
                // label: `${moment(start).format('HH:mm')} - ${
                //     moment(checkedEnd).format('HH:mm') ===
                //     moment(close).format('HH:mm')
                //         ? moment(checkedEnd).format('HH:mm')
                //         : moment(end).format('HH:mm')
                // }`,
                start: moment(start).format('HH:mm'),
                end:
                    moment(checkedEnd).format('HH:mm') ===
                    moment(close).format('HH:mm')
                        ? moment(checkedEnd).format('HH:mm')
                        : moment(end).format('HH:mm'),
                value:
                    moment(checkedEnd).format('HH:mm') ===
                    moment(close).format('HH:mm')
                        ? `${date} ${moment(checkedEnd).format('HH:mm')}`
                        : `${date} ${moment(end).format('HH:mm')}`,
            })
        }

        recursive(
            end,
            moment(end, 'HH:mm').add(schedule_order_slot_duration, 'minutes'),
            close,
            list,
            schedule_order_slot_duration,
            day
            //  moment(close).format('HH:mm'),
        )
    } else {

        return list
    }
}
export const getAllSchedule = (
    day,
    schedules,
    schedule_order_slot_duration
) => {
    let list = []
    if (schedules && schedules.length > 0) {
        const days = schedules.filter((s) => s.day === day)
        for (let index = 0; index < days.length; index++) {
            let close = moment(days[index].closing_time, 'HH:mm')
            let start = moment(days[index].opening_time, 'HH:mm')
            let end = moment(start, 'HH:mm').add(
                schedule_order_slot_duration,
                'minutes'
            )
            recursive(
                start,
                end,
                close,
                list,
                schedule_order_slot_duration,
                day
            )
        }
    }
    return list
}
