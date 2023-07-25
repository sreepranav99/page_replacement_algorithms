import React, { useState, useEffect } from 'react';
import '../App.css'
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

  useEffect(() => {
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
  }, [props.frames, props.stream]);

  return (
    <div className='table-container'>
      <h1>Optimal Algorithm</h1>
      <h4>The No of page faults for the given input is {pageFaults}</h4>
      <table className="table">
      <thead>
          <tr>
            <th scope="col">Incoming</th>
            {Array.from({ length: maxFrames }, (_, index) => (
              <th key={index} scope="col">Frame {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {framesStateArray.map((frames, step) => (
            <tr key={step}>
              <td>{step < refStrLen ? refStr[step] : '-'}</td>
              {frames.map((value, index) => (
                <td key={index}>{value !== -1 ? value : '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OptimalAlgorithm;
