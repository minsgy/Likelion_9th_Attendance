import { SET_CURRENT_SCHEDULE, CLEAR_SCHEDULE } from './types';

// 선택한 스케줄 상태 Reducer
export function setCurrentSchedule(currentSchedule) {
    return {
        type: SET_CURRENT_SCHEDULE,
        payload: currentSchedule
    }
}

export function ClearSchedule() {
    return {
        type: CLEAR_SCHEDULE,
    }
}