import { ListApplication } from "@/applications/list/ListApplication";
import { ListRequeseterImpl } from "@/infras/list/ListRequesterImpl";

export function CreateListApplication() {
  return new ListApplication(new ListRequeseterImpl());
}
