import React, { useState } from 'react';

import play_Icon from "../../assets/images/play_Icon.svg";
import "./Crossword.css";

const puzzle = {
  size: 5,
  grid: [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O'],
    ['P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y']
  ],
  clues: {
    across: {
      1: { clue: 'A word for "hello" in Spanish', answer: 'hola' },
      5: { clue: 'A type of tree', answer: 'oak' },
      9: { clue: 'An animal that swims in the ocean', answer: 'shark' }
    },
    down: {
      3: { clue: 'A type of fruit', answer: 'apple' },
      7: { clue: 'A type of bird', answer: 'pigeon' }
    }
  }
};

const CrosswordGame = () => {
	const [grid, setGrid] = useState(puzzle.grid);
	const [clues, setClues] = useState(puzzle.clues);
	
	// function to validate user input for a given cell
	const validateInput = (x, y, value) => {
		// check if the input matches the correct answer for the clue
		const clue = clues.across[x] || clues.down[y];
		if (clue && clue.answer === value) {
			// if the input is correct, update the grid with the new value
			setGrid(prevGrid => {
				const newGrid = prevGrid.map(row => [...row]);
				newGrid[y][x] = value;
				return newGrid;
			});
		}
	};

	// Function to reset the game
	const resetGame = () => {
	  setGrid(puzzle.grid);
	  setClues(puzzle.clues);
	};
	
	// render the game grid
	const renderGrid = () => {
	  return grid.map((row, y) => {
	    return (
	      <div key={y} className="grid-row">
	        {row.map((cell, x) => {
	          return (
	            <input
	              key={x}
	              className="grid-cell"
	              value={cell}
	              onChange={e => validateInput(x, y, e.target.value)}
	            />
	          );
	        })}
	      </div>
	    );
	  });
	};
	
	// render the clues
	const renderClues = direction => {
	  return Object.entries(clues[direction]).map(([id, clue]) => {
	    return (
	      <div key={id} className="clue">
	        <div className="clue-id">{id}</div>
	        <div className="clue-text">{clue.clue}</div>
	      </div>
	    );
	  });
	};
	
	return (
		<>
			<div className="banner banner_game">
				<div className="wrapper">
					<div className="banner_content"></div>
				</div>
			</div>
			<h1>Memory Game</h1>
			<div className="crossword-game">
				<div className="game-grid">{renderGrid()}</div>
				<div className="game-clues">
					<div className="clues-across">
						<h3>Across</h3>
						{renderClues('across')}
						</div>
					<div className="clues-down">
						<h3>Down</h3>
						{renderClues('down')}
					</div>
				</div>
				<div className="game-controls">
					<button onClick={resetGame}>Reset Game</button>
				</div>
			</div>
		</>
	);
};

export default CrosswordGame;