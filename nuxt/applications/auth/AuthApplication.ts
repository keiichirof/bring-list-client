import { AuthRepository } from "~/domains/auth/AuthRepository";
import { SignupFromDto, SigninFromDto } from "~/domains/auth/AuthFromsDto";
import { AuthToken } from "@/infras/httpAdapters/Protcol";

export class AuthApplication {
  private AuthRepository: AuthRepository;

  constructor(AuthRepository: AuthRepository) {
    this.AuthRepository = AuthRepository;
  }

  async Signup(formDto: SignupFromDto): Promise<AuthToken> {
    const token = await this.AuthRepository.Signup(formDto);
    return token;
  }

  async Signin(formDto: SigninFromDto): Promise<AuthToken> {
    const token = await this.AuthRepository.Signin(formDto);
    return token;
  }
}
