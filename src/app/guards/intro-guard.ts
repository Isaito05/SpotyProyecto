import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class IntroGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const yaEstuvoEnIntro = await this.storageService.get('pestaña');

    if (yaEstuvoEnIntro) {
      return true;
    }

    this.router.navigate(['/intro']);
    return false;
  }
}

