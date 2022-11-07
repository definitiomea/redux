/* reducer 값 가져오기 */

import './App.css';
import CounterBox from './Components/CounterBox';
import NewsSagaBox from './Components/NewsSagaBox';
/* import Memo from './Components/Memo'; */
/* import News from './Components/News'; */

function App() {
  return (
    <div className="App">
      <CounterBox></CounterBox>
      <NewsSagaBox></NewsSagaBox>
      {/* <Memo></Memo> */}
      {/* <News></News> */}
    </div>
  );
}

export default App;
