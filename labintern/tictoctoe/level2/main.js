document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo trạng thái trò chơi
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Lấy ô chứa các ô vuông
    const gameContainer = document.getElementById('game-board');

    // Hiển thị ô vuông trên trang
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.index = i;
        square.addEventListener('click', handleSquareClick);
        gameContainer.appendChild(square);
    }

    // Hàm xử lý khi click vào ô vuông
    function handleSquareClick(event) {
        const selectedIndex = event.target.dataset.index;
    
        // Kiểm tra ô đã được chọn hay chưa
        if (gameBoard[selectedIndex] === '' && gameActive) {
            // Hiển thị chữ X hoặc O tùy thuộc vào lượt chơi
            event.target.textContent = currentPlayer;
    
            // Lưu trạng thái vào gameBoard
            gameBoard[selectedIndex] = currentPlayer;
    
            // Kiểm tra xem có người thắng cuộc hay không
            if (checkWinner()) {
                // Hiển thị đường gạch trên các ô thắng
                document.getElementById('status').textContent = `Người thắng cuộc: ${currentPlayer}`;
                gameActive = false;
                highlightWinningSquares();
            } else if (gameBoard.every(square => square !== '')) {
                // Kiểm tra xem đã hết ô chưa
                document.getElementById('status').textContent = 'Không có người thắng cuộc';
                gameActive = false;
            } else {
                // Chuyển lượt chơi
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                document.getElementById('status').textContent = `Lượt chơi tiếp theo: ${currentPlayer}`;
            }
        }
    }
    // Hàm xóa lớp CSS winning-square từ tất cả các ô vuông
function clearWinningStyles() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.classList.remove('winning-square');
    });
}

    // Hàm để thêm lớp CSS cho ô thắng
    function highlightWinningSquares() {
        winningSquares.forEach(index => {
            const square = document.querySelector(`.square[data-index="${index}"]`);
            square.classList.add('winning-square');
        });
    }
    

    // Hàm kiểm tra người thắng cuộc
    // Thêm một biến global để lưu trữ các ô thắng
let winningSquares = [];

function checkWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Ngang
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Dọc
        [0, 4, 8], [2, 4, 6]             // Chéo
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winningSquares = [a, b, c];
            return true;
        }
    }

    return false;
}

    const resetButton = document.getElementById('resetButton');
    
    // Thêm sự kiện khi nút "Làm mới" được nhấn
    resetButton.addEventListener('click', resetGame);

    // Hàm reset trạng thái trò chơi
    function resetGame() {
        // Xóa nội dung của ô vuông
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.textContent = '';
        });
// Xóa lớp CSS winning-square từ tất cả các ô vuông
clearWinningStyles();
        // Reset trạng thái trò chơi và label status
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        document.getElementById('status').textContent = 'Lượt chơi tiếp theo: X';
    }
});
