import { DiceValue, GameState, Move, Player } from "./types";

export function getDirection(player: Player): 1 | -1 {
  return player === "white" ? 1 : -1;
}

export function getHomeBoardRange(player: Player): number[] {
  return player === "white" ? [18, 19, 20, 21, 22, 23] : [0, 1, 2, 3, 4, 5];
}

export function rollDice(): DiceValue[] {
  const one = (Math.floor(Math.random() * 6) + 1) as DiceValue;
  const two = (Math.floor(Math.random() * 6) + 1) as DiceValue;
  return one === two ? [one, one, one, one] : [one, two];
}

export function canMoveToPoint(state: GameState, to: number, player: Player): boolean {
  if (to < 0 || to > 23) return false;
  const point = state.board[to];
  return point.owner === null || point.owner === player || point.count === 1;
}

export function isBearingOffAllowed(state: GameState, player: Player): boolean {
  if (state.bar[player] > 0) return false;
  const home = new Set(getHomeBoardRange(player));
  return state.board.every((point, index) => point.owner !== player || home.has(index));
}

export function checkWinner(state: GameState): Player | null {
  if (state.borneOff.white >= 15) return "white";
  if (state.borneOff.black >= 15) return "black";
  return null;
}

export function switchTurn(state: GameState): GameState {
  return {
    ...state,
    currentPlayer: state.currentPlayer === "white" ? "black" : "white",
    dice: [],
    availableDice: [],
    status: state.winner ? "finished" : "rolling",
  };
}

export function destinationFor(from: number | "bar", die: DiceValue, player: Player): number {
  if (from === "bar") return player === "white" ? die - 1 : 24 - die;
  return from + die * getDirection(player);
}

export function isLegalMove(state: GameState, move: Move): boolean {
  if (move.player !== state.currentPlayer) return false;
  if (!state.availableDice.includes(move.die)) return false;
  if (state.bar[move.player] > 0 && move.from !== "bar") return false;
  if (move.from !== "bar") {
    const point = state.board[move.from];
    if (!point || point.owner !== move.player || point.count < 1) return false;
  }
  if (move.to === "off") return isBearingOffAllowed(state, move.player);
  return canMoveToPoint(state, move.to, move.player);
}
