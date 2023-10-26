const board = document.getElementById("board");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(board.children).indexOf(cell);

    if (gameBoard[cellIndex] === "" && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("occupied");
        checkResult();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        message.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (!gameBoard.includes("")) {
        gameActive = false;
        message.textContent = "It's a draw!";
        return;
    }
}

function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
    Array.from(document.querySelectorAll("[data-cell]")).forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("occupied");
    });
}

board.addEventListener("click", handleCellClick);
restartButton.addEventListener("click", restartGame);
