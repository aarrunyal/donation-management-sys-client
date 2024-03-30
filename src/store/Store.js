
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import Reducer from './reducers/Index';

// // const composedEnhancer =composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = () => configureStore({ reducer: Reducer });
