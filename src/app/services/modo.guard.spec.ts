import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { modoGuard } from './modo.guard';

describe('modoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => modoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
