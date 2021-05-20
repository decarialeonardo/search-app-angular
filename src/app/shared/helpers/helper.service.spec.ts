import { HelperService } from './helper.service';
import { TestBed } from '@angular/core/testing';
import { ItemResponse } from '../model/ItemResponse';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelperService],
    });
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sort Items by Price', () => {
    const items = [
      { price: '4' } as ItemResponse,
      { price: '500' } as ItemResponse,
      { price: '40' } as ItemResponse,
      { price: '505' } as ItemResponse,
    ];
    const result = service.sortItemsByNumber(items, 'price');
    expect(result).toEqual([
      { price: '4' } as ItemResponse,
      { price: '40' } as ItemResponse,
      { price: '500' } as ItemResponse,
      { price: '505' } as ItemResponse,
    ]);
  });
});
