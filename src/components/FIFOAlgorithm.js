import React,{useEffect,useState} from 'react'

function FIFOAlgorithm(props) {
  
  let val=parseInt(props.frames);
  let stream=props.stream;
  let arr=stream.split(',');
  for(let i=0;i<arr.length;i++){
    arr[i]=parseInt(arr[i]);
  }
  const [pageFaults,setpageFaults]=useState()
  const [data, setData] = useState([]);
  console.log(data)
  useEffect(() => {
    // console.log(1);
    const incomingStream = arr;
    const frames = val;
    let m, n, s;
    let pages = incomingStream.length;
    console.log("Incoming\tFrame 1\tFrame 2\tFrame 3");
    const temp = new Array(frames).fill(-1);
    let pageFaults=0;
    const tempFramesArray = []; 
    for (m = 0; m < pages; m++) {
      s = 0;
      for (n = 0; n < frames; n++) {
        if (incomingStream[m] === temp[n]) {
          s++;
          pageFaults--;
        }
      }
      pageFaults++;
      if (pageFaults <= frames && s === 0) {
        temp[m] = incomingStream[m];
      } else if (s === 0) {
        temp[(pageFaults - 1) % frames] = incomingStream[m];
      }

      console.log(temp)
      tempFramesArray.push([...temp]); 
  }
  setpageFaults(pageFaults)
  setData(prevData => [...prevData, ...tempFramesArray]);
},[])

// useEffect(() => {
//     FIFO();
// },[]);
  return (
    <div>
        <h1>FIFO</h1>
        <h3>Number of PageDefaults foe the given input is:{pageFaults}</h3>
 <table className="table">
  <thead>
    <tr>
      <th scope="col">Incoming</th>
      {Array.from({ length: val }, (_, index) => (
              <th key={index} scope="col">Frame {index + 1}</th>
      ))}
     
    </tr>
  </thead>
  <tbody>
  {data?.map((row, rowIndex) => {
          return(
            <tr key={rowIndex}>
              <td></td>
              {row.map((value, colIndex) => (
                <td key={colIndex}>{value !== -1 ? value : '-'}</td>
              ))}
            </tr>
          );
})}
  </tbody>
</table>

    </div>
  )
}

export default FIFOAlgorithm