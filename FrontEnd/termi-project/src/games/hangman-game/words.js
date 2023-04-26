

// function to create a randomized letter matrix based on a given word
export const createLetterMatrix = (pickedWord,all_letters) => {
  
  let word_letters = Array.from(new Set(pickedWord)); // -- under 16 letters
  let rest_of_letters = all_letters.split('').filter(l => !word_letters.includes(l));
  for (let i = word_letters.length; i < 21; i++) {
    // -- pick new random letter from the rest of the letters
    const new_ltr = rest_of_letters[Math.floor(Math.random() * rest_of_letters.length)];
    word_letters = [...word_letters, new_ltr.toLowerCase()];
    rest_of_letters = rest_of_letters.filter(l => l !== new_ltr);
  }
  // -- randomize elements
  const random_values = word_letters.sort((a, b) => .5 - Math.random());
  
  return random_values;
};



// export the relevant objects and functions

