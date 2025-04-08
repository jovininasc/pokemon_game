import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface pokemonsData {
  id: number;
  name: string;
  tipo: string;
  level: number;
  captura: number;
  profile_link: string;

}


@Injectable({
  providedIn: 'root'
})


export class PokemonsService {


  private readonly pokemonUrl = 'http://localhost:3030/listPokemon';
  private readonly pokemonrgt = 'http://localhost:3030/rgtPoke';
  private readonly captureV = 'http://localhost:3030/captureView';


  constructor(private http: HttpClient) { }

  userPokemons(id: number): Observable<pokemonsData[]> {
    console.log("pokemons do usuario");
    return this.http.get<pokemonsData[]>(`${this.pokemonUrl}/${id}`);
  }

  registerPokemon(name: string, tipo: string, porcentagem: number, link: string): Observable<any> {
    console.log("pokemon registrado", name, tipo, porcentagem, link);
    return this.http.post<any>(this.pokemonrgt, { name, tipo, porcentagem, link }).pipe(
      tap((response: any) => {
        if (response.success && response.registrado) {
          console.log("pokemon salvo:", response.registrado);
        }
      })
    );
  }

  fortalecerPokemon(id: number, level: number): Observable<pokemonsData> {
    console.log("Enviando PUT para:", `${this.pokemonrgt}/${id}`, "com dados:", { level });
    return this.http.put<pokemonsData>(`${this.pokemonrgt}/${id}`, { level: level + 10 });
  }

  soltarPokemon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.pokemonrgt}/${id}`);
  }

  pokemonView(): Observable<pokemonsData[]> {
    return this.http.get<pokemonsData[]>(this.captureV);
  }

  capturePoke(user_id: number, name: string, tipo: string, level: number, profile_link: string): Observable<any> {
    console.log("está no service:", user_id, name, tipo, level, profile_link)
    return this.http.post<any>('http://localhost:3030/capturado', { user_id, name, tipo, level, profile_link }).pipe(
      tap((response: any) => {
        if (response.success) {
          console.log("pokemon salvo:", response.posted);
        }
      })
    );
  }
}
