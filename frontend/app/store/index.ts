import { createStore, Store, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk'
import { MainReducer } from "../reducers/MainReducer";
import { IState } from "../utils/Interface";


const store: Store<IState> = createStore(MainReducer, applyMiddleware(ReduxThunk))

export default store;