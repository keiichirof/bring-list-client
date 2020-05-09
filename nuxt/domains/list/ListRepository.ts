import { ListFormDto, Item, ListsForView } from "@/domains/list/ListFormDto.ts";

export interface ListRepository {
  SaveList(listFormDto: ListFormDto): Promise<void>;
  GetRecommend(tagName: string): Promise<Item[]>;
  GetDayLists(userID: number, day: string): Promise<ListsForView[]>;
  GetLists(input: string): Promise<ListsForView[]>;
  DeleteList(listFormDto: ListFormDto): Promise<void>;
}
