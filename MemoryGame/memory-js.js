// This file is just seudo code not the final one

let blocks = Array.from(document.querySelectorAll(".block")),
  blocksOrder = [...Array(blocks.length).keys()],
  shuffledBlocks = blocksOrder.sort(() => Math.random() - 0.5), //instead of the fun. at the end
  memoryBlocks = document.querySelector(`.memory-blocks`);

console.log(blocks);
// welcom screen
// document.getElementById("Enter").onclick = function () {
//   let playerName = prompt("Please Enter Your Name");

//   if (playerName == null || playerName == "") {
//     document.querySelector(".name span").innerHTML = `Unknown Player`;
//   } else {
//     document.querySelector(".name span").innerHTML = playerName;
//   }
//   document.querySelector(".Welcom-screen").remove();
// };

//setting the blocks order & apply flipping
blocks.forEach((block, index) => {
  block.style.order = shuffledBlocks[index];

  block.onclick = function () {
    flipBlock(block);
  };
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add(`flipped`);

  let flippedBlocks = blocks.filter((b) => b.classList.contains(`flipped`));

  if (flippedBlocks.length === 2) {
    memoryBlocks.classList.add(`stop-clicking`);
    checkMatching(flippedBlocks[0], flippedBlocks[1]);

    setTimeout(() => {
      memoryBlocks.classList.remove(`stop-clicking`);
      selectedBlock;
    }, 1500);
  }
}

function checkMatching(first, second) {
  if (first.dataset.memory === second.dataset.memory) {
    first.classList.add(`matched`);
    second.classList.add(`matched`);

    first.classList.remove(`flipped`);
    second.classList.remove(`flipped`);
  } else {
    setTimeout(() => {
      first.classList.remove(`flipped`);
      second.classList.remove(`flipped`);
    }, 1500);

    document.querySelector(`.tries span`).innerHTML += 1;
  }
}

// function shuffleNums(Array,shuffledArr) {

//   while (shuffledArr.length < Array.length) {
//     let randomNumber = Math.floor(Math.random() * Array.length);
//     if (newArr.includes(randomNumber)) {
//       continue;
//     } else {
//       newArr.push(randomNumber);
//     }
//   }
// }
