"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const NUM_OF_BLOCKS = 30;
var arrContainer = document.getElementById("array");
/**
 * Draws an array of blocks of random heights.
 */
function generateArray() {
    if (arrContainer != null) {
        let arr = [];
        // fill arr with random numbers
        for (let i = 0; i < NUM_OF_BLOCKS; i++) {
            // gen a value from 1 to 100 (inclusive)
            const element = Number(Math.ceil(Math.random() * 100));
            arr.push(element);
        }
        arr.sort((a, b) => a - b); // sort arr
        for (let i = 0; i < NUM_OF_BLOCKS; i++) {
            let value = arr[i];
            // make and style div
            let block = document.createElement("div");
            block.classList.add("block");
            block.style.height = `${value * 3}px`;
            block.style.transform = `translate(${i * 30}px)`;
            // add label to each block
            var blockLabel = document.createElement("label");
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
function binarySearch() {
    return __awaiter(this, void 0, void 0, function* () {
        // block colours
        const normalColour = "lightgreen";
        const midColour = "orange";
        const xColour = "red";
        let blocks = document.querySelectorAll(".block");
        let output = document.getElementById("output");
        let x = Number(document.getElementById("x").value);
        // reset in case of repeat use
        output.innerText = "";
        blocks.forEach(block => {
            block.style.backgroundColor = normalColour;
            block.style.opacity = "1.0";
        });
        let low = 0;
        let high = NUM_OF_BLOCKS - 1;
        let mid;
        let isFound = false;
        while (low <= high) {
            mid = Math.floor((low + high) / 2);
            blocks[mid].style.backgroundColor = midColour;
            let midValue = Number(blocks[mid].getElementsByClassName("block_val")[0].innerHTML);
            console.log("midValue = " + midValue);
            // To wait for 1 sec
            yield new Promise((resolve) => setTimeout(() => {
                resolve();
            }, 1000));
            if (midValue < x) {
                low = mid + 1;
                // fade away discarded blocks
                for (let i = low - 1; i >= 0; i--) {
                    blocks[i].style.opacity = ".3";
                }
                blocks[mid].style.backgroundColor = normalColour;
                yield delay(1000);
            }
            else if (midValue > x) {
                high = mid - 1;
                for (let i = high + 1; i < NUM_OF_BLOCKS; i++) {
                    blocks[i].style.opacity = ".3";
                }
                blocks[mid].style.backgroundColor = normalColour;
                yield delay(1000);
            }
            else {
                blocks[mid].style.backgroundColor = xColour;
                output.innerText = "Search done.";
                isFound = true;
                break;
            }
        }
        if (!isFound)
            output.innerText = "Number not in the array. Please try a different number.";
    });
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
generateArray();
console.log("test");
