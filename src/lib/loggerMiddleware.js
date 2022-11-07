/* store: 리덕스에서 가져온 store(state와 dispatch를 가짐)
next: dispatch를 수정해서 넘겨준다.
action: dispatch에서의 액션 */

const loggerMiddleware = (store) => (next) => (action) => {
    /* action의 상태를 남겨주는 역할 */
    console.group(action && action.type);
    console.log("이전 상태", store.getState());
    console.log("액션", action);
    
    /* next()를 통해서 액션을 실행해야지만 dispatch가 된다. */
    next(action);
    console.log("다음상태", store.getState());
    console.groupEnd();
}

export default loggerMiddleware;

/* 구조 뜯어보기 */

/* 익명함수로 생성된다 가정 */
/* const loggerMiddlewareFunc = function (store) {
    return function(next) {
        return function(action) {

        }
    }
} */