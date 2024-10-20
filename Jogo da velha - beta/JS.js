const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const popup = document.getElementById('winner-popup');
const winnerMessage = document.getElementById('winner-message');
const closePopup = document.getElementById('close-popup');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Função para mostrar a pop-up com o vencedor
function showPopup(winner) {
    winnerMessage.textContent = `Parabéns, ${winner} ganhou!`;
    popup.classList.remove('hidden');
}

// Função para fechar a pop-up e reiniciar o jogo
function closeWinnerPopup() {
    popup.classList.add('hidden');
    restartGame();
}

// Função para verificar se há um vencedor
function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameOver = true;
            showPopup(currentPlayer); // Mostrar a pop-up com o vencedor
            return;
        }
    }

    if (!board.includes('')) {
        isGameOver = true;
        winnerMessage.textContent = 'Empate!';
        popup.classList.remove('hidden');
    }
}

// Função para reiniciar o jogo
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// Função para jogar
function handleClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] === '' && !isGameOver) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Evento de clique no botão "Fechar" da pop-up
closePopup.addEventListener('click', closeWinnerPopup);

// Adicionar evento de clique às células e ao botão de reiniciar
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
