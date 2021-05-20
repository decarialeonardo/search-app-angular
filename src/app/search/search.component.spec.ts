import { ComponentFixture, TestBed } from '@angular/core/testing';
import { itemsMock } from '../shared/mocks/itemsResponseMock';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
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
});
