import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() submitSearch: EventEmitter<string> = new EventEmitter();
  searchBy: string;

  constructor() {
    this.searchBy = '';
  }

  ngOnInit(): void {}

  onClickSearch(from?: any): void {
    console.log(from);
    this.submitSearch.emit(this.searchBy);
  }
}
