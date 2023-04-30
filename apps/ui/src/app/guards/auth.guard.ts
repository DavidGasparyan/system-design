import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    const isLoggedIn = this.storageService.isLoggedIn();

    if (isLoggedIn) {
      return true;
    }


    return this.router.createUrlTree(['/login']);
  }
}
