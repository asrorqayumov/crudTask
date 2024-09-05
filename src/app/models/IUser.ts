export interface UserRegister {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
export interface UserRegisterResponse {
  message:string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  access_token: string;
  token_type: string;
}
