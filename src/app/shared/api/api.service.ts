import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemResponse } from '../model/ItemResponse';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ApiService {
  private _jsonURL =
    'https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Array<ItemResponse>> {
    return this.http.get<Array<ItemResponse>>(this._jsonURL).pipe(
      map((res: any) => {
        return res.items;
      }),
      catchError((error) => throwError(error))
    );
  }
}
