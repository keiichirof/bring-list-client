import { ListFormDto } from "@/domains/list/ListFormDto.ts";

export interface ListRepository {
  RequestList(listFormDto: ListFormDto): Promise<void>;
}
