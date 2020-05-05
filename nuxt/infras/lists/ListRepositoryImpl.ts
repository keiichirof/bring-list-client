import { ApiClient } from "@/infras/httpAdapters/ApiClient";
import { ListRepository } from "~/domains/list/ListRepository";
import {
  ListFormDto,
  Item,
  ListsAndItems
} from "@/domains/list/ListFormDto.ts";

// ListRepositoryの実装
export class ListRepositoryImpl implements ListRepository {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async SaveList(forms: ListFormDto): Promise<void> {
    await new ApiClient(this.token).SaveList(forms);
  }

  async GetRecommend(tagName: string): Promise<Item[]> {
    return await new ApiClient(this.token).GetRecommend(tagName);
  }

  async GetDayLists(userID: number, day: string): Promise<ListsAndItems[]> {
    return await new ApiClient(this.token).GetDayLists(userID, day);
  }

  async GetLists(input: string): Promise<ListsAndItems[]> {
    return await new ApiClient(this.token).GetLists(input);
  }

  async DeleteList(forms: ListFormDto): Promise<void> {
    await new ApiClient(this.token).DeleteList(forms);
  }
}
