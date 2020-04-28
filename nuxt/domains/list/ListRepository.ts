import { ListFormDto } from "@/domains/list/ListFormDto.ts";

export interface ListRepository {
  SaveList(listFormDto: ListFormDto): Promise<void>;
  GetRecommend(tagName: string): Promise<unknown>;
}
