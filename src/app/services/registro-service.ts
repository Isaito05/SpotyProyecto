import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {

  constructor(private storageService: StorageService, private http: HttpClient) { }

  urlServer = 'https://music.fly.dev';
  // async registrarUsuario(datos: any) {
  //   return new Promise(async (accept, reject) => {
  //     if (datos.email === 'isaac@gmail.com' && datos.password === '123456789' && datos.nombre === 'Isaac' && datos.apellido === 'De Leon') {
  //       accept("Registro correcto");
  //      await this.storageService.set('registro', 'RegistroCorrecto');
  //     } else {
  //       reject("Registro incorrecto");
  //     }
  //   });
  // }

  registrarUsuario(datos: any) {

    const body = {
      user: {
        email: datos.email,
        password: datos.password,
        name: datos.nombre,
        username: datos.apellido
      }
    };

    return new Promise((accept, reject) => {
      console.log("datos:", body);
      this.http.post(`${this.urlServer}/signup`, body).subscribe({
        
        next: async (res: any) => {
          await this.storageService.set('registro', 'RegistroCorrecto');
          accept(res);   // respuesta real del backend
        },

        error: (err) => {
          reject(err.error || 'Error en el registro');
        }

      });

    });
  }

}
