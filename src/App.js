import './App.css';
import { useState } from 'react';
import FIFOAlgorithm from './components/FIFOAlgorithm';
import LRUAlgorithm from './components/LRUAlgorithm';
import OptimalAlgorithm from './components/OptimalAlgorithm';

function App() {
  const [framesInput, setFramesInput] = useState(0);
  const [streamInput, setStreamInput] = useState('');
  const [algoInput, setAlgoInput] = useState('');
  const [frames, setFrames] = useState(0);
  const [stream, setStream] = useState('');
  const [algo, setAlgo] = useState('');
  const [outputVisible, setOutputVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFrames(framesInput);
    setStream(streamInput);
    setAlgo(algoInput);
    setOutputVisible(true);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className='heading'>Page Replacement Algorithms</h1>
      </header>
      <div className='container'>
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <input 
              type="number" 
              className="form-control" 
              onChange={(e) => { setFramesInput(e.target.value) }} 
              placeholder="Enter number of frames" 
              required 
            />
            <input 
              type="text" 
              className="form-control" 
              onChange={(e) => { setStreamInput(e.target.value) }} 
              placeholder='Enter the input stream (e.g., 7, 0, 1, 2)' 
              required 
            />
            <select 
              className="form-select" 
              onChange={(e) => setAlgoInput(e.target.value)} 
              required
            >
              <option value="">Select Algorithm</option>
              <option value="FIFO">FIFO</option>
              <option value="LRU">LRU</option>
              <option value="Optimal">OPTIMAL</option>
            </select>
            <button type="submit" className="btn btn-primary w-100">Evaluate</button>
          </form>
        </div>
      </div>
      {outputVisible && (
        <div className="results-container">
          {algo === "FIFO" && <FIFOAlgorithm frames={frames} stream={stream} />}
          {algo === "LRU" && <LRUAlgorithm frames={frames} stream={stream} />}
          {algo === "Optimal" && <OptimalAlgorithm frames={frames} stream={stream} />}
        </div>
      )}
    </div>
  );
}

export default App;
