//game variables
//game-card for all images. Images are appended to this.
let cardElements = document.getElementsByClassName('game-card');
let cardElementsArray = [...cardElements];


//this array contains all of the images
var allImages = [
    "assets/images/cards/forlorn-cat.png",
    "assets/images/cards/cat-reading.png",
    "assets/images/cards/cuty-cats.png",
    "assets/images/cards/sleeping-kitty.png",
    "assets/images/cards/little-cat.png",
    "assets/images/cards/cat.png",
    "assets/images/cards/cat-in-a-pan.png",
    "assets/images/cards/party-cat.png",

];

//an empty array that the images will be placed in, depending on the difficulty level. So 4 images for easy,6 images for medium and 8 for
//hard. This will change depending on which button is clicked (see changeLevel function)
var selection = [];

//these variables will be used to match the cards
var counter = 0;
var card1;
var card2;

//these variables will be used to keep track of how many moves have been made
var score = 0;
var totalGameMoves = document.getElementById('totalGameMoves');
//variables for the different buttons: changing difficulty level, buttons on modals and restarting game
var restartButton = document.getElementById('restartButton');
var playAgainButton = document.getElementById('playAgain');

var easyButton = document.getElementById('easy-button');
var mediumButton = document.getElementById('medium-button');
var hardButton = document.getElementById('hard-button');
var modalEasyButton = document.getElementById('modal-easy-button');
var modalMediumButton = document.getElementById('modal-medium-button');
var modalHardButton = document.getElementById('modal-hard-button');


//array for medium cards to be used when changing levels.
var mediumRow = document.getElementsByClassName('row-medium');
let mediumRowArray = [...mediumRow];
var easyRow = document.getElementsByClassName('row-easy');
//array to be used when changing to hard difficulty level
var hardRow = document.getElementsByClassName('row-hard');
let hardRowArray = [...hardRow];
var cardToBeTurned1;
var cardToBeTurned2;

var numberOfImages;

//variable to keep track of number of matches. This will later be used to determine when player has won.
var numberOfMatches = 0;

//modal for beginning of gameplay taken from Tutorial Republic and edited for my purposes
 $(document).ready(function(){
             $("#myModal").modal('show');
             $('#myModal').off()
             $("#myModal").modal({
                 backdrop: static,
                 keyboard: false
             });
         
         
         });
         $(function () {
             $(".btnClosePopup").click(function () {
                 $("#myModal").modal("hide");
             });
         });
         

//add event listeners to the difficulty buttons both in the game and modal in order to ascertain how many cards will appear and be shuffled
easyButton.addEventListener('click', changeToEasy);
modalEasyButton.addEventListener('click', changeToEasy);


//player will firstly select their difficulty level, and then the correct rows will be loaded depending on difficulty level using the changeToEasy, changeToMedium and changeToHard functions.
//changeLevel function will then take 

function keepScore() {
    if (score >= 1) {
        score = 0;
        totalGameMoves.innerHTML = score;
    }

}

function changeToEasy() {

    for (let i = 0; i < mediumRowArray.length; i++) {
        mediumRowArray[i].classList.add('hidden');
    }
    for (let i = 0; i < hardRowArray.length; i++) {
        hardRowArray[i].classList.add('hidden');
    }

    changeLevel(0, 4);
    keepScore();

}

mediumButton.addEventListener('click', changeToMedium);
modalMediumButton.addEventListener('click', changeToMedium);



function changeToMedium() {
    for (let i = 0; i < mediumRowArray.length; i++) {
        mediumRowArray[i].classList.remove('hidden');
    }
    for (let i = 0; i < hardRowArray.length; i++) {
        hardRowArray[i].classList.add('hidden');
    }

    changeLevel(0, 6);
    keepScore()
}

hardButton.addEventListener('click', changeToHard);
modalHardButton.addEventListener('click', changeToHard);


