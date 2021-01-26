import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): boolean | UrlTree | Promise<boolean> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
            const isAuth = !!user; // !user? false:true;
            if(isAuth){
                return true
            } 
            return this.router.createUrlTree(['/auth']);
        }));
    }
}