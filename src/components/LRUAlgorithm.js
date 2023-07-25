import React, { useState, useEffect } from 'react';
import '../App.css'
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
      if (s.size < capacity) {
        if (!s.has(pages[i])) {
          s = new Set(s).add(pages[i]);
          pageFaults++;
        }
        indexes = new Map(indexes).set(pages[i], i);
      } else {
        if (!s.has(pages[i])) {
          let lru = Number.MAX_VALUE,
            val = Number.MIN_VALUE;

          for (const itr of s.values()) {
            const temp = itr;
            if (indexes.get(temp) < lru) {
              lru = indexes.get(temp);
              val = temp;
            }
          }

          s = new Set(s);
          s.delete(val);
          s.add(pages[i]);
          indexes = new Map(indexes);
          indexes.delete(val);

          pageFaults++;
        }
        indexes = new Map(indexes).set(pages[i], i);
      }

      // Store the frames' state at each step in the array
      framesStateArray.push([...s]);
    }

    return { pageFaults, framesStateArray };
  };

  // State variables to track the page fault count and frames' state array
  const [pageFault, setPageFault] = useState(0);
  const [framesStateArray, setFramesStateArray] = useState([]);

  useEffect(() => {
    const { pageFaults, framesStateArray } = findPageFaults(pages, capacity);
    setPageFault(pageFaults);
    setFramesStateArray(framesStateArray);
  }, [capacity, pages]);

  return (
    <div className='table-container'>
      <h1>LRU Algorithm</h1>
      <h4>The No of page faults for the given input is {pageFault}</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Incoming</th>
            {Array.from({ length: capacity }, (_, index) => (
              <th key={index} scope="col">Frame {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {framesStateArray?.map((frames, step) => (
            <tr key={step}>
              <td>{pages[step]}</td>
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

export default LRUAlgorithm;
