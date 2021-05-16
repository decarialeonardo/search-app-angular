import { Component } from '@angular/core';
import { ApiService } from './shared/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private apiService: ApiService) {
    this.apiService.getItems().subscribe((items) => {
      console.log(items);
    });
  }
  title = 'search-app';
}
