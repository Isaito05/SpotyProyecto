import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage-service';
import { sunny, moon, code} from 'ionicons/icons';
import { addIcons } from 'ionicons';

addIcons({
  'sunny': sunny,
  'moon': moon,
  'code': code,
});

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IntroPage implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  async ngOnInit() {
  }

  

  async goBack() {
    this.router.navigate(['/home']);
    await this.storageService.set('pestaña', 'ya estuve en el intro');
    console.log('Regresando al home...');
  }

  get code() {
    return 'code';
  }

}
