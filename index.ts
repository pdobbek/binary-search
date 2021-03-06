const NUM_OF_BLOCKS = 30;
var arrContainer: HTMLElement | null = document.getElementById("array");

/**
 * Draws an array of blocks of random heights.
 */
function generateArray(): void {
    if (arrContainer != null) {
        let arr: number[] = [];

        // fill arr with random numbers
        for (let i = 0; i < NUM_OF_BLOCKS; i++) {
            // gen a value from 1 to 100 (inclusive)
            const element: number = Number(Math.ceil(Math.random() * 100 ));
            arr.push(element);
        }
        
        arr.sort((a, b) => a - b);  // sort arr

        for (let i = 0; i < NUM_OF_BLOCKS; i++) {
            let value: number = arr[i];

            // make and style div
            let block: HTMLDivElement = document.createElement("div");
            block.classList.add("block");
            block.style.height = `${value * 3}px`;
            block.style.transform = `translate(${i * 30}px)`;

            // add label to each block
            var blockLabel: HTMLLabelElement = document.createElement("label");
            blockLabel.classList.add("block_val");
            blockLabel.innerText = value.toString();

            block.appendChild(blockLabel);
            arrContainer.appendChild(block);
        }
    }   
}

/**
 * Asynchronous binary search function. 
 * Highlights the middle block as it searches.
 */
async function binarySearch(): Promise<void> {
    // block colours
    const normalColour: string = "lightgreen";
    const midColour: string = "orange";
    const xColour: string = "red";

    let blocks: NodeListOf<HTMLDivElement> = document.querySelectorAll(".block");
    let output: HTMLElement = document.getElementById("output")!;
    let x: number = Number((document.getElementById("x") as HTMLInputElement).value);

    // reset in case of repeat use
    output.innerText = "";
    blocks.forEach(block => {
        block.style.backgroundColor = normalColour;
        block.style.opacity = "1.0";
    });

    let low: number = 0;
    let high: number = NUM_OF_BLOCKS - 1;
    let mid: number;
    let isFound: boolean = false;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        blocks[mid].style.backgroundColor = midColour;
        let midValue: number = Number(blocks[mid].getElementsByClassName("block_val")[0].innerHTML);
        console.log("midValue = " + midValue);
        // To wait for 1 sec
        await delay(1000);

        if (midValue < x) {
            low = mid + 1;
            // fade away discarded blocks
            for (let i = low - 1; i >= 0; i--) {
                blocks[i].style.opacity = ".3";
            }
            blocks[mid].style.backgroundColor =  normalColour;
            await delay(1000);

        } else if (midValue > x) {
            high = mid - 1;
            for (let i = high + 1; i < NUM_OF_BLOCKS; i++) {
                blocks[i].style.opacity = ".3";
            }
            blocks[mid].style.backgroundColor = normalColour;
            await delay(1000);
        } else {
            blocks[mid].style.backgroundColor = xColour;
            output.innerText = "Search done.";
            isFound = true;
            break;
        }
    }
    if (!isFound) output.innerText = "Number not in the array. Please try a different number.";
}

/**
 * Utility function for simplifying delay calls
 * @param ms number of ms to delay by
 */
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

generateArray();
console.log("test");