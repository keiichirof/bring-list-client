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
