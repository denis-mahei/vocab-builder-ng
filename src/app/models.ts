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
	isIrregular: boolean;
}

export interface WordResponse extends WordRequest {
	_id: string;
	owner: string;
	progress: number;
}

export interface SearchParametersRequest {
	keyword?: string;
	category?: string;
	isIrregular?: boolean;
	page: number;
	limit: number;
}

export interface SearchParametersResponse {
	results: Omit<WordResponse, 'owner' | 'progress'>[];
	totalPages: number;
	pages: number;
	perPage: number;
}