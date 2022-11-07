/* 초기 state 선언, API로 값을 가져오는 경우에 데이터를 가져오는 속도가 느릴 수 있으므로
loading 값을 작성하고, news를 받아오는 공간은 null */

const initialState = {
    loading: false,
    news: null
}

/* Thunk를 통해서 값을 받아오는 액션 함수 작성 */
/* dispatch 앞에 async 붙이기, 비동기 선언 */
export const getNews = () => async (dispatch) => {
    dispatch({type:"startLoad"});
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=c4c09dd0ba45435cb60e93cd10259c2a`);
    const body = await response.json();
    if (body.status == "ok") {
        dispatch({type: "getNews", payload: body.articles});
    }
    dispatch({type:"endLoad"});
}

/* 리듀서 */
const news = (state = initialState, action) => {
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

export default news;