import { ApiClient } from "@/infras/httpAdapters/ApiClient";
import { ListRepository } from "@/domains/list/ListRepository";
import { ListFormDto } from "@/domains/list/ListFormDto.ts";

// ListRepositoryの実装
export class ListRequeseterImpl implements ListRepository {
  async RequestList(formDto: ListFormDto): Promise<void> {
    await new ApiClient().CreateList(formDto);
  }
}
