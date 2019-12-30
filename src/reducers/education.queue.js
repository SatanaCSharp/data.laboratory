import {
    EDUCATION_QUEUE_PENDING,
    EDUCATION_QUEUE_FULFILLED,
    EDUCATION_QUEUE_REJECTED,
} from "../constants/action.types";

export const educationQueue = (state = {}, {type, payload, isLoading}) => {
    switch(type) {
        case EDUCATION_QUEUE_PENDING:
            return {
                ...state,
                isLoading,
            };
        case EDUCATION_QUEUE_FULFILLED:
            return {
                ...state,
                isLoading,
                ...payload,
            };
        case EDUCATION_QUEUE_REJECTED:
            return {
                ...state,
                isLoading,
            };
        default:
            return state;
    };
};
