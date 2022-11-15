const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let lettersContainer = document.querySelector(".letters_container");
let guessContainer = document.getElementById("guess_container");
const API_URL = "https://random-word-api.herokuapp.com/word";
let randomWord = '';

//fetch random word from API and create spaces for each letter

async function getWord(url) {
    let res = await fetch(url);
    let data = await res.json();
    return data[0];
}

const setData = async () => {
    randomWord = await getWord(API_URL);
    console.log('Word is: ', randomWord);
    let amountOfGuesses = document.getElementById('num-of-guesses');
    amountOfGuesses.innerHTML = 'Guesses left: ' + randomWord.length * 2;


    let splitted = randomWord.split("");

    splitted.forEach((letter) => {
    let emptySpace = document.createElement("div");
    emptySpace.className = "empty_space";
    guessContainer.appendChild(emptySpace);
    });
}

setData();

//Check letter choice to see if in word and at what location, if found display
//if Correct => turn guess green, else turn red
const checkChoice = (choice, word) => {
    let flag = false;
    let letters = document.getElementsByClassName("empty_space");
    let currLetter = choice.innerHTML;


    for (let i = 0; i < word.length; i++) {
        if (currLetter.toLowerCase() === word[i]) {
            choice.className += " correct";
            flag = true;
            console.log(letters)
            letters[i].innerHTML = currLetter;
        }
    }
    if(!flag) choice.className += " wrong";
    return flag;
};

//create letters choices from alphabet array
alphabet.forEach((letter) => {
  let curr = document.createElement("div");
  curr.className = "letter";
  curr.innerHTML = letter;
  curr.addEventListener('click', function() { checkChoice(curr, randomWord) });
  document.getElementById("letters_container").appendChild(curr);
});


