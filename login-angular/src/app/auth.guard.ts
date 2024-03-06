import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const authGuard: CanActivateFn = async (route, state) => {
  const httpClient = inject(HttpClient);
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);

  try {
    let userResponse = await authenticationService.getUser();

    if (userResponse) {
      return true;
    } else {
      router.navigate(["/login"]);
      return false;
    }
  } catch (e) {
    router.navigate(["/login"]);
    return false;
  }
};