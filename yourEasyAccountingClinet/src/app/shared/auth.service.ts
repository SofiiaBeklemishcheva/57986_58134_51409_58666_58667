import { Injectable } from '@angular/core';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  user: User | undefined;

  loggingIn(login: string, password: string) {
    this.user = {
      ID: 2,
      albumId: 5,
      name: login,
      surname: 'Test',
      nickname: 'Testowy',
      access: 2,
    };
  }
}
