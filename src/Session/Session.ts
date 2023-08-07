export interface SessionData {
  userId: number;
  calculation: string;
}

export interface Session extends SessionData {
  id: number;
  created_at: Date;
  updated_at: Date;
}
