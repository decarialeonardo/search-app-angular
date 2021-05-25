import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable()
export class AppParameters {
  public static PAGINATION = {
    TRHTOTTLE: 0,
    SCROLLDISTANCE: 0.15,
    ITEMS_PER_PAGE: 5,
  };
  public static URL_ENDPOINT =
    'https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json';

  public static FAVORITE_DIALOG_PARAMS: MatDialogConfig = {
    width: '100%',
    minHeight: 'calc(100vh - 90px)',
    height: 'auto',
  };
}
