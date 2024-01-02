//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//CODE PRODUCED BY SAIHEJ SINGH//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import { arraysAreEqual } from "./main"
import { swap } from "./main"
import { sleep } from "./main"
import { makeGreen } from "./main"

const animateInsertionSort = async (tempArray, setArr) => {

    //if already sorted
    if (await makeGreen(tempArray, setArr, 200)) {
        return; 
    }

    const length = tempArray.length-1
    for (let i = 1; i<=length; i++) {

        if (tempArray[i].value < tempArray[i-1].value) {

            let j=i;
            let k=i-1;

            while (k>=0 && tempArray[j].value<tempArray[k].value) {
                
                //highlight bars being swapped in red
                setArr(
                    tempArray.map((block, idx) => ({
                        ...block,
                        highlight: idx === j || idx === k,
                        finished: false
                    }))
                )
                await sleep(40)
                
                
                swap(tempArray, k, j)
                
                j--;
                k--;
            }

            //highlight the last position of each swapping sequence in green
            setArr(
                tempArray.map((block, idx) => ({
                    ...block,
                    highlight: false,
                    finished: idx === k
                }))
            )
            await sleep(200)
        }

        else {
            //highlight the ith element green if it doesn't need to be swapped
            setArr(
                tempArray.map((block, idx) => ({
                    ...block,
                    finished: idx === i
                }))
            )
            await sleep(200)
        }

        //green everything if it's sorted
        if (i==length) {
            await makeGreen(tempArray, setArr, 500)
        }
    }
} 
export { animateInsertionSort }