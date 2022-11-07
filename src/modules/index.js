/* 값을 묶어주려 하는 모듈, 작성한 리덕스 모듈을 하나로 묶는다.  */

/* combineReducers Hook 호출 */
import { combineReducers } from "redux";

import { all } from 'redux-saga/effects';

import counter, { counterSaga } from "./counter";
import memo from "./memo";
import news from "./news";
import NewsSagaReducer, { newsSaga } from "./NewsSagaReducer";

/* 작성한 리덕스 모듈은 리터럴 객체 형태로 묶어서 내보낸다. */
const rootReducer = combineReducers({counter, memo, news, NewsSagaReducer});

/* effect 모두를 지정하기 위해 all을 가져오기 */

/* 모든 사가들을 묶어서 내보낼 수 있는 rootSaga */
export function* rootSaga() {
    yield all([counterSaga(), newsSaga()]);
}

/* 상황에 따라서 필요한 state, action을 꺼내오기 위함 */
export default rootReducer;

