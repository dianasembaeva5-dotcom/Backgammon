"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { joinRoom, RoomState, subscribeToRoom } from "@/lib/realtime/rooms";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function RoomPage() {
  const params = useParams<{ roomId: string }>();
  const roomId = params.roomId;
  const [room, setRoom] = useState<RoomState>(() => joinRoom(roomId));
  useEffect(() => subscribeToRoom(roomId, setRoom), [roomId]);
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-black">Room {roomId}</h1>
      <p className="mt-3 text-slate-400">Invite-link room mock with Supabase Realtime-compatible function boundaries.</p>
      <Card className="mt-8">
        <div className="grid gap-4 md:grid-cols-2"><Card>Player 1: {room.playerOne} - connected</Card><Card>Player 2: {room.playerTwo ?? "Waiting"} - {room.playerTwo ? "connected" : "disconnected"}</Card></div>
        <div className="mt-6 flex gap-3"><Link href="/game"><Button>Start Match</Button></Link><Link href="/multiplayer"><Button variant="secondary">Leave Room</Button></Link></div>
      </Card>
    </section>
  );
}
