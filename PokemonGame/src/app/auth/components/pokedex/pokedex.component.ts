import { Component } from '@angular/core';
import { pokemonsData, PokemonsService } from '../../service/pokemons.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})

export class PokedexComponent {

  pokemon: pokemonsData[] = [];

  constructor(private pokeSer: PokemonsService) { }

  id: number = Number(localStorage.getItem('id'));
  ngOnInit(): void {
    {

      this.pokeSer.userPokemons(this.id).subscribe({
        next: (data) => { this.pokemon = data, console.log("pokkemons:", data) },
        error: (err) => console.log("não foi possivel buscar os pokemons", err)
      })
    }
  }
  soltarPokemon(id: number) {
    this.pokeSer.soltarPokemon(id).subscribe(
      (response: any) => {
        console.log("pokemon solto", response)
      }
    )
    location.reload();
  }

  fortalecerPokemon(id: number, level: number) {
    this.pokeSer.fortalecerPokemon(id, level).subscribe(
      (response: any) => {

        console.log("Fortalecido com sucesso:", response);

      },
      (error) => console.error("Erro ao fortalecer:", error)
    );
    location.reload();
  }
}

