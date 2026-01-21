import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage-service';
import { sunny, moon, code, arrowBackOutline, home} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

addIcons({
  'sunny': sunny,
  'moon': moon,
  'code': code,
  'arrow-back-outline': arrowBackOutline,
  'home': home
});

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {


  colorSlideClaro = "var(--color-claro-fondo-slide)";
  colorSlideOscuro = "var(--color-oscuro-fondo-slide)";
  colorLetrasClarasSlide = "var(--color-letras-claras-slide)";
  colorLetrasOscuroSlide = "var(--color-letras-oscuras-slide)";
  colorTituloClarasSlide = "var(--color-titulo-claras-slide)";
  colorTituloOscuroSlide = "var(--color-titulo-oscuras-slide)";
  colorEncabezadoClaras = "var(--color-encabe-claras-slide)";
  colorEncabezadoOscuro = "var(--color-encabe-oscuras-slide)";

  modoOscuro = false;

  colorSlideActual = this.colorSlideOscuro;
  colorLetrasActualSlide = this.colorLetrasOscuroSlide;
  colorTituloActualSlide = this.colorTituloOscuroSlide;
  colorEncabezadoActual = this.colorEncabezadoClaras;


  isDay: boolean = true;

  genres = [
    {
      title: "Bienvenidos",
      image: "/assets/img/audifonos.png",
      description: "Descubre un mundo de sonidos y emociones. Explora géneros, artistas y canciones que acompañan cada momento de tu día."
    },
    {
      title: "Disfruta",
      image: "/assets/img/microfono.png",
      description: "La música que amas, en un solo lugar. Explora, siente y conecta con cada ritmo."
    },
    {
      title: "Deleitate",
      image: "/assets/img/audifonos.png",
      description: "La música es el lenguaje de las emociones. Sumérgete en ritmos, melodías y sonidos creados para inspirarte."
    },
    {
      title: "Explora",
      image: "/assets/img/microfono.png",
      description: "Explora nuevos géneros, revive clásicos y encuentra la música perfecta para cada instante."
    },


  ]

  constructor(private router: Router, private storageService: StorageService) { }

  async ngOnInit() {
    await this.cargarTemaGuardado();
    this.simularCargarDatos();
    await this.storageService.set('pestaña', 'ya estuve en el intro');
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

    this.colorEncabezadoActual = this.modoOscuro
      ? this.colorEncabezadoClaras
      : this.colorEncabezadoOscuro;  

    this.isDay = !this.isDay;

    await this.storageService.set('tema', this.colorSlideActual);
    console.log('Tema guardado:', this.colorSlideActual);

  }

  get iconoActual() {
    return this.isDay ? 'sunny' : 'moon';
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

  async goBack() {
    this.router.navigate(['/home']);
    console.log('Regresando al home...');
  }

  goIntro() {
    this.router.navigate(['/intro']);
  }

  get code() {
    return 'code';
  }

}
