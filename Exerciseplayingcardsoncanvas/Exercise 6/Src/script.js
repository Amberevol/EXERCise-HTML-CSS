const HEARTS = 1;
const DIAMONDS = 2;
const SPADES = 3;
const CLUBS = 4;

const CARD_WIDTH = 150;
const CARD_HEIGHT = 215;

let card_back_image = new Image();
card_back_image.src = "playing_cards_images/card_back.png";

// The following specifies a class named Point.
// A Point object can contain the coordinates
// of a point in a graphical drawing surface.

class Point {
  constructor(given_x_coordinate, given_y_coordinate) {
    this.x = given_x_coordinate;
    this.y = given_y_coordinate;
  }
}

// Next, we specify a class named Card.

class Card {
  constructor(given_card_rank, given_card_suit) {
    this.card_rank = given_card_rank;
    this.card_suit = given_card_suit;

    this.card_image = new Image();

    //  face-up   =  card suit and rank are visible
    //  face-down =  card suit and rank are not visible

    this.this_card_is_face_up = false;

    this.card_position = null;

    //  The files that contain card face images are have
    //  names such as hearts1.png, hearts2.png, hearts3.png, etc.
    //  They are located in a folder named playing_cards_images.
    //  Next we'll programmatically create the file names and
    //  start referring to the image files.

    if (this.card_suit == HEARTS) {
      this.card_image.src =
        "playing_cards_images/hearts" + this.card_rank + ".png";
    } else if (this.card_suit == DIAMONDS) {
      this.card_image.src =
        "playing_cards_images/diamonds" + this.card_rank + ".png";
    } else if (this.card_suit == SPADES) {
      this.card_image.src =
        "playing_cards_images/spades" + this.card_rank + ".png";
    } else if (this.card_suit == CLUBS) {
      this.card_image.src =
        "playing_cards_images/clubs" + this.card_rank + ".png";
    }
  } // end of Card constructor

  get_rank() {
    return this.card_rank;
  }

  get_suit() {
    return this.card_suit;
  }

  get_card_position() {
    return this.card_position;
  }

  turn_card() {
    if (this.this_card_is_face_up == true) {
      this.this_card_is_face_up = false;
    } else {
      this.this_card_is_face_up = true;
    }
  }

  turn_card_face_up() {
    this.this_card_is_face_up = true;
  }

  turn_card_face_down() {
    this.this_card_is_face_up = false;
  }

  card_is_face_up() {
    return this.this_card_is_face_up == true;
  }

  card_is_face_down() {
    return this.this_card_is_face_up == false;
  }

  set_card_position(given_position) {
    this.card_position = given_position;
  }

  get_suit_as_string() {
    let string_to_return = "";

    switch (this.card_suit) {
      case HEARTS:
        string_to_return = "Hearts";
        break;
      case DIAMONDS:
        string_to_return = "Diamonds";
        break;
      case SPADES:
        string_to_return = "Spades";
        break;
      case CLUBS:
        string_to_return = "Clubs";
        break;
      default:
        string_to_return = "Program error!!!";
    }

    return string_to_return;
  }

  // With the following methods it is possible to compare
  // "this" card to anohter card.

  // Making general comparisons between cards is somewhat
  // difficult as different card games value cards in
  // different ways. All the following methods are not
  // suitable for all card games. One known problem is that
  // an Ace is considered the smallest card by the methods.

  belongs_to_suit_of(another_card) {
    return this.card_suit == another_card.card_suit;
  }

  does_not_belong_to_suit_of(another_card) {
    return this.card_suit != another_card.card_suit;
  }

  is_smaller_than(another_card) {
    return this.card_rank < another_card.card_rank;
  }

  is_greater_than(another_card) {
    return this.card_rank > another_card.card_rank;
  }

  has_equal_rank_as(another_card) {
    return this.card_rank == another_card.card_rank;
  }

  has_different_rank_as(another_card) {
    return this.card_rank != another_card.card_rank;
  }

  contains_point(given_point) {
    return (
      this.card_position != null &&
      given_point.x >= this.card_position.x &&
      given_point.x <= this.card_position.x + CARD_WIDTH &&
      given_point.y >= this.card_position.y &&
      given_point.y <= this.card_position.y + CARD_HEIGHT
    );
  }

  draw(context) {
    if (this.card_position != null) {
      if (this.this_card_is_face_up == true) {
        context.drawImage(
          this.card_image,
          this.card_position.x,
          this.card_position.y
        );
      } else {
        context.drawImage(
          card_back_image,
          this.card_position.x,
          this.card_position.y
        );
      }
    } else {
      context.strokeText("Attempt to draw a card without a position.", 10, 20);
    }
  }
} // end of class Card

// The following is a general-purpose function that is used
// to shuffle the elements of an array.

function shuffle(given_array) {
  let current_index = given_array.length;

  // While there remain elements to shuffle...
  while (current_index > 0) {
    let random_index = Math.floor(Math.random() * current_index);

    current_index--;

    // Swap a random element with the current element.
    let element_to_swap = given_array[current_index];
    given_array[current_index] = given_array[random_index];
    given_array[random_index] = element_to_swap;
  }
}

