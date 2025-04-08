import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersService, userAll } from '../../service/all-users.service';
import { MatMenu } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { pokemonsData, PokemonsService } from '../../service/pokemons.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-config-admin',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatMenu, MatButtonModule, MatSidenavModule, MatTableModule, RouterModule],
  templateUrl: './config-admin.component.html',
  styleUrls: ['./config-admin.component.css']
})
export class ConfigAdminComponent implements OnInit {

  users: userAll[] = [];
  pokemon: pokemonsData[] = [];

  constructor(private allusers: AllUsersService, private pokeService: PokemonsService) { }

  ngOnInit(): void {

    this.allusers.getUsers().subscribe({

      next: (data) => this.users = data,
      error: (err) => console.error("Erro ao buscar usuários:", err)
    });
  }

  changeUserRole(id: number, role: string): void {

    this.allusers.changeRole(id, role).subscribe(
      (response: any) => {

        console.log("Envio de mudança de user realizado com sucesso", response);

      },
      (error) => console.error("Erro ao atualizar role:", error)
    );

    location.reload();
  }

  userPokemons(id: number) {
    this.pokeService.userPokemons(id).subscribe({
      next: (data) => this.pokemon = data,
      error: (err) => console.log("Erro ao buscar pokemon", err)
    })
  }
}

