import { combineReducers } from 'redux';
import schedule from './schedule_reducer';
import auth from './auth_reducer';

const rootReducer = combineReducers({
    schedule,
    auth
})

export default rootReducer;