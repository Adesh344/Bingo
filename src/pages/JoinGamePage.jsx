import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinGamePage = () => {
  const [joinData, setJoinData] = useState({ name: '', gameId: '' });
  const navigate = useNavigate();

  const joinGame = () => {
    if (joinData.name && joinData.gameId) {
      navigate('/game');
    } else {
      alert('Please fill in both fields!');
    }
  };

  return (
    <div className="min-h-screen bg-red-500 flex flex-col items-center justify-center p-8">
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg border-2 border-white"
      >
        ← Back
      </button>

      <div className="bg-white rounded-3xl p-10 shadow-2xl border-4 border-yellow-400 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Join Game</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-xl font-bold text-green-600 mb-2">Your Name</label>
            <input
              type="text"
              value={joinData.name}
              onChange={(e) => setJoinData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-4 text-xl border-4 border-blue-400 rounded-xl"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-xl font-bold text-green-600 mb-2">Game ID</label>
            <input
              type="text"
              value={joinData.gameId}
              onChange={(e) => setJoinData(prev => ({ ...prev, gameId: e.target.value }))}
              className="w-full p-4 text-xl border-4 border-blue-400 rounded-xl"
              placeholder="Enter game ID"
            />
          </div>

          <button
            onClick={joinGame}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-2xl py-4 rounded-xl border-4 border-yellow-400"
          >
            Join Game!
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGamePage;
