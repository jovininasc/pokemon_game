import { Component } from '@angular/core';
import { PokemonsService } from '../../service/pokemons.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-pokemon',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register-pokemon.component.html',
  styleUrl: './register-pokemon.component.css'
})
export class RegisterPokemonComponent {
  pokemon = {
    name: '',
    tipo: '',
    porcentagem: 0,
    link: ''
  }
  constructor(private rgtPoke: PokemonsService) { }

  registrarPokemon() {
    this.rgtPoke.registerPokemon(this.pokemon.name, this.pokemon.tipo, this.pokemon.porcentagem, this.pokemon.link).subscribe(
      response => console.log('Sucesso:', response),
      error => console.error('Erro:', error),

    );
    location.reload();
  }


}
