import {put, takeEvery} from 'redux-saga/effects'

/* 초기 값, 리듀서 작성하기 */

const initialState = {
    loading: false,
    news: null
}

/* 사가를 실행할 액션 함수 */
export const getnewsSaga = () => ({type:"newsSaga"});

/* saga를 통해 비동기 함수 작성 - 전부 제너럴 함수
saga에서 바로 비동기, (async를 붙일 수 없으므로 안이나 밖에 따로 함수 생성) */

function * getNewsSaga() {
    yield put({type:'startLoad'});
    async function getData() {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=c4c09dd0ba45435cb60e93cd10259c2a`);
        const data = response.json();
        return data;
    }
    /* 혹은 saga에서 제공해주는 call 사용, call(getData)와 같이 작성해줄 수 있다. */
    const data = yield getData();
    yield put({type:"getNews", payload: data.articles});
    yield put({type:"endLoad"})
}

/* 모든 사가를 연결하기 위한 함수 */
export function * newsSaga () {
    yield takeEvery("newsSaga", getNewsSaga);
}

/* 리듀서 */
const NewsSagaReducer = (state = initialState, action) => {
    switch(action.type) {
        /* 값이 들어왔다고 가정하고 작성 */
        case "getNews":
            return {
                ...state,
                news: action.payload,
            };
        case "startLoad":
            return {
                ...state,
                loading: true
            };
        case "endLoad":
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default NewsSagaReducer;