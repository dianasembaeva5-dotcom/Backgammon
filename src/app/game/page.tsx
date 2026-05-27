"use client";

import confetti from "canvas-confetti";
import { useCallback, useEffect, useMemo, useState } from "react";
import { generateGameAnalysis, CoachReport } from "@/lib/ai/coach";
import { getBestMove } from "@/lib/ai/backgammonBot";
import { applyMove, startRoll, switchTurn } from "@/lib/game/gameReducer";
import { createInitialGameState } from "@/lib/game/initialState";
import { getLegalMoves, getLegalMovesForChecker } from "@/lib/game/moveGenerator";
import { fastModeWinner } from "@/lib/game/scoring";
import { GameMode, GameState } from "@/lib/game/types";
import { saveGuestGame, loadGuestStats, saveGuestStats } from "@/lib/storage/localStorage";
import { BackgammonBoard } from "@/components/game/BackgammonBoard";
import { BearOffTray } from "@/components/game/BearOffTray";
import { Dice } from "@/components/game/Dice";
import { FastModeTimer } from "@/components/game/FastModeTimer";
import { GameAnalysisModal } from "@/components/game/GameAnalysisModal";
import { GameControls } from "@/components/game/GameControls";
import { GameModeSelector } from "@/components/game/GameModeSelector";
import { GameResultModal } from "@/components/game/GameResultModal";
import { MoveHints } from "@/components/game/MoveHints";
import { MoveHistory } from "@/components/game/MoveHistory";
import { TrainingCoachPanel } from "@/components/game/TrainingCoachPanel";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Toast } from "@/components/ui/Toast";

export default function GamePage() {
  const [state, setState] = useState<GameState | null>(null);
  const [past, setPast] = useState<GameState[]>([]);
  const [selected, setSelected] = useState<number | "bar" | null>(null);
  const [toast, setToast] = useState("");
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [report, setReport] = useState<CoachReport | null>(null);

  const legalForSelected = useMemo(() => state && selected !== null ? getLegalMovesForChecker(state, state.currentPlayer, selected) : [], [state, selected]);

  const start = (mode: GameMode) => {
    setState(createInitialGameState(mode));
    setPast([]);
    setSelected(null);
  };

  const pushState = (next: GameState, previous?: GameState) => {
    if (previous) setPast((p) => [...p, previous]);
    setState(next);
    if (next.status === "finished" && next.winner) {
      confetti({ particleCount: 140, spread: 70, origin: { y: 0.7 } });
      const stats = loadGuestStats();
      const userWon = next.winner === "white";
      saveGuestStats({
        ...stats,
        totalGames: stats.totalGames + 1,
        wins: stats.wins + (userWon ? 1 : 0),
        losses: stats.losses + (userWon ? 0 : 1),
        rating: stats.rating + (userWon ? 18 : -12),
        currentStreak: userWon ? stats.currentStreak + 1 : 0,
        bestStreak: userWon ? Math.max(stats.bestStreak, stats.currentStreak + 1) : stats.bestStreak,
        favoriteMode: next.mode,
      });
      saveGuestGame({
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        mode: next.mode,
        opponent: next.mode === "ai" ? "Arena Bot" : "Local Player",
        result: userWon ? "Win" : "Loss",
        movesCount: next.moveHistory.length,
        duration: "5m",
        ratingChange: userWon ? 18 : -12,
      });
    }
  };

  const roll = useCallback(() => {
    if (!state || state.status !== "rolling") return;
    const next = startRoll(state);
    pushState(next, state);
    if (!getLegalMoves(next, next.currentPlayer).length) {
      setToast("No legal moves after this roll. Turn skipped.");
      setTimeout(() => pushState(switchTurn(next), next), 700);
    }
  }, [state]);

  const endTurn = useCallback(() => {
    if (!state) return;
    setSelected(null);
    pushState(switchTurn(state), state);
  }, [state]);

  const undo = useCallback(() => {
    const previous = past.at(-1);
    if (!previous) return setToast("No move to undo yet.");
    setPast((p) => p.slice(0, -1));
    setState(previous);
  }, [past]);

  const restart = () => state ? start(state.mode) : setState(null);

  const onSelect = (from: number | "bar") => {
    if (!state || state.status !== "moving") return setToast("Roll dice before moving.");
    if (selected !== null) {
      const move = legalForSelected.find((m) => m.to === from);
      if (move) {
        pushState(applyMove(state, move), state);
        setSelected(null);
        return;
      }
    }
    const moves = getLegalMovesForChecker(state, state.currentPlayer, from);
    if (!moves.length) return setToast(from === "bar" ? "No checker can enter from the bar." : "That checker has no legal move.");
    setSelected(from);
  };

  const expireFastMode = useCallback(() => {
    setState((current) => current ? { ...current, winner: fastModeWinner(current) ?? "white", status: "finished", finishedAt: new Date().toISOString() } : current);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!state || state.mode !== "ai" || state.currentPlayer !== "black" || state.status === "finished") return;
    const timer = setTimeout(() => {
      if (state.status === "rolling") return pushState(startRoll(state), state);
      const move = getBestMove(state, getLegalMoves(state, "black"), "medium");
      if (move) pushState(applyMove(state, move), state);
      else pushState(switchTurn(state), state);
    }, 650);
    return () => clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "r") roll();
      if (event.key.toLowerCase() === "u") undo();
      if (event.key.toLowerCase() === "e") endTurn();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [roll, undo, endTurn]);

  const analyze = () => {
    if (!state) return;
    setReport(generateGameAnalysis(state.moveHistory, state));
    setAnalysisOpen(true);
  };

  if (!state) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12">
        <Badge>Choose your arena</Badge>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">Play, train, or race the clock.</h1>
        <p className="mt-4 max-w-2xl text-slate-400">Every mode uses the same rule engine, legal move hints, saved match history, and coach-ready move log.</p>
        <div className="mt-8"><GameModeSelector onSelect={start} /></div>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge>{state.mode === "fast" ? "Fast 5-Minute Backgammon" : state.mode}</Badge>
            <h1 className="mt-2 text-3xl font-black capitalize">{state.currentPlayer} to move</h1>
          </div>
          {state.mode === "fast" ? <FastModeTimer active={state.status !== "finished"} onExpire={expireFastMode} /> : null}
        </div>
        <BackgammonBoard state={state} selected={selected} legalMoves={legalForSelected} onSelect={onSelect} />
        <MoveHints moves={legalForSelected} />
        {state.mode === "training" ? <TrainingCoachPanel state={state} /> : null}
      </div>
      <aside className="grid content-start gap-4">
        <Card><p className="mb-2 text-sm text-slate-400">Dice</p><Dice dice={state.dice} available={state.availableDice} /></Card>
        <GameControls canRoll={state.status === "rolling"} onRoll={roll} onEndTurn={endTurn} onUndo={undo} onRestart={restart} />
        <BearOffTray borneOff={state.borneOff} />
        <MoveHistory moves={state.moveHistory} />
      </aside>
      <GameResultModal winner={state.winner} onAnalyze={analyze} onRestart={restart} />
      <GameAnalysisModal report={report} open={analysisOpen} onClose={() => setAnalysisOpen(false)} onPlayAgain={restart} />
      <Toast message={toast} />
    </section>
  );
}
