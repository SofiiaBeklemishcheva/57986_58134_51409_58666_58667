import { Injectable } from '@angular/core';
import { User } from './interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private auth: AuthService) {}

  user: User | undefined;
}
