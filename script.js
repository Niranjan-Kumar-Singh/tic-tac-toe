const boxes = Array.from(document.querySelectorAll(".box"));
const resetBtn = document.querySelector("#reset-btn");
const newGame = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const turnIndicator = document.getElementById("turn-indicator");
const modeToggle = document.getElementById("mode-toggle");
const themeToggle = document.getElementById("theme-toggle");

let turnO = true;
let move = 0;
let vsComputer = false;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const updateTurnIndicator = () => {
  turnIndicator.innerText = turnO ? "O's Turn" : "X's Turn";
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => boxClick(index));
});

const boxClick = (i) => {
  if (boxes[i].innerText !== "" || gameOver) return;

  const currentPlayer = turnO ? "O" : "X";
  boxes[i].innerText = currentPlayer;
  boxes[i].style.color = currentPlayer === "O" ? "#dd7373" : "#3674B5";
  boxes[i].disabled = true;
  move++;

  if (checkWinner(currentPlayer)) return;
  if (move === 9) return draw();

  turnO = !turnO;
  updateTurnIndicator();

  if (vsComputer && !turnO && !gameOver) {
    setTimeout(makeComputerMove, 500);
  }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner, pattern) => {
  gameOver = true;
  msg.innerText = `Winner: ${winner}`;
  msgContainer.classList.remove("hide");
  pattern.forEach((i) => {
    boxes[i].style.backgroundColor = "#90EE90";
  });
  confetti();
};


const draw = () => {
  gameOver = true;
  msg.innerText = "DRAW!!";
  msgContainer.classList.remove("hide");
};

const checkWinner = (player) => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText === player &&
      boxes[b].innerText === player &&
      boxes[c].innerText === player
    ) {
      showWinner(player, pattern);
      return true;
    }
  }
  return false;
};

const resetGame = () => {
  turnO = true;
  move = 0;
  gameOver = false;
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.backgroundColor = "";
  });
  msgContainer.classList.add("hide");
  updateTurnIndicator();
};

const makeComputerMove = () => {
  const emptyIndices = boxes.map((b, i) => b.innerText === "" ? i : null).filter(i => i !== null);
  const rand = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  boxClick(rand);
};

const toggleMode = () => {
  vsComputer = !vsComputer;
  modeToggle.innerText = `Play vs Computer: ${vsComputer ? "ON" : "OFF"}`;
  resetGame();
};

const toggleTheme = () => {
  document.body.classList.toggle("dark");
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
modeToggle.addEventListener("click", toggleMode);
themeToggle.addEventListener("click", toggleTheme);

updateTurnIndicator();