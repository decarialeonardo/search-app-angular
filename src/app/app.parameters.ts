import { Injectable } from '@angular/core';

@Injectable()
export class AppParameters {
  public static INFINIT_SCROLL = {
    TRHTOTTLE: 0,
    SCROLLDISTANCE: 0.35,
    ITEMS_SHOW: 5,
  };
  public static URL_ENDPOINT =
    'https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json';
}
