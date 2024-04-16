import { useMemo, useState } from 'react'
import * as BoardControls from './Board.controls';

import s from './Board.module.css';


enum cellState {
  x = -1,
  n,
  y,
};

type player = cellState.x | cellState.y;

type moves = [number | null, number | null, number | null];

function checkWin(squares : number[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) 
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) 
      return squares[a];
  
  return cellState.n;
}

export default function App({ emit } : { emit : () => void }) {
  const [turn,_turn] = useState<player>(cellState.x);

  const turns = {
    [cellState.x] : useState<moves>([null,null,null]),
    [cellState.y] : useState<moves>([null,null,null]),
  }

  const cells = useMemo(() => {
    const r = Array(9).fill(cellState.n);

    for (const e of turns[cellState.x][0])
      if (e !== null) r[e] = cellState.x;

    for (const e of turns[cellState.y][0])
      if (e != null) r[e] = cellState.y;

    return r;
  }, [turns[cellState.x], turns[cellState.y]]);

  const winner = useMemo(() => checkWin(cells), [cells]);
  const toDie = useMemo(() => turns[turn][0][0], [turns[cellState.x], turns[cellState.y]]);

  const hancleClick = function(ev : any) {
    const i : number = Number(ev.target.dataset['index']);

    turns[turn][1](([_, ...t]) => [...t, i]);
    _turn(t => -t);
  };

  const handleRetry = function() {
    turns[cellState.x][1](Array(3).fill(null) as moves);
    turns[cellState.y][1](Array(3).fill(null) as moves);
  }
  const handleMenu = function() {
    emit();
  }

  return (
    <>
      <main className='h-full flex-grow grid place-items-center'>

        <div className=''>
          <div className={`${s.cell} mx-auto size-12 flex items-center justify-center my-6 rounded-full border-2 text-center`} data-status={winner || turn}></div>

          <div className={`${s.board} grid grid-cols-3 grid-rows-3 size-64 gap-2 text-center ${winner && 'filter saturate-50 brightness-75'}`}>
            { cells.map((c, i) => (<button key={i} onClick={hancleClick} disabled={winner || c} className={`${s.cell} border-2 rounded`} data-limbo={winner ? false : toDie === i} data-status={c} data-index={i}></button>)) }
          </div>

        </div>
      </main>
      <BoardControls.BottomMenu handleMenu={handleMenu} handleRetry={handleRetry} winner={winner} />
    </>
  )
}
