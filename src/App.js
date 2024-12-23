import { useState } from 'react';
import './App.css';

function App() {

  const [isRunning, setIsRunning] = useState(false);
  const [currentBox, setCurrentBox] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [inputTimeValue, setInputTimeValue] = useState(5);
  const [intervalId, setIntervalId] = useState(null);
  const [recordTime, setRecordTime] = useState([]);

  const onInputTimeChange = (e) => {
    setInputTimeValue(e.target.value);
  }

  const gridsize = 4;

  const generateGrid = () => {
    let gridArr = [];
    for (let i = 0; i < gridsize * gridsize; i++) {
      gridArr.push(i);
    }
    return gridArr;
  }

  const getRandomBox = () => {
    const totalBoxes = gridsize * gridsize;
    let randomBoxes = Math.floor(Math.random() * totalBoxes);
    if (currentBox === randomBoxes) {
      randomBoxes = 0;
    }
    else {
      randomBoxes = randomBoxes + 1;
    }
    return randomBoxes;
  }

  const onChangeOfBox = () => {
    setCurrentBox(getRandomBox());
    setStartTime(Date.now());
  }

  const onStartGame = () => {
    setIsRunning(true);
    onChangeOfBox();

    const id = setInterval(() => {
      onChangeOfBox();
    }, inputTimeValue * 1000)

    setIntervalId(id);
  }
  
  const onPauseGame = () => {
    setIsRunning(false);
    clearInterval(intervalId);
    setInterval(null);
  }
  const onResumeGame = () => {
    onPauseGame();
    setCurrentBox(null);
    setRecordTime([]);
  }

  const handleBoxClick = (index) => {
    if (index === currentBox) {
      const newTimeTaken = ((Date.now() - startTime) / 1000);
      setRecordTime(() => [
        ...recordTime, { timetaken: newTimeTaken }
      ]);
      onChangeOfBox();
    }
  }

  return (
    <div className="App">
      <div className='Buttons'>
        <input className='inputTime' type='number' onChange={onInputTimeChange} value={inputTimeValue} />
        <button onClick={onStartGame} disabled={isRunning}>Start</button>
        <button onClick={onPauseGame} >Pause</button>
        <button onClick={onResumeGame}>Reset</button>
      </div>
      <div className='grid'>
        {
          generateGrid().map((boxIndex) => {
            return(
              <div
                key={boxIndex}
                onClick={() => handleBoxClick(boxIndex)}
                className={`grid-box ${boxIndex === currentBox ? 'red-box' : ''}`}
              ></div>
            )
})
        }
      </div>
      <div className='table'>
        <h3>Records</h3>
        <div>
          {recordTime.map((record, index) => (
            <div key={index}>
              <div>Box {index + 1} clicked in {record.timetaken} secs</div>
            </div>
          )

          )}
        </div>
      </div>
    </div>
  );
}

export default App;