function changeToHard() {

    for (let i = 0; i < mediumRowArray.length; i++) {
        mediumRowArray[i].classList.remove('hidden');
    }
    for (let i = 0; i < hardRowArray.length; i++) {
        hardRowArray[i].classList.remove('hidden');
    }



    changeLevel(0, 8);
    keepScore();
}

//select and shuffle cards based on difficulty level
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;


}
//cut the array and put only 4 cards into the selection array, duplicate those cards into a new array, concat both arrays into
//a new array - this new array will be used in the createImages function
function changeLevel(x, y) {

    for (i = 0; i < cardElementsArray.length; i++) {
        cardElementsArray[i].innerHTML = "";
    }
    shuffle(allImages);
    var selection1 = allImages.slice(x, y);
    var selection2 = selection1.slice(x, y);
    var selection = selection1.concat(selection2);
    shuffle(selection);

    createImages(selection);

}

function createImages(images) {
    //create images

    // counter
    var i = 0;

    // shuffle array

    shuffle(images);

    // start preloading
    for (i = 0; i < images.length; i++) {
        var imageObj = document.createElement('img');
        imageObj.style.width = "100%";
        imageObj.style.height = "100%";
        imageObj.src = images[i];
        cardElementsArray[i].appendChild(imageObj);
        imageObj.classList.add('hidden');


    }

    numberOfImages = images.length;


    startGame();



}


//restart game depending on the level when restart button is clicked


restartButton.addEventListener('click', restartGame);
playAgainButton.addEventListener('click', restartGame);

function restartGame() {
    if (numberOfImages === 8) {
        changeToEasy();
    }
    if (numberOfImages === 12) {
        changeToMedium();
    }
    if (numberOfImages === 16) {
        changeToHard();
    }

}


//display cards when game starts and initiate move counter
function startGame() {

    for (let i = 0; i < cardElementsArray.length; i++) {
        
        cardElementsArray[i].addEventListener('click', displayCard)
        cardElementsArray[i].addEventListener('click', countScore)
    


    }

}





function displayCard() {
    if (counter == 0) {
        counter = 1;
        this.children[0].classList.remove('hidden');
        this.children[0].classList.add('show-img');
        card1 = this.children[0];
    } else if (counter == 1) {
        counter = 2;
        this.children[0].classList.remove('hidden');
        this.children[0].classList.add('show-img');
        card2 = this.children[0];
        checkForMatch();
        counter = 0;
    }




}

//counter goes up one every time you click a card

function countScore() {
    score++;
    totalGameMoves.innerHTML = score;
}



function checkForMatch() {

    if (card1.src == card2.src) {
        if (card1.parentElement.id == card2.parentElement.id) {
            cardToBeTurned1 = card1;
            cardToBeTurned2 = card2;
            mismatched();
        } else {
            numberOfMatches = numberOfMatches + 1
            match();
        }

    } else {
        cardToBeTurned1 = card1;
        cardToBeTurned2 = card2;
        mismatched();
    }
    youHaveWon();
}

//functionality added to announce you've won

function youHaveWon() {
    if ((numberOfImages / 2) === numberOfMatches) {

        $('#exampleModal').modal('show');
        //reset counter for next game play
        numberOfMatches = 0;

    }
}
// make sure that when cards flip back over there is a 1 second delay so that player can see both cards. Also initialise 'unflip'
function mismatched() {
    setTimeout(unflipCards, 1000);
}

//if two cards have the same src element, remove Event Listener
function match() {

    card1.parentElement.removeEventListener('click', displayCard);
    card2.parentElement.removeEventListener('click', displayCard);
}

//un-flip cards that don't match
function unflipCards() {
    cardToBeTurned1.classList.remove('show-img');
    cardToBeTurned1.classList.add('hidden');

    cardToBeTurned2.classList.remove('show-img');
    cardToBeTurned2.classList.add('hidden');

}




window.onload = function() {
    setTimeout(function() {
        startGame();
    }, 1200);
}