interface IObjectKeys {
  [key: string]: boolean | string | undefined;
}
export interface ItemResponse extends IObjectKeys {
  title: string;
  description?: string;
  price?: string;
  email?: string;
  image: string;
  favorite?: boolean;
}
