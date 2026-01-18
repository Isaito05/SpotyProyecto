import { Component, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
//import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { sunny, moon, code} from 'ionicons/icons';
import { StorageService } from '../services/storage-service';
import { Router } from '@angular/router';

  
addIcons({
  'sunny': sunny,
  'moon': moon,
  'code': code,
});


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  colorSlideClaro = "var(--color-claro-fondo-slide)";
  colorSlideOscuro = "var(--color-oscuro-fondo-slide)";
  colorLetrasClarasSlide = "var(--color-letras-claras-slide)";
  colorLetrasOscuroSlide = "var(--color-letras-oscuras-slide)";
  colorTituloClarasSlide = "var(--color-titulo-claras-slide)";
  colorTituloOscuroSlide = "var(--color-titulo-oscuras-slide)";

  modoOscuro = true;

  colorSlideActual = this.colorSlideOscuro;
  colorLetrasActualSlide = this.colorLetrasClarasSlide;
  colorTituloActualSlide = this.colorTituloClarasSlide;

  isDay: boolean = true;


  genres = [
    {
      title: "Musica clasica",
      image: "https://wallpapers.com/images/hd/classical-music-1600-x-1000-wallpaper-a58kbdl0oe9y9hxf.jpg",
      description: "La música clásica es un género musical que abarca un amplio período de tiempo y una variedad de estilos."
    },
    {
      title: "Musica vallenata",
      image: "https://img.freepik.com/vector-premium/ilustracion-vectorial-dibujos-animados-acordeon-instrumento-musical-colorido_255358-3624.jpg?semt=ais_hybrid&w=740&q=80",
      description: "El vallenato es un género musical tradicional de la región caribeña de Colombia."
    },
    {
      title: "Musica de popular",
      image: "https://files.alerta.rcnradio.com/alerta_tolima_prod/public/2021-09/dia_mundial_musica_popular_0.jpg?CRMUafPCDF8_scUBBY37SQuDzILrtpLu",
      description: "La música popular es un género musical que abarca una amplia variedad de estilos y formas que son accesibles y apreciados por un gran número de personas."
    },


  ]

  constructor(private storageService: StorageService, private router: Router) { }

  async ngOnInit() {
    await this.cargarTemaGuardado();
    this.simularCargarDatos();
  }


  async cambiarColorSlide() {
    this.modoOscuro = !this.modoOscuro;

    this.colorSlideActual = this.modoOscuro
      ? this.colorSlideOscuro
      : this.colorSlideClaro;

    this.colorLetrasActualSlide = this.modoOscuro
      ? this.colorLetrasClarasSlide
      : this.colorLetrasOscuroSlide;

    this.colorTituloActualSlide = this.modoOscuro
      ? this.colorTituloClarasSlide
      : this.colorTituloOscuroSlide;

    this.isDay = !this.isDay;

    await this.storageService.set('tema', this.colorSlideActual);
    console.log('Tema guardado:', this.colorSlideActual);

  }

   get iconoActual() {
    return this.isDay ? 'sunny' : 'moon';
  }

  get code() {
    return 'code';
  }

  async cargarTemaGuardado() {
    const temaGuardado = await this.storageService.get('tema');
    if (temaGuardado) {
      this.colorSlideActual = temaGuardado;
    }
  }

  async simularCargarDatos() {
    const data = await this.obtenerDatos();
    console.log('Datos cargados:', data);
  }

  obtenerDatos(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(['Rock', 'pop', 'Jazz']);
        //reject('Error al obtener datos');
      }, 6000);
    });
  }
  

  goIntro() {
    this.router.navigate(['/intro']);
  }

}
