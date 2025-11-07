import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Play } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();
  const [joke, setJoke] = useState('');

  const fetchJoke = async () => {
    try {
      const resp = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json', 'User-Agent': 'BingoGame (adesh@example.com)' }
      });
      const data = await resp.json();
      setJoke(data.joke);
    } catch {
      setJoke('Couldn’t fetch a joke right now 😅');
    }
  };

  useEffect(() => {
    fetchJoke();                    
    const iv = setInterval(fetchJoke, 60 * 1000); 
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="h-screen bg-red-500 flex flex-col items-center justify-between p-4">
      <div className="text-center mt-4">
        <h1 className="text-6xl font-bold text-yellow-300 drop-shadow-lg">B.I.N.G.O</h1>
        <p className="mt-2 text-xl text-white font-semibold">
          Created to tackle your office boardom!
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div
          onClick={() => navigate('/join')}
          className="bg-blue-500 hover:bg-blue-600 w-36 h-36 rounded-2xl shadow-xl cursor-pointer flex flex-col items-center justify-center border-4 border-white"
        >
          <Users className="w-12 h-12 text-yellow-300 mb-2" />
          <h2 className="text-2xl font-bold text-white">Join</h2>
        </div>

        <div
          onClick={() => navigate('/create')}
          className="bg-green-500 hover:bg-green-600 w-36 h-36 rounded-2xl shadow-xl cursor-pointer flex flex-col items-center justify-center border-4 border-white"
        >
          <Play className="w-12 h-12 text-yellow-300 mb-2" />
          <h2 className="text-2xl font-bold text-white">Create</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-lg w-full max-w-md border-4 border-yellow-400">
        <h3 className="text-center text-lg font-bold text-blue-600 mb-2">
          I want to tell you something…
        </h3>
        <p className="text-center text-gray-800 italic">{joke}</p>
      </div>

      <footer className="w-full flex flex-col items-center text-white text-sm">
        <div>Created by Adesh Gaurav</div>
        <div className="flex gap-4 mt-1">
          <a href="https://www.linkedin.com/in/adeshgaurav/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} />
          </a>
          <a href="https://www.instagram.com/adeshgrv344/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} />
          </a>
          <a href="https://github.com/Adesh344" target="_blank" rel="noopener noreferrer">
            <FaGithub size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
