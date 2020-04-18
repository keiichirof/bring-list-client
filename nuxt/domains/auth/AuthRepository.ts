import { SignupFromDto } from "@/domains/auth/SignupFromDto";
import { AuthToken } from "@/infras/httpAdapters/Protcol";

export interface AuthRepository {
  Signup(listFormDto: SignupFromDto): Promise<AuthToken>;
}
