import { Family } from '../constants'

export const fetchFamilySuccess = (data: any) => {
    return {
        type: Family.fetchFamilySuccess,
        payload: data
    };
}

export const fetchFamily = (data: any) => {
    return {
        type: Family.fetchFamily,
        payload: data
    }
}

export const fetchFamilyError = (data: any) => {
    return {
        type: Family.fetchFamilyError,
        payload: data
    }
}


export const addFamilySuccess = (data: any) => {
    return {
        type: Family.addFamilySuccess,
        payload: data
    };
}

export const addFamily = (data: any) => {
    return {
        type: Family.addFamily,
        payload: data
    }
}

export const addFamilyError = (data: any) => {
    return {
        type: Family.addFamilyError,
        payload: data
    }
}



export const deleteFamily = (data: any) => {
    return {
        type: Family.deleteFamily,
        payload: data
    }
}

export const deleteFamilyError = (data: any) => {
    return {
        type: Family.deleteFamilyError,
        payload: data
    }
}


export const updateFamilySuccess = (data: any) => {
    return {
        type: Family.updateFamilySuccess,
        payload: data
    };
}

export const updateFamily = (data: any) => {
    return {
        type: Family.updateFamily,
        payload: data
    }
}

export const updateFamilyError = (data: any) => {
    return {
        type: Family.updateFamilyError,
        payload: data
    }
}
