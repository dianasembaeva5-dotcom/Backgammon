import { GameMode, GameState, Point } from "./types";

const emptyBoard = (): Point[] => Array.from({ length: 24 }, () => ({ owner: null, count: 0 }));

export function createInitialGameState(mode: GameMode = "local"): GameState {
  const board = emptyBoard();
  const set = (index: number, owner: "white" | "black", count: number) => {
    board[index] = { owner, count };
  };

  set(0, "white", 2);
  set(11, "white", 5);
  set(16, "white", 3);
  set(18, "white", 5);
  set(23, "black", 2);
  set(12, "black", 5);
  set(7, "black", 3);
  set(5, "black", 5);

  return {
    board,
    currentPlayer: "white",
    dice: [],
    availableDice: [],
    bar: { white: 0, black: 0 },
    borneOff: { white: 0, black: 0 },
    status: "rolling",
    winner: null,
    mode,
    moveHistory: [],
    startedAt: new Date().toISOString(),
    finishedAt: null,
  };
}
