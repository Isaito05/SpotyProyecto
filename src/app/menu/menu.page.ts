import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuPage implements OnInit {

  

  constructor(private navCtrl: NavController, private storageService: StorageService) { }

  ngOnInit() {
  }

  goIntro() {
    this.navCtrl.navigateForward('/intro');
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    this.storageService.remove('login');
    this.storageService.remove('user');
    this.navCtrl.navigateRoot('/login');
    console.log('Cerrando sesión...');
  }

  

}
