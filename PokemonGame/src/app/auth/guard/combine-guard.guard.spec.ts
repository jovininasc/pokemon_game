import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { combineGuardGuard } from './combine-guard.guard';

describe('combineGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => combineGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
