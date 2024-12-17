// Game state variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the 3x3 grid
let gameActive = true; // Flag to check if the game is active

// Function to initialize the game board
function createGameBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = ''; // Clear the board if it already exists

    // Create 9 div elements representing the 9 cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

// Handle cell click events
function handleCellClick(event) {
    const index = event.target.dataset.index;
    
    // Check if the cell is already taken or if the game is over
    if (gameBoard[index] || !gameActive) {
        return;
    }

    // Mark the cell with the current player's symbol
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check for a win or a draw
    if (checkWin()) {
        document.getElementById('statusText').textContent = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell)) {
        document.getElementById('statusText').textContent = 'It\'s a Draw!';
        gameActive = false;
    } else {
        // Switch player turn
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('statusText').textContent = `${currentPlayer}'s Turn`;
    }
}

// Check for winning conditions
function checkWin() {
    const winPatterns = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal
        [2, 4, 6]  // Diagonal
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    // Reset the UI
    const cells = document.querySelectorAll('.game-board div');
    cells.forEach(cell => cell.textContent = '');
    document.getElementById('statusText').textContent = "Player X's Turn";
}

// Initialize the game when the page loads
createGameBoard();
