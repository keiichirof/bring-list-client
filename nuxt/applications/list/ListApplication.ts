import { ListRepository } from "~/domains/list/ListRepository";
import { ListFormDto, Item, ListsForView } from "@/domains/list/ListFormDto";

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

  // 日付からリストを取得
  async GetDayLists(userID: number, day: string): Promise<ListsForView[]> {
    return await this.listRepository.GetDayLists(userID, day);
  }

  // ユーザがリスト登録した日を取得
  async GetAddedDays(userID: number): Promise<string[]> {
    return await this.listRepository.GetAddedDays(userID);
  }

  // リスト名からリストを取得
  async GetLists(input: string): Promise<ListsForView[]> {
    return await this.listRepository.GetLists(input);
  }

  // リストを削除
  async DeleteList(forms: ListsForView): Promise<void> {
    return await this.listRepository.DeleteList(forms);
  }
}
