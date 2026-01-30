import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private storageService: StorageService,private http: HttpClient) { }
  urlServer = 'https://music.fly.dev';
  // async loginUser(credentials: any) {
    
  //   return new Promise(async (accept, reject) => {
  //     if (credentials.email === 'isaac@gmail.com' && credentials.password === '123456789') {
  //       accept("Login correcto");
  //      await this.storageService.set('login', 'loginCorrecto');
  //     } else {
  //       reject("Login incorrecto");
  //     }
  //   });
  // }

  loginUser(credentials: any) {

    const body = {
      user: {
        email: credentials.email,
        password: credentials.password
      }
    };

    return new Promise((accept, reject) => {

      this.http.post(`${this.urlServer}/login`, body).subscribe({

        next: async (res: any) => {
          // guardar sesión real
          await this.storageService.set('login', 'loginCorrecto');
          await this.storageService.set('user', res.user);   // usuario real

          accept(res); // respuesta del backend
        },

        error: (err) => {
          reject(err.error || 'Credenciales inválidas');
        }

      });

    });
  }
  
}
