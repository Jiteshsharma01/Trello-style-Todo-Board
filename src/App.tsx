import './App.css'
import React from 'react';
import Board from './components/Board';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <h1 className="text-center text-xl font-bold py-6">Trello Todo Board</h1>
      <Board />
    </div>
  );
};

export default App;
