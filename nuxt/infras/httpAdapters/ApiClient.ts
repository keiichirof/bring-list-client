import { EnvManager } from "@/utils/EnvManager";
import {
  AxiosAdapter,
  GetDefaultAxios
} from "@/infras/httpAdapters/AxiosAdapter";
import { ListFormDto } from "@/domains/list/ListFormDto.ts";
import { SignupFromDto } from "@/domains/auth/SignupFromDto";
import { AuthToken } from "@/infras/httpAdapters/Protcol";

// APIサーバーへの接続を提供するアダプター
export class ApiClient {
  private axiosAdapter = new AxiosAdapter(GetDefaultAxios(EnvManager.ApiUrl));

  CreateList(formDto: ListFormDto): Promise<unknown> {
    return this.axiosAdapter.Post(
      "/savelist",
      {},
      { contactPageData: formDto }
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

  // Signin(form: SignupFromDto): Promise<unknown> {
  //   // formのデータとして認識させる
  //   const params = new URLSearchParams();
  //   params.append("name", form.name);
  //   params.append("password", form.password);
  //   params.append("email", form.email);
  //   return this.axiosAdapter.Post("/signin", { params }, {});
  // }
}
