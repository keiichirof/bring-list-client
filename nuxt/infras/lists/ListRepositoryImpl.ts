import { ApiClient } from "@/infras/httpAdapters/ApiClient";
import { ListRepository } from "~/domains/list/ListRepository";
import { ListFormDto } from "@/domains/list/ListFormDto.ts";

// ListRepositoryの実装
export class ListRepositoryImpl implements ListRepository {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async SaveList(forms: ListFormDto): Promise<void> {
    await new ApiClient(this.token).SaveList(forms);
  }
}
