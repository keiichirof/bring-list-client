import {
  ListFormDto,
  Item,
  ListsAndItems
} from "@/domains/list/ListFormDto.ts";

export interface ListRepository {
  SaveList(listFormDto: ListFormDto): Promise<void>;
  GetRecommend(tagName: string): Promise<Item[]>;
  GetDayLists(userID: number, day: string): Promise<ListsAndItems[]>;
  GetLists(input: string): Promise<ListsAndItems[]>;
  DeleteList(listFormDto: ListFormDto): Promise<void>;
}
