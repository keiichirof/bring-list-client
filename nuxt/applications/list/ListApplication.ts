import { ListRepository } from "~/domains/list/ListRepository";
import { ListFormDto, Item, ListsAndItems } from "@/domains/list/ListFormDto";

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

  // レコメンドを作成をする
  async GetRecommend(tagName: string): Promise<Item[]> {
    return await this.listRepository.GetRecommend(tagName);
  }

  // レコメンドを作成をする
  async GetDayLists(userID: number, day: string): Promise<ListsAndItems[]> {
    return await this.listRepository.GetDayLists(userID, day);
  }
}
