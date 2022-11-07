import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import loggerMiddleware from './lib/loggerMiddleware';

/* redux에서 Provider 가져오기 */
import { Provider } from 'react-redux';

/* store?? createStore 추가, Redux Toolkit에서도 어차피 제공한다. */
/* applyMiddleware를 불러와주기 */
import { applyMiddleware, createStore } from 'redux';

import counter from './modules/counter';
import rootReducer, { rootSaga } from './modules';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

/* saga는 미들웨어를 생성해서 연결해줘야 한다. */
import createSagaMiddleware from 'redux-saga';

/* saga 미들웨어 생성 */
const sagaMiddleware = createSagaMiddleware();

/* store 안에는 내가 만들었던 모듈, 혹은 컴포넌트를 넣어줄 수 있다.
counter Reducer, state, action이 들어갈 것이다. */
/* const store = createStore(counter); */

/* Reducer를 뭉친다면..? */
/* const store = createStore(rootReducer, applyMiddleware(logger, thunk)); */

/* 미들 웨어 추가 후 실행 */
const store = createStore(rootReducer, applyMiddleware(logger, thunk, sagaMiddleware));
sagaMiddleware.run(rootSaga);

/* 실행할 앱을 감싸주기 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
