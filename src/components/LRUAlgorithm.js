import React, { useState, useEffect } from 'react';
import '../App.css';

function LRUAlgorithm(props) {
  const capacity = parseInt(props.frames);
  const pages = props.stream.split(',').map(Number);

  // Function to find page faults using indexes
  const findPageFaults = (pages, capacity) => {
    let s = new Set();
    let indexes = new Map();
    let pageFaults = 0;
    const framesStateArray = []; // Array to store frames' state at each step

    for (let i = 0; i < pages.length; i++) {
      let currentFrames = Array.from(s); // Get current state of frames

      if (s.size < capacity) {
        if (!s.has(pages[i])) {
          s.add(pages[i]);
          pageFaults++;
        }
        indexes.set(pages[i], i);
      } else {
        if (!s.has(pages[i])) {
          let lru = Number.MAX_VALUE, val = -1;

          for (const item of s) {
            if (indexes.get(item) < lru) {
              lru = indexes.get(item);
              val = item;
            }
          }

          s.delete(val);
          s.add(pages[i]);
          indexes.delete(val);
          pageFaults++;
        }
        indexes.set(pages[i], i);
      }

      // Ensure the current frames array is filled to the full capacity
      currentFrames = Array.from(s);
      while (currentFrames.length < capacity) {
        currentFrames.push(null); // Fill empty frames with `null` for displaying dashes
      }

      framesStateArray.push(currentFrames);
    }

    return { pageFaults, framesStateArray };
  };

  // State variables to track the page fault count and frames' state array
  const [pageFault, setPageFault] = useState(0);
  const [framesStateArray, setFramesStateArray] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (validateInput(capacity, pages)) {
      const { pageFaults, framesStateArray } = findPageFaults(pages, capacity);
      setPageFault(pageFaults);
      setFramesStateArray(framesStateArray);
      setError(null); // Clear any previous error
    } else {
      setError("Invalid input. Please ensure there is at least 1 frame and the input stream is correct.");
      setPageFault(0); // Reset page fault count
      setFramesStateArray([]); // Clear frames state array
    }
  }, [capacity, pages]);

  const validateInput = (capacity, pages) => {
    // Ensure capacity is a positive number and that pages are valid numbers
    return capacity > 0 && pages.every(page => !isNaN(page));
  };

  return (
    <div className='container1 mt-4'>
      <h1 className='mb-4 text-center text-danger'>LRU Algorithm Simulation</h1>
      {error ? (
        <div className='alert alert-danger text-center' role='alert'>
          {error}
        </div>
      ) : (
        <>
          <div className='alert alert-info text-center'>
            <h4 className='res'>Number of Page Faults: <span className='badge bg-warning text-dark'>{pageFault}</span></h4>
          </div>
          <table className='table table-hover table-bordered mt-4'>
            <thead className='table-dark'>
              <tr>
                <th scope='col'>Incoming</th>
                {Array.from({ length: capacity }, (_, index) => (
                  <th key={index} scope='col'>Frame {index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {framesStateArray.map((frames, step) => (
                <tr key={step} className={frames.includes(pages[step]) ? 'table-success' : 'table-danger'}>
                  <td>{pages[step]}</td>
                  {frames.map((value, index) => (
                    <td key={index} className='text-center'>{value !== null ? value : <span style={{ color: '#6c757d' }}>-</span>}</td>
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

export default LRUAlgorithm;
