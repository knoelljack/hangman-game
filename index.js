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
let letters = document.getElementsByClassName("letters");
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

    let splitted = randomWord.split("");

    splitted.forEach((letter) => {
    let emptySpace = document.createElement("div");
    emptySpace.className = "empty_space";
    // emptySpace.innerHTML = letter;
    guessContainer.appendChild(emptySpace);
    });
}

setData();

//Check letter choice to see if in word and at what location, if found display
//if Correct => turn guess green, else turn red
const checkChoice = (choice, word) => {
//   console.log("Clicked", e.target.value);
  for (let i = 0; i < word.length; i++) {
    let currLetter = choice.innerHTML;
    if (currLetter.toLowerCase() === word[i]) {
      choice.className += " correct";
      console.log(letters)
      lettersContainer[i].innerHTML = choice;
      return true;
    }
  }
  choice.className += " wrong";
  return false;
};

//create letters choices from alphabet array
alphabet.forEach((letter) => {
  let curr = document.createElement("div");
  curr.className = "letter";
  curr.innerHTML = letter;
  curr.addEventListener('click', function() { checkChoice(curr, randomWord) });
  document.getElementById("letters_container").appendChild(curr);
});
