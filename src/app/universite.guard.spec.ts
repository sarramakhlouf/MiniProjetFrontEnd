import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { universiteGuard } from './universite.guard';

describe('universiteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => universiteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
