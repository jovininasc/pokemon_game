import { Component, OnInit } from '@angular/core';
import { PokemonsService, pokemonsData } from '../../service/pokemons.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './capture.component.html',
  styleUrl: './capture.component.css'
})
export class CaptureComponent {

  id_user = Number(localStorage.getItem('id'));

  pokemons: pokemonsData[] = [];
  capturado: number = 0;
  carregando: boolean = false;
  mostrarBotao = true;


  constructor(private pokeser: PokemonsService) { }

  pokemonView() {
    this.mostrarBotao = false;
    this.pokeser.pokemonView().subscribe({
      next: (data) => { this.pokemons = data; console.log("passou os dados", this.pokemons) },
      error: (err) => console.log("deu erro: ", err),
      complete: () => console.log("valores passados")
    })
  }

  capture(id: number,
    name: string,
    tipo: string,
    level: number,
    profile_link: string,
    captura: number) {

    const number: number = Math.floor(Math.random() * 100);
    level = Math.floor(Math.random() * 1000);

    this.carregando = true;

    setTimeout(() => {
      this.carregando = false;
      if (number <= captura) {

        this.capturado = 1;
        try {
          this.pokeser.capturePoke(id, name, tipo, level, profile_link).subscribe({
            complete: () => console.log("finalizou")
          });
        } catch (e) {
          console.log(e);
        }

        console.log("vai para a pokedex:", id, name, tipo, level, profile_link);
      }
      else {
        this.capturado = 2;
      }
    }, 3000);

    setTimeout(() => {
      location.reload();
    }, 4000)
  }


}
