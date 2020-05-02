import { ListRepository } from "~/domains/list/ListRepository";
import { ListFormDto } from "@/domains/list/ListFormDto";

// リストの機能を提供する
export class ListApplication {
  private listRepository: ListRepository;

  constructor(listRepository: ListRepository) {
    this.listRepository = listRepository;
  }

  // リスト作成をする
  async SaveList(forms: ListFormDto): Promise<void> {
    await this.listRepository.SaveList(forms);
  }
}
