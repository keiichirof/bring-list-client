export interface ListFormDto {
  name: string;
  userID: number;
  tags: string[];
  items: Item[];
  date: string;
}

export interface Item {
  tagin: number;
  name: string;
}

export interface ItemOnlyName {
  name: string;
}

export interface ListsAndItems {
  name: string;
  items: ItemOnlyName[];
}
