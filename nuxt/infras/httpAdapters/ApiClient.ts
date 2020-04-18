import { EnvManager } from "@/utils/EnvManager";
import {
  AxiosAdapter,
  GetDefaultAxios
} from "@/infras/httpAdapters/AxiosAdapter";
import { ListFormDto } from "@/domains/list/ListFormDto.ts";

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
}
