import { ListApplication } from "@/applications/list/ListApplication";
import { ListRepositoryImpl } from "~/infras/lists/ListRepositoryImpl";

export function CreateSaveListApplication(token: string) {
  return new ListApplication(new ListRepositoryImpl(token));
}
