import { combineReducers } from 'redux';
import schedule from './schedule_reducer';

const rootReducer = combineReducers({
    schedule,
})

export default rootReducer;