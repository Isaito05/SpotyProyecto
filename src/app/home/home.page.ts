import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
//import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { sunny, moon, } from 'ionicons/icons';
import { StorageService } from '../services/storage-service';
import { Router } from '@angular/router';
import { MusicService } from '../services/music-service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
import { FavoritosModalPage } from '../favoritos-modal/favoritos-modal.page';


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
  song: any = {
    name: "",
    prview_url: "",
    playing: false
  };

  currentSong: any = {};
  newTime: any;
  errorMessage: string = '';
  favoritos: any;
  esfavorita: any;
  userName: string = '';

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

  constructor(private toastController: ToastController, private storageService: StorageService, private router: Router, private musicService: MusicService, private modalController: ModalController) { }

  async ngOnInit() {
    this.loadAlbums();
    this.loadTracks();
    this.loadArtists();
    await this.cargarTemaGuardado();
    this.simularCargarDatos();
    this.getLocalArtists();
    const user = await this.storageService.get('user');
    if (user) {
      this.userName = user.name;
    }
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
    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        this.song = result.data;
        console.log("Cancio recibida:", result.data)
        await this.cancionFavorita(this.song);
        this.song = result.data;
      }
    })
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
    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        this.song = result.data;
        await this.cancionFavorita(this.song);
        console.log("Cancio recibida:", result.data)
        this.song = result.data;
      }
    })
    return await modal.present();
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = this.currentSong.currentTime / this.currentSong.duration;
    })
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return "0.00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  getRemainingTime() {
    if (!this.currentSong?.duration || !this.currentSong?.currentTime) {
      return 0;
    }
    return this.currentSong.duration - this.currentSong.currentTime;
  }

  async showToast(message: string, color: string = 'success', icon: string = 'checkmark-circle') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      color,
      icon,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  GestionarFavoritos() {
    if (this.esfavorita) {
      this.eliminarFavorito();
    } else {
      this.registrarFavorito();
    }
  }

  async registrarFavorito() {
    (await this.musicService.RegistrarFavorita(this.song)).subscribe({
      next: (res) => {
        this.toastController.create({
          message: '🎉 Canción guardada como favorita',
          duration: 2000,
          position: 'top',
          color: 'success'
        }).then(toast => toast.present());
        this.cancionFavorita(this.song);
      },
      error: (err) => {
        console.error('Error al guardar la canción favorita', err);
      }
    });
  }

  async eliminarFavorito() {
    (await this.musicService.removeFavorite(this.song)).subscribe({
      next: (res) => {
        this.toastController.create({
          message: '❌ Canción eliminada como favorita',
          duration: 2000,
          position: 'top',
          color: 'danger'
        }).then(toast => toast.present());
        this.cancionFavorita(this.song);
      },
      error: (err) => {
        console.error('Error al eliminara la canción favorita', err);
      }
    });
  }

  async cancionFavorita(song: any) {
    (await this.musicService.getFavoritos(song)).subscribe({
      next: (res) => {
        this.esfavorita = res;
      },
      error: (err) => {
        console.error('Error al verificar si la canción es favorita', err);
      }
    });
  }

  get iconoFavorita() {
    return this.esfavorita ? 'close'  : 'heart';
  }

  async abrirFavoritos() {
    const obs = await this.musicService.getFavoritosByUser();

    obs.subscribe(async (data) => {
      const modal = await this.modalController.create({
        component: FavoritosModalPage,
        componentProps: {
          favoritos: data
        }
      });

      await modal.present();

      // 👇 AQUÍ ESTÁ LA MAGIA
      const { data: result } = await modal.onDidDismiss();

      if (result?.actualizado) {
        this.cancionFavorita(this.song); // vuelve a verificar
      }
    });
  }

}
