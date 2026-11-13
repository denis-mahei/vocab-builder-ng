export interface User {
  _id: string;
  name: string;
  email: string;
}
export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  email: string;
  name: string;
  token: string;
}

export interface CurrentResponse extends AuthResponse {
  _id: string;
}

export interface WordRequest {
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
}

export interface Word extends WordRequest {
  _id: string;
  owner: string;
  progress: number;
}

export interface WordsResponse {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
}

export type WordsParams = {
  keyword?: string;
  page: number;
  category?: string;
  isIrregular?: boolean;
  limit: number;
}
