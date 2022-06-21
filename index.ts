var arrContainer: HTMLElement | null = document.getElementById("array");

/**
 * Function that draws an array of blocks of random heights.
 */
function generateArray(): void {
    if (arrContainer != null) {
        let arr: number[] = [];

        // fill arr with random numbers
        for (let i = 0; i < 30; i++) {
            // gen a value from 1 to 100 (inclusive)
            const element: number = Number(Math.ceil(Math.random() * 100 ));
            arr.push(element);
        }
        
        arr.sort((a, b) => a - b);  // sort arr

        for (let i = 0; i < 30; i++) {
            let value: number = arr[i];

            // make and style div
            let block: HTMLDivElement = document.createElement("div");
            block.classList.add("block");
            block.style.height = `${value * 3}px`;
            block.style.transform = `translate(${i * 30}px)`;

            // add label to each block
            var blockLabel: HTMLLabelElement = document.createElement("label");
            blockLabel.classList.add("block_id");
            blockLabel.innerText = value.toString();

            block.appendChild(blockLabel);
            arrContainer.appendChild(block);
        }
    }   
}

generateArray();
console.log("test");