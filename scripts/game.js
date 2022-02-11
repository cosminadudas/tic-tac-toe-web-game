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
    // which field was clicked + add the symbol in that field area
    event.target.textContent = players[activePlayer].symbol;

    // add disabled class the selected field area
    event.target.classList.add('disabled');    

    // switch to the other symbol
    switchPlayer();

    // keep track of all the selected fields
}