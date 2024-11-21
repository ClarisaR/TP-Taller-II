import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, share, shareReplay, tap } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

interface MessageBody {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<User>(null);
  _user = this.user.asObservable();

  private baseURL: string = environment.apiURL + '/auth';
  constructor(protected httpClient: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    console.log(username, password);
    return this.httpClient
      .post<User>(`${this.baseURL}/login`, { username, password }, { withCredentials: true})
      .pipe(
        tap((user) => {
          this.user.next(user);
        }),
        catchError((error) => {
          this.user.next(null);
          throw Error(error.error.message);
        })
      );
  }

  // Método de registro
  register(username: string, password: string): Observable<MessageBody> {
    return this.httpClient
      .post<MessageBody>(`${this.baseURL}/register`, { username, password })
      .pipe(
        catchError((error) => {
          throw Error(error.error.message);
        })
      );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.httpClient
      .get<{ authenticated: boolean }>(`${this.baseURL}/isAuthenticated`, { withCredentials: true })
      .pipe(
        map((response) => {
          console.log('respuesta');
          console.log(response);
         return response.authenticated;
        }),
        catchError(() => {
          console.log('error');
          return of(false);
        })
      );
  }
}
