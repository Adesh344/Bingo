import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState(Array(25).fill(null));
  const [markedCells, setMarkedCells] = useState(Array(25).fill(false));
  const [isAnimating, setIsAnimating] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState([]);
  const [bingoLetters, setBingoLetters] = useState({
    B: { completed: false, clicked: false },
    I: { completed: false, clicked: false },
    N: { completed: false, clicked: false },
    G: { completed: false, clicked: false },
    O: { completed: false, clicked: false }
  });
  const [showWinScreen, setShowWinScreen] = useState(false);

  const bingoLettersArray = ['B', 'I', 'N', 'G', 'O'];

  // Generate random numbers 1-25 and shuffle them
  const generateRandomNumbers = () => {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  };

  // Check if a line is complete
  const checkLineCompletion = (markedCells) => {
    const lines = [
      // Rows
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      // Columns
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      // Diagonals
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20]
    ];

    const newCompletedLines = [];
    lines.forEach((line, index) => {
      if (line.every(cellIndex => markedCells[cellIndex])) {
        newCompletedLines.push(index);
      }
    });

    return newCompletedLines;
  };

  // Update BINGO letters when lines are completed
  useEffect(() => {
    if (gameStarted) {
      const newCompletedLines = checkLineCompletion(markedCells);
      const newlyCompletedLines = newCompletedLines.filter(line => !completedLines.includes(line));
      
      if (newlyCompletedLines.length > 0) {
        setCompletedLines(newCompletedLines);
        
        // Update BINGO letters
        setBingoLetters(prev => {
          const newBingoLetters = { ...prev };
          const completedCount = newCompletedLines.length;
          
          bingoLettersArray.slice(0, completedCount).forEach(letter => {
            if (!newBingoLetters[letter].completed) {
              newBingoLetters[letter].completed = true;
            }
          });
          
          return newBingoLetters;
        });
      }
    }
  }, [markedCells, gameStarted, completedLines]);

  // Animation effect to fill numbers randomly
  useEffect(() => {
    if (isAnimating) {
      const randomNumbers = generateRandomNumbers();
      const interval = setInterval(() => {
        if (currentAnimationIndex < 25) {
          setGrid(prev => {
            const newGrid = [...prev];
            newGrid[currentAnimationIndex] = randomNumbers[currentAnimationIndex];
            return newGrid;
          });
          setCurrentAnimationIndex(prev => prev + 1);
        } else {
          setIsAnimating(false);
          setGameStarted(true);
          clearInterval(interval);
        }
      }, 200); 

      return () => clearInterval(interval);
    }
  }, [currentAnimationIndex, isAnimating]);

  // Handle cell click
  const handleCellClick = (index) => {
    if (gameStarted && !markedCells[index]) {
      setMarkedCells(prev => {
        const newMarked = [...prev];
        newMarked[index] = true;
        return newMarked;
      });
    }
  };

  // Handle BINGO letter click
  const handleLetterClick = (letter) => {
    if (bingoLetters[letter].completed && !bingoLetters[letter].clicked) {
      setBingoLetters(prev => ({
        ...prev,
        [letter]: { ...prev[letter], clicked: true }
      }));
    }
  };

  // Check if all BINGO letters are clicked
  const allLettersClicked = Object.values(bingoLetters).every(letter => letter.clicked);

  // Handle BINGO button click
  const handleBingoClick = () => {
    if (allLettersClicked) {
      setShowWinScreen(true);
    }
  };

  // Win Screen Component
  const WinScreen = () => (
    <div className="fixed inset-0 bg-blue-500 flex flex-col items-center justify-center z-50 animate-pulse">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-yellow-300 mb-8 animate-bounce">
          🎉 BINGOOOOOOO! 🎉
        </h1>
        <div className="text-6xl mb-8">
          🏆 🎊 🥳 ⭐ 🎈
        </div>
        <p className="text-4xl font-bold text-white mb-8">
          Congratulations! You Won!
        </p>
        <button
          onClick={() => {
            setShowWinScreen(false);
            navigate('/');
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-2xl px-8 py-4 rounded-full border-4 border-yellow-400 transform hover:scale-105 transition-all duration-300"
        >
          Play Again! 🎮
        </button>
      </div>
    </div>
  );

  if (showWinScreen) {
    return <WinScreen />;
  }

  return (
    <div className="min-h-screen bg-red-500 flex flex-col items-center justify-center p-8">
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg border-2 border-white"
      >
        ← Back
      </button>

      <div className="text-center w-full max-w-4xl">
        {/* Smaller BINGO heading */}
        <h1 className="text-3xl font-bold text-yellow-300 mb-8 drop-shadow-lg tracking-wider">
          Let's Play Now!
        </h1>

        {/* Game status message */}
        {isAnimating && (
          <div className="mb-6">
            <p className="text-2xl font-bold text-white bg-blue-500 rounded-full px-6 py-3 border-4 border-yellow-400">
              Filling Numbers... {currentAnimationIndex}/25
            </p>
          </div>
        )}

        {gameStarted && !isAnimating && (
          <div className="mb-6">
            <p className="text-2xl font-bold text-white bg-green-500 rounded-full px-6 py-3 border-4 border-yellow-400 animate-pulse">
              🎉 Game Started! Click numbers to mark them! 🎉
            </p>
          </div>
        )}

        {/* BINGO Grid with Letters */}
        <div className="bg-white rounded-3xl p-4 shadow-2xl border-4 border-yellow-400">
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-5 gap-1">
              {grid.map((number, index) => (
                <div
                  key={index}
                  onClick={() => handleCellClick(index)}
                  className={`
                    w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-xl border-4 transition-all duration-300 cursor-pointer
                    ${markedCells[index] 
                      ? 'bg-gray-400 border-gray-600 text-gray-700 cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-600 border-yellow-400 text-white hover:scale-105'
                    }
                    ${gameStarted && !markedCells[index] ? 'hover:shadow-lg' : ''}
                  `}
                >
                  {number && (
                    <div className="relative">
                      {number}
                      {markedCells[index] && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-red-600 text-3xl font-bold">✕</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* BINGO Letters beside rows */}
            <div className="ml-8 flex flex-col gap-1">
              {bingoLettersArray.map((letter, index) => (
                <div
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  className={`
                    w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-full border-4 transition-all duration-300 cursor-pointer
                    ${bingoLetters[letter].clicked 
                      ? 'bg-gray-400 border-gray-600 text-gray-700 cursor-not-allowed'
                      : bingoLetters[letter].completed
                        ? 'bg-yellow-400 border-green-500 text-green-800 animate-pulse hover:scale-110'
                        : 'bg-yellow-400 border-yellow-600 text-yellow-800 opacity-50'
                    }
                  `}
                >
                  <div className="relative">
                    {letter}
                    {bingoLetters[letter].clicked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-red-600 text-3xl font-bold">✕</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BINGO Button */}
        <div className="mt-8">
          <button
            onClick={handleBingoClick}
            disabled={!allLettersClicked}
            className={`
              text-3xl font-bold px-12 py-4 rounded-full border-4 border-yellow-400 transition-all duration-300
              ${allLettersClicked 
                ? 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white hover:scale-110 cursor-pointer animate-pulse'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
              }
            `}
          >
            BINGO 🍕
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;