import { call, put, takeLatest, all } from 'redux-saga/effects';
import { Family } from '../constants';
import {
    fetchFamilySuccess,
    deleteFamilyError,
    fetchFamilyError
} from '../actions/index'
import axios from 'axios';


function* getFamily() {
    yield takeLatest(Family.fetchFamily, getFamilyFromAPI)
}

function* getFamilyFromAPI(action: any) {
    try {
        // call the api
        const data = yield call(axios.get, "http://localhost:4000/family")
        // call the success action with data
        yield put(fetchFamilySuccess(data));
    } catch (e) {
        // call the error action with data
        yield put(fetchFamilyError(e));
    }

}

function* deleteFamilyFromAPI(action: any){
    console.log(action);
    try {
        // call the api
        const data = yield call(axios.delete, `http://localhost:4000/family/delete/${action.payload.id}`);
        if(data.status === 201){
            yield put({ type: 'FETCH_FAMILY'});
        }
    } catch (e) {
        // call the error action with data
        yield put(deleteFamilyError(e));
    }
}

function* deleteFamily() {
    yield takeLatest(Family.deleteFamily, deleteFamilyFromAPI)
}

function* addFamilyFromAPI(action: any){
    console.log(action);
    try {
        const data = yield call(axios.post, `http://localhost:4000/family/add`, action.payload);
        if(data.status === 201){
            yield put({ type: 'FETCH_FAMILY'});
        }
    } catch (e) {
        // call the error action with data
        // yield put(deleteFamilyError(e));
    }
}

function* addFamily() {
    yield takeLatest(Family.addFamily, addFamilyFromAPI)
}

function* updateFamilyFromAPI(action: any){
    console.log(action);
    try {
        const data = yield call(axios.post, `http://localhost:4000/family/update/${action.payload.id}`, action.payload);
        if(data.status === 201){
            yield put({ type: 'FETCH_FAMILY'});
        }
    } catch (e) {
        // call the error action with data
        // yield put(deleteFamilyError(e));
    }
}

function* updateFamily() {
    yield takeLatest(Family.updateFamily, updateFamilyFromAPI)
}

export default function* rootSaga() {
    yield all([
        getFamily(),
        deleteFamily(),
        addFamily(),
        updateFamily()
    ])
}
