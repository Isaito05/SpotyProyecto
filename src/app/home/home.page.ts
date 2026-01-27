import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController} from '@ionic/angular';
//import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { sunny, moon, } from 'ionicons/icons';
import { StorageService } from '../services/storage-service';
import { Router } from '@angular/router';
import { MusicService } from '../services/music-service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';



addIcons({
  'sunny': sunny,
  'moon': moon,
});


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

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
  tracks: any;
  albums: any;
  localArtists: any;
  artists: any;


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

  constructor(private storageService: StorageService, private router: Router, private musicService: MusicService, private modalController: ModalController) { }

  async ngOnInit() {
    this.loadAlbums();
    this.loadTracks();
    this.loadArtists();
    await this.cargarTemaGuardado();
    this.simularCargarDatos();
    this.getLocalArtists();
  }

  loadTracks() {
    this.musicService.getTracks().then(tracks => {
      this.tracks = tracks;
      console.log('Tracks cargados:', this.tracks);
    });
  }

  loadArtists() {
    this.musicService.getArtists().then(artists => {
      this.artists = artists;
      console.log('Artistas cargados:', this.artists);
    });
  }

  loadAlbums() {
    this.musicService.getAlbums().then(albums => {
      this.albums = albums;
      console.log('Albums cargados:', this.albums);
    });
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

  get code() {
    return 'code';
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

  obtenerDatos() {
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

  getLocalArtists() {
    this.localArtists = this.musicService.getLocalArtists();
    console.log('Artistas locales cargados:', this.localArtists.artists);
  }

  async showSongs(albumId: string) {
    console.log('ID del álbum seleccionado:', albumId);
    const songs = await this.musicService.getSonByAlbums(albumId);
    console.log('Canciones del álbum:', songs);

    const modal = await this.modalController.create({
      component: SongsModalPage, 
      componentProps: {
        songs: songs
      }
    });
    return await modal.present();
  }

  async showSongsByArtist(artistId: string) {
    console.log('ID del artista seleccionado:', artistId);
    const songs = await this.musicService.getSonByArtist(artistId);
    console.log('Canciones del artista:', songs);

    const modal = await this.modalController.create({
      component: SongsModalPage, 
      componentProps: {
        songs: songs
      }
    });
    return await modal.present();
  }

}
