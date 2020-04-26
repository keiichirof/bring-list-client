export interface ListFormDto {
  name: string;
  userID: number;
  tags: string[];
  items: items[];
  date: string;
}

export interface items {
  tagin: number;
  name: string;
}
