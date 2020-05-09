import { ApiClient } from "@/infras/httpAdapters/ApiClient";
import { ListRepository } from "~/domains/list/ListRepository";
import { ListFormDto, Item, ListsForView } from "@/domains/list/ListFormDto.ts";

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

  async GetDayLists(userID: number, day: string): Promise<ListsForView[]> {
    return await new ApiClient(this.token).GetDayLists(userID, day);
  }

  async GetAddedDays(userID: number): Promise<string[]> {
    return await new ApiClient(this.token).GetAddedDays(userID);
  }

  async GetLists(input: string): Promise<ListsForView[]> {
    return await new ApiClient(this.token).GetLists(input);
  }

  async DeleteList(forms: ListFormDto): Promise<void> {
    await new ApiClient(this.token).DeleteList(forms);
  }
}