class CardDeck {
  constructor() {
    this.suits = [HEARTS, DIAMONDS, SPADES, CLUBS];

    this.cards_in_this_deck = [];

    for (let suit_index = 0; suit_index < 4; suit_index++) {
      for (let card_rank = 1; card_rank < 14; card_rank++) {
        this.add_card(new Card(card_rank, this.suits[suit_index]));
      }
    }
  } // end of constructor

  // The following are CardDeck methods.

  add_card(given_card) {
    if (this.cards_in_this_deck.length < 52) {
      this.cards_in_this_deck.push(given_card);
    }
  }

  shuffle() {
    shuffle(this.cards_in_this_deck);
  }

  get_card() {
    //  Value null is returned if there are no available cards
    //  in the deck.

    //  If cards are left in the deck, the last card in the array
    //  is returned, and the returned card is removed from the deck.

    let card_to_return = null;

    if (this.cards_in_this_deck.length > 0) {
      // Method pop() returns a reference to the
      // object that it removes from the array.

      card_to_return = this.cards_in_this_deck.pop();
    }

    return card_to_return;
  }
} // end of class CardDeck

// The 'main' program begins.

let card_deck = new CardDeck();

let row_of_cards = [];

let lonesome_card = null;

let selected_card = null;

function button_to_deal_cards_clicked() {
  for (let card_index = 0; card_index < 5; card_index++) {
    if (row_of_cards[card_index].card_is_face_down()) {
      let new_card = card_deck.get_card();
      let card_position = row_of_cards[card_index].get_card_position();
      new_card.set_card_position(card_position);
      row_of_cards[card_index] = new_card;
    }
  }
  if (lonesome_card.card_is_face_down()) {
    let new_lonesome_card = card_deck.get_card();
    new_lonesome_card.set_card_position(new Point(188, 300));
    lonesome_card = new_lonesome_card;
  }
  draw_on_canvas();
}

function button_to_shuffle_deck_clicked() {
  card_deck.shuffle();

  draw_on_canvas();
}

function on_mouse_up(event) {
  let pointer_position_x = event.offsetX;
  let pointer_position_y = event.offsetY;

  let clicked_point = new Point(pointer_position_x, pointer_position_y);

  if (row_of_cards.length == 5) {
    //  There are five cards in the row. We'll check whether
    //  any of the cards in the row were clicked.

    for (let card_index = 0; card_index < row_of_cards.length; card_index++) {
      if (row_of_cards[card_index].contains_point(clicked_point)) {
        row_of_cards[card_index].turn_card();

        //  selected_card will point to the clicked card.
        //  In this program, however, selected_card is not
        //  used for any purpose.

        selected_card = row_of_cards[card_index];
      }
    }

    if (lonesome_card != null && lonesome_card.contains_point(clicked_point)) {
      lonesome_card.turn_card();
    }

    draw_on_canvas();
  }
}

function is_flush() {
  const first_card = row_of_cards[0];
  return row_of_cards.every(
    (card) => card.belongs_to_suit_of(first_card) && card.card_is_face_up()
  );
}

function is_four_of_a_kind() {
  if (row_of_cards.length === 5) {
    const cards = new Set();
    row_of_cards.forEach((card) => cards.add(card.card_rank));
    if (cards.size > 2) return false;

    // need to know which card
    const first_rank = Array.from(cards)[0];
    const first_rank_cards = row_of_cards.filter(
      (card) => card.card_rank === first_rank
    );

    const four_of_a_kind_rank =
      first_rank_cards.length === 4 ? first_rank : Array.from(cards)[1];

    const is_four_of_a_kind_face_up = row_of_cards
      .filter((card) => card.card_rank === four_of_a_kind_rank)
      .every((card) => card.card_is_face_up());

    return is_four_of_a_kind_face_up;
  }
  return false;
}

function draw_on_canvas() {
  let canvas = document.getElementById("playing_cards_canvas");
  let context = canvas.getContext("2d");

  // We'll fill the entire canvas with a color.
  let canvas_fill_colour = "rgb( 92, 250, 13 )";

  // all need to be of same suit

  if (is_flush()) canvas_fill_colour = "red";
  else if (is_four_of_a_kind()) canvas_fill_colour = "gold";

  context.fillStyle = canvas_fill_colour; // bright green
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (row_of_cards.length > 0) {
    for (card_index in row_of_cards) {
      row_of_cards[card_index].draw(context);
    }

    // The lonesome card will be drawn only if there were
    // cards in the row.

    if (lonesome_card != null) {
      lonesome_card.draw(context);
    }
  } else {
    context.strokeText("CLICK THE CARDS AFTER DEALING.", 100, 100);
  }
}

function initialize_game() {
  card_deck.shuffle();
  row_of_cards = []; // Emptying the array.

  for (let card_index = 0; card_index < 5; card_index++) {
    let new_card = card_deck.get_card();

    let card_position = new Point(40 + (CARD_WIDTH + 20) * card_index, 50);

    new_card.set_card_position(card_position);
    new_card.turn_card_face_up();
    row_of_cards.push(new_card);
  }

  lonesome_card = card_deck.get_card();
  lonesome_card.set_card_position(new Point(188, 300));
  lonesome_card.turn_card_face_up();
  draw_on_canvas();
}