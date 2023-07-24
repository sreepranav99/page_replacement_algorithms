import React, { useEffect } from 'react';

function search(key, frameItems, frameOccupied) {
  for (let i = 0; i < frameOccupied; i++) {
    if (frameItems[i] === key)
      return true;
  }
  return false;
}

function printOuterStructure(maxFrames) {
  console.log("Stream ");
  for (let i = 0; i < maxFrames; i++) {
    console.log(`Frame${i + 1} `);
  }
}

function printCurrFrames(item, frameItems, frameOccupied, maxFrames) {
  console.log(`\n${item} \t\t`);
  for (let i = 0; i < maxFrames; i++) {
    if (i < frameOccupied)
      console.log(`${frameItems[i]} \t\t`);
    else
      console.log("- \t\t");
  }
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
    if (j === refStrLen)
      return i;
  }
  return result === -1 ? 0 : result;
}

function OptimalAlgorithm(props) {
  const maxFrames = parseInt(props.frames);
  const refStr = props.stream.split(',').map(Number);
  const frameItems = new Array(maxFrames).fill(0);
  const refStrLen=refStr.length
  let hits=0;
    let frameOccupied = 0;
    printOuterStructure(maxFrames);
    for (let i = 0; i < refStrLen; i++) {
      if (search(refStr[i], frameItems, frameOccupied)) {
        hits++;
        printCurrFrames(refStr[i], frameItems, frameOccupied, maxFrames);
        continue;
      }
      if (frameOccupied < maxFrames) {
        frameItems[frameOccupied] = refStr[i];
        frameOccupied++;
        printCurrFrames(refStr[i], frameItems, frameOccupied, maxFrames);
      } else {
        const pos = predict(refStr, frameItems, refStrLen, i + 1, frameOccupied);
        frameItems[pos] = refStr[i];
        printCurrFrames(refStr[i], frameItems, frameOccupied, maxFrames);
      }
    }
    console.log(`\n\nHits: ${hits}`);
  

  return (
    <div>
      <h1>Optimal Algorithm</h1>
      <h4>The No of pagefaults for the given input is {refStrLen-hits}</h4>

    </div>
  );
}

export default OptimalAlgorithm;
