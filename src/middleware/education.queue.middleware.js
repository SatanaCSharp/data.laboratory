import { takeEvery, call, put } from "redux-saga/effects";
import { EDUCATION_QUEUE_PENDING } from "../constants/action.types";
import { getEducationQueueRequest } from "../services/request.service";
import { educationQueueRejected, educationQueueFulfilled } from "../actions/education.queue.action.creator";

function* getEducationQueue() {
    try {
        const educationQueue  = yield call(async ()=> getEducationQueueRequest());
        yield put(educationQueueFulfilled(educationQueue));
    } catch (err) {
        yield put(educationQueueRejected())
    }
}

export default function* educationQueueRootSaga() {
    yield takeEvery(EDUCATION_QUEUE_PENDING, getEducationQueue);
}
