import { io, type Socket } from 'socket.io-client';

import { useCallback, useRef, useState } from 'react';
import OnlineBoard from './components/Board';
import LocalBoard from './components/Board.local';

enum gameStates {
  waiting,
  playing,
  menu,
  local,
}

enum playType { local, online }

function App() {
  
  const [gameState, _gameState] = useState(gameStates.menu);
  const socket = useRef<Socket | null>(null);
  const player = useRef(0);

  const handleQuit = useCallback((p? : any) => {
    CancelOnline();
  }, []);

  const handleMenu = useCallback(function (p : playType) {
    switch (p) {
      case playType.online:
        const s = io(import.meta.env.VITE_server_URL);
        _gameState(gameStates.waiting);
    
        s.on('room_joined', p => {
          player.current = [-1, 1][p.players - 1];
        });
    
        s.on('game_start', () => {
          _gameState(gameStates.playing);
        });
    
        socket.current = s;
        break;
    
      case playType.local:
        _gameState(gameStates.local);
        break;
    }
  }, []);

  const CancelOnline = function() {
    _gameState(gameStates.menu);
    player.current = 0;

    socket.current?.disconnect();
    socket.current = null;
  }

  return (
    <div className="h-full flex-grow grid place-items-center text-center">
      <div>
        <hgroup className='text-left mb-12'>
          <h1 className='text-3xl'>Welcome to Infinite Tic-Tac-Toe</h1>
          <p className='text-hierarchy-1'>a <strong>clone</strong> game based on a <a className='text-blue-300 hover:underline' href="https://www.lo10m.com/products/giiker-tic-tac-toe-bolt-best-family-game-for-6-99yrs">toy</a></p>
        </hgroup>

        { gameState === gameStates.menu && <>
          <h2 className='my-4 text-lg'>how would you like to play?</h2>
          <ul className='flex flex-col gap-2 w-32 mx-auto items-stretch'>
            <li><button onClick={handleMenu.bind(null, playType.online)} className="block p-2 w-full border rounded hover:bg-hierarchy-0 hover:text-hierarchy-3 transition-colors cursor-pointer">Online</button></li>
            <li><button onClick={handleMenu.bind(null, playType.local)} className="block p-2 w-full border rounded hover:bg-hierarchy-0 hover:text-hierarchy-3 transition-colors cursor-pointer">Local</button></li>
          </ul>
        </>}

        { gameState === gameStates.waiting && <footer className="h-full text-left">
          <hgroup className='mb-6'>
            <h2 className='text-lg '>GameMode: Online</h2>
            <p className='text-hierarchy-1'>please wait while waiting for an oponent...</p>
          </hgroup>
          <button onClick={CancelOnline} className=' block p-2 w-32 mx-auto border rounded hover:bg-hierarchy-0 hover:text-hierarchy-3 transition-colors cursor-pointer'>Cancel</button>
        </footer> }
        
        { gameState === gameStates.playing && <OnlineBoard socket={socket.current!} player={player.current} emit={handleQuit} /> }
        { gameState === gameStates.local && <LocalBoard emit={handleQuit}/> }
      </div>
    </div>
  )
}

export default App;
