/* Redux-saga 작성해보기
리덕스 사가를 이용한 비동기 액션함수 사용하기
리덕스 사가는 자바스크립트의 제너레이터 함수를 사용한다.

function * "만들 함수 이름" () {

}
으로 작성하고

next(), yield를 이용하여 필요한 부분만 부분 실행할 수 있다.
*/

/* saga를 사용할 때 put, delay 등 세부적으로 나뉜 메서드를 들고 와줄 수 있다. */
import { put, delay, takeEvery, takeLatest } from 'redux-saga/effects'

function * increaseSaga(action) {
    console.log(action);

    /* 1초 기다리기 */
    yield delay(1000);
    /* 액션을 실행하기(dispatch) */
    yield put({type:"increase"});
    /* yield put(increase()); */
}

function * decreaseSaga() {
    yield delay(2000);
    yield put({type:"decrease"});
}

/* 어딘가 할당한 후 next()를 통해 작성한다. */
export function * counterSaga() {
    /* takeEvery 메서드는 모든 "increase"를 처리해준다. */
    yield takeEvery("increaseAsync", increaseSaga);
    yield takeLatest("decreaseAsync", decreaseSaga);
}

/* 리덕스 사가를 실행하기 위한 액션함수 */
export const increaseSagaAsync = () => ({type: "increaseAsync", payload: 10});

export const decreaseSagaAsync = () => ({type: "decreaseAsync"});


/* 값 만을 담는 모듈, js로 만들었다. useReducer의 형식과 유사하고,
초기 값과 Reducer 함수를 만든다. */

const initialState = {
    number: 0,
    /* 여러 값을 다뤄보기 */
    changeNum: 1
}

/* dispatch에 들어갈 {type: action} 객체를 지정해서 내보내기 */
export const increase = () => ({type: "increase"});
export const decrease = () => ({type: "decrease"});

/* 파라미터를 통해 값을 넘겨줄 거라고..?
dispatch 메서드가 인수를 받게 되는 거니까 OK */
export const change = (value) => ({type: "change", payload: value});

/* thunk를 사용하여 비동기로 작동할 action 함수를 만들 수 있다.
thunk의 형식을 사용했기 때문에, 바로 dispatch를 사용하는 게 아니라
나중에 dispatch를 추가해서 사용할 수 있다. */

/* 화살표 함수 안에 화살표 함수를 보내는 형태, 두번째 인수 괄호에는 dispatch가 들어간다. */
export const increaseAsync = () => (dispatch) => {
    /* dispatch를 실행하기 전에 진행할 내용을 작성한다.
    이후에는 dispatch를 통해 action을 실행한다.
    
    action은 파라미터로 들고 오지 않았기 때문에 객체로 직접 입력해주거나
    이미 만들어둔 action 함수를 사용해서 실행한다. */
    
    /* 1초 뒤에 값이 1 증가 하는 액션 함수를 만든다할 때
    미리 작성한 액션 함수를 사용해서 전달해도 된다. */
    setTimeout(() => { dispatch(increase()) }, 1000)
}

export const decreaseAsync = () => (dispatch) => {
    setTimeout(() => { dispatch( {type: "decrease"} ) }, 2000);
}

/* Reducer 함수(이름은 자유롭게)에는 state와 action 값이 파라미터로 간다. */
function counter(state = initialState, action) {
    switch(action.type) {
        case "increase":
            return {
                /* 만약 다른 값을 써보고 싶다면
                ...state, number: state.number + state.changeNum */
                ...state, number: state.number + 1
            };
        case "decrease":
            return {
                ...state, number: state.number - 1
            };
        case "double":
            return {
                ...state, number: state.number * 2
            };
        case "divdouble":
            return {
                ...state, number: state.number / 2
            };
        case "test1":
            return {
                ...state, number: state.number * state.number
            };
        case "test2":
            return {
                ...state, number: state.number / state.number
            };
        case "change":
            return {
                ...state, changeNum: action.payload
            }
        /* action의 type이 달라져버렸을 경우 */
        default:
            return state;
    }
}

export default counter;