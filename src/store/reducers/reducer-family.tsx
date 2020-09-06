import { Family } from '../constants'

const initialState = {}

export const familyReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Family.fetchFamily:
            return {...state, family: action.payload}
        case Family.fetchFamilySuccess:
            return {...state, family: action.payload.data}
    default:
    return state
}
}