export type UserRegister = {
  userName: string;
  email: string;
  password: string;
};

export type UserLogin = {
  userName: string;
  password: string;
  rememberMe: boolean;
};
