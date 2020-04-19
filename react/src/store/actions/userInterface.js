import * as actionTypes from './actionTypes';

export const addModal = (id) => {
    return {
        type: actionTypes.ADD_MODAL,
        visibility: false,
        id: id
    }
}

export const deleteModal = (id) => {
    return {
        type: actionTypes.DELETE_MODAL,
        id: id
    }
}

export const showModal = (id) => {
    return {
        type: actionTypes.UPDATE_VISIBILITY,
        visibility: true,
        id: id
    }
}

export const hideModal = (id) => {
    return {
        type: actionTypes.UPDATE_VISIBILITY,
        visibility: false,
        id: id
    }
}
