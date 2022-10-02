import { connect } from "react-redux"
import Problem from './components/Problem.js'
import Timer from './components/Timer.js'
import History from './components/History.js'
import './App.css';
import React, {useState, useEffect} from 'react';

const roundTime = 60000;

const maxDP = (num) => {
  return Math.round(num * 100) / 100
}

const nearAnswer = (i, answer) => {
  if (i === 0) {
      return answer;
  }
  const rand = Math.floor(Math.random() * 9);
  let randDiff = Math.floor(Math.random() * 10) - 5;
  while (randDiff === 0) {
    randDiff = Math.floor(Math.random() * 10) - 5;
  }
  if (rand >= 7) {
      return maxDP(answer - randDiff)
  }
  if (rand >= 4) {
      return maxDP(answer + randDiff)
  }
  if (rand >= 0) {
      return maxDP((answer * -1) + randDiff)
  }
}

const shuff = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
const SYMBOLS = ['+','-']
const generateSymbol = () => {
  const index = Math.floor(Math.random() * SYMBOLS.length);
  return SYMBOLS[index];
}

const generateAnswer = (l,s,r) => {
  switch(s) {
    case '*':
      return l * r;
    case '-':
      return l - r;
    case '/':
      return l / r;
    case '+':
    default:
      return l + r;
  }
}

const useProblem = () => {
  const [possibilities, setPossibilities] = useState([]);
  const [lhs, setLhs] = useState();
  const [rhs, setRhs] = useState();
  const [symbol, setSymbol] = useState();
  const [answer, setAnswer] = useState();

  const setupEverything = () => {
    let s = generateSymbol();
    let l = Math.floor(Math.random() * 50) - 25;
    let r = Math.floor(Math.random() * 50) - 25;
    
    setLhs(l)
    setRhs(r)
    setSymbol(s)

    setAnswer(generateAnswer(l,s,r))
  }

  useEffect(() => {
    setupEverything();
  }, []); 

  useEffect(() => {
    const p = Array.from({length: 4}, (v, i) => i)
    .map(i => nearAnswer(i, answer));

    shuff(p);
    setPossibilities(p);
  }, [answer])

  const next = () => {
    setupEverything();
  }

  return {possibilities, lhs, rhs, symbol, answer, next}
}

const App = ({scoreHistory, updateScoreHistory}) => {

  const { lhs, rhs, answer, symbol, possibilities, next } = useProblem(); 
  const [ score, setScore ] = useState(0)
  const [ endTime, setEndTime ] = useState(new Date(new Date().getTime() + roundTime))
  const [ isRunning, setIsRunning ] = useState(true)
  const [ uselessState, setUselessState ] = useState(false)

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsRunning(endTime >= new Date())
      setUselessState(!uselessState)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [uselessState])

  useEffect(() => {
    if (!isRunning) {
      updateScoreHistory(score)
    }
  }, [isRunning, score, updateScoreHistory])

  return (
    <div className="App">
      <header className="App-header">
        <div className={'timer'}><Timer endTime={endTime}/></div>
        <div className={'score'}>{score}</div>
        {
          isRunning &&
          <Problem lhs={lhs} symbol={symbol} rhs={rhs} answer={answer} possibilities={possibilities} chosen={(success) => {
            setScore(score + success)
            next()
          }}/>
        }
        {
          !isRunning && <button onClick={() => {
            setScore(0)
            setIsRunning(true)
            setEndTime(new Date(new Date().getTime() + roundTime))
            setUselessState(!uselessState)
          }}>Restart</button>
        }
        <div className="history"><History data={scoreHistory}/></div>
      </header>
    </div>
  );
}

const mapStateToProps = (store) => {
  return {scoreHistory: store.scoreHistory}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateScoreHistory: (score) => dispatch({type:'addToHistory', payload: score})
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(App);
