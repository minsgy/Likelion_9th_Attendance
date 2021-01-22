import { SET_CURRENT_AUTH } from '../actions/types'

const initialAuthState = {
    currentAuth: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialAuthState, action) {
    switch (action.type) {
        case SET_CURRENT_AUTH:
            return {
                ...state,
                currentAuth: action.payload,
            }
        default:
            return state
    }
}