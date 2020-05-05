import { EnvManager } from "@/utils/EnvManager";
import {
  AxiosAdapter,
  GetDefaultAxios,
  GetAxiosWithToken
} from "@/infras/httpAdapters/AxiosAdapter";
import {
  ListFormDto,
  Item,
  ListsAndItems
} from "@/domains/list/ListFormDto.ts";
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

  async GetRecommend(tagName: string): Promise<Item[]> {
    // formのデータとして認識させる
    const params = new URLSearchParams();
    params.append("tagName", tagName);
    const data = (
      await this.axiosAdapterWithToken.Get("/getRecommend", { params })
    ).data;
    return data;
  }

  async GetDayLists(userID: number, day: string): Promise<ListsAndItems[]> {
    // formのデータとして認識させる
    const params = new URLSearchParams();
    params.append("userID", String(userID));
    params.append("day", day);
    const data = (
      await this.axiosAdapterWithToken.Get("/getDayLists", { params })
    ).data;
    return data;
  }

  async GetLists(input: string): Promise<ListsAndItems[]> {
    const params = new URLSearchParams();
    params.append("input", input);
    const data = (await this.axiosAdapterWithToken.Get("/getLists", { params }))
      .data;
    return data;
  }

  DeleteList(forms: ListFormDto): Promise<unknown> {
    return this.axiosAdapterWithToken.Post(
      "/deletelist",
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
