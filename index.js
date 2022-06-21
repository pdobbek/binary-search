"use strict";
var arrContainer = document.getElementById("array");
/**
 * Function that draws an array of blocks of random heights.
 */
function generateArray() {
    if (arrContainer != null) {
        let arr = [];
        // fill arr with random numbers
        for (let i = 0; i < 30; i++) {
            // gen a value from 1 to 100 (inclusive)
            const element = Number(Math.ceil(Math.random() * 100));
            arr.push(element);
        }
        arr.sort((a, b) => a - b); // sort arr
        for (let i = 0; i < 30; i++) {
            let value = arr[i];
            // make and style div
            let block = document.createElement("div");
            block.classList.add("block");
            block.style.height = `${value * 3}px`;
            block.style.transform = `translate(${i * 30}px)`;
            // add label to each block
            var blockLabel = document.createElement("label");
            blockLabel.classList.add("block_id");
            blockLabel.innerText = value.toString();
            block.appendChild(blockLabel);
            arrContainer.appendChild(block);
        }
    }
}
generateArray();
console.log("test");
