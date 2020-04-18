import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const addModal = (state, action) => {
    const modalArray = [...state.Modal,
    {
        id: action.id,
        visible: false

    }]
    return updateObject(state, { Modal: modalArray })
}

const deleteModal = (state, action) => {
    const modalArray = state.Modal.filter(modal => {
        const { id, visible } = modal;
        return (id !== action.id) ? true : false;
    });
    return updateObject(state, { Modal: modalArray })
}

const updateVisibility = (state, action) => {
    const modalArray = state.Modal.map(Modal => {
        const { id, visible } = Modal;
        if (id === action.id && visible !== action.visibility) {
            return {
                id: action.id,
                visible: action.visibility
            }
        } else {
            return Modal;
        }
    })
    return updateObject(state, { Modal: modalArray })
}

const handlers = {
    [actionTypes.ADD_MODAL]: addModal,
    [actionTypes.DELETE_MODAL]: deleteModal,
    [actionTypes.UPDATE_VISIBILITY]: updateVisibility,
}

const reducer = (state = { Modal: [], Notification: [] }, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state

export default reducer;
