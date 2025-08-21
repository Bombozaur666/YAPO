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

export interface TokenResponse {
  token: string;
}

export const JWT_TOKEN: string = "JWT_TOKEN";
export const REFRESH_TOKEN: string = "REFRESH_TOKEN";
