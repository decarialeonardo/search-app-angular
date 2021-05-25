import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MockItemCardComponent } from '../item-card/mock-item-card.component';
import { MockSearchComponent } from '../search/mock-search.component';
import { ApiService } from '../shared/api/api.service';
import { HelperService } from '../shared/helpers/helper.service';
import { itemsMock } from '../shared/mocks/itemsResponseMock';
import { ItemResponse } from '../shared/model/ItemResponse';
import { SortFieldsType } from '../shared/model/sortFieldsType';
import { getFavoriteItems } from '../store';

import { ItemsManagerComponent } from './items-manager.component';

describe('ItemsManagerComponent', () => {
  let component: ItemsManagerComponent;
  let fixture: ComponentFixture<ItemsManagerComponent>;
  let dialogSpy;
  let store: MockStore;
  let apiService: jasmine.SpyObj<any>;
  const initialState = { favoriteItems: [] };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ItemsManagerComponent,
        MockItemCardComponent,
        MockSearchComponent,
      ],
      imports: [
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        FormsModule,
      ],
      providers: [
        HelperService,
        {
          provide: ApiService,
          useValue: {
            getItems: jasmine.createSpy(),
          },
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    apiService = TestBed.inject(ApiService);
    store.overrideSelector(getFavoriteItems, []);
  });

  beforeEach(() => {
    apiService.getItems.and.returnValue(of(itemsMock));
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open');
    fixture = TestBed.createComponent(ItemsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should order the items', () => {
    component.onOrderBy(SortFieldsType.PRICE);
    expect(component.filteredItems[0].price).toBe('50');
    component.onOrderBy(SortFieldsType.EMAIL);
    expect(component.filteredItems[0].email).toBe('bagmail@wallapop.com');
  });

  it('should retrun if it is a favorite item', () => {
    component.favoriteItems = [{ id: '1', favorite: true } as ItemResponse];
    expect(component.isFavoriteItem(itemsMock[0])).toBe(true);
    expect(component.isFavoriteItem(itemsMock[1])).toBe(false);
  });

  it('should show more items when the user go to the next page', () => {
    const e: PageEvent = {
      pageIndex: 1,
      pageSize: 5,
      length: itemsMock.length,
    };
    component.handlerPage(e);
    expect(component.paginatedItems.length).toBeGreaterThan(0);
  });

  afterAll(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });
});
