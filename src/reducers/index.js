
import { combineReducers }  from "redux";
import {educationQueue} from "./education.queue";

const rootReducer = combineReducers({
    educationQueue,
});

export default rootReducer;
