function resetGameStatus() {
    gameIsOver = false;
    activePlayer = 0;
    currentRound = 1;
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-player-name">PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';

    let gameBoardIndex = 0;
    for (let i = 0; i < gameData.length; i++) {
        for (let j = 0; j < gameData.length; j++) {
            gameData[i][j] = 0;
            const gameBoardElement = document.getElementById('game-board').children[gameBoardIndex];
            gameBoardElement.textContent = '';
            gameBoardElement.classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if (players[0].name === '' || players[1].name === '') {
        alert('Please set custom player names for both players!');
        return;
    }

    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name
    gameAreaElement.style.display = 'block';
}

function switchPlayer() {
    if (activePlayer == 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col -1;
    const selectedRow = selectedField.dataset.row -1;

    if (gameIsOver) {
        return;
    }

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert('Please select an empty field!');
        return;
    } 

    // which field was clicked + add the symbol in that field area
    selectedField.textContent = players[activePlayer].symbol;

    // add disabled class the selected field area
    selectedField.classList.add('disabled');
    
    // update field that was selected
    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    // check for game over
    const winnerId = checkForGameOver();
    if (winnerId !== 0) {
        endGame(winnerId);
    }

    // switch to the other symbol
    switchPlayer();
    currentRound++;

}

function checkForGameOver() {
    // Checking the rows for equality
    for (let i = 0; i < gameData.length; i++) {
        if (
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]
        ) {
            return gameData[i][0];
        }
    }

    // Checking columns for equality
    for (let i = 0; i < gameData.length; i++) {
        if (
            gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]
        ) {
            return gameData[0][i]
        }
    }

    // Checking the diagonal: top left to bottom right
    if (
        gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0];
    }

    // Checking the diagonal: top right to bottom left
    if (
        gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[1][1] === gameData[0][2]
    ) {
        return gameData[2][0];
    }

    if (currentRound == 9) {
        return -1;
    }

    return 0;

}

function endGame(winnerId) {
    gameIsOver = true;
    if (winnerId > 0) {
        gameOverElement.style.display = 'block';
        gameOverElement.firstElementChild.firstElementChild.textContent = players[winnerId - 1].name;
    }
    else {
        gameOverElement.style.display = 'block';
        gameOverElement.firstElementChild.textContent = 'It\'s a draw!';
        gameOverElement.getElementsByTagName('img')[0].remove();
    }
}