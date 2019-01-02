//array that contains cards names
const symbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
const cardsClassesList = [...symbols, ...symbols];
 // useful variables to hold the values of DOM elements that will be used frequently
 // and to keep track with the game updates
 let deck = document.querySelector('.deck');
 let moves = document.querySelector('.moves');
 let card = document.getElementsByClassName('card');
 let cards;
 let openCards = [];
 let matchingCards = 0;
 let firstClick = 0;
 let movesCounter = 0;
 let interval;
 let seconds = 0;
 let minutes = 0;
 let timeCounter = document.querySelector('.timer');
 timeCounter.innerHTML = "";
 let modal = document.querySelector('.modal');
 let stat = document.querySelector('.end-msg');
 let timerText = '';
 let modalMsg = '';
 let restart = document.querySelector('.restart');
 restart.addEventListener('click', restartGame);
 let stars = document.querySelector(".stars").getElementsByTagName("li");
 let starCount = 3;
 let statMsg = document.querySelector('.stats');


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

// StartGame function to initiate the game's setting
function startGame() {
  let cardsList = shuffle(cardsClassesList);
  deck.innerHTML = "";
  timeCounter.innerHTML = '';
  moves.textContent = '0';
  movesCounter = 0;
  matchingCards = 0;
  firstClick = 0;
  minutes = 0;
  seconds = 0;
  openCards = [];
  starCount = 3;
  // for loop to reset stars style
  for( i= 0; i < 3; i++){
      stars[i].style.visibility = "visible";
  }
  // for loop to create 16 list tags using the suffuled cardsClassesList array as class names
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < cardsList.length; i++) {
      const newCard = document.createElement('li');
      const cardContent = document.createElement('i');
      newCard.className = 'card';
      cardContent.className = 'fa '+cardsList[i];
      newCard.appendChild(cardContent);
      fragment.appendChild(newCard);
    }
     deck.appendChild(fragment);
    let card = document.getElementsByClassName("card");
    cards = [...card];
     for (let i = 0; i < cardsList.length; i++ ) {
       cards[i].addEventListener('click', flipCardUp);
     }
}

function flipCardUp(event) {
  ++firstClick;
  if (firstClick==1) {
    startTimer();
  }
  showCard(event);
  addToOpenCards(event.target);

  if(openCards.length === 2) {
   let first = openCards[0];
   let second = openCards[1];
   checkMatch(first,second,event);
  }

  if(matchingCards === 8) {
   endGame();
  }
}

 function showCard(event) {
   event.target.classList.add('open','show');
 }

 function addToOpenCards(card) {
   openCards.push(card);
 }

 function checkMatch(first,second,event) {
   if(first.innerHTML === second.innerHTML)  {
     isMatch(first,second);
   }
   else {
     notMatch(first,second);
   }
   moveCounter();
   openCards = [];
 }

  function isMatch(first,second) {
 		first.classList.add('match');
    second.classList.add('match');
    matchingCards++;
 	}

  function notMatch(first,second) {
    first.classList.add('notMatch');
    second.classList.add('notMatch');
 		setTimeout(function () {
      first.classList.remove('open','show','notMatch');
			second.classList.remove('open','show','notMatch');
    }, 300);
 	}

  function moveCounter() {
    movesCounter++;
    moves.innerHTML = movesCounter;
    // setting star rating based on moves count
    if (movesCounter > 8 && movesCounter < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
                starCount = 2;
            }
        }
    }
    else if (movesCounter > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
                starCount = 1;
            }
        }
    }
  }

  function startTimer() {
    timer = setInterval(function(){
      ++seconds;
      if(seconds == 60){
        minutes++;
        seconds = 0;
      }
      timeCounter.innerHTML = pad(minutes)+":"+pad(seconds);
    },1000);
  }

  function pad(number) {
    let num = number+"";
    if (num.length < 2){
      num = "0"+num;
    }
    return num;
}
  function stopTimer() {
    clearTimeout(timer);
    clearInterval(timer);
  }
  function endGame() {
    stopTimer();
    showModal();
  }

  function showModal() {
    modalMsg = "<p>You've made " + movesCounter + " moves </br> in " + minutes + " minutes and " + seconds + " seconds!</p>" + "<p>You Received " + starCount + " star</p>";
    statMsg.innerHTML = '';
    statMsg.innerHTML = modalMsg ;
    let restart = document.querySelector('.restart');
    document.querySelector('#ok').addEventListener('click', hideModal);
    document.querySelector('#play-again').addEventListener('click',restartGame);
    window.onclick = function(event) {
      if(event.target == modal) {
        hideModal();
      }
    };
    modal.style.display = 'block';
  }

  function hideModal() {
    modal.style.display = 'none';
  }
  function restartGame() {
    hideModal();
    stopTimer();
    startGame();
  }

startGame();
