import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthStore } from 'src/app/services/auth/auth.store';

import { LoginGuard } from './login.guard';

class MockAuthStore {
  getToken() {
    return 'token';
  }
}

class MockRouter {
  navigate() {}
}

describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthStore, useClass: MockAuthStore },
        { provide: Router, useClass: MockRouter },
      ],
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate should block access to route if user is authenticated', () => {
    const authStore = TestBed.inject(AuthStore);
    const router = TestBed.inject(Router);

    spyOn(authStore, 'getToken').and.returnValue('token');
    spyOn(router, 'navigate');

    const activatedRouteShapshot: ActivatedRouteSnapshot =
      {} as ActivatedRouteSnapshot;
    const routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    expect(guard.canActivate(activatedRouteShapshot, routerStateSnapshot)).toBe(
      false
    );
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('canActivate should allow access to route if user is not authenticated', () => {
    const authStore = TestBed.inject(AuthStore);
    const router = TestBed.inject(Router);

    spyOn(authStore, 'getToken').and.returnValue(null);
    spyOn(router, 'navigate');

    const activatedRouteShapshot: ActivatedRouteSnapshot =
      {} as ActivatedRouteSnapshot;
    const routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    expect(guard.canActivate(activatedRouteShapshot, routerStateSnapshot)).toBe(
      true
    );
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('canActivateChild should block access to route if user is authenticated', () => {
    const authStore = TestBed.inject(AuthStore);
    const router = TestBed.inject(Router);

    spyOn(authStore, 'getToken').and.returnValue('token');
    spyOn(router, 'navigate');

    const activatedRouteShapshot: ActivatedRouteSnapshot =
      {} as ActivatedRouteSnapshot;
    const routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    expect(
      guard.canActivateChild(activatedRouteShapshot, routerStateSnapshot)
    ).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('canActivateChild should allow access to route if user is not authenticated', () => {
    const authStore = TestBed.inject(AuthStore);
    const router = TestBed.inject(Router);

    spyOn(authStore, 'getToken').and.returnValue(null);
    spyOn(router, 'navigate');

    const activatedRouteShapshot: ActivatedRouteSnapshot =
      {} as ActivatedRouteSnapshot;
    const routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    expect(
      guard.canActivateChild(activatedRouteShapshot, routerStateSnapshot)
    ).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
