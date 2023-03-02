const homePage = document.getElementById("home"),
  gamePage = document.getElementById("game"),
  gameBlocks = document.getElementById("game-blocks"),
  homeBtn = document.getElementById("home-btn"),
  from = document.getElementById("formId"),
  submitBtn = document.querySelector(`.submit`),
  gameBtn = document.getElementById("game-btn"),
  enteredName = document.getElementById(`enterd-name`),
  playerName = document.getElementById("player-name"),
  startBtn = document.getElementById("start-btn"),
  links = [
    "https://picsum.photos/id/10/130/130",
    "https://picsum.photos/id/20/130/130",
    "https://picsum.photos/id/30/130/130",
    "https://picsum.photos/id/40/130/130",
    "https://picsum.photos/id/50/130/130",
    "https://picsum.photos/id/60/130/130",
    "https://picsum.photos/id/70/130/130",
    "https://picsum.photos/id/80/130/130",
    "https://picsum.photos/id/90/130/130",
    "https://picsum.photos/id/100/130/130",
  ];
let playerInfo = { name: "Unknown", call: "Mr" },
  tries = 0,
  rights = 0;

gameBtn.onclick = () => {
  homePage.classList.add("hide");
  gamePage.classList.remove("hide");
};

homeBtn.onclick = () => {
  homePage.classList.remove("hide");
  gamePage.classList.add("hide");
};

startBtn.onclick = () => {
  generateBlocks();
  startBtn.parentElement.classList.add("hide");
};

submitBtn.onclick = () => {
  from.addEventListener("submit", (event) => event.preventDefault());
  playerInfo.name = enteredName.value;
  enteredName.value = "";
  playerInfo.call = document.getElementById("female").checked ? "Mrs" : "Mr";
  document.getElementById("female").checked = false;
  document.getElementById("male").checked = false;
  playerName.innerHTML = `${playerInfo.call}: ${playerInfo.name}`;
  // playerInfo.call =
};

function generateBlocks() {
  for (let i = 1; i <= 10; i++) {
    for (let y = 1; y < 3; y++) {
      gameBlocks.innerHTML += `
        <div class="block" data-memory="random${i}">
          <div class="front">!</div>
          <div class="back">
            <img src=${links[i - 1]} alt="">
          </div>
        </div>
        `;
    }
  }
  gameLogic();
}

function gameLogic() {
  let blocks = Array.from(document.querySelectorAll(".block")),
    blocksOrder = [...Array(blocks.length).keys()],
    shuffledBlocksOrder = blocksOrder.sort(() => Math.random() - 0.5); //instead of the fun. at the end

  //setting the blocks random order & apply flipping
  blocks.forEach((block, index) => {
    block.style.order = shuffledBlocksOrder[index];

    block.onclick = function () {
      flipBlock(block);
    };
  });

  function flipBlock(selectedBlock) {
    selectedBlock.classList.add(`flipped`);

    let flippedBlocks = blocks.filter((b) => b.classList.contains(`flipped`));

    if (flippedBlocks.length === 2) {
      gameBlocks.classList.add(`stop-clicking`);
      checkMatching(flippedBlocks[0], flippedBlocks[1]);

      setTimeout(() => {
        gameBlocks.classList.remove(`stop-clicking`);
        selectedBlock;
      }, 1500);
    }
  }

  function checkMatching(first, second) {
    if (first.dataset.memory === second.dataset.memory) {
      first.classList.add(`matched`);
      first.classList.remove(`flipped`);
      second.classList.add(`matched`);
      second.classList.remove(`flipped`);
      rights++;
      console.log(rights);
      if (rights === 10) {
        setTimeout(() => {
          if (confirm(`you have finished the game with ${tries} tries`)) {
            location.reload();
          }
        }, 500);
      }
    } else {
      tries++;
      document.querySelector(".p-tries span").innerHTML = tries;
      setTimeout(() => {
        first.classList.remove(`flipped`);
        second.classList.remove(`flipped`);
      }, 1500);
    }
  }
}
