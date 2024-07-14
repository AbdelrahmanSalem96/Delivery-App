import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Service/Test Service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  // const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  const expectedRoles: string[] = route.data['expectedRoles'] || [];
  const userRole = authService.getRole();
  if (authService.isLoggedIn() && hasRequiredRole(userRole, expectedRoles)) {
    return true;
  } else {
    snackBar.open('Access Denied', 'Close', { duration: 2000 });
    return false;
  }
};

const hasRequiredRole = (userRole: string | null, expectedRoles: string[]): boolean => {
  return expectedRoles.includes(userRole ?? '');
};
