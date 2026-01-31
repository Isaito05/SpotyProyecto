import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavParams, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SongsModalPage implements OnInit {

  songs: any;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.songs = this.navParams.data['songs'];
    console.log('Songs in modal:', this.songs);
  }

  async selectSong(song:any){
    console.log("mi cancions es:", song);
    await this.modalCtrl.dismiss(song);
  }

  async closeModal(){
    await this.modalCtrl.dismiss();
  }

}


