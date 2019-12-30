import { EDUCATION_QUEUE_PENDING,
    EDUCATION_QUEUE_FULFILLED,
    EDUCATION_QUEUE_REJECTED,
} from "../constants/action.types";


export const educationQueuePending = () =>({
    type: EDUCATION_QUEUE_PENDING,
    isLoading: true,
});

export const educationQueueFulfilled = (payload) =>({
    type: EDUCATION_QUEUE_FULFILLED,
    isLoading: false,
    payload,
});

export const educationQueueRejected = () =>({
    type: EDUCATION_QUEUE_REJECTED,
    isLoading: false,
});
