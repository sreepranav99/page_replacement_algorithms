import React, { useEffect, useState } from 'react';
import '../App.css';

function FIFOAlgorithm(props) {
  const [pageFaults, setPageFaults] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    // This useEffect hook is for the initialization
    let val = parseInt(props.frames);
    let stream = props.stream;
    let arr = stream.split(',').map(Number);
    let frames = val;
    const frameItems = new Array(frames).fill(0);
    let frameOccupied = 0;
    let pageFaults = 0;
    const tempFramesArray = [];

    for (let i = 0; i < arr.length; i++) {
      if (search(arr[i], frameItems, frameOccupied)) {
        // Page hit, no page fault
      } else {
        if (frameOccupied < frames) {
          frameItems[frameOccupied] = arr[i];
          frameOccupied++;
        } else {
          frameItems[pageFaults % frames] = arr[i];
        }
        pageFaults++;
      }
      tempFramesArray.push([...frameItems]);
    }

    setPageFaults(pageFaults);
    setData(tempFramesArray);
  }, [props.frames, props.stream]);

  function search(key, frameItems, frameOccupied) {
    for (let i = 0; i < frameOccupied; i++) {
      if (frameItems[i] === key) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className='table-container'>
      <h1>FIFO</h1>
      <h3>Number of Page Faults for the given input is: {pageFaults}</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Incoming</th>
            {Array.from({ length: props.frames }, (_, index) => (
              <th key={index} scope="col">Frame {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data[0] &&
            data.map((frames, step) => (
              <tr key={step}>
                <td>{step < props.stream.split(',').length ? props.stream.split(',')[step] : '-'}</td>
                {frames.map((value, index) => (
                  <td key={index}>{value !== 0 ? value : '-'}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default FIFOAlgorithm;
