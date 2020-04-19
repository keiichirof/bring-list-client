import { ApiClient } from "@/infras/httpAdapters/ApiClient";
import { AuthRepository } from "~/domains/auth/AuthRepository";
import { SignupFromDto, SigninFromDto } from "~/domains/auth/AuthFromsDto";
import { AuthToken } from "@/infras/httpAdapters/Protcol";

// ListRepositoryの実装
export class AuthRepositoryImpl implements AuthRepository {
  async Signup(formDto: SignupFromDto): Promise<AuthToken> {
    const token = await new ApiClient().Signup(formDto);
    return token;
  }
  async Signin(formDto: SigninFromDto): Promise<AuthToken> {
    const token = await new ApiClient().Signin(formDto);
    return token;
  }
}
