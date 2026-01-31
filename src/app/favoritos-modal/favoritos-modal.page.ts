import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { MusicService } from '../services/music-service';

@Component({
  selector: 'app-favoritos-modal',
  templateUrl: './favoritos-modal.page.html',
  styleUrls: ['./favoritos-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FavoritosModalPage implements OnInit {

  @Input() favoritos: any[] = [];

  constructor(private modalCtrl: ModalController, private musicService: MusicService, private toastController: ToastController) { }

  ngOnInit() {
    console.log('🎵 Favoritos recibidos:', this.favoritos);
  }

  cerrar() {
    this.modalCtrl.dismiss({
      actualizado: true
    });
  }

  async eliminarFavorito(song: any) {
    (await this.musicService.removeFavorite(song)).subscribe({
      next: async () => {
        // quitarla del array visualmente
        this.favoritos = this.favoritos.filter(f => f.id !== song.id);

        const toast = await this.toastController.create({
          message: '❌ Canción eliminada de favoritos',
          duration: 2000,
          position: 'bottom',
          color: 'danger'
        });
        toast.present();
      },
      error: (err) => {
        console.error('Error al eliminar la canción favorita', err);
      }
    });
  }

}
