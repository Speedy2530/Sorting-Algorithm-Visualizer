//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//CODE PRODUCED BY SAIHEJ SINGH//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import { arraysAreEqual } from "./main"
import { swap }from "./main"
import { sleep } from "./main"
import { makeGreen } from "./main"

const animateBubbleSort = async (tempArray, setArr) => {

   //if the array is already sorted
   if (await makeGreen(tempArray, setArr, 300)) {
    return; 
   }  

    for (let end=tempArray.length-1; end>0; end--) {
        
        for (let j=0; j<end; j++) {
            if (tempArray[j].value > tempArray[j+1].value) {

                //highlight bars being swapped
                setArr(
                    tempArray.map((block, idx) => ({
                        ...block,
                        highlight: idx === j || idx === j+1 || idx === end
                    }))
                )
                await sleep(20)
                
                swap(tempArray, j, j+1)

            }
        }

        //Green everything when it's sorted
        if (end==1) {
            await makeGreen(tempArray, setArr, 500)
        }
    }
}

export { animateBubbleSort }