var count = 0;
var word_to_be_guessed = ["VIENNA", "HELSINKI", "COPENHAGEN", "LONDON", "BERLIN", "AMSTERDAM"];
var guessed_characters = [];

var random_word_index = Math.floor(Math.random() * word_to_be_guessed.length)
var random_word = word_to_be_guessed[random_word_index];
console.log(random_word)
// After the following loop has been executed, the array of guessed
// characters will contain as many strings "-" as there are characters
// in the word to be guessed. 

let number_of_guess = 0;
for (var string_counter = 0;
   string_counter < random_word.length;
   string_counter++) {
      count++
      document.getElementById("number_of_press").innerHTML = count
   guessed_characters.push("-");
}


function handle_button_press(pressed_button) {
         number_of_guess++;                                  //it will increment when function is called
   var selected_letter = pressed_button.textContent;


   for (character_index in guessed_characters) {
      if (random_word.charAt(character_index) == selected_letter) {
         guessed_characters[character_index] = selected_letter;
      }
   }

   // The array containing the guessed characters will be converted
   // to a string with the join() method. The empty string "" as a parameter
   // specifies that nothing will be added between the strings.
   document.getElementById("number_of_press").innerHTML = number_of_guess;                      //update the innerhtml
   document.getElementById("secret_word_text_id").innerHTML = guessed_characters.join("");
}



   var number_of_button_presses = document.getElementById('number_of_press');
   number_of_button_presses.innerHTML = n

   var count = 0;
   var btn = document.getElementById("btn");

   var disp = document.getElementById("number_of_press");
  
   function noClick() {
       count++;
       disp.innerHTML = count;
   }