/* News를 받아올 컴포넌트 */

import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../modules/news';

const News = () => {
    const loading = useSelector((state) => state.news.loading);
    const news = useSelector((state) => state.news.news);
    const dispatch = useDispatch();

    /* 마운트 되자마자 값 가져오기
    useEffect(() => {
        dispatch(getNews());
    },[]) */

    return (
        <>
            <h1>뉴스를 출력할 공간입니다</h1>
            {/* loading이 false이고, news가 값이 있을 때 출력되어야 한다. */}
            {loading && <p>{loading}</p>}

            {/* loading 값을 따지고, news 객체가 있을 때 작동하도록 했으니까 문제는 없게 됐을텐데 */}
            {loading ? <p>로딩 중입니다</p> :
                /* 어차피 article은 news 속 요소들이다. 단순히 파라미터는 아니다. */
                news?.map((article) => (
                    <div><a href={article.url}>{article.title}</a></div>
                ))
            }

            {/* 강사님 작성은 이렇..나?
            {!loading && news ?
                news?.map((article) => (
                    <div>{article.title}</div>
                )) :
                <p>로딩 중입니다</p>
            } */}

            <button onClick={() => dispatch(getNews())}>Get News</button>
        </>
    );
}

export default News;