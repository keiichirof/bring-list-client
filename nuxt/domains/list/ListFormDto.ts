export interface ListFormDto {
  name: string;
  userID: number;
  tags: string[];
  items: Item[];
  date: string;
  isTemplate: boolean;
  parentID: number;
}

export interface Item {
  tagin: number;
  name: string;
}

export interface ItemOnlyName {
  name: string;
}

export interface ListsForView {
  id: number;
  name: string;
  items: Item[];
  download: number;
  createdAt: string;
  isTemplate: boolean;
}
