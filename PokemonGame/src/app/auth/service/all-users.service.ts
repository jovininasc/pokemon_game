import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface userAll {
  id: number;
  name: string;
  role: string;
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class AllUsersService {

  private readonly userUrl = 'http://localhost:3030/listUser';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<userAll[]> {

    return this.http.get<userAll[]>(this.userUrl);

  }

  changeRole(id: number, role: string): Observable<userAll> {
    console.log("Enviando PUT para:", `${this.userUrl}/${id}`, "com dados:", { role });
    return this.http.put<userAll>(`${this.userUrl}/${id}`, { role });

  }


}
