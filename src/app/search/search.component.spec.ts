import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { itemsMock } from '../shared/mocks/itemsResponseMock';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.items = itemsMock;
    spyOn(component.submitSearch, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search by title', () => {
    component.searchBy = 'PHONE';
    component.onClickSearch();
    expect(component.submitSearch.emit).toHaveBeenCalledWith([itemsMock[0]]);
  });

  it('should search by description', () => {
    component.searchBy = 'Cámara clásica de fotos Polaroid';
    component.onClickSearch();
    expect(component.submitSearch.emit).toHaveBeenCalledWith([itemsMock[1]]);
  });

  it('should search by price', () => {
    component.searchBy = '100';
    component.onClickSearch();
    expect(component.submitSearch.emit).toHaveBeenCalledWith([itemsMock[3]]);
  });

  it('should search by email', () => {
    component.searchBy = 'bagmail@wallapop.com';
    component.onClickSearch();
    expect(component.submitSearch.emit).toHaveBeenCalledWith([itemsMock[2]]);
  });

  afterAll(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });
});
