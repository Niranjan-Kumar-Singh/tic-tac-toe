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
  [6, 7, 8],
];

// Initialize theme based on user preference or system preference
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("tic-tac-toe-theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme) {
    document.body.classList.toggle("dark", savedTheme === "dark");
  } else if (systemPrefersDark) {
    document.body.classList.add("dark");
  }

  updateThemeToggleText();
};

const updateThemeToggleText = () => {
  if (themeToggle) {
    const isDark = document.body.classList.contains("dark");
    themeToggle.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  }
};

const updateTurnIndicator = () => {
  if (turnIndicator) {
    turnIndicator.innerText = turnO ? "O's Turn" : "X's Turn";
  }
};

// Enhanced box click with better visual feedback
boxes.forEach((box, index) => {
  box.addEventListener("click", () => boxClick(index));
  box.addEventListener("mouseenter", () => {
    if (!box.disabled && !gameOver && box.innerText === "") {
      box.style.backgroundColor = "rgba(129, 154, 145, 0.1)";
    }
  });
  box.addEventListener("mouseleave", () => {
    if (!box.disabled && !gameOver && box.innerText === "") {
      box.style.backgroundColor = "";
    }
  });
});

const boxClick = (i) => {
  if (boxes[i].innerText !== "" || gameOver) return;

  const currentPlayer = turnO ? "O" : "X";
  boxes[i].innerText = currentPlayer;
  boxes[i].style.color = currentPlayer === "O" ? "#dd7373" : "#3674B5";
  boxes[i].style.backgroundColor = "";
  boxes[i].disabled = true;
  move++;

  // Add click animation
  boxes[i].style.transform = "scale(1.1)";
  setTimeout(() => {
    if (boxes[i]) {
      boxes[i].style.transform = "scale(1)";
    }
  }, 150);

  if (checkWinner(currentPlayer)) return;
  if (move === 9) return draw();

  turnO = !turnO;
  updateTurnIndicator();

  if (vsComputer && !turnO && !gameOver) {
    setTimeout(makeComputerMove, 300);
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "";
    box.style.transform = "scale(1)";
  }
};

const showWinner = (winner, pattern) => {
  gameOver = true;
  disableBoxes();

  if (msg) {
    msg.innerText = `🎉 Winner: ${winner}`;
  }

  if (msgContainer) {
    msgContainer.classList.remove("hide");
  }

  // Highlight winning pattern with animation
  pattern.forEach((i, index) => {
    setTimeout(() => {
      boxes[i].style.backgroundColor = "#90EE90";
      boxes[i].style.transform = "scale(1.1)";
    }, index * 100);
  });

  // Trigger confetti if available
  if (typeof confetti === "function") {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 300);
  }

  // Update stats if functions exist
  updateGameStats(winner);
};

const draw = () => {
  gameOver = true;
  disableBoxes();

  if (msg) {
    msg.innerText = "🤝 It's a Draw!";
  }

  if (msgContainer) {
    msgContainer.classList.remove("hide");
  }

  // Update stats for draw
  updateGameStats("draw");
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
    box.style.transform = "scale(1)";
  });

  if (msgContainer) {
    msgContainer.classList.add("hide");
  }

  updateTurnIndicator();
};

// Enhanced AI Implementation with better move selection
const getGameBoard = () => {
  return boxes.map((box) => box.innerText || null);
};

const checkGameWinner = (board, player) => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
};

const isGameDraw = (board) => {
  return board.every((cell) => cell !== null);
};

const getAvailableMoves = (board) => {
  return board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);
};

