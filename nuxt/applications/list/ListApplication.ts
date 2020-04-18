import { ListRepository } from "@/domains/list/ListRepository";
import { ListFormDto } from "@/domains/list/ListFormDto";

// リストの機能を提供する
export class ListApplication {
  private listRequester: ListRepository;

  constructor(listRequester: ListRepository) {
    this.listRequester = listRequester;
  }

  // リスト作成をする
  async CreateList(formDto: ListFormDto): Promise<void> {
    await this.listRequester.RequestList(formDto);
  }
}
