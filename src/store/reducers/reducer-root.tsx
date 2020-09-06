import { combineReducers } from 'redux';
import { familyReducer } from './reducer-family';

// right now we have only 1 reducer, but lets use this format of combineReducers so you can add more later if you need to.
const rootReducer = combineReducers({
    family: familyReducer,
});

export default rootReducer;