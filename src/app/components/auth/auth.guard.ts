import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     return this.authService.isLoggedIn.pipe(
//       take(1),
//       map((isLoggedIn: boolean) => {

//         console.log({isLoggedIn});
//         if (!isLoggedIn) {
//           this.router.navigate(['/login']);
//           return false;
//         }
//         return true;
//       })
//     );
//   }
// }





  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn.pipe(
      tap((loggedIn: any) => {
        if(!loggedIn) {
          this.router.navigate(['login']);
        }
      })
    );
  }
}

