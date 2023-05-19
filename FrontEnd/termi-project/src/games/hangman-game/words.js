

// function to create a randomized letter matrix based on a given word

export const createLetterMatrix = (pickedWord, all_letters) => {
  let word_letters = Array.from(new Set(pickedWord)).filter(l => l !== " "); // Exclude space character
  let rest_of_letters = all_letters
    .split("")
    .filter((l) => !word_letters.includes(l) && l !== " "); // Exclude space character from rest_of_letters
  for (let i = word_letters.length; i < 21; i++) {
    // -- pick new random letter from the rest of the letters
    const new_ltr =
      rest_of_letters[Math.floor(Math.random() * rest_of_letters.length)];
    word_letters = [...word_letters, new_ltr.toLowerCase()];
    rest_of_letters = rest_of_letters.filter((l) => l !== new_ltr);
  }
  // -- randomize elements
  const shuffle = (array) => array.sort(() => 0.5 - Math.random());
  let random_values = word_letters;

  // Shuffle the letters multiple times
  for (let i = 0; i < 5; i++) {
    random_values = shuffle(random_values);
  }

  return random_values;
};





