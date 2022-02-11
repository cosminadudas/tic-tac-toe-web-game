function openPlayerConfig(event) {
  // get all data attributes
  const clickedButtonData = event.target.dataset;

  // get playerid as int: +'1' => 1
  editedPlayer = +clickedButtonData.playerid;

  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = '';
}

function savePlayerConfig(event) {
  // prevent default behaviour of form
  event.preventDefault();

  const formData = new FormData(event.target);

  // trim method -> trim extra whitespaces: '   some text ' => 'some text'
  const enteredPlayername = formData.get("playername").trim();

  // validation of user input
  if (!enteredPlayername) {
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid name!";
    return;
  }

  // get player that will be updated
  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );

  // store player name on players array
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;
  players[editedPlayer - 1].name = enteredPlayername;

  closePlayerConfig();
}
