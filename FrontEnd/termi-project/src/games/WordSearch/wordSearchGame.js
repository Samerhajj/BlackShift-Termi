// React
import React, {useEffect, useState, useContext,useRef} from "react";

// Components
import {LoginContext} from "../../components/LoginContext";
import Menu from "../Menu/Menu";
import LanguageSelector from '../../components/LanguageSelector';

// Translate
import { useTranslation } from 'react-i18next';

// CSS and Elements
import "./MemoryGame.css";
import "../GamesStyles.css";
import "typeface-roboto";
import { MdOutlineReplay,MdArrowBack } from "react-icons/md";
import correctSFXaudio from "../../assets/sound/SFX/correct-sfx.wav";
import incorrectSFXaudio from "../../assets/sound/SFX/incorrect-sfx.mp3";
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';

// APIs
import LanguageMap from '../../api/LanguageAPI';
import GamesApi from '../../api/GamesAPI';
import GameHistoryAPI from '../../api/GameHistoryAPI';
import AchievementsAPI from '../../api/AchievementsAPI';
import NotificationsAPI from '../../api/NotificationsAPI';
const WordSearchGame = () => {
  // State variables
  const [words, setWords] = useState([]);
  const [board, setBoard] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // Fetch words from the API and initialize the game board
  useEffect(() => {
    // Fetch words using the random function from your GameAPI
    GameAPI.random(10, "words", "wordsearch")
      .then((response) => {
        if (response.success) {
          setWords(response.body);
          initializeBoard(response.body);
        } else {
          console.error(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Initialize the game board
  const initializeBoard = (wordList) => {
    // Logic to generate the game board based on the word list
    // You can implement your own logic here or use a library like word-search-generator

    // Example code to create a 5x5 board filled with random letters
    const boardSize = 5;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const newBoard = [];
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        row.push(randomLetter);
      }
      newBoard.push(row);
    }

    setBoard(newBoard);
  };

  // Handle cell selection
  const handleCellClick = (rowIndex, colIndex) => {
    // Ignore cell selection if the game is over or the cell is already selected
    if (isGameOver || selectedCells.find((cell) => cell.row === rowIndex && cell.col === colIndex)) {
      return;
    }

    // Add the selected cell to the list
    const updatedSelectedCells = [...selectedCells, { row: rowIndex, col: colIndex }];
    setSelectedCells(updatedSelectedCells);

    // Check if the selected cells form a valid word
    const selectedWord = getSelectedWord(updatedSelectedCells);
    if (selectedWord) {
      // Check if the selected word exists in the word list
      if (words.includes(selectedWord)) {
        console.log(`Found word: ${selectedWord}`);
        // Remove the found word from the word list
        const updatedWords = words.filter((word) => word !== selectedWord);
        setWords(updatedWords);
        // Check if all words have been found
        if (updatedWords.length === 0) {
          console.log("Game over! All words found.");
          setIsGameOver(true);
        }
      } else {
        console.log(`Selected word: ${selectedWord}`);
      }
    }
  };

  // Get the word formed by the selected cells
  const getSelectedWord = (selectedCells) => {
    // Logic to retrieve the word formed by the selected cells
    // You can implement your own logic here or use a library

    // Example code to get the word by joining the selected cell letters
    const sortedCells = selectedCells.sort((a, b) => a.row - b.row || a.col - b.col);
    const word = sortedCells.map((cell) => board[cell.row][cell.col]).join("");
    return word;
  };

  // Render the game board
  const renderBoard = () => {
    return (
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={selectedCells.find((c) => c.row === rowIndex && c.col === colIndex) ? "selected" : ""}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Render the WordSearchGame component
  return (
    <div>
      <h1>Word Search Game</h1>
      {isGameOver ? (
        <h2>Game over! All words found.</h2>
      ) : (
        <>
          <h2>Find the words:</h2>
          <ul>
            {words.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </>
      )}
      {renderBoard()}
    </div>
  );
};

export default WordSearchGame;