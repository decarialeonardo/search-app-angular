import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ItemResponse } from '../shared/model/ItemResponse';
@Component({
  selector: 'app-search',
  template: 'MOCK',
})
export class MockSearchComponent {
  @Output() submitSearch: EventEmitter<
    Array<ItemResponse>
  > = new EventEmitter();
  searchBy: string = '';
  @Input() placeholder: string = '';
  @Input() items: any = {};
}
