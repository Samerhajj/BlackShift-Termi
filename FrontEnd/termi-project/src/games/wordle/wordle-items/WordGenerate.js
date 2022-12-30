import {WORDS} from "./words";
// import axios from "axios"
// hi samer yoo needd to import WORDS 
// no you can use this link to fetch the data : http://dir.y2022.kinneret.cc:7013/search

    export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
    
export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  console.log(WORDS);
      todaysWord = WORDS[Math.floor(Math.random() * WORDS.length)];
      wordSet = new Set(WORDS);
// await fetch(WORDS)
//     .then((response) => response.text())
//     .then((result) => {
//       const wordArr = result.split("\n");
//       todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
//       wordSet = new Set(wordArr);
//     });
  return { wordSet, todaysWord };
};