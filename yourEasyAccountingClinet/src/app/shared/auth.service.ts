import { Injectable } from '@angular/core';
import { User } from './interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User | null>(null);

  storeRecipes() {
    return this.http
      .post('http://localhost/api/login.php', {
        login: 'user1',
        password: 'pass1',
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  logIn(login: string, password: string) {
    this.http
      .post<{ status: string }>('http://localhost/api/login.php', {
        login: login,
        password: password,
      })
      .subscribe((response) => {
        if (response.status === 'OK') {
          this.user.next({
            ID: 13,
            albumId: 32123,
            nickname: login,
            name: 'testname',
            surname: 'TestSurname',
            access: 0,
          });
          localStorage.setItem('user', JSON.stringify(this.user.value));
          this.router.navigate(['home']);
        } else {
          alert('Niewłaściwe dane logowania');
        }
      });
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
  }

  getUser() {
    return this.user.value;
  }
}
