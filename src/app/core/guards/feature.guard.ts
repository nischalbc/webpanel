import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {InAppRoutes, LocalStorageKeys} from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class FeatureGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (localStorage.getItem(LocalStorageKeys.USER_TYPE)) {
          return true;
        }
        this.router.navigateByUrl(InAppRoutes.LANDING);
    }
}
