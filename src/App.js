import './App.css';
import { useState } from 'react';
import FIFOAlgorithm from './components/FIFOAlgorithm';
import LRUAlgorithm from './components/LRUAlgorithm';
import OptimalAlgorithm from './components/OptimalAlgorithm';

function App() {
  const [frames, setFrames] = useState(0);
  const [stream, setStream] = useState('');
  const [algo, setAlgo] = useState('');
  const [outputVisible, setOutputVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOutputVisible(true);
  };

  
  return (
    <div className="App">
      <h1 className='heading'>Page Replacement Algorithms</h1>
      <div className='form-container' style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="number" className="form-control" onChange={(e) => { setFrames(e.target.value) }} placeholder="Enter number of frames" />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" onChange={(e) => { setStream(e.target.value) }} placeholder='Enter the input stream' />
          </div>
          <div className="mb-3">
            <select className="form-select" onChange={(e) => setAlgo(e.target.value)}>
              <option >Select Algorithm</option>
              <option value="FIFO">FIFO</option>
              <option value="LRU">LRU</option>
              <option value="Optimal">OPTIMAL</option>
            </select>
          </div>
          <button type="submit" className="btn btn-danger">Evaluate</button>
        </form>
      </div>
      
      {outputVisible && algo === "FIFO" && <FIFOAlgorithm frames={frames} stream={stream} />}
      {outputVisible && algo === "LRU" && <LRUAlgorithm frames={frames} stream={stream} />}
      {outputVisible && algo === "Optimal" && <OptimalAlgorithm frames={frames} stream={stream} />}
    </div>
  );
}

export default App;
