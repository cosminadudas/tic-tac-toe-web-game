function startNewGame() {
    if (players[0].name === '' || players[1].name === '') {
        alert('Please set custom player names for both players!');
        return;
    }
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
    console.log(gameData);

    // switch to the other symbol
    switchPlayer();

    // keep track of all the selected fields
}