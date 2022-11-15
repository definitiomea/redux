/* reducer 값 가져오기 */

import './App.css';
import CounterBox from './Components/CounterBox';
import NewsSagaBox from './Components/NewsSagaBox';
/* import Memo from './Components/Memo'; */
/* import News from './Components/News'; */

function App() {
  /* const [num, setNum] = useState(0);
  
  const increase = () => {
    setNum(num + 1);
  }
  */

  return (
    <div className="App">
      <CounterBox></CounterBox>
      <NewsSagaBox></NewsSagaBox>
      {/* <Memo></Memo> */}
      {/* <News></News> */}

      {/* <h1>{num}</h1>
      <button onClick={increase()}></button> */}
    </div>
  );
}

export default App;
