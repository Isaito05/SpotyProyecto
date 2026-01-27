import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage-service';
import { sunny, moon} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

addIcons({
  'sunny': sunny,
  'moon': moon,

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

  modoOscuro = true;

  colorSlideActual = this.colorSlideOscuro;
  colorLetrasActualSlide = this.colorLetrasClarasSlide;
  colorTituloActualSlide = this.colorTituloClarasSlide;
  colorEncabezadoActual = this.colorEncabezadoClaras;


  isDay: boolean = true;

  genres = [
    {
      title: "Bienvenidos",
      image: "/assets/img/newlOGO.png",
      description: "Descubre un mundo de sonidos y emociones. Explora géneros, artistas y canciones que acompañan cada momento de tu día."
    },
    {
      title: "Disfruta",
      image: "/assets/img/newlOGO.png",
      description: "La música que amas, en un solo lugar. Explora, siente y conecta con cada ritmo."
    },
    {
      title: "Deleitate",
      image: "/assets/img/newlOGO.png",
      description: "La música es el lenguaje de las emociones. Sumérgete en ritmos, melodías y sonidos creados para inspirarte."
    },
    {
      title: "Explora",
      image: "/assets/img/newlOGO.png",
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

    this.aplicarTema(this.modoOscuro);

    await this.storageService.set('tema', {
      modoOscuro: this.modoOscuro
    });

    console.log('Tema guardado:', this.modoOscuro);
  }

  aplicarTema(esOscuro: boolean) {
    this.modoOscuro = esOscuro;

    this.colorSlideActual = esOscuro
      ? this.colorSlideOscuro
      : this.colorSlideClaro;

    this.colorLetrasActualSlide = esOscuro
      ? this.colorLetrasClarasSlide
      : this.colorLetrasOscuroSlide;

    this.colorTituloActualSlide = esOscuro
      ? this.colorTituloClarasSlide
      : this.colorTituloOscuroSlide;

    this.colorEncabezadoActual = esOscuro
      ? this.colorEncabezadoClaras
      : this.colorEncabezadoOscuro;

    // 🔥 ESTO ES LO QUE TE FALTABA
    this.isDay = esOscuro;
  }

  get iconoActual() {
    return this.isDay ? 'sunny' : 'moon';
  }

  async cargarTemaGuardado() {
    const temaGuardado = await this.storageService.get('tema');

    if (temaGuardado && typeof temaGuardado.modoOscuro === 'boolean') {
      this.aplicarTema(temaGuardado.modoOscuro);
    } else {
      // tema por defecto
      this.aplicarTema(true);
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
    this.router.navigate(['/menu/home']);
    console.log('Regresando al home...');
  }

  goIntro() {
    this.router.navigate(['/intro']);
  }

  get code() {
    return 'code';
  }

  

}
