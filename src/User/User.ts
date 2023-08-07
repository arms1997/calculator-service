export interface UserData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface User extends UserData {
  id: number;
  created_at: Date;
  updated_at: Date;
}
