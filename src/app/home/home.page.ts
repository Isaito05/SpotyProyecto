import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
//import { IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {

  genres = [
    { title: "Musica clasica", 
      image: "https://wallpapers.com/images/hd/classical-music-1600-x-1000-wallpaper-a58kbdl0oe9y9hxf.jpg", 
      description: "La música clásica es un género musical que abarca un amplio período de tiempo y una variedad de estilos." 
    },
    { title: "Musica vallenata",
      image: "https://img.freepik.com/vector-premium/ilustracion-vectorial-dibujos-animados-acordeon-instrumento-musical-colorido_255358-3624.jpg?semt=ais_hybrid&w=740&q=80",
      description: "El vallenato es un género musical tradicional de la región caribeña de Colombia." 
    },
    { title: "Musica de popular",
      image: "https://files.alerta.rcnradio.com/alerta_tolima_prod/public/2021-09/dia_mundial_musica_popular_0.jpg?CRMUafPCDF8_scUBBY37SQuDzILrtpLu",
      description: "La música popular es un género musical que abarca una amplia variedad de estilos y formas que son accesibles y apreciados por un gran número de personas." 
    },
    
    
  ]

  constructor() {}

  
}
