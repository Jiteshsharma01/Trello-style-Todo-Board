import './App.css'
import React from 'react';
import Board from './components/Board/Board';
import { Provider } from 'react-redux';
import {store} from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-w-screen min-h-screen bg-[#e9f6ff]">
        <h1 className="text-center text-3xl font-bold py-6">Trello Todo Board</h1>
        <Board />
      </div>
    </Provider>
  );
};

export default App;
