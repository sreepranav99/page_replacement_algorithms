import React, { useState, useEffect } from 'react';
import '../App.css';

function search(key, frameItems, frameOccupied) {
  for (let i = 0; i < frameOccupied; i++) {
    if (frameItems[i] === key) return true;
  }
  return false;
}

function predict(refStr, frameItems, refStrLen, index, frameOccupied) {
  let result = -1;
  let farthest = index;
  for (let i = 0; i < frameOccupied; i++) {
    let j;
    for (j = index; j < refStrLen; j++) {
      if (frameItems[i] === refStr[j]) {
        if (j > farthest) {
          farthest = j;
          result = i;
        }
        break;
      }
    }
    if (j === refStrLen) return i;
  }
  return result === -1 ? 0 : result;
}

function OptimalAlgorithm(props) {
  const maxFrames = parseInt(props.frames, 10);
  const refStr = props.stream.split(',').map(Number);
  const refStrLen = refStr.length;
  const [framesStateArray, setFramesStateArray] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (validateInput(maxFrames, refStr)) {
      const framesSet = new Set();
      const frameItems = new Array(maxFrames).fill(-1);
      const tempFramesStateArray = [];
      let pageFaultsCount = 0;

      for (let i = 0; i < refStrLen; i++) {
        if (search(refStr[i], frameItems, maxFrames)) {
          // Page hit, no page fault
        } else {
          if (framesSet.size < maxFrames) {
            frameItems[framesSet.size] = refStr[i];
            framesSet.add(refStr[i]);
          } else {
            const pos = predict(refStr, frameItems, refStrLen, i + 1, maxFrames);
            framesSet.delete(frameItems[pos]);
            frameItems[pos] = refStr[i];
            framesSet.add(refStr[i]);
            pageFaultsCount++;
          }
        }
        tempFramesStateArray.push([...frameItems]);
      }

      // Adjust the page faults count to include the first maxFrames entries
      setPageFaults(pageFaultsCount + maxFrames);
      setFramesStateArray(tempFramesStateArray);
      setError(null); // Clear any previous error
    } else {
      setError("Invalid input. Please ensure there is at least 1 frame and the input stream is correct.");
      setPageFaults(0); // Reset page fault count
      setFramesStateArray([]); // Clear frames state array
    }
  }, [props.frames, props.stream]);

  const validateInput = (maxFrames, refStr) => {
    // Ensure maxFrames is greater than 0 and refStr contains valid numbers
    return maxFrames > 0 && refStr.every(page => !isNaN(page));
  };

  return (
    <div className='container1 mt-4'>
      <h1 className='mb-4 text-center text-danger '>Optimal Algorithm Simulation</h1>
      {error ? (
        <div className='alert alert-danger text-center' role='alert'>
          {error}
        </div>
      ) : (
        <>
          <div className='alert alert-info text-center'>
            <h4 className='res'>Number of Page Faults: <span className='badge bg-warning text-dark'>{pageFaults}</span></h4>
          </div>
          <table className='table table-hover table-bordered mt-4'>
            <thead className='table-dark'>
              <tr>
                <th scope='col'>Incoming</th>
                {Array.from({ length: maxFrames }, (_, index) => (
                  <th key={index} scope='col'>Frame {index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {framesStateArray.map((frames, step) => (
                <tr key={step} className={frames.includes(refStr[step]) ? 'table-success' : 'table-danger'}>
                  <td>{step < refStrLen ? refStr[step] : '-'}</td>
                  {frames.map((value, index) => (
                    <td key={index} className='text-center'>{value !== -1 ? value : '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default OptimalAlgorithm;
