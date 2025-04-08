import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AutorizacaoService } from '../../service/autorizacao.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private auto: AutorizacaoService) { }

  name = localStorage.getItem('name');

  authGuardResult = this.auto.isAuthenticated();
  adminGuardResult = this.auto.isAdmin();

  sair() {
    this.auto.logout();
  }


}


