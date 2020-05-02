export interface SigninFromDto {
  email: string;
  password: string;
}

export interface SignupFromDto extends SigninFromDto {
  name: string;
}
