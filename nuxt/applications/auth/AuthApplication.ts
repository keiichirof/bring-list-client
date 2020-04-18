import { AuthRepository } from "~/domains/auth/AuthRepository";
import { SignupFromDto } from "@/domains/auth/SignupFromDto";
import { AuthToken } from "@/infras/httpAdapters/Protcol";

export class AuthApplication {
  private signupRepository: AuthRepository;

  constructor(signupRepository: AuthRepository) {
    this.signupRepository = signupRepository;
  }

  async Signup(formDto: SignupFromDto): Promise<AuthToken> {
    const token = await this.signupRepository.Signup(formDto);
    return token;
  }
}
