import {
    REQUEST_ACCOUNTS,
    RECEIVE_ACCOUNTS,
    REQUEST_BLOCK_NUMBER,
    RECEIVE_BLOCK_NUMBER,
    REQUEST_NETWORK,
    RECEIVE_NETWORK,
    SELECT_ACCOUNT
} from '../actions/userActions';


const initialState = {
    isFetching: false,
    accounts: [],
    coinbase: "",
    selectedAccount: 0,
    currentBlock: 0,
    network: "",
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_ACCOUNTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_ACCOUNTS:
            return Object.assign({}, state, {
                isFetching: false,
                accounts: action.accounts,
                coinbase: action.accounts[0]
            });
        case REQUEST_BLOCK_NUMBER: 
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_BLOCK_NUMBER:
            return Object.assign({}, state, {
                isFetching: false,
                currentBlock: action.currentBlock
            });
        case REQUEST_NETWORK:
            return Object.assign({}, state, {
                isFetching: true 
            });
        case RECEIVE_NETWORK:
            return Object.assign({}, state, {
                isFetching: false,
                network: action.network
            });
        case SELECT_ACCOUNT:
            return Object.assign({}, state, {
                selectedAccount: action.index
            });
        default:
            return state;
    }
}