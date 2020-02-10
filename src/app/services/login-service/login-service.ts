import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../../users/user";

@Injectable()
export class LoginService {


  private isLoginSubject = new BehaviorSubject<User>(null);

  //lien du serveur
  private url = '';
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(this.url + '/connect?email=' + email + '&password=' + password);
  }

  log(): BehaviorSubject<User> {
    return this.isLoginSubject;
  }
  logout(): void {
    this.isLoginSubject.next(null);
  }

  update(user: User): Observable<User> {
    console.log(user);
    return this.http.put<User>(this.url, user);
  }
}
