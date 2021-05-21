import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-card',
  template: 'MOCK',
})
export class MockItemCardComponent {
  @Input() item: any = {};
  @Input() favorite: boolean | undefined;

  constructor() {}
}
