import { createStore } from 'redux';

export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_FINISH = 'LOAD_FINISH';
export const LOAD_ERROR = 'LOAD_ERROR';
export const SEARCH = 'SEARCH';

const initialState  = {
    data: [],
    baseData: [],
    loading: true
};

const tableReducer = (state = initialState , action) => {
    switch( action.type ){
        case "LOAD_DATA" :
            return {
                ...state,
                loading: true
            }
        case "LOAD_FINISH" :
            return {
                ...state,
                data: action.payload.data,
                baseData: action.payload.data,
                loading: false
            }
        case 'LOAD_ERROR':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case "SEARCH" :
            const filtered = state.baseData.filter((obj) => obj.product.toLowerCase().includes(action.query.toLowerCase()) || obj.origin.toLowerCase().includes(action.query.toLowerCase()))
            return {
                ...state,
                data: filtered
            }
        default :
            return state

    }
}

export default createStore(tableReducer)