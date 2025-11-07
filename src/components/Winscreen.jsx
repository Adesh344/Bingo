import React from 'react'

const WinScreen = () => {
    <div className="fixed inset-0 bg-blue-500 flex flex-col items-center justify-center z-50 animate-pulse">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-yellow-300 mb-8 animate-bounce">
          🎉 YOU WON! 🎉
        </h1>
        <div className="text-6xl mb-8">
          🏆 🎊 🥳 ⭐ 🎈
        </div>
        <p className="text-4xl font-bold text-white mb-8">
          Congratulations! You completed BINGO!
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
};

export default Winscreen;