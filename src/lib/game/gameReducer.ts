import { getLegalMoves } from "./moveGenerator";
import { checkWinner, isLegalMove, rollDice, switchTurn } from "./rules";
import { GameState, Move } from "./types";

export function startRoll(state: GameState): GameState {
  const dice = rollDice();
  return { ...state, dice, availableDice: dice, status: "moving" };
}

export function applyMove(state: GameState, move: Move): GameState {
  if (!isLegalMove(state, move)) return state;
  const board = state.board.map((point) => ({ ...point }));
  const bar = { ...state.bar };
  const borneOff = { ...state.borneOff };

  if (move.from === "bar") {
    bar[move.player] -= 1;
  } else {
    board[move.from].count -= 1;
    if (board[move.from].count === 0) board[move.from].owner = null;
  }

  if (move.to === "off") {
    borneOff[move.player] += 1;
  } else {
    const dest = board[move.to];
    if (dest.owner && dest.owner !== move.player && dest.count === 1) {
      bar[dest.owner] += 1;
      board[move.to] = { owner: move.player, count: 1 };
    } else {
      board[move.to] = { owner: move.player, count: dest.owner === move.player ? dest.count + 1 : 1 };
    }
  }

  const dieIndex = state.availableDice.indexOf(move.die);
  const availableDice = state.availableDice.filter((_, index) => index !== dieIndex);
  const next: GameState = {
    ...state,
    board,
    bar,
    borneOff,
    availableDice,
    moveHistory: [...state.moveHistory, move],
  };
  const winner = checkWinner(next);
  if (winner) return { ...next, winner, status: "finished", finishedAt: new Date().toISOString() };
  if (availableDice.length === 0 || getLegalMoves(next, state.currentPlayer).length === 0) return switchTurn(next);
  return next;
}

export { checkWinner, switchTurn };
