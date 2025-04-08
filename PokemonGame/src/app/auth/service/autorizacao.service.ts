import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  private readonly loginUrl = 'http://localhost:3030/login';
  private readonly rgtUrl = 'http://localhost:3030/register';

  constructor(private http: HttpClient) { }

  registro(email: string, password: string, name: string): Observable<any> {
    return this.http.post<any>(this.rgtUrl, { email, password, name })
  }
  //faz login do usuario
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password })
      .pipe(
        tap((response: any) => {
          if (response.success && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            localStorage.setItem('id', response.id);

            console.log("Role salva no service:", response.role);
            console.log("id salva no service:", response.id);
          }
        })
      );
  }
  //Libera as rotas para admin e user
  getUserRole(): string {
    return localStorage.getItem('role') || 'none';
  }
  // autenticação para navbar do usuario na home
  isAuthenticated(): boolean {
    return localStorage.getItem('role') === 'hunter';
  }
  //autenticação para navbar do admin na home
  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('role');
    sessionStorage.clear();
  }
}
