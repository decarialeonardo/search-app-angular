import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ItemCardComponent } from '../item-card/item-card.component';
import { SearchComponent } from '../search/search.component';
import { getFavoriteItems } from '../store';
import { FavoriteDialogComponent } from './favorite-dialog.component';

describe('FavoriteDialogComponent', () => {
  let component: FavoriteDialogComponent;
  let fixture: ComponentFixture<FavoriteDialogComponent>;
  let store: MockStore;
  let dialogRef: jasmine.SpyObj<MatDialogRef<FavoriteDialogComponent>>;
  const initialState = { favoriteItems: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FavoriteDialogComponent,
        SearchComponent,
        ItemCardComponent,
      ],
      imports: [
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: [],
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<FavoriteDialogComponent>
    >;
    store = TestBed.inject(MockStore);
    store.overrideSelector(getFavoriteItems, []);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });
});
