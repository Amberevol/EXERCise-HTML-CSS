
const button_wrapper = document.querySelector("#button_wrapper");

let letters = [
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
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

for (let letter_index = 0; letter_index < letters.length; letter_index++) {
  button_wrapper.insertAdjacentHTML(
    "beforeend",
    '<button id ="char-btn">' + letters[letter_index] + "</button>"
  );
}

const char_buttons = Array.from(button_wrapper.querySelectorAll("#char-btn"));

char_buttons.map((char_button) => {
  char_button.addEventListener("click", handle_button_press);
});

class Game {
  constructor() {
    this.words_to_be_guessed = [
      "VIENNA",
      "HELSINKI",
      "COPENHAGEN",
      "LONDON",
      "BERLIN",
      "AMSTERDAM",
    ];

    this.initialize_game();
  }
  initialize_game() {
    this.guessed_characters = [];
    this.number_of_guesses = 0;
    this.random_word_index = Math.floor(
      Math.random() * this.words_to_be_guessed.length
    );
    this.word_to_be_guessed = this.words_to_be_guessed[this.random_word_index];
    for (
      let string_counter = 0;
      string_counter < this.word_to_be_guessed.length;
      string_counter++
    ) {
      this.guessed_characters.push("-");
    }
  }

  guess(guessed_character) {
    this.number_of_guesses++;
    for (let character_index in this.guessed_characters) {
      if (this.word_to_be_guessed.at(character_index) == guessed_character) {
        this.guessed_characters[character_index] = guessed_character;
      }
    }
  }

  get quessed_string() {
    return this.guessed_characters.join("");
  }

  is_game_over() {
    return !this.guessed_characters.includes("-");
  }
}

const game = new Game();

function handle_button_press() {
  let selected_letter = this.textContent;
  game.guess(selected_letter);

  // once a button is clicked don't let the user press the button again
  this.disabled = "disabled";

  // The array containing the guessed characters will be converted
  // to a string with the join() method. The empty string "" as a parameter
  // specifies that nothing will be added between the strings.
  document.getElementById("secret_word_text_id").innerHTML =
    game.quessed_string;

  if (game.is_game_over()) {
    document.getElementById("message").style.display = "block";
    document.getElementById("message").innerHTML = "Congratulations";

    // display the new game button
    document.getElementById("new_game").style.display = "block";
  } else {
    document.getElementById("number_of_gueses_text_id").textContent =
      game.number_of_guesses;
  }
}

function initialize_game() {
  // After the following loop has been executed, the array of guessed
  // characters will contain as many strings "-" as there are characters
  // in the word to be guessed.

  game.initialize_game();
  console.log(game.word_to_be_guessed);
  char_buttons.map((char_button) => {
    char_button.removeAttribute("disabled");
  });
  document.getElementById("secret_word_text_id").innerHTML =
    game.quessed_string;
  document.getElementById("number_of_gueses_text_id").textContent =
    game.number_of_guesses;

  document.getElementById("new_game").style.display = "none";

  document.getElementById("message").style.display = "none";
}

initialize_game();

const new_game_btn = document.getElementById("new_game");
new_game_btn.addEventListener("click", initialize_game);
