import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga/sagas'
import rootReducer from "./reducers/reducer-root";

// we need an initialState otherwise , store will freak out
const initialState = {
    family: {}
}

const sagaMiddleware = createSagaMiddleware()

// redux sagas is a middleware that we apply to the store
export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

export default store;