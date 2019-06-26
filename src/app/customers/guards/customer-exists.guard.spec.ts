import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CustomerExistsGuard } from './customer-exists.guard';

describe('CustomerExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerExistsGuard, { provide: Store, useValue: {} }]
    });
  });

  it('should ...', inject(
    [CustomerExistsGuard],
    (guard: CustomerExistsGuard) => {
      expect(guard).toBeTruthy();
    }
  ));
});
