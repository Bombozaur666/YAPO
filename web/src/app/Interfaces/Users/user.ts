export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  registrationDate: Date;
}
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}


