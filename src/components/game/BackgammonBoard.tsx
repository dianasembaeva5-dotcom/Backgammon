"use client";

import { BoardPoint } from "./BoardPoint";
import { Bar } from "./Bar";
import { GameState, Move } from "@/lib/game/types";

export function BackgammonBoard({ state, selected, legalMoves, onSelect }: { state: GameState; selected: number | "bar" | null; legalMoves: Move[]; onSelect: (from: number | "bar") => void }) {
  const top = Array.from({ length: 12 }, (_, i) => 23 - i);
  const bottom = Array.from({ length: 12 }, (_, i) => i);
  const render = (indexes: number[], topSide: boolean) => indexes.map((index) => (
    <BoardPoint
      key={index}
      index={index}
      point={state.board[index]}
      top={topSide}
      selected={selected === index}
      legal={legalMoves.some((move) => move.to === index)}
      onClick={() => onSelect(index)}
    />
  ));
  return (
    <div className="board-grain rounded-lg border border-amber-100/20 p-3 shadow-2xl">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2">
        <div className="grid grid-cols-6 gap-1">{render(top.slice(0, 6), true)}</div>
        <Bar counts={state.bar} active={selected === "bar"} onClick={() => onSelect("bar")} />
        <div className="grid grid-cols-6 gap-1">{render(top.slice(6), true)}</div>
        <div className="grid grid-cols-6 gap-1">{render(bottom.slice(0, 6), false)}</div>
        <Bar counts={{ white: 0, black: 0 }} onClick={() => onSelect("bar")} />
        <div className="grid grid-cols-6 gap-1">{render(bottom.slice(6), false)}</div>
      </div>
    </div>
  );
}
