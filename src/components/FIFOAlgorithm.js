import React, { useEffect, useState } from 'react';
import '../App.css';

function FIFOAlgorithm(props) {
  const [pageFaults, setPageFaults] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (validateInput(props.frames, props.stream)) {
      calculatePageFaults();
      setError(null);
    } else {
      setError('Invalid input. Please ensure there is at least 1 frame and the input stream is correct.');
    }
  }, [props.frames, props.stream]);

  const validateInput = (frames, stream) => {
    // Check if frames is a number, greater than 0, and if the stream input is valid
    return (
      !isNaN(frames) &&
      frames > 0 &&
      stream.split(',').every(num => !isNaN(Number(num.trim())) && num.trim() !== '')
    );
  };

  const calculatePageFaults = () => {
    let frames = parseInt(props.frames);
    let stream = props.stream.split(',').map(Number);
    const frameItems = new Array(frames).fill(null);
    let frameOccupied = 0;
    let pageFaults = 0;
    const tempFramesArray = [];

    for (let i = 0; i < stream.length; i++) {
      if (!search(stream[i], frameItems, frameOccupied)) {
        if (frameOccupied < frames) {
          frameItems[frameOccupied] = stream[i];
          frameOccupied++;
        } else {
          frameItems[pageFaults % frames] = stream[i];
        }
        pageFaults++;
      }
      tempFramesArray.push([...frameItems]);
    }

    setPageFaults(pageFaults);
    setData(tempFramesArray);
  };

  const search = (key, frameItems, frameOccupied) => {
    for (let i = 0; i < frameOccupied; i++) {
      if (frameItems[i] === key) return true;
    }
    return false;
  };

  return (
    <div className='container1 mt-4'>
      <h1 className='mb-4 text-danger text-center'>FIFO Algorithm Simulation</h1>
      {error ? (
        <div className='alert alert-danger text-center' role='alert'>
          {error}
        </div>
      ) : (
        <>
          <div className='alert alert-info text-center'>
            <h4 className='res' >Number of Page Faults: <span className='badge bg-warning'>{pageFaults}</span></h4>
          </div>
          <table className='table table-hover table-bordered'>
            <thead className='table-dark'>
              <tr>
                <th scope='col'>Incoming</th>
                {Array.from({ length: props.frames }, (_, index) => (
                  <th key={index} scope='col'>Frame {index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((frames, step) => (
                <tr key={step} className={frames.includes(parseInt(props.stream.split(',')[step])) ? 'table-success' : 'table-danger'}>
                  <td>{props.stream.split(',')[step]}</td>
                  {frames.map((value, index) => (
                    <td key={index} className='text-center'>{value !== null ? value : ''}</td>
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

export default FIFOAlgorithm;
