import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ItemResponse } from '../shared/model/ItemResponse';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() submitSearch: EventEmitter<
    Array<ItemResponse>
  > = new EventEmitter();
  searchBy: string;
  @Input() placeholder: string;
  @Input() items: Array<ItemResponse>;

  constructor() {
    this.searchBy = '';
    this.placeholder = 'Buscar por';
    this.items = [];
  }

  ngOnInit(): void {}

  onClickSearch(): void {
    let filteredItems = this.items;
    if (this.searchBy) {
      let value = this.searchBy.toLowerCase();
      filteredItems = this.items.filter((item: ItemResponse) => {
        let itemCopy = { ...item };
        itemCopy.image = '';
        delete itemCopy.id;
        return JSON.stringify(itemCopy).toLowerCase().includes(value);
      });
    }
    this.submitSearch.emit(filteredItems);
  }
}
