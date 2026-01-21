import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {

  constructor(private storageService: StorageService) { }


  async registrarUsuario(datos: any) {
    return new Promise(async (accept, reject) => {
      if (datos.email === 'isaac@gmail.com' && datos.password === '123456789' && datos.nombre === 'Isaac' && datos.apellido === 'De Leon') {
        accept("Registro correcto");
       await this.storageService.set('registro', 'RegistroCorrecto');
      } else {
        reject("Registro incorrecto");
      }
    });
  }

}
