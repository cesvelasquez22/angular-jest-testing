import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private _http: HttpClient) { }

  getPokemon(id: number) {
    return this._http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
