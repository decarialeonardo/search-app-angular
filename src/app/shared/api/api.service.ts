import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponse } from '../model/ItemResponse';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppParameters } from 'src/app/app.parameters';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<Array<ItemResponse>> {
    return this.http.get<Array<ItemResponse>>(AppParameters.URL_ENDPOINT).pipe(
      map((res: any) => {
        return res.items.map((e: ItemResponse, idx: number) => {
          e.id = idx.toString();
          return e;
        });
      }),
      catchError((error) => throwError(error))
    );
  }
}
