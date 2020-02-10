import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../users/user';



@Injectable()
export class UserService {
  //mettre adresse bdd
  private url = '';
  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
}
