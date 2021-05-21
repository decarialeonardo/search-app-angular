import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ItemCardComponent } from './item-card.component';
import * as searchAppActions from '../store/search.app.actions';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TruncatePipe } from '../shared/pipe/truncate.pipe';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;
  let store: MockStore;
  const initialState = {};
  const item = {
    id: '1',
    title: 'test',
    image: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemCardComponent, TruncatePipe],
      imports: [MatCardModule, MatButtonModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    component.item = item;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch add to favorite when user clicks on the empty icon', () => {
    spyOn(store, 'dispatch');
    component.addFavorite();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new searchAppActions.AddFavoriteItem({
        ...component.item,
        favorite: true,
      })
    );
  });

  it('should dispatch remove to favorite when user clicks on the filled icon', () => {
    spyOn(store, 'dispatch');
    component.removeFavorite();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new searchAppActions.RemoveFavoriteItem(component.item)
    );
  });

  afterAll(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });
});
