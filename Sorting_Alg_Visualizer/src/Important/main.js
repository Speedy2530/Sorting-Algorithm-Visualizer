//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//CODE PRODUCED BY SAIHEJ SINGH//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import React, { useState, useEffect } from "react";
import "./main.css";
import { animateQuickSort } from "./quicksort"
import { animateBubbleSort } from "./bubblesort"
import { animateInsertionSort } from "./insertionsort"

//Array generation
let blocksAmount = 60;
let blocksMax = 500;
let blocksMin = 100;

let arr = [];
  const generate = () => {
    arr = [];
    for (let i = 0; i < blocksAmount; i++) {
      arr.push({ value: randInt(blocksMin, blocksMax), highlight: false });
    }
  };

  const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };



//Main function
const Sorting = () => {

  const [array1, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  //on page load, generate random array and display blocks
  useEffect(() => {
    setIsSorted(false)
    generate();
    setArr([...arr]);
  }, []);


  //SORTING ALGORITHMS

    //Quicksort
    const quickSort = async () => {

        //for button disabling
        setIsSorting(true);

        let tempArray = [...array1];
        await animateQuickSort(tempArray, 0, tempArray.length - 1, setArr);
        setArr(tempArray);

        //for button enabling
        setIsSorting(false);
        setIsSorted(true);
      };

    //Bubble Sort
    const bubbleSort = async () => {
        setIsSorting(true);

        let tempArray = [...array1]
        await animateBubbleSort(tempArray, setArr)
        setArr(tempArray)

        setIsSorting(false);
        setIsSorted(true);
    }

    //Insertion Sort
    const insertionSort = async () => {
        setIsSorting(true);

        let tempArray = [...array1]
        await animateInsertionSort(tempArray, setArr)
        setArr(tempArray)

        setIsSorting(false);
        setIsSorted(true);
    }
    

  return (
    <div className='container'>

    <div className='header'><h1 className='htext'>Sorting Algorithm Visualizer</h1></div>

      <div className='array-blocks'>
        {array1.map((block, id) => (
          //for each block, checks the properties assigned to them (from other functions) and
          //output a corresponding block (height, colour, etc.)
          <div
            className='blocks'
            key={id}
            style={{
              height: `${block.value}px`,
              backgroundColor: block.highlight ? "red" : block.finished ? "green" : "blue",
            }}
          ></div>
        ))}
        
        <div className='buttons'>
            <button className='btn' onClick={() => {generate(); setArr([...arr]);}} 
                    disabled={isSorting} id='generate'>
            Generate!
            </button>
            <button className='btn' onClick={quickSort} disabled={isSorting}>
            quicksort
            </button>
            <button className='btn' onClick={bubbleSort} disabled={isSorting}>
            bubbleSort
            </button>
            <button className='btn' onClick={insertionSort} disabled={isSorting}>
            insertionSort
            </button>
        </div>
      </div>
    </div>
  );
};



//HELPER functions

//swaps two elements of an array (used in all algorithms)
const swap = (tempArray, a, b) => {
    let temp = tempArray[a];
    tempArray[a] = tempArray[b];
    tempArray[b] = temp;
};

//adds a delay (used for animation visualization)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//checks if two arrays are equal (used for preventing execution of algorithms on sorted arrays)
const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
    return false;
    }

    for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].value !== arr2[i].value) {
        return false;
    }
    }

    return true;
}

//makes all blocks of the array momentarily green to represent a completed sorting
const makeGreen = async (tempArray, setArr, delay) => {
    const testSorted = tempArray.slice().sort((a, b) => a.value - b.value);
    
    console.log("Original Array:", tempArray);
    console.log("Sorted Array:", testSorted);

    if (arraysAreEqual(testSorted, tempArray)) {
        console.log("Arrays are equal. Sorting is complete.");
        
        //make green
        setArr(
            tempArray.map((block, idx) => ({
                ...block,
                highlight: false,
                finished: true
            }))
        );

        //delay
        await sleep(delay);

        //revert back to original colour
        setArr(
            tempArray.map((block) => ({
                ...block,
                highlight: false,
                finished: false
            }))
        );
        return true;
    } else {
        console.log("Arrays are not equal. Sorting is not complete.");
        return false;
    }
};


export { swap }
export { sleep }
export { arraysAreEqual }
export { makeGreen }
export default Sorting 
