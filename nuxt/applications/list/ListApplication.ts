import { ListRequester } from "@/domains/list/ListRequester";
import { ListFormDto } from "@/domains/list/ListFormDto";

// リストの機能を提供する
export class ListApplication {
  private listRequester: ListRequester;

  constructor(listRequester: ListRequester) {
    this.listRequester = listRequester;
  }

  // リスト作成をする
  async CreateList(formDto: ListFormDto): Promise<void> {
    await this.listRequester.RequestList(formDto);
  }
}
