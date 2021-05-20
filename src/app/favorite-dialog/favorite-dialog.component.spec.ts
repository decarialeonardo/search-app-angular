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
import { FavoriteDialogComponent } from './favorite-dialog.component';

describe('FavoriteDialogComponent', () => {
  let component: FavoriteDialogComponent;
  let fixture: ComponentFixture<FavoriteDialogComponent>;
  let store: MockStore;
  let dialogRef: jasmine.SpyObj<MatDialogRef<FavoriteDialogComponent>>;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteDialogComponent],
      imports: [
        MatIconModule,
        MatFormFieldModule,
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteDialogComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
