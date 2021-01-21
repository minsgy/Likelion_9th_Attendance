import { CLEAR_SCHEDULE, SET_CURRENT_SCHEDULE } from '../actions/types'

const initialScheduleState = {
    currentSchedule: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialScheduleState, action) {
    switch (action.type) {
        case SET_CURRENT_SCHEDULE:
            return {
                ...state,
                currentSchedule: action.payload,
            }
        case CLEAR_SCHEDULE:
            return {
                ...state,
                currentSchedule: null,
            }
        default:
            return state
    }
}