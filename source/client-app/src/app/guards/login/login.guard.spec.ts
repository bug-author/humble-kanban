import { AuthService } from './../../services/auth/auth.service';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { LoginGuard } from './login.guard';

class MockAuthService {
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
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate should block access to route if user is authenticated', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);

    spyOn(authService, 'getToken').and.returnValue('token');
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
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);

    spyOn(authService, 'getToken').and.returnValue(null);
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
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);

    spyOn(authService, 'getToken').and.returnValue('token');
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
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);

    spyOn(authService, 'getToken').and.returnValue(null);
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
