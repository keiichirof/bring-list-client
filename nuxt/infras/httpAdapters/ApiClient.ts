import { EnvManager } from "@/utils/EnvManager";
import {
  AxiosAdapter,
  GetDefaultAxios,
  GetAxiosWithToken
} from "@/infras/httpAdapters/AxiosAdapter";
import { ListFormDto } from "@/domains/list/ListFormDto.ts";
import { SignupFromDto, SigninFromDto } from "~/domains/auth/AuthFromsDto";
import { AuthToken } from "@/infras/httpAdapters/Protcol";

// APIサーバーへの接続を提供するアダプター
export class ApiClient {
  private axiosAdapter = new AxiosAdapter(GetDefaultAxios(EnvManager.ApiUrl));
  private axiosAdapterWithToken: AxiosAdapter;

  constructor(token?: string) {
    this.axiosAdapterWithToken = new AxiosAdapter(
      GetAxiosWithToken(EnvManager.ApiUrl, token)
    );
  }

  async Signup(forms: SignupFromDto): Promise<AuthToken> {
    // formのデータとして認識させる
    const params = new URLSearchParams();
    params.append("name", forms.name);
    params.append("password", forms.password);
    params.append("email", forms.email);
    const token = (await this.axiosAdapter.Post("/signup", { params }, {}))
      .data;
    return token;
  }

  async Signin(forms: SigninFromDto): Promise<AuthToken> {
    // formのデータとして認識させる
    const params = new URLSearchParams();
    params.append("password", forms.password);
    params.append("email", forms.email);
    const token = (await this.axiosAdapter.Post("/signin", { params }, {}))
      .data;
    return token;
  }

  SaveList(forms: ListFormDto): Promise<unknown> {
    return this.axiosAdapterWithToken.Post(
      "/savelist",
      {},
      {
        name: forms.name,
        userID: forms.userID,
        items: forms.items,
        tags: forms.tags,
        date: forms.date
      }
    );
  }
}
