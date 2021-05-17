interface IObjectKeys {
  [key: string]: string;
}
export interface ItemResponse extends IObjectKeys {
  title: string;
  description: string;
  price: string;
  email: string;
  image: string;
}
