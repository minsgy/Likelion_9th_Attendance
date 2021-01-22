import { SET_CURRENT_AUTH } from './types';

// 선택한 스케줄 상태 Reducer
export function SetCurrentAuth(currentAuth) {
    return {
        type: SET_CURRENT_AUTH,
        payload: currentAuth
    }
}
