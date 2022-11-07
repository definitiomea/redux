import { memo, useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addmemo, deletememo } from "../modules/memo";

const Memo = () => {
    const memolist = useSelector((state) => state.memo.memolist);
    /* input 태그 2개를 만들어서 useState로 title과 text를 받아와보기, useDispatch()를 통해 메모가 추가한 새로운 리스트를 생성하기 */

    /* memolist가 존재하는 지를 따지면 에러가 날 필요 없어진다. */
    const [title, setTitle] = useState(memolist[0]?.title);
    const [text, setText] = useState(memolist[0]?.text);

    /* dispatch와 callback 활용 */
    const dispatch = useDispatch();

    const addMemo = useCallback(() => {
        dispatch(addmemo({title: title, text: text}));
        /* 두번째 인수를 고정했기 때문에..??
        파라미터가 없으면 dispatch가 고정되어 버릴 수도 있다고....
        
        : 파라미터로 받아오는 값은 고정되지 않고, 파라미터 외의 값은 전부 고정 */
    }, [dispatch, title, text]);

    const deleteMemo = useCallback((id) => {
        dispatch(deletememo(id))
    },[dispatch])

    return (
        <div>
            <hr></hr>
            {/* state가 존재하는지 따지기 */}
            <input type="text" name="" id="" placeholder={title && title} onChange={(e) => setTitle(e.target.value)}></input>
            <input type="text" name="" id="" placeholder={text && text} onChange={(e) => setText(e.target.value)}></input>
            <button onClick={() => {addMemo()}}>Add</button>

            {/* 요소가 있는 만큼 반복해주기
            이쪽도 memolist와 요소가 있는지 따지기 */}
            {memolist ? (memolist.map((memo) => (
                <div>
                    <h3>{memo.id}</h3>
                    <h3>{memo.title}</h3>
                    <h3>{memo.text}</h3>
                    <button onClick={() => {deleteMemo(memo.id)}}>del</button>
                </div>))) : ""
            }
        </div>
    );
}

export default Memo;