import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class LoginGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const yaEstoyLogueado = await this.storageService.get('login');

   if (yaEstoyLogueado) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}