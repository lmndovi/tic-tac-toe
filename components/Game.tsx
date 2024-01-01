"use client";

import { useState } from "react";
import { Button } from "./ui/button";

type Player = "X" | "O";

interface BoardState {
  squares: Player[];
  currentPlayer: Player;
  winner: Player | null;
}

const initialBoardState: BoardState = {
  squares: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
};

const calculateWinner = (squares: Player[]): Player | null => {
  const winPatterns: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Game: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(initialBoardState);

  const makeMove = (index: number) => {
    if (board.squares[index] || board.winner) {
      return;
    }

    const squares = board.squares.slice();
    squares[index] = board.currentPlayer;

    const winner = calculateWinner(squares);

    setBoard({
      squares,
      currentPlayer: board.currentPlayer === "X" ? "O" : "X",
      winner,
    });
  };

  const renderSquare = (index: number) => (
    <div
      className="w-16 h-16 border-2 border-gray-300 flex items-center justify-center text-2xl cursor-pointer"
      onClick={() => makeMove(index)}
    >
      {board.squares[index]}
    </div>
  );

  const resetGame = () => {
    setBoard(initialBoardState);
  };

  const status = board.winner
    ? `Player ${board.winner} wins!`
    : board.squares.every((cell) => cell !== null)
    ? "It's a draw!"
    : `Next player: ${board.currentPlayer}`;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#242424]">
      <div className="grid">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex text-white">
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <div className="mt-5 text-2xl font-semibold text-white">{status}</div>
      <Button
        variant="reset"
        className="mt-5 text-base px-4 py-2 cursor-pointer"
        onClick={resetGame}
      >
        Reset Game
      </Button>
    </div>
  );
};

export default Game;
