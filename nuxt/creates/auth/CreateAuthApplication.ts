import { AuthApplication } from "@/applications/auth/AuthApplication";
import { AuthRepositoryImpl } from "@/infras/auth/AuthRepositoryImpl";

export function CreateAuthApplication() {
  return new AuthApplication(new AuthRepositoryImpl());
}
