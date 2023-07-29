import React, { useEffect, useState } from 'react';
import '../App.css';

function FIFOAlgorithm(props) {
  const [pageFaults, setPageFaults] = useState(0);
  const [data, setData] = useState([]);
  const [size,setSize]=useState(0)
  // let val = parseInt(props.frames);
  console.log(size);
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
    setSize(stream.split(',').map(Number).length)
  }, [props.frames, props.stream]);

  function search(key, frameItems, frameOccupied) {
    for (let i = 0; i < frameOccupied; i++) {
      if (frameItems[i] === key) {
        return true;
      }
    }
    return false;
  }


  let calpagefaults = (rame)=>{
    let stream = props.stream;
    let arr1 = stream.split(',').map(Number);
    let frame = rame;
    const frameItem = new Array(frame).fill(0);
    let frameOccu = 0;
    let pageFault = 0;

    for (let i = 0; i < arr1.length; i++) {
      if (search(arr1[i], frameItem, frameOccu)) {
        // Page hit, no page fault
      } else {
        if (frameOccu < frame) {
          frameItem[frameOccu] = arr1[i];
          frameOccu++;
        } else {
          frameItem[pageFault % frame] = arr1[i];
        }
        pageFault++;
      }
    }

    return pageFault;
  }
  
  let p2=calpagefaults(parseInt(props.frames)+1);
  let p1=calpagefaults(parseInt(props.frames));
  console.log(p1,p2);

  return (
    <div className='table-container'>
      <h1>FIFO Algorithm</h1>
      <h3>Number of Page Faults for the given input is: {pageFaults}</h3>
      {p1<p2 && <h3 className='text-danger'>The given series causes an Belody's Anomaly</h3>}
      {pageFaults===size && <h3 className='text-danger'>For the above input the FIFO Algorithm fails.Therefore there is a need of a better algorithm</h3>}
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
