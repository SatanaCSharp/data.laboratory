import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import educationQueueRootSaga from './middleware/education.queue.middleware';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

const enhancer = composeEnhancers(middleware);
const store = createStore(
    rootReducer,
    undefined,
    enhancer
);
sagaMiddleware.run(educationQueueRootSaga);



export default store;