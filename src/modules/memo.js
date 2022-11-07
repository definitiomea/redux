/* 메모 배열 저장, 초기 값, 리듀서 값 작성 */

const initialState = {
    memolist: [
        {
            id: 1,
            title: "제목",
            text: "내용"
        }
    ],
    id: 2
}

/* 액션 타입을 함수로 만들어서 내보내기
addmemo에서 받아오는 파라미터 memo는 {title: "", text: ""} 형태로 사용하려 한다. */
export const addmemo = (memo) => ({type: "write", payload: memo});

/* deletememo에서 받아오는 파라미터는 반환되는 숫자를 사용하려 함 */
export const deletememo = (id) => ({type: "delete", payload: id});

function memo (state = initialState, action) {
    switch(action.type) {
        case "write":
            const othermemo = {
                id: state.id,
                title: action.payload.title,
                text: action.payload.text
            }
            /* 리턴할 때 id 값을 증가시켜 볼 수 있다? */

            /* + 새로운 메모를 가지는 리스트 */
            const newMemoList = state.memolist.concat(othermemo);
            return {
                ...state, memolist: newMemoList, id: state.id + 1
            }
        case "delete":
            /* memo id를 가져와서 id 값을 가진 메모를 제외하고 새로운 메모리스트를 생성하기 */
            return {
                ...state,
                /* 현재 배열에서 filter를 사용해서 원치 않는 배열을 제외해준다....
                payload:3 (id값 하나만 들어가 있음) */

                /* 파라미터, 즉 들어가있는 요소에 주의해야 됐긴 한데..... */
                memolist : state.memolist.filter((memo) => memo.id != action.payload)
            };
        default:
            return state;
    }
}

export default memo;