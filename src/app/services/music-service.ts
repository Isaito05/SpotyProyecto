import { Injectable } from '@angular/core';
import * as dataArtistas from './artistas.json';

@Injectable({
  providedIn: 'root',
})
export class MusicService {

  urlServer = 'https://music.fly.dev';

  constructor() { }

  getTracks() {
    return fetch(`${this.urlServer}/tracks`)
      .then(response => response.json())
      .then(data => data);
  };

  getAlbums() {
    return fetch(`${this.urlServer}/albums`)
      .then(response => response.json())
      .then(data => data);
  };

  getArtists() {
    return fetch(`${this.urlServer}/artists`)
      .then(response => response.json())
      .then(data => data);
  }

  getLocalArtists() {
    return dataArtistas;
  }

  getSonByAlbums(albumId: string) {
    return fetch(`${this.urlServer}/tracks/album/${albumId}`)
      .then(response => response.json())
      .then(data => data);
  }

  getSonByArtist(artistId: string) {
    return fetch(`${this.urlServer}/tracks/artist/${artistId}`)
      .then(response => response.json())
      .then(data => data);
  }
}
