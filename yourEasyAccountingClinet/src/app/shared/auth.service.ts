import { Injectable } from '@angular/core';
import { User } from './interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  user = new BehaviorSubject<User | null>(null);

  logIn(login: string, password: string) {
    this.user.next({
      ID: 2,
      albumId: 5,
      name: login,
      surname: 'Test',
      nickname: 'Testowy',
      access: 2,
    });
    if (this.user !== null) {
      localStorage.setItem('user', JSON.stringify(this.user.value));
    }
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('user');
  }

  autoLogOn() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.user.next(null);
    } else {
      this.user.next(JSON.parse(String(user)));
    }

    console.log(this.user.value);
  }

  getUser() {
    return this.user.value;
  }
}
