import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, User } from 'lucide-react';

const CreateGamePage = ({ isJoined }) => {
    const [createData, setCreateData] = useState({ name: '', gameCode: '' });
    const navigate = useNavigate();

   isJoined = true;

    useEffect(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCreateData(prev => ({ ...prev, gameCode: code }));
    }, []);

    const copyGameCode = async () => {
        try {
            await navigator.clipboard.writeText(createData.gameCode);
            alert('Game code copied!');
        } catch {
            alert('Failed to copy code');
        }
    };

    const startGame = () => {
        if (createData.name) {
            navigate('/game');
        } else {
            alert('Please enter your name!');
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

            <div className="bg-white rounded-3xl p-5 shadow-2xl border-4 border-yellow-400 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Create Game</h1>

                <div className="bg-black rounded-2xl p-3 mb-6 border-4 border-purple-400">
                    <h3 className="text-l font-bold text-yellow-300 text-center mb-4">Players Joined</h3>

                    <div className="flex justify-center">
                        <div
                            className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300 ${isJoined ? 'bg-green-500' : 'bg-gray-500'
                                }`}
                        >
                            <User className="text-white w-10 h-10" />
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-xl font-bold text-green-600 mb-2">Your Name</label>
                        <input
                            type="text"
                            value={createData.name}
                            onChange={(e) => setCreateData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full p-4 text-xl border-4 border-blue-400 rounded-xl"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-xl font-bold text-green-600 mb-2">Game Code</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={createData.gameCode}
                                readOnly
                                className="flex-1 p-4 text-xl border-4 border-blue-400 rounded-xl bg-gray-100 font-mono"
                            />
                            <button
                                onClick={copyGameCode}
                                className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-xl border-4 border-yellow-400"
                            >
                                <Copy className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={startGame}
                        disabled={!isJoined}
                        className={`w-full text-white font-bold text-2xl py-4 rounded-xl border-4 
                            ${isJoined 
                              ? 'bg-green-500 hover:bg-green-600 border-yellow-400 cursor-pointer' 
                              : 'bg-gray-400 border-gray-300 cursor-not-allowed'
                            }`}
                                                >
                        Start Game!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateGamePage;
