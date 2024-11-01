import './App.css';
import { useState } from 'react';
import FIFOAlgorithm from './components/FIFOAlgorithm';
import LRUAlgorithm from './components/LRUAlgorithm';
import OptimalAlgorithm from './components/OptimalAlgorithm';

function App() {
  // Separate states for the form inputs and evaluated states
  const [framesInput, setFramesInput] = useState(0);
  const [streamInput, setStreamInput] = useState('');
  const [algoInput, setAlgoInput] = useState('');
  const [frames, setFrames] = useState(0);
  const [stream, setStream] = useState('');
  const [algo, setAlgo] = useState('');
  const [outputVisible, setOutputVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the evaluated state only when the "Evaluate" button is clicked
    setFrames(framesInput);
    setStream(streamInput);
    setAlgo(algoInput);
    setOutputVisible(true);
  };

  return (
    <div className="App">
      <header className="text-center py-4 mb-4 bg-primary text-white">
        <h1 className='heading'>Page Replacement Algorithms</h1>
      </header>
      <div className='container'>
        <div className='form-container mx-auto p-4 shadow-lg rounded' style={{ maxWidth: '600px', backgroundColor: '#f8f9fa' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input 
                type="number" 
                className="form-control" 
                onChange={(e) => { setFramesInput(e.target.value) }} 
                placeholder="Enter number of frames" 
                required 
              />
            </div>
            <div className="mb-3">
              <input 
                type="text" 
                className="form-control" 
                onChange={(e) => { setStreamInput(e.target.value) }} 
                placeholder='Enter the input stream (e.g., 7, 0, 1, 2)' 
                required 
              />
            </div>
            <div className="mb-3">
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
            </div>
            <button type="submit" className="btn btn-primary w-100">Evaluate</button>
          </form>
        </div>
      </div>
      <div className="results-container mt-4">
      <h2 id='result' >Result</h2>
        {outputVisible && algo === "FIFO" && <FIFOAlgorithm frames={frames} stream={stream} />}
        {outputVisible && algo === "LRU" && <LRUAlgorithm frames={frames} stream={stream} />}
        {outputVisible && algo === "Optimal" && <OptimalAlgorithm frames={frames} stream={stream} />}
      </div>
    </div>
  );
}

export default App;
