import { Injectable } from '@angular/core';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor() {}

  user: User | undefined;

  logIn() {}
}
