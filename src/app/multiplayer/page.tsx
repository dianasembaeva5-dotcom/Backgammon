"use client";

import { useState } from "react";
import Link from "next/link";
import { createRoom, RoomState } from "@/lib/realtime/rooms";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function MultiplayerPage() {
  const [room, setRoom] = useState<RoomState | null>(null);
  const makeRoom = () => setRoom(createRoom());
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-black">Multiplayer Lobby</h1>
      <p className="mt-3 text-slate-400">Realtime is Supabase-ready. In this MVP, invite rooms are mocked safely so the product flow is visible.</p>
      <Card className="mt-8">
        {!room ? <Button onClick={makeRoom}>Create Room</Button> : (
          <div className="grid gap-4">
            <h2 className="text-2xl font-bold">Room {room.roomId}</h2>
            <input readOnly value={room.inviteLink} className="rounded-md border border-white/10 bg-white/5 p-3" />
            <div className="flex flex-wrap gap-3"><Button onClick={() => navigator.clipboard?.writeText(room.inviteLink)}>Copy Invite Link</Button><Link href={`/room/${room.roomId}`}><Button variant="secondary">Open Waiting Room</Button></Link></div>
            <div className="grid gap-3 md:grid-cols-2"><Card>Player 1: You - connected</Card><Card>Player 2: waiting for invite</Card></div>
            <Button variant="secondary">Start Match</Button>
          </div>
        )}
      </Card>
    </section>
  );
}
