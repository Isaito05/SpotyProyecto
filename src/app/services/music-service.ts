import { Injectable } from '@angular/core';
import * as dataArtistas from './artistas.json';
import { StorageService } from './storage-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicService {

  urlServer = 'https://music.fly.dev';
  httpHeaders = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
  httpHeaders1 = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private storageServices: StorageService, private http: HttpClient) { }

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

  async RegistrarFavorita(song: any) {
    const user = await this.storageServices.get('user') || '{}';
    const body = {
      "user_id": user.id,
      "track_id": song.id
    };
    return this.http.post(`${this.urlServer}/favorite_tracks`, body, this.httpHeaders);
  }

  async getFavoritos(song: any) {
    console.log("es favorita: ", song);
    const user = await this.storageServices.get('user') || '{}';
    return this.http.get(`${this.urlServer}/user_favorites/${user.id}`, this.httpHeaders).pipe(
      map((res: any) => {
        return res.some((fav: any) => fav.id === song.id)
      })
    )
  }

  async getFavoritosByUser() {
    const user = await this.storageServices.get('user');
    return this.http.get<any[]>(
      `${this.urlServer}/user_favorites/${user.id}`,
      this.httpHeaders
    );
  }

  async removeFavorite(favoritos: any) {
    const user = await this.storageServices.get('user');
    const body = {
      user_id: user.id,
      track_id: favoritos.id
    };
    return this.http.delete(`${this.urlServer}/remove_favorite`, {
      headers: this.httpHeaders1,
      body: body
    });
  }

}
