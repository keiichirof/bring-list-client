import { SignupFromDto, SigninFromDto } from "~/domains/auth/AuthFromsDto";
import { AuthToken } from "@/infras/httpAdapters/Protcol";

export interface AuthRepository {
  Signup(listFormDto: SignupFromDto): Promise<AuthToken>;
  Signin(listFormDto: SigninFromDto): Promise<AuthToken>;
}
