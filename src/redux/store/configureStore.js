import { createStore, applyMiddleware ,compose} from 'redux'
import thunkMiddleware from 'redux-thunk'//redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数。
import createLogger from 'redux-logger'//日志中间件
import rootReducer from '../reducers/index.js';
export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunkMiddleware, createLogger()))
    );
  return store;
}

