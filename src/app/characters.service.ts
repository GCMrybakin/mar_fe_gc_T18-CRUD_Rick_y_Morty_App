import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private apiUrl = 'http://localhost:3000/characters';

  constructor(private http: HttpClient) { }

  getCharacters() {
    return this.http.get(this.apiUrl);
  }

  getCharacterById(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  crearPersonaje(character: any) {
    return this.http.post(this.apiUrl, character);
  }

  actualizarPersonaje(id: number, character: any) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, character);
  }

  eliminarPersonaje(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
