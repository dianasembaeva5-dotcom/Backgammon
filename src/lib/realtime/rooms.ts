import { supabase } from "@/lib/supabase/client";

export type RoomState = {
  roomId: string;
  inviteLink: string;
  playerOne: string;
  playerTwo: string | null;
  status: "waiting" | "ready" | "playing";
};

function buildInvite(roomId: string) {
  const origin =
    typeof window === "undefined"
      ? "https://backgammonarena.local"
      : window.location.origin;

  return `${origin}/room/${roomId}`;
}

export async function createRoom(): Promise<RoomState | null> {
  if (!supabase) return null;

  const roomId = Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase();

  const room: RoomState = {
    roomId,
    inviteLink: buildInvite(roomId),
    playerOne: "Host",
    playerTwo: null,
    status: "waiting",
  };

  const { error } = await supabase
    .from("game_rooms")
    .insert({
      id: crypto.randomUUID(),
      host_email: "host@arena.com",
      guest_email: null,
      current_turn: "Host",
      status: "waiting",
      game_state: room,
      dice: [1, 1],
    });

  if (error) {
    console.error("CREATE ROOM ERROR", error);
    return null;
  }

  return room;
}

export async function joinRoom(
  roomId: string
): Promise<RoomState | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("game_rooms")
    .select("*")
    .eq("game_state->>roomId", roomId)
    .single();

  if (error || !data) {
    console.error("JOIN ROOM ERROR", error);
    return null;
  }

  const updatedRoom: RoomState = {
    roomId,
    inviteLink: buildInvite(roomId),
    playerOne: "Host",
    playerTwo: "Guest",
    status: "ready",
  };

  await supabase
    .from("game_rooms")
    .update({
      guest_email: "guest@arena.com",
      status: "ready",
      game_state: updatedRoom,
    })
    .eq("id", data.id);

  return updatedRoom;
}

export async function leaveRoom(roomId: string) {
  if (!supabase) return;

  await supabase
    .from("game_rooms")
    .delete()
    .eq("game_state->>roomId", roomId);
}

export function subscribeToRoom(
  roomId: string,
  callback?: (room: RoomState) => void
) {
  if (!supabase) return () => {};

  const channel = supabase
    .channel(`room-${roomId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "game_rooms",
      },
      (payload) => {
        const room = payload.new.game_state as RoomState;

        if (room.roomId === roomId) {
          callback?.(room);
        }
      }
    )
    .subscribe();

  return () => {
    if (supabase) {
      supabase.removeChannel(channel);
    }
  };
}
