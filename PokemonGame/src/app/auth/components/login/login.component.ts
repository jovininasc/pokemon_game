import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailValidator, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AutorizacaoService } from '../../service/autorizacao.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {


  state = typeEnterState.REGISTER;
  usuario = { email: '', password: '', password2: '', name: '' }

  constructor(private http: HttpClient, private router: Router, private auto: AutorizacaoService) { }

  //cria um novo usuario
  fazerRegistro() {
    if (this.isNotNull(this.usuario.name)
      && this.isNotNull(this.usuario.email)
      && this.isNotNull(this.usuario.password)
      && this.checkPassword(this.usuario.password, this.usuario.password2)) {
      this.auto.registro(this.usuario.email, this.usuario.password, this.usuario.name).subscribe(request => {
        console.log("registro feito", request);
      }, error => {
        console.error("não pegou", error);
      }
      )
    }
    location.reload();
  }
  //faz o login e o redireciona para a home
  fazerLogin() {
    if (this.isNotNull(this.usuario.email) && this.isNotNull(this.usuario.password)) {
      this.auto.login(this.usuario.email, this.usuario.password).pipe(
        tap((response: any) => {
          if (response.success && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            localStorage.setItem('name', response.name);
            localStorage.setItem('id', response.id);
            console.log("Role salva no localStorage:", response.role);
            this.router.navigate(['./home']);
          }
          else {
            this.router.navigate(['./login']);
          }

        })
      )
        .subscribe(
          (request: any) => {
            console.log("login feito", request);

          },
          (error: any) => {
            console.error("não pegou", error);
          }
        );
    }

  }

  isNotNull(text: string) {
    return text != null && text.length > 0;
  }

  checkPassword(text: string, textConf: string) {
    return text = textConf;
  }

  islogin() {
    this.state = typeEnterState.LOGIN;
  }

  enterLogin() {
    return this.state == typeEnterState.LOGIN;
  }
  isRegister() {
    this.state = typeEnterState.REGISTER;
  }

  noAccount() {
    return this.state == typeEnterState.REGISTER;
  }
}

export enum typeEnterState {
  LOGIN,
  REGISTER
}

