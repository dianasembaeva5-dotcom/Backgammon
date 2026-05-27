export type Player = "white" | "black";

export type Point = {
  owner: Player | null;
  count: number;
};

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export type Move = {
  from: number | "bar";
  to: number | "off";
  die: DiceValue;
  player: Player;
};

export type GameMode = "local" | "ai" | "fast" | "training";
export type GameStatus = "waiting" | "rolling" | "moving" | "finished";

export type GameState = {
  board: Point[];
  currentPlayer: Player;
  dice: DiceValue[];
  availableDice: DiceValue[];
  bar: Record<Player, number>;
  borneOff: Record<Player, number>;
  status: GameStatus;
  winner: Player | null;
  mode: GameMode;
  moveHistory: Move[];
  startedAt: string | null;
  finishedAt: string | null;
};
