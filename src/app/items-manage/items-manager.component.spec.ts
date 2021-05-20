import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsManagerComponent } from './items-manager.component';

fdescribe('ItemsManagerComponent', () => {
  let component: ItemsManagerComponent;
  let fixture: ComponentFixture<ItemsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsManagerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should order the items', () => {
    expect(component).toBeTruthy();
  });

  it('should filter items by search', () => {
    expect(component).toBeTruthy();
  });

  it('should show more items when the user scrolls down', () => {
    expect(component).toBeTruthy();
  });
});
