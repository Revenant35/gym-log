export interface Session {
  id: string;
  user_id: string;
  created_at: string;
}

export interface CreateSessionParams {
  user_id: string;
}

export interface DeleteSessionParams {
  id: string;
}
