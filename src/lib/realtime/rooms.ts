export type RoomState = {
  roomId: string;
  inviteLink: string;
  playerOne: string;
  playerTwo: string | null;
  status: "waiting" | "ready" | "playing";
};

export function createRoom(): RoomState {
  const roomId = Math.random().toString(36).slice(2, 8).toUpperCase();
  const origin = typeof window === "undefined" ? "https://backgammonarena.local" : window.location.origin;
  return { roomId, inviteLink: `${origin}/room/${roomId}`, playerOne: "You", playerTwo: null, status: "waiting" };
}

export function joinRoom(roomId: string): RoomState {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  return { roomId, inviteLink: `${origin}/room/${roomId}`, playerOne: "Host", playerTwo: "Guest", status: "ready" };
}

export function leaveRoom(roomId: string) {
  return { roomId, status: "waiting" as const };
}

export function subscribeToRoom(roomId: string, callback?: (room: RoomState) => void) {
  const room = joinRoom(roomId);
  const timer = setTimeout(() => callback?.(room), 600);
  return () => clearTimeout(timer);
}
