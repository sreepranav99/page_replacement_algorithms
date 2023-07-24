import React, { useState, useEffect } from 'react';

function LRUAlgorithm(props) {
  const frames = parseInt(props.frames);
  const inputStream = props.stream.split(',').map(Number);

  // State variables to track the frames and the page fault count
  const [queue, setQueue] = useState([]);
  const [pageFault, setPageFault] = useState(0);

  useEffect(() => {
    // Function to check if a page exists in the frames (queue)
    const checkHit = (page) => {
      return queue.includes(page);
    };

    // Function to handle the LRU replacement
    const handleLRU = (page) => {
      // If the queue (frames) is not full, just add the page
      if (queue.length < frames) {
        setQueue([...queue, page]);
      } else {
        // If the queue is full, remove the least recently used page (first element)
        // and add the new page at the end (most recently used)
        const updatedQueue = [...queue];
        updatedQueue.shift();
        updatedQueue.push(page);
        setQueue(updatedQueue);
      }
      setPageFault((prevPageFault) => prevPageFault + 1);
    };

    // Process each incoming page
    for (let i = 0; i < inputStream.length; i++) {
      if (checkHit(inputStream[i])) {
        // Page hit, update the queue to reflect the recent access
        const updatedQueue = [...queue];
        const index = updatedQueue.indexOf(inputStream[i]);
        updatedQueue.splice(index, 1); // Remove the accessed page
        updatedQueue.push(inputStream[i]); // Add it to the end (most recently used)
        setQueue(updatedQueue);
      } else {
        // Page fault, handle LRU replacement
        handleLRU(inputStream[i]);
      }
    }
  }, [queue, inputStream, frames]);

  return (
    <div>
      <h1>LRUAlgorithm</h1>
      <h4>The No of page faults for the given input is {pageFault}</h4>
    </div>
  );
}

export default LRUAlgorithm;
