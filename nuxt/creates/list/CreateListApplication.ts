import { ListApplication } from "@/applications/list/ListApplication";
import { ListRepositoryImpl } from "~/infras/lists/ListRepositoryImpl";

export function CreateListApplication(token: string) {
  return new ListApplication(new ListRepositoryImpl(token));
}
