var word_to_be_guessed = ["VIENNA", "HELSINKI", "COPENHAGEN", "LONDON", "BERLIN", "AMSTERDAM"];
var guessed_characters = [];

var random_word_index = Math.floor(Math.random() * word_to_be_guessed.length)
var random_word = word_to_be_guessed[random_word_index];
console.log(random_word)
// After the following loop has been executed, the array of guessed
// characters will contain as many strings "-" as there are characters
// in the word to be guessed. 

for (var string_counter = 0;
   string_counter < random_word.length;
   string_counter++) {
   guessed_characters.push("-");
}

// The following JavaScript function is called when one of the buttons is
// pressed. A reference to the button object is received as a parameter.
// With the textContent attribute we can find out what is the text written
// on the button, i.e., we find out what letter was selected.

function handle_button_press(pressed_button) {
   var selected_letter = pressed_button.textContent;

   for (character_index in guessed_characters) {
      if (random_word.charAt(character_index) == selected_letter) {
         guessed_characters[character_index] = selected_letter;
      }
   }

   // The array containing the guessed characters will be converted
   // to a string with the join() method. The empty string "" as a parameter
   // specifies that nothing will be added between the strings.

   document.getElementById("secret_word_text_id").innerHTML = guessed_characters.join("");
}