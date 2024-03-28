
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunkMiddleware from 'redux-thunk';
import Reducer from './reducers/Index';
import { applyMiddleware, createStore } from 'redux';

// // const composedEnhancer =composeWithDevTools(applyMiddleware(thunkMiddleware))

export default function configureStore(initialState) {
    return createStore(Reducer, initialState);
}


