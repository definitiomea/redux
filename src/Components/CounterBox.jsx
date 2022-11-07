/* state를 받고 처리해서 반환하는 컴포넌트 */

import { useDispatch, useSelector } from "react-redux";
import { change, decreaseAsync, decreaseSagaAsync, increase, increaseAsync, increaseSagaAsync } from "../modules/counter";

const CounterBox = () => {
    /* useSelector를 통해서 state의 원하는 값을 가져올 수 있다 */

    /* 중괄호 없이 작성하고 리턴 */
    const number = useSelector((state) => (state.counter.number));
    const changeNum = useSelector((state) => (state.counter.changeNum));
    const dispatch = useDispatch();

    /* useMemo, useCallback을 통해 dispatch 횟수를 줄여보기, 두번째 인수에 조건 적기

    const onChange = useCallback((e) => {
        dispatch(change(e))
    },[dispatch]);
    */

    return (
        <>
            <h1>카운트입니다</h1>
            <h3>{number}</h3>

            {/* 툴킷 없이 직접 전달해보기, dispatch를 통해 객체를 전달해준다.
            모듈의 Reducer 함수로 가서 같은 타입을 찾고 실행해준다. */}

            {/* 객체 값을 집적 입력할 경우 오타 및 실수가 있을 수 있어 값을 변경하지 않고
            사용하기 위해 counter에서 가져와서 사용할 수도 있다. */}
            <button onClick={() => {dispatch(increase())}}>증가</button>
            <button onClick={() => {dispatch({type: "decrease"})}}>감소</button>
            <button onClick={() => {dispatch({type: "double"})}}>*2</button>
            <button onClick={() => {dispatch({type: "divdouble"})}}>/2</button>
            <button onClick={() => {dispatch({type: "test1"})}}>제곱....?</button>
            <button onClick={() => {dispatch({type: "test2"})}}>자기 자신 나누기</button>

            <button onClick={() => {dispatch(increaseAsync())}}>비동기로 1을 증가시키고 싶을 때</button>
            <button onClick={() => {dispatch(decreaseAsync())}}>비동기로 1을 감소시키고 싶을 때</button>

            <button onClick={() => {dispatch(increaseSagaAsync())}}>Saga + 1</button>
            <button onClick={() => {dispatch(decreaseSagaAsync())}}>Saga - 1</button>
            
            <p>{changeNum}</p>
            {/* changeNum 값을 가져오고 바꿀 input */}
            <input type="text" onChange={(e) => {
                dispatch({type: "change", payload: e.target.value})
            }}></input>

            {/* changeNum 값을 가져오고 바꿀 input */}
            <input type="text" onChange={(e) => {
                dispatch(change(e.target.value))
            }}></input>

            {/* 익명함수 화살표로 작성시 렌더될 때마다 함수를 다시 생성
            <input type="text" onChange={ onChange }></input>
            */}
        </>
    );
}

export default CounterBox;