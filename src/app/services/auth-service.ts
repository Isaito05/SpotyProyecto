import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private storageService: StorageService) { }

  async loginUser(credentials: any) {
    
    return new Promise(async (accept, reject) => {
      if (credentials.email === 'isaac@gmail.com' && credentials.password === '123456789') {
        accept("Login correcto");
       await this.storageService.set('login', 'loginCorrecto');
      } else {
        reject("Login incorrecto");
      }
    });
  }
  
}
