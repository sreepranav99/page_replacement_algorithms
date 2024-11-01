import React, { useEffect, useState } from 'react';
import '../App.css';

function FIFOAlgorithm(props) {
  const [pageFaults, setPageFaults] = useState(0);
  const [data, setData] = useState([]);
  const [size, setSize] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (validateInput(props.frames, props.stream)) {
      calculatePageFaults();
      setError(null);
    } else {
      setError('Invalid input. Please check your frames or stream input.');
    }
  }, [props.frames, props.stream]);

  const validateInput = (frames, stream) => {
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
    setSize(stream.length);
  };

  const search = (key, frameItems, frameOccupied) => {
    for (let i = 0; i < frameOccupied; i++) {
      if (frameItems[i] === key) {
        return true;
      }
    }
    return false;
  };

  const calculateAdditionalPageFaults = (frameSize) => {
    let stream = props.stream.split(',').map(Number);
    const frameItems = new Array(frameSize).fill(null);
    let frameOccupied = 0;
    let pageFaults = 0;

    for (let i = 0; i < stream.length; i++) {
      if (!search(stream[i], frameItems, frameOccupied)) {
        if (frameOccupied < frameSize) {
          frameItems[frameOccupied] = stream[i];
          frameOccupied++;
        } else {
          frameItems[pageFaults % frameSize] = stream[i];
        }
        pageFaults++;
      }
    }

    return pageFaults;
  };

  const p1 = calculateAdditionalPageFaults(parseInt(props.frames));
  const p2 = calculateAdditionalPageFaults(parseInt(props.frames) + 1);

  return (
    <div className='container mt-4'>
      <h1 className='mb-4 text-center text-primary'>FIFO Algorithm Simulation</h1>
      {error ? (
        <div className='alert alert-danger text-center' role='alert'>
          {error}
        </div>
      ) : (
        <>
          <div className='alert alert-info text-center'>
            <h4>Number of Page Faults: <span className='badge bg-warning text-dark'>{pageFaults}</span></h4>
          </div>
          <table className='table table-hover table-bordered mt-4'>
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
                    <td key={index} className='text-center'>{value !== null ? value : '-'}</td>
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
