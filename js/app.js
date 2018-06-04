  let cardList = ["fa fa-anchor","fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-bolt",
   "fa fa-cube", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond",
   "fa fa-bomb", "fa fa-bolt", "fa fa-cube", "fa fa-paper-plane-o"];
  let open_cards = [];
  let shown_cards = [];
  let matched_cards = [];
  let moveCounter = 0;
  let totalStars = 3;
  let mainDeck = document.getElementById('mainDeck');
  let moveCount = document.querySelector('.moves');
  let score = document.getElementById('stars');
  let modal = document.getElementById("modal");
  let minutesLabel = document.getElementById("minutesLabel");
  let secondsLabel = document.getElementById("secondsLabel");
  let totalSeconds = 0;
  let timer = "";

  startGame ();

  function startGame() {
    shuffle(cardList);
    createDeck();
  }

  function flipOver(event) {
    event.target.classList.add("open");
    event.target.classList.add("show");
  }

  function setTime() {
    totalSeconds++;
    secondsLabel.textContent = pad(totalSeconds % 60);
    minutesLabel.textContent = pad(parseInt(totalSeconds / 60));
  }

  function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  mainDeck.addEventListener('click', function(event) {
    if (totalSeconds == 0) {
      // Starts the timer
      timer = setInterval(setTime, 1000);
    }
    if (event.target.className === "card open show") {
      return;
    }
    if (event.target.className === "card") {
      flipOver(event);
    }
    if (open_cards.length != 2 && event.target.className === "card open show" && shown_cards.length != 2) {
      open_cards.push(event.target.childNodes[0].className);
      shown_cards.push(event.target);
    }
    if (open_cards.length > 1) {
      if (open_cards[0] === open_cards[1]) {
        shown_cards[0].classList.add("match");
        shown_cards[1].classList.add("match");
        open_cards = [];
        shown_cards = [];
        matched_cards.push(open_cards[0]);
      } else {
        shown_cards[0].classList.add("no-match");
        shown_cards[1].classList.add("no-match");
        setTimeout(function(){
          shown_cards[0].classList.remove("no-match");
          shown_cards[1].classList.remove("no-match");
          shown_cards[0].classList.add("flip");
          shown_cards[1].classList.add("flip");
          shown_cards[0].classList.remove("open");
          shown_cards[1].classList.remove("open");
          shown_cards[0].classList.remove("show");
          shown_cards[1].classList.remove("show");
          shown_cards[0].classList.remove("flip");
          shown_cards[1].classList.remove("flip");
          open_cards = [];
          shown_cards = [];
        }, 300);
      }
      moveCounter++;
      displayMoves(moveCounter);
    }
    matchedCards();
  });

  function matchedCards () {
    // Displays the winning score
    if (matched_cards.length == cardList.length / 2) {
      let winningScore = document.getElementById("winningScore");
      let time = "";
      if (Number(minutesLabel.innerText) > 0 ) {
        time = minutesLabel.innerText + " minutes " + secondsLabel.innerText + " seconds.";
      } else {
        time = secondsLabel.innerText + " seconds.";
      }
      winningScore.textContent = "With " + moveCounter + " Moves and " + totalStars + " Star in " + time;
      modal.classList.add("show-modal");
    }
  }

function resetGame () {
  // Restarts the game
  moveCounter = 0;
  matched_cards = [];
  stopTimer();
  displayMoves(moveCounter);
  resetScore();
  shuffle(cardList);
  createDeck();
}

function stopTimer () {
  // Stops the timer
  totalSeconds = 0;
  clearInterval(timer);
  minutesLabel.textContent = "00";
  secondsLabel.textContent = "00";
}
function playAgain () {
  modal.classList.remove("show-modal");
  resetGame();
}

  function displayMoves (moveCounter) {
      moveCount.textContent = moveCounter;
      if (moveCounter >= 11) {
        // Move greater than 10 , star 2
        score.childNodes[5].lastChild.classList.add("fa-star-o");
        totalStars = 2;
      }
      if (moveCounter >= 21) {
        // Move greater than 20 , star 1
        score.childNodes[3].lastChild.classList.add("fa-star-o");
        totalStars = 1;
      }
      if (moveCounter >= 31) {
        // Move greater than 30 , star 0
        score.childNodes[1].lastChild.classList.add("fa-star-o");
        totalStars = 0;
      }
  }

function resetScore () {
  score.childNodes[1].lastChild.classList.remove("fa-star-o");
  score.childNodes[3].lastChild.classList.remove("fa-star-o");
  score.childNodes[5].lastChild.classList.remove("fa-star-o");
}
  /*
  * Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
  */

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function createDeck() {
    while(mainDeck.hasChildNodes()) {
      mainDeck.removeChild(mainDeck.lastChild);
    }
    for (let i = 0; i <cardList.length; i++) {
      const newCard = document.createElement("li");
      newCard.className = "card";
      const newCardData = document.createElement("i");
      newCardData.className = cardList[i];
      newCard.appendChild(newCardData);
      mainDeck.appendChild(newCard);
    }
  }


  /*
  * set up the event listener for a card. If a card is clicked:
  *  - display the card's symbol (put this functionality in another function that you call from this one)
  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  *  - if the list already has another card, check to see if the two cards match
  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  */
