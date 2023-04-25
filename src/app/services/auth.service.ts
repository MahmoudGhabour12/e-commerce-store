import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from 'models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  error: boolean = false;
  private domain: string;
  private authApi: string;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.domain = environment.apiUrl;
    this.authApi = '/users/authenticate';

    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  loginByEmail(username: string, password: string) {
    return this.httpClient.post(`${this.domain}${this.authApi}`, { username, password }).pipe(
      map((user: any) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getAll() {
    return this.httpClient.get<User[]>(`${environment.fakeStoreApi}/users`);
  }

  getById(id: number) {
    return this.httpClient.get<User>(`${environment.fakeStoreApi}/users/${id}`);
  }
}