// Enhanced minimax with position value considerations
const minimax = (
  board,
  depth,
  isMaximizing,
  alpha = -Infinity,
  beta = Infinity
) => {
  if (checkGameWinner(board, "X")) return 10 - depth;
  if (checkGameWinner(board, "O")) return depth - 10;
  if (isGameDraw(board)) return 0;

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let move of availableMoves) {
      board[move] = "X";
      let eval = minimax(board, depth + 1, false, alpha, beta);
      board[move] = null;
      maxEval = Math.max(maxEval, eval);
      alpha = Math.max(alpha, eval);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let move of availableMoves) {
      board[move] = "O";
      let eval = minimax(board, depth + 1, true, alpha, beta);
      board[move] = null;
      minEval = Math.min(minEval, eval);
      beta = Math.min(beta, eval);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

const getBestMove = () => {
  const board = getGameBoard();
  const availableMoves = getAvailableMoves(board);

  // Strategic opening moves
  if (move === 1) {
    const preferredMoves = [4, 0, 2, 6, 8]; // Center first, then corners
    for (let move of preferredMoves) {
      if (availableMoves.includes(move)) {
        return move;
      }
    }
  }

  let bestMove = availableMoves[0];
  let bestValue = -Infinity;

  for (let move of availableMoves) {
    board[move] = "X";
    let moveValue = minimax(board, 0, false);
    board[move] = null;

    // Add slight randomness to equal moves for variety
    if (
      moveValue > bestValue ||
      (moveValue === bestValue && Math.random() < 0.3)
    ) {
      bestValue = moveValue;
      bestMove = move;
    }
  }

  return bestMove;
};

const makeComputerMove = () => {
  if (gameOver) return;

  const bestMove = getBestMove();

  // Add visual indication that computer is thinking
  if (turnIndicator) {
    turnIndicator.innerText = "🤖 Computer thinking...";
  }

  setTimeout(() => {
    boxClick(bestMove);
  }, 200);
};

const toggleMode = () => {
  vsComputer = !vsComputer;
  if (modeToggle) {
    modeToggle.innerText = `Play vs Computer: ${vsComputer ? "ON" : "OFF"}`;
    modeToggle.style.backgroundColor = vsComputer ? "#4CAF50" : "#f44336";
  }
  resetGame();

  // Show helpful message
  if (vsComputer) {
    console.log("🤖 Computer mode activated! You are 'O', computer is 'X'");
  }
};

const toggleTheme = () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");

  // Save theme preference
  localStorage.setItem("tic-tac-toe-theme", isDark ? "dark" : "light");

  updateThemeToggleText();

  // Add smooth transition effect
  document.body.style.transition = "all 0.3s ease";
  setTimeout(() => {
    document.body.style.transition = "";
  }, 300);
};

// Simple game statistics tracking
let gameStats = {
  playerWins: parseInt(localStorage.getItem("tic-tac-toe-player-wins") || "0"),
  computerWins: parseInt(
    localStorage.getItem("tic-tac-toe-computer-wins") || "0"
  ),
  draws: parseInt(localStorage.getItem("tic-tac-toe-draws") || "0"),
  totalGames: parseInt(localStorage.getItem("tic-tac-toe-total-games") || "0"),
};

const updateGameStats = (result) => {
  if (result === "O") gameStats.playerWins++;
  else if (result === "X" && vsComputer) gameStats.computerWins++;
  else if (result === "draw") gameStats.draws++;

  gameStats.totalGames++;

  // Save to localStorage
  localStorage.setItem(
    "tic-tac-toe-player-wins",
    gameStats.playerWins.toString()
  );
  localStorage.setItem(
    "tic-tac-toe-computer-wins",
    gameStats.computerWins.toString()
  );
  localStorage.setItem("tic-tac-toe-draws", gameStats.draws.toString());
  localStorage.setItem(
    "tic-tac-toe-total-games",
    gameStats.totalGames.toString()
  );
};

// Menu toggle functionality with improved UX
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("nav-open");
    menuToggle.setAttribute(
      "aria-expanded",
      nav.classList.contains("nav-open")
    );
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("nav-open")) {
      nav.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu when window is resized to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Enhanced keyboard support for accessibility
document.addEventListener("keydown", (e) => {
  if (gameOver) return;

  // Number keys 1-9 for box selection
  const key = parseInt(e.key);
  if (key >= 1 && key <= 9) {
    const boxIndex = key - 1;
    if (!boxes[boxIndex].disabled && boxes[boxIndex].innerText === "") {
      boxClick(boxIndex);
    }
  }

  // R key for reset
  if (e.key.toLowerCase() === "r" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    resetGame();
  }
});

// Event listeners with enhanced error handling
const setupEventListeners = () => {
  try {
    if (newGame) {
      newGame.addEventListener("click", resetGame);
      newGame.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          resetGame();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", resetGame);
      resetBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          resetGame();
        }
      });
    }

    if (modeToggle) {
      modeToggle.addEventListener("click", toggleMode);
      modeToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleMode();
        }
      });
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", toggleTheme);
      themeToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleTheme();
        }
      });
    }
  } catch (error) {
    console.warn("Some event listeners could not be attached:", error.message);
  }
};

// Initialize the game
const initializeGame = () => {
  initializeTheme();
  updateTurnIndicator();
  setupEventListeners();

  // Show welcome message on first visit
  if (!localStorage.getItem("tic-tac-toe-visited")) {
    setTimeout(() => {
      console.log(
        "🎮 Welcome to Tic Tac Toe Master! Use number keys 1-9 to play, or click the squares."
      );
      localStorage.setItem("tic-tac-toe-visited", "true");
    }, 1000);
  }
};

// Start the game when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGame);
} else {
  initializeGame();
}
