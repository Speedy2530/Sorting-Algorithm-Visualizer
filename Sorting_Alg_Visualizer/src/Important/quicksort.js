//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//CODE PRODUCED BY SAIHEJ SINGH//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import { arraysAreEqual } from "./main"
import { swap } from "./main"
import { sleep } from "./main"
import { makeGreen } from "./main"

const animateQuickSort = async (tempArray, start, end, setArr) => {
    
    //if sorted
    if (await makeGreen(tempArray, setArr, 200)) {
      return; // Exit the function if sorting is complete
    }


    if (start >= end) {
      return;
    }

    let pivotIndex = await partition(tempArray, start, end, setArr);

    //LEFT animate
    await animateQuickSort(tempArray, start, pivotIndex - 1, setArr);
    setArr(tempArray);

    // Clear highlights 
    setArr((prevArr) =>
        prevArr.map((block) => ({ ...block, highlight: false }))
    );

    //RIGHT animate
    await animateQuickSort(tempArray, pivotIndex + 1, end, setArr);
    setArr(tempArray);

    // Clear highlights 
    setArr(() =>
        tempArray.map((block) => ({ ...block, highlight: false }))
    );
};

  
const partition = async (tempArray, start, end, setArr) => {
    let pivotVal = tempArray[end].value;
    let pivotIndex = start;
  
    for (let i = start; i < end; i++) {
      if (tempArray[i].value < pivotVal) {

        swap(tempArray, i, pivotIndex);

        //highlight the current important bars
        setArr(
            tempArray.map((block, idx) => ({
            ...block,
            highlight: idx === pivotIndex || idx === i || idx === end,
            }))
        );
        await sleep(50);

        pivotIndex++;
      }
    }
    swap(tempArray, pivotIndex, end);

  
    // Update the state with the current array
    setArr(tempArray);

    return pivotIndex;
  };
  
export { animateQuickSort };
  